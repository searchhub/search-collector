import {SQSErrorTransport} from "./SQSErrorTransport";

export class SQSTransport extends SQSErrorTransport {

	debug(msg: string, ...dataArgs) {
		this.send({
			type: "debug",
			msg,
			...dataArgs
		})
	};

	info(msg: string, ...dataArgs) {
		this.send({
			type: "info",
			msg,
			...dataArgs
		})
	};

	warn(msg: string, ...dataArgs) {
		this.send({
			type: "warning",
			msg,
			...dataArgs
		})
	};
}

