import {ClickCollector} from "./ClickCollector";
import {ListenerType} from "../utils/ListenerType";
import {NumberResolver, StringResolver} from "../resolvers/Resolver";
import {Trail} from "../query/Trail";

export type ProductClickCollectorResolver = {
	idResolver: StringResolver,
	positionResolver?: NumberResolver,
	trailResolver?: Trail,
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
	private readonly trailResolver: Trail;
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
	collect(element, log) {
		const id = this.resolve(this.idResolver, log, element);
		if (id) {
			const data: any = {
				id
			};

			if (this.positionResolver) {
				data.position = this.resolve(this.positionResolver, log, element);
			}

			if (this.priceResolver) {
				data.price = this.resolve(this.priceResolver, log, element);
			}

			if (this.imageResolver) {
				data.image = this.resolve(this.imageResolver, log, element);
			}

			if (this.metadataResolver) {
				data.metadata = this.resolve(this.metadataResolver, log, element);
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