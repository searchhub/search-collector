import {Context} from "../utils/Context";
import {Writer} from "../writers/Writer";
import {Logger} from "../logger/Logger";

export class AbstractCollector {
	protected type: string;
	protected context: Context;

	constructor(type: string, context?: Context) {
		this.type = type;
		this.context = context;
	}

	getType() {
		return this.type;
	}

	setContext(context: Context) {
		this.context = context;
	}

	getContext() {
		return this.context;
	}

	getWindow(): Window {
		return this.context.getWindow();
	}

	getDocument(): Document {
		return this.context.getDocument();
	}

	attach(writer: Writer, log: Logger) {
		// override in subclass
	}

	/**
	 * Used to log if a handler fails its execution
	 * Usage: document.addEventListener("click", this.logWrapHandler(yourhandler, logger))
	 * @param handler
	 * @param log
	 * @param handlerArgs
	 * @protected
	 */
	protected logWrapHandler(handler: Function, log: Logger, ...handlerArgs) {
		return (...args) => {
			try {
				return handler(...args, ...handlerArgs);
			} catch (e) {
				if (log)
					log.error(`[${this.constructor.name}] Unexpected error during resolver execution: `, e);
			}
		}
	}

	/**
	 * Used to execute resolver functions.
	 * Logs a debug message if the value is undefined or logs an error if an exception is thrown by the resolver
	 * @param resolver A resolver function
	 * @param log the logger
	 * @param resolverArgs arguments to be passed to the resolver function
	 * @protected
	 */
	protected resolve(resolver: (...any) => any, log: Logger, ...resolverArgs): any | undefined {
		try {
			if (resolver) {
				const val = resolver(...resolverArgs);
				if (val == void 0)
					log.debug("Resolver returned no value.", resolver);
				return val;
			}
		} catch (e) {
			if (log && log.error) {
				log.error(`[${this.constructor.name}] Unexpected error during resolver execution: `, e);
			}
		}
	}
}
