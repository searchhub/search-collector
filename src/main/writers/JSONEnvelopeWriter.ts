/**
 * Wrap the events in a JSON envelope, enrich each record with timestamp and if
 * available - session, query and channel information.
 *
 * If the options passed ot the writer contain debug=true, this writer will also
 * log to the console
 */
import {Writer, WriterOptions} from "./Writer";
import {Context} from "../utils/Context";
import {StringResolver} from "../resolvers/Resolver";

export class JSONEnvelopeWriter implements Writer {
	delegate: Writer;
	sessionResolver: StringResolver;
	debug: boolean;
	channel: string;
	recordUrl: boolean;
	recordReferrer: boolean;
	context: Context;

	constructor(delegate: Writer, options: WriterOptions) {
		this.delegate = delegate;
		this.sessionResolver = options.resolver.sessionResolver;
		this.debug = !!options.debug;
		this.channel = options.channel;
		this.recordUrl = !!options.recordUrl;
		this.recordReferrer = !!options.recordReferrer;
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

		if (this.recordUrl && !data.url) {
			let win = this.context ? this.context.getWindow() : window;
			data.url = win.location.href;
		}

		if (this.recordReferrer && !data.ref) {
			let doc = this.context ? this.context.getDocument() : document;
			data.ref = doc.referrer;
		}

		if (this.debug) {
			console.debug(JSON.stringify(data));
		}

		this.delegate.write(data);
	}
}