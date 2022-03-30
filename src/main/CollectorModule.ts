import {SplitStreamWriter} from "./writers";
import {Writer} from "./writers";
import {AbstractCollector} from "./collectors";
import {LoggerTransport} from "./logger";
import {TransportLogger} from "./logger";
import {Context} from "./utils";
import {ConsoleWriter} from "./writers";
import {Logger} from "./logger";
import {ConsoleTransport} from "./logger";

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
			log.error(`[${collector.constructor.name}] Unexpected Exception during collector attach: `, e);
		}
	}

	private getLogger() {
		const hasLogger = !!this.logger;
		if (hasLogger)
			return this.logger;

		if (!this.transports || this.transports.length === 0) {
			return new TransportLogger([new ConsoleTransport()]);
		}

		return new TransportLogger(this.transports);
	}

	private getWriter() {
		return this.writers.length == 0
			? this.options.writer || new ConsoleWriter()
			: new SplitStreamWriter(this.writers);
	}
}
