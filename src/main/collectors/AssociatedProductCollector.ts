import {Sentinel} from "../utils/Sentinel";
import {AbstractCollector} from "./AbstractCollector";
import {Trail} from "../query/Trail";
import {NumberResolver, StringResolver} from "../resolvers/Resolver";
import {TrailType} from "../query/TrailType";

/**
 * Collect clicks on elements matching a query selector. Handles both DOM elements
 * present in the DOM and elements inserted after the page load / collector construction.
 *
 * When a click occurs, a function provided at construction time get invoked to collect data points
 * from the element.
 */
export class AssociatedProductCollector extends AbstractCollector {
	private readonly mainProductId: string;
	private readonly selectorExpression: string;
	private readonly idResolver: StringResolver;
	private readonly positionResolver: NumberResolver;
	private readonly priceResolver: NumberResolver;
	private readonly trail?: Trail;

	/**
	 * Construct a click collector
	 *
	 * @constructor
	 * @param {string} selectorExpression - Document query selector identifying the elements to attach to
	 * @param mainProductId
	 * @param resolvers
	 */
	constructor(selectorExpression, mainProductId, resolvers) {
		super("associated-product")
		this.mainProductId = mainProductId;
		this.selectorExpression = selectorExpression;
		this.idResolver = resolvers.idResolver;
		this.positionResolver = resolvers.positionResolver;
		this.priceResolver = resolvers.priceResolver;
		this.trail = resolvers.trail;
	}

	/**
	 * Add click event listeners to the identified elements, write the data
	 * when the event occurs
	 *
	 * @param {object} writer - The writer to send the data to
	 * @param log
	 */
	attach(writer, log) {
		const collect = element => {
			const id = this.resolve(this.idResolver, log, element);

			if (id) {
				if (this.trail) {
					// Find out the query source of the main product. Note that despite being a
					// "main" product, it could be a 2nd or 3rd, 4th level of associated product browsing
					const previousTrail = this.trail.fetch(this.mainProductId);
					if (previousTrail) {
						// Upon a follow-up event for this product (ex. basket), we would pick this trail
						this.trail.register(id, TrailType.Associated, previousTrail.query);
					}
				}

				return {
					id,
					position: this.resolve(this.positionResolver, log, element),
					price: this.resolve(this.priceResolver, log, element)
				};
			}
		}

		const handler = el => {
			el.addEventListener("click", this.logWrapHandler(ev => {
				const payload = collect(el);
				if (payload) {
					writer.write({
						"type": this.getType(),
						...payload
					});
				}
			}, log));
		}

		new Sentinel(this.getDocument()).on(this.selectorExpression, handler);
	}
}
