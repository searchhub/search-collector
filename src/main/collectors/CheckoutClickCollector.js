var AbstractCollector = require("./AbstractCollector");

/**
 * Triggered by a clickSelector, the collector will fire the contentSelector to select elements to collect
 * information from and write to the collector writer
 */
class CheckoutClickCollector extends AbstractCollector {

  constructor(clickSelector, contentSelector, resolvers) {
    super("checkout");
    this.clickSelector = clickSelector
    this.contentSelector = contentSelector;
    this.idResolver = resolvers.idResolver;
    this.priceResolver = resolvers.priceResolver;
  }

  /**
   * Add click event listeners to the identified elements, write the data
   * when the event occurs
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    var doc = this.getContext() ? this.getContext().getDocument() : document;

    // Activates on click of the element selected using the clickSelector
    var handler = element => {
      var items = doc.querySelectorAll(this.contentSelector);
      items.forEach(item => {
        let id = this.idResolver(item);
  
        if (id) {
          let data = {
            "id" : id
          }
      
          if (this.priceResolver) {
            data.price = this.priceResolver(item);
          }

          // We write each item separately - they may be coming from different queries
          // thus when we try to resolve the trail for each of them we need to have them
          // as separate records
          writer.write({
            "type" : this.getType(),
            "data" : data
          });
        }
      })
    }

    var nodeList = doc.querySelectorAll(this.clickSelector);
    nodeList.forEach(el => el.addEventListener("click", handler));
  }
}

module.exports = CheckoutClickCollector;
