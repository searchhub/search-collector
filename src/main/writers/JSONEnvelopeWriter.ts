import {Writer, WriterOptions} from "./Writer";
import {Context} from "../utils/Context";
import {StringResolver} from "../resolvers/Resolver";

/**
 * Wrap the events in a JSON envelope, enrich each record with timestamp and if
 * available - session, query and channel information.
 *
 * If the options passed ot the writer contain debug=true, this writer will also
 * log to the console
 */
export class JSONEnvelopeWriter implements Writer {
	private readonly delegate: Writer;
	private readonly sessionResolver: StringResolver;
	private readonly channel: string;
	private readonly context: Context;

	constructor(delegate: Writer, options: WriterOptions) {
		this.delegate = delegate;
		this.sessionResolver = options.resolver.sessionResolver;
		this.channel = options.channel;
		this.context = options.context;
	}

	write(data) {
		// Data is already JSON object bassed by the various collectors. More common attributes
		// may be added in the future here
		data.timestamp = new Date().getTime();

		if (this.sessionResolver) {
			data.session = this.sessionResolver();
		}

		if (this.channel) {
			data.channel = this.channel;
		}

		this.delegate.write(data);
	}
}