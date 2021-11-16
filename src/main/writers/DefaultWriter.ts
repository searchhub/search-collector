import {SQSEventWriter} from "./SQSEventWriter";
import {RestEventWriter} from "./RestEventWriter";
import {BufferingWriter} from "./BufferingWriter";
import {Base64EncodeWriter} from "./Base64EncodeWriter";
import {JSONEnvelopeWriter} from "./JSONEnvelopeWriter";
import {Writer, WriterOptions} from "./Writer";
import {TrailWriter} from "./TrailWriter";
import {BrowserTrackingWriter} from "./BrowserTrackingWriter";
import {DebugWriter} from "./DebugWriter";
import {QueryWriter} from "./QueryWriter";

export class DefaultWriter implements Writer {

	private readonly writer: Writer;

	constructor(options: WriterOptions) {
		const {endpoint, sqs} = options;

		// Writer pipeline, add/remove pieces according to use case
		// This writer pipeline will send Base64 encoded array of json events
		let writer: Writer = isSQS(endpoint, sqs) ? new SQSEventWriter(endpoint) : new RestEventWriter(endpoint);
		writer = new BufferingWriter(writer, "buffer:" + options.endpoint);
		writer = new Base64EncodeWriter(writer);
		writer = new DebugWriter(writer, options.debug);
		writer = new QueryWriter(writer, options.resolver.queryResolver);
		writer = new TrailWriter(writer, options.resolver.trail, options.resolver.queryResolver);
		writer = new JSONEnvelopeWriter(writer, options);
		writer = new BrowserTrackingWriter(writer, {
			recordReferrer: options.recordReferrer,
			recordUrl: options.recordUrl,
			recordLanguage: options.recordLanguage
		});

		this.writer = writer;
	}

	write(data) {
		this.writer.write(data);
	}
}

function isSQS(endpoint: string, forceSQS: boolean) {
	return forceSQS || (endpoint.indexOf("sqs") != -1 && endpoint.indexOf("amazonaws.com") != -1);
}