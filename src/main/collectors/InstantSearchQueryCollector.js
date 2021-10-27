const AbstractCollector = require("./AbstractCollector");
const Sentinel = require('../utils/Sentinel');

// Don't consider search phrases shorter than this
const MIN_LENGTH = 2;
const DELAY = 500;

/**
 * Collect search information from a field that has a "as-you-type" trigger and
 * renders search results immediately. May trigger multiple times depending on
 * type speed patterns - we expect that the interval between key strokes would be
 * less than 400ms
 */
class InstantSearchQueryCollector extends AbstractCollector {

  /**
   * Construct instant search collector
   *
   * @constructor
   * @param {string} selectorExpression - Document query selector identifying the elements to attach to
   */
  constructor(selectorExpression, listenerType) {
    super("instant-search");
    this.selectorExpression = selectorExpression;
    this.listenerType = listenerType;
  }

  /**
   * Add impression event listeners to the identified elements, write the data
   * when the event occurs
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    var type = this.getType();
    let handler = (searchBox, e, writer) => {

        // Ignore shift, ctrl, etc. presses, react only on characters
        if (e.which === 0) {
          return;
        }

        // Delay the reaction of the event, clean the timeout if the event fires
        // again and start counting from 0
        delay(function() {

          var keywords = searchBox.value;
          if (keywords && keywords.length >= MIN_LENGTH) {
            writer.write({
              "type" : type,
              "keywords" : keywords
            });
          }
        }, DELAY);
    }

    // The Sentiel library uses animationstart event listeners which may interfere with
    // animations attached on elemenets. The in-library provided workaround mechanism does not work
    // 100%, thus we provide the listenerType choice below. The tradeoffs
    // "dom" - no animation interference, only onclick attached, but does not handle elements inserted in the DOM later
    // "sentinel (default)" - works on elements inserted in the DOM anytime, but interferes with CSS animations on these elements 
    if (this.listenerType == "dom") {
      var nodeList = this.getDocument().querySelectorAll(this.selectorExpression);
      nodeList.forEach(el => el.addEventListener("keypress", ev => handler(el, ev, writer)));
    } else {
      var sentinel = new Sentinel(this.getDocument());
      sentinel.on(this.selectorExpression, el => el.addEventListener("keypress", ev => handler(el, ev, writer)));  
    }
  }
}

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
      timer = setTimeout(callback, ms);
  };
})();

module.exports = InstantSearchQueryCollector;
