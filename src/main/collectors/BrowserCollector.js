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
    let win = this.getContext() ? this.getContext().getWindow() : window;
    let doc = this.getContext() ? this.getContext().getDocument() : document;
    
    writer.write({
      "type" : this.getType(),
      "location" : win.location.href,
      "referrer" : doc.referer,
      "language" : win.navigator.userLanguage || win.navigator.language,
      "width" : win.screen.width,
      "height" : win.screen.height,
    });
  }
}
module.exports = BrowserCollector;
