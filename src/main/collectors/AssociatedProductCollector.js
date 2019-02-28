const Sentinel = require('../utils/Sentinel');
const AbstractCollector = require("./AbstractCollector");
const Trail = require("../query/Trail");

/**
 * Collect clicks on elements matching a query selector. Handles both DOM elements
 * present in the DOM and elements inserted after the page load / collector construction.
 *
 * When a click occurs, a function provided at construction time get invoked to collect data points
 * from the element.
 */
class AssociatedProductCollector extends AbstractCollector {

  /**
   * Construct a click collector
   *
   * @constructor
   * @param {string} selectorExpression - Document query selector identifying the elements to attach to
   * @param {function} attributeCollector - A function to be triggered on click of the element, intended to collect specific element data
   * @param {string} type - The type of element click to report
   */
  constructor(selectorExpression, mainProductId, resolvers) {
      super("associated-product")
      this.mainProductId = mainProductId;
      this.selectorExpression = selectorExpression;
      this.idResolver = resolvers.idResolver;
      this.positionResolver = resolvers.positionResolver;
      this.priceResolver = resolvers.priceResolver;
      this.trailResolver = resolvers.trailResolver;
  }

  /**
   * Add click event listeners to the identified elements, write the data
   * when the event occurs
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {

    let collect = element => {
      let id = this.idResolver(element);

      let data = undefined;
      if (id) {
        data = {
          "id" : this.idResolver(element)
        }

        if (this.trailResolver) {
          // Find out the query source of the main product. Note that despite being a 
          // "main" product, it could be a 2nd or 3rd, 4th level of associated product browsing
          let trail = this.trailResolver.fetch(this.mainProductId);
          if (trail) {

            // Upon a follow-up event for this product (ex. basket), we would pick this trail
            this.trailResolver.register(id, Trail.Type.Associated, trail.query);
          }
        }
    
        if (this.positionResolver) {
          data.position = this.positionResolver(element);
        }
    
        if (this.priceResolver) {
          data.price = this.priceResolver(element);
        }
      }
  
      return data;
    }

    var handler = el => {
      el.addEventListener("click", ev => {
          var payload = collect(el);
          if (payload) {
            writer.write({
              "type" : this.getType(),
              "data" : payload
            });
          }
      });
    }

    var sentinel = new Sentinel(this.getDocument());
    sentinel.on(this.selectorExpression, handler);
  }
}
module.exports = AssociatedProductCollector;
