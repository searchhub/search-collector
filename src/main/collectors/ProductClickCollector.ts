import {ClickCollector} from "./ClickCollector";
import {ListenerType} from "../utils/ListenerType";
import {NumberResolver, StringResolver} from "../resolvers/Resolver";
import {Trail} from "../query/Trail";

export type ProductClickCollectorResolver = {
	idResolver: StringResolver,
	positionResolver?: NumberResolver,
	priceResolver?: NumberResolver,
	imageResolver?: StringResolver,
	metadataResolver?: StringResolver,
	trail?: Trail
}

/**
 * ClickCollector emitting "product" events, attach to product links
 */
export class ProductClickCollector extends ClickCollector {
	private readonly idResolver: StringResolver;
	private readonly positionResolver: NumberResolver;
	private readonly priceResolver: NumberResolver;
	private readonly imageResolver: StringResolver;
	private readonly metadataResolver: StringResolver;
	private readonly trail: Trail;

	constructor(selector, resolvers: ProductClickCollectorResolver, listenerType = ListenerType.Sentinel) {
		super(selector, "product", listenerType);
		this.idResolver = resolvers.idResolver;
		this.positionResolver = resolvers.positionResolver;
		this.trail = resolvers.trail;
		this.priceResolver = resolvers.priceResolver;
		this.imageResolver = resolvers.imageResolver;
		this.metadataResolver = resolvers.metadataResolver;
	}

	/**
	 * Collect the product click information from the element
	 * @override
	 */
	collect(element, log) {
		const id = this.resolve(this.idResolver, log, element);
		if (id) {
			if (this.trail) {
				// Register that this product journey into potential purchase started
				// with this query
				this.trail.register(id);
			}

			return {
				id,
				position: this.resolve(this.positionResolver, log, element),
				price: this.resolve(this.priceResolver, log, element),
				image: this.resolve(this.imageResolver, log, element),
				metadata: this.resolve(this.metadataResolver, log, element)
			};
		}
	}
}