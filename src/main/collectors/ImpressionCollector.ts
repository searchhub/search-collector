import {AbstractCollector} from "./AbstractCollector";
import {Sentinel} from "../utils/Sentinel";
import {scrollMonitor} from "scrollmonitor";
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
	}

	/**
	 * Add impression event listeners to the identified elements, write the data
	 * when the event occurs, with a delay of 1s - we could gather many events within this timeframe
	 *
	 * @param {object} writer - The writer to send the data to
	 */
	attach(writer) {
		const handler = el => {
			const watcher = scrollMonitor.create(el);

			watcher.enterViewport(() => {
				const data = {
					type: this.type,
					...this.attributeCollector(el)
				};
				// Figure out if we need to check the visibility of an element i.e.
				// guard against elements that enter the viewport but have display=hidden
				// if (el.offsetParent === null) {
				//  return;
				// }
				writer.write(data);
			})
		};

		new Sentinel(this.getDocument()).on(this.selectorExpression, handler);
	}
}