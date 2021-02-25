const AbstractCollector = require("./AbstractCollector");

/**
 * Keep track of human triggered searches followed by a redirec to a page different than the search result page
 */
class RedirectCollector extends AbstractCollector {

  /**
   * Construct search result collector
   *
   * @constructor
   * @param {function} triggerResolver - Function that fires when a search happens, should return the keyword
   * @param {function} expectedPageResolver - Function that should return whether the page we load is the expected one
   */
  constructor(triggerResolver, expectedPageResolver, contextResolver) {
    super("search");
    this.triggerResolver = triggerResolver;
    this.expectedPageResolver = expectedPageResolver;
    this.contextResolver = contextResolver;
  }

  /**
   * Check whether we should be recording a redirect event
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    let win = this.contextResolver ? this.contextResolver.getWindow() : window;

    this.triggerResolver(keyword => {
      win.sessionStorage.setItem("lastSearch", keyword);
    });

    // Fetch the latest search if any
    let lastSearch = win.sessionStorage.getItem("lastSearch");
    if (lastSearch) {

      // Remove the search action, as we're either on a search result page or we've redirected
      win.sessionStorage.removeItem("lastSearch");

      // If we have not landed on the expected search page, it must have been (looove) a redirect
      if (!this.expectedPageResolver()) {
        // Thus record the redirect
        writer.write({
          "type" : "redirect",
          "keywords" : lastSearch
        });
      }
    }
  }
}
module.exports = RedirectCollector;