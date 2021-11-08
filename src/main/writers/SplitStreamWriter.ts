import {Writer} from "./Writer";

export class SplitStreamWriter implements Writer {

	//TODO remove any
	writers: any;

	constructor(writers) {
		this.writers = writers;
	}

	write(data) {
		for (let writer of this.writers) {
			writer.write(data);
		}
	}
}