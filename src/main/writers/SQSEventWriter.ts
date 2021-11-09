/**
 * Write to AWS SQS via HTTP GET
 */
import {Writer} from "./Writer";

export class SQSEventWriter implements Writer {

	queue: any;
	fifo: any;

	constructor(queue, fifo = false) {
		this.queue = queue;
		this.fifo = fifo;
	}

	write(data) {
		const img = new Image();
		let src = this.queue + "?Version=2012-11-05&Action=SendMessage";

		// SQS supports FIFO queues in some regions that can also guarantee the order
		// of the messages.
		if (this.fifo) {
			// TODO when enough information is present to uniquely identify a message, siwth the
			// deduplication id to a message hash
			src += "&MessageGroupId=1&MessageDeduplicationId=" + Math.random();
		}
		src += "&MessageBody=" + data;

		img.src = src;
	}
}