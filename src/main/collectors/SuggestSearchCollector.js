var AbstractCollector = require("./AbstractCollector");

/**
 * Collect suggest search information - keyword searches coming from a suggestion widget/functionality
 */
class SuggestSearchCollector extends AbstractCollector {

  /**
   * Construct suggest search collector
   *
   * @constructor
   * @param {function} resolver - Function that triggers the writing. Suggest might be complex, leave to the implementation to determine when/how
   */
  constructor(resolver) {
    super("suggest-search");
    this.reslver = resolver;
  }

  /**
   * Attach a writer, note that this collector is not asynchronous and will write
   * the data immediatelly
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    resolver(writer);
  }
}
module.exports = SuggestSearchCollector;
