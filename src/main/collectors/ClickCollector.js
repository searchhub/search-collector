var sentinel = require('sentinel-js');

/**
 * Collect clicks on elements matching a query selector. Handles both DOM elements
 * present in the DOM and elements inserted after the page load / collector construction.
 *
 * When a click occurs, a function provided at construction time get invoked to collect data points
 * from the element.
 */
class ClickCollector {

  /**
   * Construct a click collector
   *
   * @constructor
   * @param {string} selectorExpression - Document query selector identifying the elements to attach to
   * @param {function} attributeCollector - A function to be triggered on click of the element, intended to collect specific element data
   * @param {string} type - The type of element click to report
   */
  constructor(selectorExpression, type) {
      this.selectorExpression = selectorExpression;
      this.type = type ? type : "click";
  }

  /**
  * Abstract collection method, must be overriden in the subclasses
  * @abstract
  */
  collect(element) {
    return undefined;
  }

  /**
   * Add click event listeners to the identified elements, write the data
   * when the event occurs
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {

    var handler = el => {
      el.addEventListener("click", ev => {
          var payload = this.collect(el);
          if (payload) {
            writer.write({
              "type" : this.type,
              "data" : payload
            });
          }
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
module.exports = ClickCollector;
