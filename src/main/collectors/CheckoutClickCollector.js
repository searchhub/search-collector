var AbstractCollector = require("./AbstractCollector");
var Sentinel = require('../utils/Sentinel');

/**
 * Triggered by a clickSelector, the collector will fire the contentSelector to select elements to collect
 * information from and write to the collector writer
 */
class CheckoutClickCollector extends AbstractCollector {

  constructor(clickSelector, contentSelector, resolvers, listenerType) {
    super("checkout");
    this.clickSelector = clickSelector
    this.contentSelector = contentSelector;
    this.idResolver = resolvers.idResolver;
    this.priceResolver = resolvers.priceResolver;
    this.listenerType = listenerType;
  }

  /**
   * Add click event listeners to the identified elements, write the data
   * when the event occurs
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    var doc = this.getDocument();

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


    // The Sentiel library uses animationstart event listeners which may interfere with
    // animations attached on elemenets. The in-library provided workaround mechanism does not work
    // 100%, thus we provide the listenerType choice below. The tradeoffs
    // "dom" - no animation interference, only onclick attached, but does not handle elements inserted in the DOM later
    // "sentinel (default)" - works on elements inserted in the DOM anytime, but interferes with CSS animations on these elements 
    if (this.listenerType == "dom") {
      var nodeList = doc.querySelectorAll(this.clickSelector);
      nodeList.forEach(el => el.addEventListener("click", handler));
    } else {
      var sentinel = new Sentinel(this.getDocument());
      sentinel.on(this.clickSelector, el => el.addEventListener("click", ev => handler(el)));  
    }       
  }
}

module.exports = CheckoutClickCollector;
