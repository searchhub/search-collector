import {AbstractCollector} from "./AbstractCollector";
import {Sentinel} from "../utils/Sentinel";

/**
 * Registers appearance of elements matching a query selector. Handles both DOM elements
 * present in the DOM and elements inserted after the page load / collector construction.
 *
 * When an element is found in the DOM, a function provided at construction time get invoked to collect data points
 * from the element.
 */
export class ProductListCollector extends AbstractCollector {

	selectorExpression;
	idResolver;
	priceResolver;

	/**
	 * Construct a click collector
	 *
	 * @constructor
	 * @param {string} selectorExpression - Document query selector identifying the elements to attach to
	 * @param {function} attributeCollector - A function to be triggered, intended to collect specific element data
	 * @param {string} type - The type of element/context to report
	 */
	constructor(selectorExpression, type, resolvers) {
		super(type ? type : "product-list");
		this.selectorExpression = selectorExpression;
		this.idResolver = resolvers.idResolver;
		this.priceResolver = resolvers.priceResolver;
	}

	/**
	 * Add event listeners to the identified elements, write data
	 * immediately
	 *
	 * @param {object} writer - The writer to send the data to
	 */
	attach(writer) {

		var handler = el => {
			let id = this.idResolver(el);

			if (id) {
				let payload: any = {
					"id": id
				}

				if (this.priceResolver) {
					payload.price = this.priceResolver(el);
				}

				writer.write({
					"type": this.getType(),
					"data": payload
				});
			}
		}

		var sentinel = new Sentinel(this.getDocument());
		sentinel.on(this.selectorExpression, handler);
	}
}