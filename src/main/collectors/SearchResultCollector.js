var AbstractCollector = require("./AbstractCollector");

/**
 * Collect the basic search information - the keywords used for the search and
 * the number of results. Synchronous i.e. the writing happens directly when a writer is attached.
 * See the other search collectors for dynamic ones.
 */
class SearchResultCollector extends AbstractCollector {

  /**
   * Construct search result collector
   *
   * @constructor
   * @param {function} phraseResolver - Function that should return the search phrase used for the search
   * @param {function} countResolver - Function that should return the numnber of results in the search
   */
  constructor(phraseResolver, countResolver) {
    super("search");
    this.phraseResolver = phraseResolver;
    this.countResolver = countResolver;
  }

  /**
   * Attach a writer, note that this collector is not asynchronous and will write
   * the data immediatelly
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    writer.write({
      "type" : "search",
      "keywords" : this.phraseResolver(),
      "count" : this.countResolver()
    });
  }
}
module.exports = SearchResultCollector;
