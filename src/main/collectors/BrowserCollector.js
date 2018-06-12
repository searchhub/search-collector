/**
 * Collect basic browser information. Note that depending on how you use this you may
 * need to consult the GDPR guidelines
 */
class BrowserCollector {

  constructor() {}

  /**
   * Attach a writer, note that this collector is not asynchronous and will write
   * the data immediatelly
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    writer.write({
      "type" : "browser",
      "location" : window.location.href,
      "referrer" : document.referer,
      "language" : window.navigator.userLanguage || window.navigator.language,
      "width" : window.screen.width,
      "height" : window.screen.height,
    });
  }
}
module.exports = BrowserCollector;
