import {Writer} from "./Writer";


export class ConsoleWriter implements Writer {

	write(data: any) {
		console.debug("ConsoleWriter receiving new data: ");
		console.log(data);
	}

}