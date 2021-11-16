import {DefaultWriter} from "./writers/DefaultWriter";
import {SplitStreamWriter} from "./writers/SplitStreamWriter";
import {Writer, WriterOptions} from "./writers/Writer";
import {AbstractCollector} from "./collectors/AbstractCollector";
import {LoggerTransport} from "./logger/LoggerTransport";
import {ConsoleTransport} from "./logger/transport/ConsoleTransport";
import {DefaultLogger} from "./logger/DefaultLogger";
import {Context} from "./utils/Context";

type CollectorOptions = {
	endpoint: string,
	channel: string,
	debug?: boolean,
	context?: Context,
	writerOptions: WriterOptions
}

/**
 * Default assembly point of collectors and writers.
 */
export class Collector {
	private options: CollectorOptions;
	private collectors: Array<AbstractCollector> = [];
	private writers: Array<Writer> = [];
	private transports: Array<LoggerTransport> = [new ConsoleTransport()];

	constructor(options: CollectorOptions) {
		this.options = options;
	}

	add(collector: AbstractCollector) {
		if (this.options.context && typeof collector.setContext === "function") {
			collector.setContext(this.options.context);
		}
		this.collectors.push(collector);
	}

	start() {
		const writer = this.getWriter();
		const logger = new DefaultLogger(this.transports);

		this.collectors.forEach(collector => {
			try {
				collector.attach(writer, logger);
			} catch (e) {
				logger.error("Unexpected Exception during collector attach: ", e);
			}
		});
	}

	addLogTransport(transport: LoggerTransport) {
		this.transports.push(transport);
	}

	setTransports(transports: Array<LoggerTransport>) {
		this.transports = transports || [];
	}

	setWriters(replacementWriters: Array<Writer>) {
		this.writers = [...replacementWriters];
	}

	private getWriter() {
		return this.writers.length == 0
			? new DefaultWriter({
				debug: this.options.debug,
				context: this.options.context,
				channel: this.options.channel,
				endpoint: this.options.endpoint,
				...this.options.writerOptions
			})
			: new SplitStreamWriter(this.writers);
	}
}