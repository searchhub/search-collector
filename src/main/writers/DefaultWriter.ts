import {SQSEventWriter} from "./SQSEventWriter";
import {RestEventWriter} from "./RestEventWriter";
import {BufferingWriter} from "./BufferingWriter";
import {Base64EncodeWriter} from "./Base64EncodeWriter";
import {JSONEnvelopeWriter} from "./JSONEnvelopeWriter";
import {Writer} from "./Writer";
import {TrailWriter} from "./TrailWriter";
import {BrowserTrackingWriter} from "./BrowserTrackingWriter";
import {DebugWriter} from "./DebugWriter";
import {QueryWriter} from "./QueryWriter";
import {QueryResolver, StringResolver} from "../resolvers/Resolver";
import {Trail} from "../query/Trail";
import {Context} from "../utils/Context";

export type DefaultWriterOptions = {
	endpoint: string,
	channel: string,
	debug: boolean,
	resolver: DefaultWriterResolverOptions,
	trail?: Trail,
	sqs?: boolean,
	context?: Context
	recordReferrer?: boolean,
	recordUrl?: boolean,
	recordLanguage?: boolean
}

export type DefaultWriterResolverOptions = {
	sessionResolver: StringResolver,
	queryResolver: QueryResolver
}

export class DefaultWriter implements Writer {

	private readonly writer: Writer;
	private readonly options: DefaultWriterOptions;

	constructor(options: DefaultWriterOptions) {
		const {
			endpoint,
			sqs,
			debug,
			trail,
			resolver,
			channel,
			recordReferrer,
			recordUrl,
			recordLanguage
		} = options;

		this.options = options;

		// Writer pipeline, add/remove pieces according to use case
		// This writer pipeline will send Base64 encoded array of json events
		let writer: Writer = isSQS(endpoint, sqs) ? new SQSEventWriter(endpoint) : new RestEventWriter(endpoint);
		writer = new Base64EncodeWriter(writer);
		writer = new BufferingWriter(writer, "buffer:" + endpoint);
		writer = new DebugWriter(writer, debug);
		writer = new QueryWriter(writer, resolver.queryResolver);
		writer = new TrailWriter(writer, trail || new Trail(resolver.queryResolver, resolver.sessionResolver), resolver.queryResolver);
		writer = new JSONEnvelopeWriter(writer, resolver.sessionResolver, channel);
		writer = new BrowserTrackingWriter(writer, {
			recordReferrer,
			recordUrl,
			recordLanguage
		});

		this.writer = writer;
	}

	write(data) {
		this.writer.write(data);
	}

	getOptions(): DefaultWriterOptions {
		return {...this.options};
	}

	clone(): DefaultWriter {
		return new DefaultWriter(this.getOptions());
	}

}

function isSQS(endpoint: string, forceSQS: boolean) {
	return forceSQS || (endpoint.indexOf("sqs") != -1 && endpoint.indexOf("amazonaws.com") != -1);
}
