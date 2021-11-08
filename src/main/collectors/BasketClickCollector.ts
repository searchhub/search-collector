import {ClickCollector} from "./ClickCollector";
import {NumberResolver, StringResolver} from "../resolvers/Resolver";
import {ListenerType} from "../utils/ListenerType";

/**
 * ClickCollector emitting "product" events, attach to product links
 */
export class BasketClickCollector extends ClickCollector {
	idResolver: StringResolver;
	priceResolver: NumberResolver;

	constructor(selector, resolvers, listenerType = ListenerType.Sentinel) {
		super(selector, "basket", listenerType);
		this.idResolver = resolvers.idResolver;
		this.priceResolver = resolvers.priceResolver;
	}

	/**
	 * Collect the product click information from the element
	 * @override
	 */
	collect(element) {
		let id = this.idResolver(element);

		let data = undefined;
		if (id) {
			data = {
				"id": id
			}

			if (this.priceResolver) {
				data.price = this.priceResolver(element);
			}
		}

		return data;
	}
}
