import {Logger} from "./Logger";
import {LoggerTransport} from "./LoggerTransport";

/**
 * Passes all log messages to the provided transports
 */
export class TransportLogger implements Logger {

	constructor(private readonly transports: Array<LoggerTransport>,
							private readonly isDebugEnabled = false) {}

	debug(msg: string, ...dataArgs) {
		this.transports.forEach(transport => this.callTransport(transport, "debug", msg, ...dataArgs));
	}

	error(msg: string, ...dataArgs) {
		this.transports.forEach(transport => this.callTransport(transport, "error", msg, ...dataArgs));
	}

	info(msg: string, ...dataArgs) {
		this.transports.forEach(transport => this.callTransport(transport, "info", msg, ...dataArgs));
	}

	warn(msg: string, ...dataArgs) {
		this.transports.forEach(transport => this.callTransport(transport, "warn", msg, ...dataArgs));
	}

	private callTransport(transport: LoggerTransport, level: string, msg: string, ...dataArgs) {
		try {
			if (transport[level] && typeof transport[level] === "function")
				transport[level](msg, ...dataArgs);
		} catch (e) {
			if (this.isDebugEnabled)
				console.error("Could not call transport: ", e);
		}
	}

}