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
  constructor(selectorExpression, type, resolvers) {
      this.selectorExpression = selectorExpression;
      this.type = type ? type : "product-list";
      this.idResolver = resolvers.idResolver;
      this.priceResolver = resolvers.priceResolver;
  }

  /**
   * Add event listeners to the identified elements, write data
   * immediately
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {

    var handler = el => {
      let payload = {
        "id" : this.idResolver(el)
      }
  
      if (this.priceResolver) {
        payload.price = this.priceResolver(el);
      }

      writer.write({
        "type" : this.type,
        "data" : payload
      });
  }

    // This section is commented because as of present, browsers will
    // trigger reflow when the sentinel library attaches its animation css
    // rules, effectively invoking itself even for elements that are already in
    // the DOM. This makes the explicit call to the querySelector redundant, in
    // fact it causes problems since it's firing events twice for the same element
    
    // Non-live list of nodes matching the expression.
    // var nodeList = document.querySelectorAll(this.selectorExpression);
    // nodeList.forEach(handler);

    // For elements inserted dynamically in the DOM
    sentinel.on(this.selectorExpression, handler);
  }
}
module.exports = ProductListCollector;
