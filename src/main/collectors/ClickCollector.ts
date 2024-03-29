import {AbstractCollector} from "./AbstractCollector";
import {Sentinel} from "../utils/Sentinel";
import {ListenerType} from "../utils/ListenerType";
import {Logger} from "../logger/Logger";
import {Context} from "../utils";

/**
 * Collect clicks on elements matching a query selector. Handles both DOM elements
 * present in the DOM and elements inserted after the page load / collector construction.
 *
 * When a click occurs, a function provided at construction time get invoked to collect data points
 * from the element.
 */
export class ClickCollector extends AbstractCollector {
	protected selectorExpression: string;
	protected listenerType: ListenerType;

	/**
	 * Construct a click collector
	 *
	 * @constructor
	 * @param {string} selectorExpression - Document query selector identifying the elements to attach to
	 * @param {string} type - The type OF element click to report
	 * @param {string} listenerType - Whether the listener should be a dom or sentinel listener
	 * @param context
	 */
	constructor(selectorExpression: string,
							type = "click",
							listenerType = ListenerType.Sentinel,
							context?: Context) {
		super(type, context);
		this.selectorExpression = selectorExpression;
		this.listenerType = listenerType;
	}

	/**
	 * Abstract collection method, must be overridden in the subclasses
	 * @abstract
	 */
	collect(element: HTMLElement, event: Event, log: Logger) {
		return undefined;
	}

	/**
	 * Add click event listeners to the identified elements, write the data
	 * when the event occurs
	 *
	 * @param {object} writer - The writer to send the data to
	 * @param log
	 */
	attach(writer, log) {
		const handler = (event: Event, element: HTMLElement) => {
			const payload = this.collect(element, event, log);
			if (payload) {
				writer.write({
					type: this.type,
					...payload
				});
			}
		}

		// The Sentiel library uses animationstart event listeners which may interfere with
		// animations attached on elemenets. The in-library provided workaround mechanism does not work
		// 100%, thus we provide the listenerType choice below. The tradeoffs
		// "dom" - no animation interference, only onclick attached, but does not handle elements inserted in the DOM later
		// "sentinel (default)" - works on elements inserted in the DOM anytime, but interferes with CSS animations on these elements
		if (this.listenerType === ListenerType.Dom) {
			const nodeList = this.getDocument().querySelectorAll(this.selectorExpression);
			nodeList.forEach((el: HTMLElement) => el.addEventListener("click", this.logWrapHandler(handler, log, el), {
				passive: true,
				capture: true
			}));
		} else {
			const sentinel = new Sentinel(this.getDocument());
			sentinel.on(this.selectorExpression, el => el.addEventListener("click", this.logWrapHandler(handler, log, el), {
				passive: true,
				capture: true
			}));
		}
	}
}
