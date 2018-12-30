var ClickCollector = require("./ClickCollector");

/**
 * ClickCollector emitting "filter" events, attach to facet links
 */
class FilterClickCollector extends ClickCollector {

  constructor(selector, collector) {
    super(selector, "filter");
    this.collector = collector;
  }

  /**
  * Collect the product click information from the element
  * @override
  */
  collect(element) {
    return this.collector(element);
  }
}

module.exports = FilterClickCollector;
