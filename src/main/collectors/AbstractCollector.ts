import {Context} from "../utils/Context";
import {Writer} from "../writers/Writer";
import {Logger} from "../logger/Logger";

export class AbstractCollector {
	protected type: string;
	protected context: Context;

	constructor(type: string, context: Context = new Context(window, document)) {
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
	 * Used to execute resolver functions.
	 * Logs a debug message if the value is undefined or if an error is thrown by the resolver
	 * @param resolver A resolver function
	 * @param log the logger
	 * @param resolverArgs arguments to be passed to the resolver function
	 * @protected
	 */
	protected resolve(resolver: (...any) => any, log: Logger, ...resolverArgs) {
		try {
			const val = resolver(...resolverArgs);
			if (val == void 0)
				log.debug("Resolver returned no value.", resolver);
			return val;
		} catch (e) {
			log.error("Unexpected error during resolver execution: ", e);
		}
	}
}