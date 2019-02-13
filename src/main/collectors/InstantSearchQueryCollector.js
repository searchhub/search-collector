var AbstractCollector = require("./AbstractCollector");

// Don't consider search phrases shorter than this
const MIN_LENGTH = 2;

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
   * @param {string} searchFieldSelector - Document query selector identifying the elements to attach to
   */
  constructor(searchFieldSelector) {
    super("search");
    this.searchFieldSelector = searchFieldSelector;
  }

  /**
   * Add impression event listeners to the identified elements, write the data
   * when the event occurs
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    var doc = this.getContext() ? this.getContext().getDocument() : document;
    var searchBox = doc.querySelector(this.searchFieldSelector);

    if (searchBox) {
      searchBox.addEventListener("keyup", e => {

        // Delay the reaction of the event, clean the timeout if the event fires
        // again and start counting from 0
        delay(function() {

          var keywords = searchBox.value;
          if (keywords && keywords.length > MIN_LENGTH) {
            writer.write({
              "type" : "search",
              "data" : keywords
            });
          }
        }, 400);
      });
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
