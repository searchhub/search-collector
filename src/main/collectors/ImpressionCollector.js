var scrollMonitor = require("scrollmonitor");
var sentinel = require('sentinel-js');

/**
 * Collect impressions - a disply of a product in the browser viewport. If the product is shown multiple
 * times, the collector will record multiple events i.e. we don't apply filter logic here.
 *
 * Handles both DOM elements present in the DOM and elements inserted after the page load / collector construction.
 */
class ImpressionCollector {

  /**
   * Construct impression collector
   *
   * @constructor
   * @param {string} selectorExpression - Document query selector identifying the elements to attach to
   * @param {function} attributeCollector - A function to be triggered on click of the element, intended to collect specific element data
   */
  constructor(selectorExpression, attributeCollector) {
    this.selectorExpression = selectorExpression;
    this.attributeCollector = attributeCollector;
  }

  /**
   * Add impression event listeners to the identified elements, write the data
   * when the event occurs
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    var handler = el => {
      var data = this.attributeCollector(el);
      var watcher = scrollMonitor.create(el);

      watcher.enterViewport(function() {
        // Figure out if we need to check the visibility of an element i.e.
        // guard against elements that enter the viewport but have display=hidden
        // if (el.offsetParent === null) {
        //  return;
        // }

        writer.write({
          "type" : "impression",
          "data" : data
        });
      })
    };


    // This section is commented because as of present, browsers will
    // trigger reflow when the sentinel library attaches its animation css
    // rules, effectively invoking itself even for elements that are already in
    // the DOM. This makes the explicit call to the querySelector redundant, in
    // fact it causes problems since it's firing events twice for the same element
    
    // For all elements currently present in the DOM
    // var elements = document.querySelectorAll(this.selectorExpression);
    // elements.forEach(handler);

    // For elements inserted dynamically in the DOM
    sentinel.on(this.selectorExpression, handler);
  }
}
module.exports = ImpressionCollector;
