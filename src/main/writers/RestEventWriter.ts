/**
 * Straight-forward REST write via GET request
 */
import {Writer} from "./Writer";

export class RestEventWriter implements Writer {

	endpoint: any;

	constructor(endpoint) {
		this.endpoint = endpoint;
	}

	write(data) {
		const img = new Image();
		img.src = this.endpoint + "?data=" + JSON.stringify(data);
	}
}
