import {SplitStreamWriter} from "./writers/SplitStreamWriter";
import {Writer} from "./writers/Writer";
import {AbstractCollector} from "./collectors/AbstractCollector";
import {LoggerTransport} from "./logger/LoggerTransport";
import {TransportLogger} from "./logger/TransportLogger";
import {Context} from "./utils/Context";
import {ConsoleWriter} from "./writers/ConsoleWriter";
import {Logger} from "./logger/Logger";

type CollectorOptions = {
	writer?: Writer,
	context?: Context
}

/**
 * Default assembly point of collectors and writers.
 */
export class CollectorModule {
	private options: CollectorOptions;
	private collectors: Array<AbstractCollector> = [];
	private writers: Array<Writer> = [];
	private transports: Array<LoggerTransport> = [];
	private hasStarted: boolean = false;
	private logger: Logger;

	constructor(options?: CollectorOptions) {
		this.options = options || {};
	}

	add(collector: AbstractCollector) {
		if (this.options.context && !collector.getContext())
			collector.setContext(this.options.context);

		this.collectors.push(collector);

		if (this.hasStarted === true)
			this.invokedCollector(collector);
	}

	/**
	 * Start collecting data by attaching all collectors
	 */
	start() {
		this.collectors.forEach(collector => this.invokedCollector(collector));
		this.hasStarted = true;
	}

	addLogTransport(transport: LoggerTransport) {
		this.transports.push(transport);
	}

	setTransports(transports: Array<LoggerTransport>) {
		this.transports = transports || [];
	}

	setWriters(replacementWriters: Array<Writer> | Writer) {
		this.writers = Array.isArray(replacementWriters) ? [...replacementWriters] : [replacementWriters];
	}

	setLogger(logger: Logger) {
		this.logger = logger;
	}

	private invokedCollector(collector: AbstractCollector) {
		const writer = this.getWriter();
		const log = this.getLogger();

		try {
			collector.attach(writer, log);
		} catch (e) {
			log.error("Unexpected Exception during collector attach: ", e);
		}
	}

	private getLogger() {
		return this.logger || new TransportLogger(this.transports);
	}

	private getWriter() {
		return this.writers.length == 0
			? this.options.writer || new ConsoleWriter()
			: new SplitStreamWriter(this.writers);
	}
}