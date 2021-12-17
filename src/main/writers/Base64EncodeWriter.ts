/**
 * Base64 + URL encoding writer. Although the base64 encoding used here is URL safe
 * we also apply URL encoding to convert any incoming unicode chars in a simple cross-language
 * way. This results in longer payload since everything is percent-encoded first.
 */
import {Writer} from "./Writer";
import {base64Encode} from "../utils";

export class Base64EncodeWriter implements Writer {

	constructor(private readonly delegate: Writer) {}

	write(data) {
		const d = JSON.stringify(data);
		this.delegate.write(base64Encode(encodeURIComponent(d)));
	}

}
