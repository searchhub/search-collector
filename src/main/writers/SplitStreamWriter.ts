import {Writer} from "./Writer";

export class SplitStreamWriter implements Writer {

	writers: Array<Writer>;

	constructor(writers: Array<Writer>) {
		this.writers = writers;
	}

	write(data: any) {
		for (let writer of this.writers) {
			try {
				writer.write(data);
			} catch (e) {
				console.error("Cloud not write data: ", e);
			}
		}
	}
}