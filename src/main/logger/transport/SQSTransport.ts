import {SQSErrorTransport} from "./SQSErrorTransport";

/**
 * Adds all log levels to an SQS queue
 */
export class SQSTransport extends SQSErrorTransport {

	debug(msg: string, ...dataArgs) {
		this.send({
			type: "debug",
			msg,
			arguments: dataArgs
		})
	};

	info(msg: string, ...dataArgs) {
		this.send({
			type: "info",
			msg,
			arguments: dataArgs
		})
	};

	warn(msg: string, ...dataArgs) {
		this.send({
			type: "warning",
			msg,
			arguments: dataArgs
		})
	};
}

