/**
 * Write to AWS SQS via HTTP GET
 */
import {Writer} from "./Writer";

export class SQSEventWriter implements Writer {

	constructor(private readonly queue,
							private readonly fifo = false) {}

	write(data) {
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
}