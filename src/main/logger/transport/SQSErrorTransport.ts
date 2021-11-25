import {LoggerTransport} from "../LoggerTransport";

/**
 * Adds error messages to the sqs queue
 */
export class SQSErrorTransport implements LoggerTransport {

	constructor(private readonly queue: string,
							private readonly fifo = false) {}

	protected send(data) {
		const img = new Image();
		let src = this.queue + "?Version=2012-11-05&Action=SendMessage";

		// SQS supports FIFO queues in some regions that can also guarantee the order
		// of the messages.
		if (this.fifo) {
			// TODO when enough information is present to uniquely identify a message, switch the deduplication id to a message hash
			src += "&MessageGroupId=1&MessageDeduplicationId=" + Math.random();
		}
		src += "&MessageBody=" + JSON.stringify(data);

		img.src = src;
	}

	error(msg: string, ...dataArgs) {
		this.send({
			type: "error",
			msg,
			...dataArgs
		})
	};
}