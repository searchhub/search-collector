import {AbstractCollector} from "./AbstractCollector";
import {LocalStorageQueue} from "../utils/LocalStorageQueue";
import {Sentinel} from "../utils/Sentinel";
import {scrollMonitor} from "scrollmonitor";
import {Writer} from "../writers/Writer";
import {NumberResolver, StringResolver} from "../resolvers/Resolver";

//TODO change it maybe?
type ImpressionAttributeCollector = {
	(element?: HTMLElement): {
		id: StringResolver,
		position: NumberResolver
	}
};

/**
 * Collect impressions - a disply of a product in the browser viewport. If the product is shown multiple
 * times, the collector will record multiple events i.e. we don't apply filter logic here.
 *
 * Handles both DOM elements present in the DOM and elements inserted after the page load / collector construction.
 */
export class ImpressionCollector extends AbstractCollector {

	selectorExpression: string;
	attributeCollector: ImpressionAttributeCollector;
	queue: LocalStorageQueue;
	timer: NodeJS.Timeout;
	writer: Writer;

	/**
	 * Construct impression collector
	 *
	 * @constructor
	 * @param {string} selectorExpression - Document query selector identifying the elements to attach to
	 * @param {function} attributeCollector - A function to be triggered on click of the element, intended to collect specific element data
	 */
	constructor(selectorExpression: string, attributeCollector: ImpressionAttributeCollector) {
		super("impression");
		this.selectorExpression = selectorExpression;
		this.attributeCollector = attributeCollector;

		this.queue = new LocalStorageQueue("impressions");
		this.timer = setTimeout(this.flush.bind(this), 1000);
	}

	/**
	 * Add impression event listeners to the identified elements, write the data
	 * when the event occurs, with a delay of 1s - we could gather many events within this timeframe
	 *
	 * @param {object} writer - The writer to send the data to
	 */
	attach(writer) {
		this.writer = writer;

		const document = this.getDocument();
		const window = this.getWindow();

		const handler = el => {
			const data = this.attributeCollector(el);
			const watcher = scrollMonitor.create(el);

			watcher.enterViewport(() => {
				// Figure out if we need to check the visibility of an element i.e.
				// guard against elements that enter the viewport but have display=hidden
				// if (el.offsetParent === null) {
				//  return;
				// }
				this.queue.push(data);
			})
		};

		new Sentinel(this.getDocument()).on(this.selectorExpression, handler);
	}


	flush(cancelTimer) {
		if (this.queue.size() > 0) {
			// TODO organize drain and write via callbacks to ensure no data is lost
			// if the browser shutsdown before the write is complete
			const data = this.queue.drain();

			this.writer.write({
				"type": "impression",
				"data": data
			});
		}

		if (!cancelTimer) {
			this.timer = setTimeout(this.flush.bind(this), 1000);
		}
	}
}