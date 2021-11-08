/**
 * Base64 + URL encoding writer. Although the base64 encoding used here is URL safe
 * we also apply URL encoding to convert any incoming unicode chars in a simple cross-language
 * way. This results in longer payload since everything is percent-encoded first.
 */
import {Writer} from "./Writer";

export class Base64EncodeWriter implements Writer {

	delegate: Writer;

	constructor(delegate: Writer) {
		this.delegate = delegate;
	}

	write(data) {
		const d = JSON.stringify(data);
		this.delegate.write(base64encode(encodeURIComponent(d)));
	}
}

/**
 * URL safe base64 encoding
 *
 * @param {string} str - The string to be encoded, only ASCII/ISO-8859-1 supported
 */
function base64encode(str) {
	// Note, + replaced with -, / replaced with _
	const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
	let o1, o2, o3, bits, h1, h2, h3, h4, e = [], pad = '', c;

	c = str.length % 3;  // pad string to length of multiple of 3
	if (c > 0) {
		while (c++ < 3) {
			pad += '=';
			str += '\0';
		}
	}
	// note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars

	for (c = 0; c < str.length; c += 3) {  // pack three octets into four hexets
		o1 = str.charCodeAt(c);
		o2 = str.charCodeAt(c + 1);
		o3 = str.charCodeAt(c + 2);

		bits = o1 << 16 | o2 << 8 | o3;

		h1 = bits >> 18 & 0x3f;
		h2 = bits >> 12 & 0x3f;
		h3 = bits >> 6 & 0x3f;
		h4 = bits & 0x3f;

		// use hextets to index into code string
		e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	}
	str = e.join('');  // use Array.join() for better performance than repeated string appends

	// replace 'A's from padded nulls with '='s
	str = str.slice(0, str.length - pad.length) + pad;

	return str;
}
