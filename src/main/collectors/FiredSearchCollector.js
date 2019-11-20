var AbstractCollector = require("./AbstractCollector");

/**
 * Triggered when the client has triggered/fired a search
 * 
 */
class FiredSearchCollector extends AbstractCollector {

  /**
   * Construct fired search collector
   *
   * @constructor
   * @param {function} resolver - Function that triggers the writing. We can't always determine when search triggers, leave to the implementation to determine when/how
   */
  constructor(resolver) {
    super("fired-search");
    this.resolver = resolver;
  }

  /**
   * Attach a writer, note that this collector is not asynchronous and will write
   * the data immediatelly
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    this.resolver(writer, this.getType(), this.getContext());
  }
}

module.exports = FiredSearchCollector;
