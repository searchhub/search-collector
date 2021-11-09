import {DefaultWriter} from "./writers/DefaultWriter";
import {SplitStreamWriter} from "./writers/SplitStreamWriter";
import {Writer} from "./writers/Writer";
import {AbstractCollector} from "./collectors/AbstractCollector";
import {LoggerTransport} from "./logger/LoggerTransport";
import {ConsoleTransport} from "./logger/transport/ConsoleTransport";
import {DefaultLogger} from "./logger/DefaultLogger";


/**
 * Default assembly point of collectors and writers.
 */
export class Collector {

	//TODO remove all any
	options: any;
	collectors: Array<AbstractCollector> = [];
	writers: Array<Writer> = [];
	transports: Array<LoggerTransport> = [new ConsoleTransport()];

	constructor(options) {
		this.options = options;
	}

	add(collector: AbstractCollector) {
		if (this.options.contextResolver && typeof collector.setContext === "function") {
			collector.setContext(this.options.contextResolver);
		}

		this.collectors.push(collector);
	}

	addLogTransport(transport: LoggerTransport) {
		this.transports.push(transport);
	}

	start() {
		const writer = this.writers.length == 0
			? new DefaultWriter(this.options)
			: new SplitStreamWriter(this.writers);

		const logger = new DefaultLogger(this.transports);

		this.collectors.forEach(collector => {
			try {
				collector.attach(writer, logger);
			} catch (e) {
				logger.error("Unexpected Exception during attach: ", e);
			}
		});
	}

	setWriters(replacementWriters: Array<Writer>) {
		for (let w of replacementWriters) {
			this.writers.push(w);
		}
	}
}