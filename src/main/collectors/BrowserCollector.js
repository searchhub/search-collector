var AbstractCollector = require("./AbstractCollector");

/**
 * Collect basic browser information. Note that depending on how you use this you may
 * need to consult the GDPR guidelines
 */
class BrowserCollector extends AbstractCollector {

  constructor() {
    super("browser");
  }

  /**
   * Attach a writer, note that this collector is not asynchronous and will write
   * the data immediatelly
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    let w = this.getContext() ? this.getContext().getWindow() : window;
    let d = this.getContext() ? this.getContext().getDocument() : document;
    
    writer.write({
      "type" : this.getType(),
      "location" : w.location.href,
      "referrer" : d.referer,
      "language" : w.navigator.userLanguage || w.navigator.language,
      "width" : w.screen.width,
      "height" : w.screen.height,
    });
  }
}
module.exports = BrowserCollector;
