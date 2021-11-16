import {Writer} from "./Writer";
import {Trail} from "../query/Trail";
import {QueryResolver} from "../resolvers/Resolver";

export class TrailWriter implements Writer {

	constructor(private readonly delegate: Writer,
							private readonly trail: Trail,
							private readonly queryResolver: QueryResolver) {
	}

	write(data: any) {
		if (!data.query && this.queryResolver) {
			const q = this.queryResolver().toString();
			if (!q) {
				// See if we have a payload id and a trail for it. This means we
				// are collecting data for an event that does not have a query context
				// on the page anymore but we want to associate the event with the query
				// context of the original search result
				//TODO TA: does it have to be data.data?
				if (data.data && data.data.id && this.trail) {
					const trail = this.trail.fetch(data.data.id);
					if (trail && trail.query) {
						data.query = trail.query;
						data.queryTime = trail.timestamp;
						data.trailType = trail.type;
					}
				}
			} else {
				data.query = q;
			}
		}

		this.delegate.write(data);
	}

}