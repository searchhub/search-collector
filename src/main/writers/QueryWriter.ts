import {Writer} from "./Writer";
import {QueryResolver} from "../resolvers/Resolver";

/**
 * Appends the query to the data if no query property exists
 */
export class QueryWriter implements Writer {

	constructor(private readonly delegate: Writer,
							private readonly queryResolver: QueryResolver) {}

	write(data: any) {
		if (!data.query)
			data.query = this.queryResolver().toString();

		this.delegate.write(data);
	}

}