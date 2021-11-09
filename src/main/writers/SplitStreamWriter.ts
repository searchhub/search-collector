import {Writer} from "./Writer";

export class SplitStreamWriter implements Writer {

	writers: Array<Writer>;

	constructor(writers: Array<Writer>) {
		this.writers = writers;
	}

	write(data: any) {
		for (let writer of this.writers) {
			writer.write(data);
		}
	}
}