/**
 * Wrap the events in a JSON envelope, enrich each record with timestamp and if
 * available - session, query and channel information.
 *
 * If the options passed ot the writer contain debug=true, this writer will also
 * log to the console
 */
import {Writer} from "./Writer";
import {Context} from "../utils/Context";
import {TrailResolver} from "../query/TrailResolver";

export class JSONEnvelopeWriter implements Writer {

	delegate: Writer;
	sessionResolver: any;
	queryResolver: any;
	trailResolver: TrailResolver;
	debug: boolean;
	channel: string;
	recordUrl: boolean;
	recordReferrer: boolean;
	contextResolver: Context;

	constructor(delegate, options) {
		this.delegate = delegate;
		this.sessionResolver = options.sessionResolver;
		this.queryResolver = options.queryResolver;
		this.trailResolver = options.trailResolver;
		this.debug = !!options.debug;
		this.channel = options.channel;
		this.recordUrl = !!options.recordUrl;
		this.recordReferrer = !!options.recordReferrer;
		this.contextResolver = options.contextResolver;
	}

	write(data) {
		// Data is already JSON object bassed by the various collectors. More common attributes
		// may be added in the future here
		data.timestamp = new Date().getTime();

		if (this.sessionResolver) {
			data.session = this.sessionResolver.get();
		}

		if (!data.query && this.queryResolver) {
			let q = this.queryResolver();
			if (!q) {
				// See if we have a payload id and a trail for it. This means we
				// are collecting data for an event that does not have a query context
				// on the page anymore but we want to assosiate the event with the query
				// context of the original search result
				if (data.data && data.data.id && this.trailResolver) {
					let trail = this.trailResolver.fetch(data.data.id);
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

		if (this.channel) {
			data.channel = this.channel;
		}


		if (this.recordUrl && !data.url) {
			let win = this.contextResolver ? this.contextResolver.getWindow() : window;
			data.url = win.location.href;
		}

		if (this.recordReferrer && !data.ref) {
			let doc = this.contextResolver ? this.contextResolver.getDocument() : document;
			data.ref = doc.referrer;
		}

		if (this.debug) {
			console.log(JSON.stringify(data));
		}

		this.delegate.write(data);
	}
}