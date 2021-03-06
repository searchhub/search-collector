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
   * @param {function} actionResolver - A search result may be refined or a client may browse 2,3,4 page. 
   * This function should provide a text represantion of the action
   */
  constructor(phraseResolver, countResolver, actionResolver) {
    super("search");
    this.phraseResolver = phraseResolver;
    this.countResolver = countResolver;
    this.actionResolver = actionResolver;
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
      "count" : this.countResolver(),
      "action" : this.actionResolver ? this.actionResolver() : "search"
    });
  }
}
module.exports = SearchResultCollector;