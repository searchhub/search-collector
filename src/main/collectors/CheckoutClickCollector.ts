import {AbstractCollector} from "./AbstractCollector";
import {Sentinel} from "../utils/Sentinel";
import {ListenerType} from "../utils/ListenerType";
import {NumberResolver, StringResolver} from "../resolvers/Resolver";

/**
 * Triggered by a clickSelector, the collector will fire the contentSelector to select elements to collect
 * information from and write to the collector writer
 */
export class CheckoutClickCollector extends AbstractCollector {
	clickSelector: string;
	contentSelector: string;
	idResolver: StringResolver;
	priceResolver: NumberResolver;
	amountResolver: NumberResolver;
	listenerType: ListenerType;

	constructor(clickSelector, contentSelector, resolvers, listenerType = ListenerType.Sentinel) {
		super("checkout");
		this.clickSelector = clickSelector
		this.contentSelector = contentSelector;
		this.idResolver = resolvers.idResolver;
		this.priceResolver = resolvers.priceResolver;
		this.amountResolver = resolvers.amountResolver;
		this.listenerType = listenerType;
	}

	/**
	 * Add click event listeners to the identified elements, write the data
	 * when the event occurs
	 *
	 * @param {object} writer - The writer to send the data to
	 */
	attach(writer) {
		const doc = this.getDocument();

		// Activates on click of the element selected using the clickSelector
		const handler = element => {
			const items = doc.querySelectorAll<HTMLElement>(this.contentSelector);
			items.forEach(item => {
				const id = this.idResolver(item);

				if (id) {
					const data: any = {
						"id": id
					}

					if (this.priceResolver) {
						data.price = this.priceResolver(item);
					}
					if (this.amountResolver) {
						data.amount = this.amountResolver(item);
					}

					// We write each item separately - they may be coming from different queries
					// thus when we try to resolve the trail for each of them we need to have them
					// as separate records
					writer.write({
						"type": this.getType(),
						"data": data
					});
				}
			})
		}


		// The Sentiel library uses animationstart event listeners which may interfere with
		// animations attached on elemenets. The in-library provided workaround mechanism does not work
		// 100%, thus we provide the listenerType choice below. The tradeoffs
		// "dom" - no animation interference, only onclick attached, but does not handle elements inserted in the DOM later
		// "sentinel (default)" - works on elements inserted in the DOM anytime, but interferes with CSS animations on these elements
		if (this.listenerType === ListenerType.Dom) {
			const nodeList = doc.querySelectorAll(this.clickSelector);
			nodeList.forEach(el => el.addEventListener("click", handler));
		} else {
			const sentinel = new Sentinel(this.getDocument());
			sentinel.on(this.clickSelector, el => el.addEventListener("click", ev => handler(el)));
		}
	}
}