import {DefaultWriter} from "./writers/DefaultWriter";
import {SplitStreamWriter} from "./writers/SplitStreamWriter";


/**
 * Default assembly point of collectors and writers.
 */
export class Collector {

	//TODO remove all any
	options: any;
	collectors: Array<any>;
	writers: any;


	constructor(options) {
		this.options = options;
		this.collectors = [];
		this.writers = [];
	}

	add(collector) {
		if (this.options.contextResolver && typeof collector.setContext === "function") {
			collector.setContext(this.options.contextResolver);
		}

		this.collectors.push(collector);
	}

	start() {
		const writer = this.writers.length == 0
			? new DefaultWriter(this.options)
			: new SplitStreamWriter(this.writers);

		this.collectors.forEach(function (collector) {
			collector.attach(writer);
		});
	}

	setWriters(replacementWriters) {
		for (let w of replacementWriters) {
			this.writers.push(w);
		}
	}
}