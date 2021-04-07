var ClickCollector = require("./ClickCollector");

/**
 * ClickCollector emitting "product" events, attach to product links
 */
class BasketClickCollector extends ClickCollector {

  constructor(selector, resolvers, listenerType) {
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
        "id" : id
      }
  
      if (this.priceResolver) {
        data.price = this.priceResolver(element);
      }
    }

    return data;
  }
}

module.exports = BasketClickCollector;
