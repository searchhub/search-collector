import {Writer} from "./Writer";
import {StringResolver} from "../resolvers/Resolver";

/**
 * Wrap the events in a JSON envelope, enrich each record with timestamp, session and channel information.
 */
export class JSONEnvelopeWriter implements Writer {

	constructor(private readonly delegate: Writer,
							private readonly sessionResolver: StringResolver,
							private readonly channel: string) {}

	write(data: any) {
		data.timestamp = new Date().getTime();
		data.session = this.sessionResolver();
		data.channel = this.channel;

		this.delegate.write(data);
	}
}