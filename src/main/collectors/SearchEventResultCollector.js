var AbstractCollector = require("./AbstractCollector");

/**
 * Collect the basic search information - the keywords used for the search and
 * the number of result via a custom event. The custom event should hold the properties
 * "keywords" and "count" in the custom payload.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events for guidance
 */
class SearchEventResultCollector extends AbstractCollector {

  /**
   * Construct search event result collector
   *
   * @constructor
   * @param {string} eventName - the name of the event to react on
   */
  constructor(eventName) {
    super("search");
    this.eventName = eventName;
  }

  /**
   * Attach a writer, note that this collector is asynchronous and will write
   * the data when the event triggers
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    var win = this.getWindow();

    win.addEventListener(this.eventName, e => {
      writer.write({
        "type" : "search",
        "keywords" : e.detail.keywords,
        "count" : e.detail.count
      });
    })
  }
}
module.exports = SearchEventResultCollector;
