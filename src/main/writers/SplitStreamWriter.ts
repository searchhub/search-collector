import {Writer} from "./Writer";

/**
 * Calls all writers passed to the constructor error safe
 */
export class SplitStreamWriter implements Writer {

	constructor(private readonly writers: Array<Writer>) {}

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