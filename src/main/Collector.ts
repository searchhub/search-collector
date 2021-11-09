import {DefaultWriter} from "./writers/DefaultWriter";
import {SplitStreamWriter} from "./writers/SplitStreamWriter";
import {Writer} from "./writers/Writer";
import {AbstractCollector} from "./collectors/AbstractCollector";


/**
 * Default assembly point of collectors and writers.
 */
export class Collector {

	//TODO remove all any
	options: any;
	collectors: Array<AbstractCollector>;
	writers: Array<Writer>;


	constructor(options) {
		this.options = options;
		this.collectors = [];
		this.writers = [];
	}

	add(collector: AbstractCollector) {
		if (this.options.contextResolver && typeof collector.setContext === "function") {
			collector.setContext(this.options.contextResolver);
		}

		this.collectors.push(collector);
	}

	start() {
		const writer = this.writers.length == 0
			? new DefaultWriter(this.options)
			: new SplitStreamWriter(this.writers);

		this.collectors.forEach(collector => {
			collector.attach(writer);
		});
	}

	setWriters(replacementWriters: Array<Writer>) {
		for (let w of replacementWriters) {
			this.writers.push(w);
		}
	}
}