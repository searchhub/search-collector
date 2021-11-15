import {ClickCollector} from "./ClickCollector";
import {ListenerType} from "../utils/ListenerType";
import {NumberResolver, StringResolver} from "../resolvers/Resolver";
import {TrailResolver} from "../query/TrailResolver";

export type ProductClickCollectorResolver = {
	idResolver: StringResolver,
	positionResolver?: NumberResolver,
	trailResolver?: TrailResolver,
	priceResolver?: NumberResolver,
	imageResolver?: StringResolver
	metadataResolver?: StringResolver
}

/**
 * ClickCollector emitting "product" events, attach to product links
 */
export class ProductClickCollector extends ClickCollector {
	private readonly idResolver: StringResolver;
	private readonly positionResolver: NumberResolver;
	private readonly trailResolver: TrailResolver;
	private readonly priceResolver: NumberResolver;
	private readonly imageResolver: StringResolver;
	private readonly metadataResolver: StringResolver;

	constructor(selector, resolvers: ProductClickCollectorResolver, listenerType = ListenerType.Sentinel) {
		super(selector, "product", listenerType);
		this.idResolver = resolvers.idResolver;
		this.positionResolver = resolvers.positionResolver;
		this.trailResolver = resolvers.trailResolver;
		this.priceResolver = resolvers.priceResolver;
		this.imageResolver = resolvers.imageResolver;
		this.metadataResolver = resolvers.metadataResolver;
	}

	/**
	 * Collect the product click information from the element
	 * @override
	 */
	collect(element) {
		const id = this.idResolver(element);
		if (id) {
			const data: any = {
				id: this.idResolver(element)
			};

			if (this.positionResolver) {
				data.position = this.positionResolver(element);
			}

			if (this.priceResolver) {
				data.price = this.priceResolver(element);
			}

			if (this.imageResolver) {
				data.image = this.imageResolver(element);
			}

			if (this.metadataResolver) {
				data.metadata = this.metadataResolver(element);
			}

			if (this.trailResolver) {
				// Register that this product journey into potential purchase started
				// with this query
				this.trailResolver.register(data.id);
			}

			return data;
		}
	}
}