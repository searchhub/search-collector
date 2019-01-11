var ClickCollector = require("./ClickCollector");

/**
 * ClickCollector emitting "product" events, attach to product links
 */
class BasketClickCollector extends ClickCollector {

  constructor(selector, resolvers) {
    super(selector, "basket");
    this.idResolver = resolvers.idResolver;
    this.priceResolver = resolvers.priceResolver;
  }

  /**
  * Collect the product click information from the element
  * @override
  */
  collect(element) {
    let data = {
      "id" : this.idResolver(element)
    }

    if (this.priceResolver) {
      data.price = this.priceResolver(element);
    }

    return data;
  }
}

module.exports = BasketClickCollector;
