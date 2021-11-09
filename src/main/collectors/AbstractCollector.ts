import {Context} from "../utils/Context";
import {Writer} from "../writers/Writer";
import {Logger} from "../logger/Logger";

export class AbstractCollector {
	type: string;
	context: Context;

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
}