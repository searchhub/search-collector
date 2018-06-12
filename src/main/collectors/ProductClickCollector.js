var ClickCollector = require("./ClickCollector");

/**
 * ClickCollector emitting "product" events, attach to product links
 */
class ProductClickCollector extends ClickCollector {

  constructor(selector, collector) {
    super(selector, collector, "product");
  }
}

module.exports = ProductClickCollector;
