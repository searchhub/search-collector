import {LoggerTransport} from "../LoggerTransport";

export class ConsoleTransport implements LoggerTransport {
	debug(msg: string, ...dataArgs) {
		console.debug(msg, ...dataArgs);
	};

	info(msg: string, ...dataArgs) {
		console.info(msg, ...dataArgs);
	};

	warn(msg: string, ...dataArgs) {
		console.warn(msg, ...dataArgs);
	};

	error(msg: string, ...dataArgs) {
		console.error(msg, ...dataArgs);
	};
}