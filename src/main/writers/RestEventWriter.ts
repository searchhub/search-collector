import {Writer} from "./Writer";

/**
 * Straight-forward REST write via GET request
 */
export class RestEventWriter implements Writer {

	constructor(private readonly endpoint: string) {}

	write(data) {
		const img = new Image();
		img.src = this.endpoint + "?data=" + JSON.stringify(data);
	}
}
