import {Writer} from "./Writer";


export class DebugWriter implements Writer {

	constructor(
		private readonly delegate: Writer,
		private readonly debug: boolean) {
	}


	write(data: any) {
		if (this.debug) {
			console.debug(JSON.stringify(data));
		}

		this.delegate.write(data);
	}

}