import {LoggerTransport} from "../LoggerTransport";
import {base64Encode} from "../../utils";
import {StringResolver} from "../../resolvers";

/**
 * Only adds error messages to an sqs queue
 */
export class SQSErrorTransport implements LoggerTransport {

	constructor(private readonly queue: string,
							private readonly channel: string,
							private readonly sessionResolver: StringResolver,
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

		if (!Array.isArray(data) && typeof data !== "string") {
			data = [data];
		}

		if (typeof data !== "string") {
			data = JSON.stringify(data);
		}

		src += "&MessageBody=" + base64Encode(encodeURIComponent(data));

		img.src = src;
	}

	error(msg: string, ...dataArgs) {
		this.send({
			type: "error",
			msg,
			channel: this.channel,
			session: this.sessionResolver(),
			timestamp: new Date().getTime(),
			arguments: dataArgs,
			url: window.location.href,
			referrer: document.referrer,
			lang: navigator.language
		})
	};

	info(msg: string, ...dataArgs) {
		// nop
	}

	debug(msg: string, ...dataArgs) {
		// nop
	}

	warn(msg: string, ...dataArgs) {
		// nop
	}
}
