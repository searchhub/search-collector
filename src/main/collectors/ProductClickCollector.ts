import {ClickCollector} from "./ClickCollector";
import {ListenerType} from "../utils/ListenerType";
import {AnyResolver, NumberResolver, StringResolver} from "../resolvers/Resolver";
import {Trail} from "../query/Trail";
import {TrailType} from "../query";
import {normalizePathname} from "../utils";

export type ProductClickCollectorResolver = {
  idResolver: StringResolver,
  positionResolver?: NumberResolver,
  priceResolver?: NumberResolver,
  imageResolver?: StringResolver,
  metadataResolver?: AnyResolver,
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
  private readonly metadataResolver: AnyResolver;
  private readonly trail: Trail;

  constructor(selector, resolvers: ProductClickCollectorResolver, listenerType = ListenerType.Sentinel) {
    super(selector, "product", listenerType);
    this.idResolver = resolvers.idResolver;
    this.positionResolver = resolvers.positionResolver;
    this.priceResolver = resolvers.priceResolver;
    this.imageResolver = resolvers.imageResolver;
    this.metadataResolver = resolvers.metadataResolver;
    this.trail = resolvers.trail;
  }

  /**
   * Collect the product click information from the element
   * @override
   */
  collect(element, event, log) {
    const id = this.resolve(this.idResolver, log, element, event);
    if (id) {
      const clickData: any = {
        id,
        position: this.resolve(this.positionResolver, log, element, event),
        price: this.resolve(this.priceResolver, log, element, event),
        image: this.resolve(this.imageResolver, log, element, event),
        metadata: this.resolve(this.metadataResolver, log, element, event)
      };

      if (this.trail) {
        // After a redirect a trail with the pathname is registered containing the query which triggered the redirect.
        // If we have such a query we use it to build the trail.
        const trailData = this.trail.fetch(normalizePathname(location.pathname));
        if (trailData) {
          clickData.query = trailData.query;
        }

        // Register that this product journey into potential purchase started
        // with this query
        this.trail.register(id, TrailType.Main, trailData?.query);
      }

      return clickData;
    }
  }
}
