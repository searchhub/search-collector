import {SQSEventWriter} from "./SQSEventWriter";
import {RestEventWriter} from "./RestEventWriter";
import {BufferingWriter} from "./BufferingWriter";
import {Base64EncodeWriter} from "./Base64EncodeWriter";
import {JSONEnvelopeWriter} from "./JSONEnvelopeWriter";
import {Writer, WriterOptions} from "./Writer";

export class DefaultWriter implements Writer {

	writer: Writer;

	constructor(options: WriterOptions) {
		const {endpoint, sqs} = options;

		// Writer pipeline, add/remove pieces according to use case
		// This writer pipeline will send Base64 encoded array of json events
		let writer: Writer = isSQS(endpoint, sqs) ? new SQSEventWriter(endpoint) : new RestEventWriter(endpoint);
		writer = new Base64EncodeWriter(writer);
		writer = new BufferingWriter(writer, options.endpoint);
		writer = new JSONEnvelopeWriter(writer, options);

		this.writer = writer;
	}

	write(data) {
		this.writer.write(data);
	}
}

function isSQS(endpoint: string, forceSQS: boolean) {
	return forceSQS || (endpoint.indexOf("sqs") != -1 && endpoint.indexOf("amazonaws.com") != -1);
}