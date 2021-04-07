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
  constructor(selectorExpression, type, listenerType) {
      super(type ? type : "click")
      this.selectorExpression = selectorExpression;
      this.listenerType = listenerType;
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
    // The Sentiel library uses animationstart event listeners which may interfere with
    // animations attached on elemenets. The in-library provided workaround mechanism does not work
    // 100%, thus we provide the listenerType choice below. The tradeoffs
    // "dom" - no animation interference, only onclick attached, but does not handle elements inserted in the DOM later
    // "sentinel (default)" - works on elements inserted in the DOM anytime, but interferes with CSS animations on these elements 
    if (this.listenerType == "dom") {
      var nodeList = document.querySelectorAll(this.selectorExpression);
      nodeList.forEach(el => el.addEventListener("click", ev => this.doCollect(el, writer)));
    } else {
      var sentinel = new Sentinel(this.getDocument());
      sentinel.on(this.selectorExpression, el => el.addEventListener("click", ev => this.doCollect(el, writer)));  
    }   
  }

  doCollect(element, writer) {
    var payload = this.collect(element);
    if (payload) {
      writer.write({
        "type" : this.type,
        "data" : payload
      });
    }
  }
}
module.exports = ClickCollector;
