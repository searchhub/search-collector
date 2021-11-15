import {ClickCollector} from "./ClickCollector";
import {NumberResolver, StringResolver} from "../resolvers/Resolver";
import {ListenerType} from "../utils/ListenerType";

/**
 * ClickCollector emitting "product" events, attach to product links
 */
export class BasketClickCollector extends ClickCollector {
	private readonly idResolver: StringResolver;
	private readonly priceResolver: NumberResolver;

	constructor(selector, resolvers, listenerType = ListenerType.Sentinel) {
		super(selector, "basket", listenerType);
		this.idResolver = resolvers.idResolver;
		this.priceResolver = resolvers.priceResolver;
	}

	/**
	 * Collect the product click information from the element
	 * @override
	 */
	collect(element, log) {
		const id = this.resolve(this.idResolver, log, element);
		if (id) {
			const data: any = {
				id
			};

			if (this.priceResolver) {
				data.price = this.resolve(this.priceResolver, log, element);
			}

			return data;
		}
	}
}
