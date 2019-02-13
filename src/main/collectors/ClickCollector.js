var Sentinel = require('../utils/Sentinel');
var AbstractCollector = require("./AbstractCollector");

/**
 * Collect clicks on elements matching a query selector. Handles both DOM elements
 * present in the DOM and elements inserted after the page load / collector construction.
 *
 * When a click occurs, a function provided at construction time get invoked to collect data points
 * from the element.
 */
class ClickCollector extends AbstractCollector {

  /**
   * Construct a click collector
   *
   * @constructor
   * @param {string} selectorExpression - Document query selector identifying the elements to attach to
   * @param {function} attributeCollector - A function to be triggered on click of the element, intended to collect specific element data
   * @param {string} type - The type of element click to report
   */
  constructor(selectorExpression, type) {
      super(type ? type : "click")
      this.selectorExpression = selectorExpression;
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

    var sentinel = new Sentinel(this.getContext() ? this.getContext().getDocument() : document);
    sentinel.on(this.selectorExpression, handler);
  }
}
module.exports = ClickCollector;
