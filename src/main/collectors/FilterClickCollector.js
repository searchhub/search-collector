var ClickCollector = require("./ClickCollector");

/**
 * ClickCollector emitting "filter" events, attach to facet links
 */
class FilterClickCollector extends ClickCollector {

  constructor(selector, collector) {
    super(selector, collector, "filter");
  }
}

module.exports = FilterClickCollector;
