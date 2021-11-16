import {Writer} from "./Writer";


/**
 * Logs the data to the browser console using console.debug
 */
export class DebugWriter implements Writer {

	constructor(private readonly delegate: Writer,
							private readonly debug: boolean) {}

	write(data: any) {
		if (this.debug)
			console.debug(JSON.stringify(data));

		this.delegate.write(data);
	}

}