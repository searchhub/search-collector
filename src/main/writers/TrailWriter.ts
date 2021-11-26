import {Writer} from "./Writer";
import {Trail} from "../query/Trail";
import {QueryResolver} from "../resolvers/Resolver";

export class TrailWriter implements Writer {

	constructor(private readonly delegate: Writer,
							private readonly trail: Trail,
							private readonly queryResolver: QueryResolver) {}

	write(data: any) {
		const q = this.queryResolver();
		if ((!q || !q.isValid()) && !data.query && TrailWriter.isAppendTrail(data)) {
			// See if we have a payload id and a trail for it. This means we
			// are collecting data for an event that does not have a query context
			// on the page anymore but we want to associate the event with the query
			// context of the original search result
			this.appendTrail(data);
		}

		this.delegate.write(data);
	}

	/**
	 * Append the Trail if any
	 * @param data
	 * @private
	 */
	private appendTrail(data: any) {
		const trail = this.trail.fetch(data.data.id);
		if (trail && trail.query) {
			data.query = trail.query;
			data.queryTime = trail.timestamp;
			data.trailType = trail.type;
		}
	}

	/**
	 * Evaluates if the Trail should be appended to this event
	 * @param data
	 * @private
	 */
	private static isAppendTrail(data: any) {
		return data && ["checkout", "basket", "filter"].indexOf(data.type) > -1
		// TA: This was previously "data.data && data.data.id && this.trail"
		// the only Collectors appending a property called "data" to its event are ClickCollector i.e.
		// CheckoutClickCollector, BasketClickCollector, FilterClickCollector
		// I've refactored this implicit condition to this function
		// TODO validate if things will break with new impl
	}

}