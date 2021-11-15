import {AbstractCollector} from "./AbstractCollector";
import {Sentinel} from "../utils/Sentinel";
import {ListenerType} from "../utils/ListenerType";

/**
 * Collect search information from a field that has a "as-you-type" trigger and
 * renders search results immediately. May trigger multiple times depending on
 * type speed patterns - we expect that the interval between key strokes would be
 * less than 500ms
 */
export class InstantSearchQueryCollector extends AbstractCollector {

	selectorExpression: string;
	delayMs: number;
	minLength: number;
	listenerType: ListenerType;

	/**
	 * Construct instant search collector
	 *
	 * @constructor
	 * @param {string} selectorExpression - Document query selector identifying the elements to attach to
	 * @param delayMs
	 * @param minLength
	 * @param listenerType
	 */
	constructor(selectorExpression: string,
							delayMs: number = 500,
							minLength: number = 2,
							listenerType = ListenerType.Sentinel) {
		super("instant-search");
		this.selectorExpression = selectorExpression;
		this.delayMs = delayMs;
		this.minLength = minLength;
		this.listenerType = listenerType;
	}

	/**
	 * Add impression event listeners to the identified elements, write the data
	 * when the event occurs
	 *
	 * @param {object} writer - The writer to send the data to
	 */
	attach(writer) {
		const type = this.getType();
		const handler = (searchBox, e, writer) => {
			// Ignore shift, ctrl, etc. presses, react only on characters
			if (e.which === 0) {
				return;
			}

			// Delay the reaction of the event, clean the timeout if the event fires
			// again and start counting from 0
			delay(() => {
				const keywords = searchBox.value;
				if (keywords && keywords.length >= this.minLength) {
					writer.write({
						"type": type,
						"keywords": keywords
					});
				}
			}, this.delayMs);
		}

		// The Sentiel library uses animationstart event listeners which may interfere with
		// animations attached on elemenets. The in-library provided workaround mechanism does not work
		// 100%, thus we provide the listenerType choice below. The tradeoffs
		// "dom" - no animation interference, only onclick attached, but does not handle elements inserted in the DOM later
		// "sentinel (default)" - works on elements inserted in the DOM anytime, but interferes with CSS animations on these elements
		if (this.listenerType === ListenerType.Dom) {
			const nodeList = this.getDocument().querySelectorAll(this.selectorExpression);
			nodeList.forEach(el => el.addEventListener("keyup", ev => handler(el, ev, writer)));
		} else {
			new Sentinel(this.getDocument()).on(this.selectorExpression, el => el.addEventListener("keyup", ev => handler(el, ev, writer)));
		}
	}
}

const delay = (function () {
	let timer;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();
