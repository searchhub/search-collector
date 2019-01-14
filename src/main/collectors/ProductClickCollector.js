var ClickCollector = require("./ClickCollector");

/**
 * ClickCollector emitting "product" events, attach to product links
 */
class ProductClickCollector extends ClickCollector {

  constructor(selector, resolvers) {
    super(selector, "product");
    this.idResolver = resolvers.idResolver;
    this.positionResolver = resolvers.positionResolver;
    this.trailResolver = resolvers.trailResolver;
    this.priceResolver = resolvers.priceResolver;
    // TODO validate ^
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
        "id" : this.idResolver(element)
      }
  
      if (this.positionResolver) {
        data.position = this.positionResolver(element);
      }
  
      if (this.priceResolver) {
        data.price = this.priceResolver(element);
      }
  
      if (this.trailResolver) {
        // Register that this product journey into potential purchase started
        // with this query
        this.trailResolver.register(data.id);
      }
    }

    return data;
  }
}

module.exports = ProductClickCollector;
