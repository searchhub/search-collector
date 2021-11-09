import {Logger} from "./Logger";
import {LoggerTransport} from "./LoggerTransport";

export class DefaultLogger implements Logger {
	private transports: Array<LoggerTransport>;

	constructor(transports: Array<LoggerTransport>) {
		this.transports = transports;
	}

	debug(msg: string, ...dataArgs) {
		this.transports.forEach(transport => transport.debug ? transport.debug(msg, ...dataArgs) : void 0);
	}

	error(msg: string, ...dataArgs) {
		this.transports.forEach(transport => transport.error ? transport.error(msg, ...dataArgs) : void 0);
	}

	info(msg: string, ...dataArgs) {
		this.transports.forEach(transport => transport.info ? transport.info(msg, ...dataArgs) : void 0);
	}

	warn(msg: string, ...dataArgs) {
		this.transports.forEach(transport => transport.warn ? transport.warn(msg, ...dataArgs) : void 0);
	}

}