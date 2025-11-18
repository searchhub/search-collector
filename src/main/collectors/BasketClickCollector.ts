import {ClickCollector} from "./ClickCollector";
import {NumberResolver, StringResolver} from "../resolvers/Resolver";
import {ListenerType} from "../utils/ListenerType";
import {Logger} from "../logger/Logger";

/**
 * Collect id and price if an item was added into the basket
 */
export class BasketClickCollector extends ClickCollector {
  private readonly idResolver: StringResolver;
  private readonly priceResolver: NumberResolver;

  constructor(selector: string,
              idResolver: StringResolver,
              priceResolver: NumberResolver,
              listenerType = ListenerType.Sentinel) {
    super(selector, "basket", listenerType);
    this.idResolver = idResolver;
    this.priceResolver = priceResolver;
  }

  /**
   * Collect the product click information from the element
   * @override
   */
  collect(element: HTMLElement, event: Event, log: Logger) {
    const id = this.resolve(this.idResolver, log, element, event);
    if (id) {
      return {
        id,
        price: this.resolve(this.priceResolver, log, element, event)
      };
    }
  }
}
