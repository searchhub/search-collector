var sentinel = require('sentinel-js');

/**
 * Registers appearance of elements matching a query selector. Handles both DOM elements
 * present in the DOM and elements inserted after the page load / collector construction.
 *
 * When an element is found in the DOM, a function provided at construction time get invoked to collect data points
 * from the element.
 */
class ProductListCollector {

  /**
   * Construct a click collector
   *
   * @constructor
   * @param {string} selectorExpression - Document query selector identifying the elements to attach to
   * @param {function} attributeCollector - A function to be triggered, intended to collect specific element data
   * @param {string} type - The type of element/context to report
   */
  constructor(selectorExpression, attributeCollector, type) {
      this.selectorExpression = selectorExpression;
      this.attributeCollector = attributeCollector;
      this.type = type ? type : "product-list";
  }

  /**
   * Add event listeners to the identified elements, write data
   * immediately
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {

    var handler = el => {
        var payload = this.attributeCollector(el);
        if (payload) {
          writer.write({
            "type" : this.type,
            "data" : payload
          });
        }
    }

    // Non-live list of nodes matching the expression.
    var nodeList = document.querySelectorAll(this.selectorExpression);
    nodeList.forEach(handler);

    // For elements inserted dynamically in the DOM
    sentinel.on(this.selectorExpression, handler);
  }
}
module.exports = ProductListCollector;
