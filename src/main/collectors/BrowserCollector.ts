import {AbstractCollector} from "./AbstractCollector";

/**
 * Collect basic browser information. Note that depending on how you use this you may
 * need to consult the GDPR guidelines
 */
export class BrowserCollector extends AbstractCollector {

	private readonly recordUrl: boolean;
	private readonly recordReferrer: boolean;
	private readonly recordLanguage: boolean;

	constructor(options) {
		super("browser");
		this.recordUrl = options && options.hasOwnProperty("recordUrl") ? options.recordUrl : true;
		this.recordReferrer = options && options.hasOwnProperty("recordReferrer") ? options.recordReferrer : true;
		this.recordLanguage = options && options.hasOwnProperty("recordLanguage") ? options.recordLanguage : false;
	}

	/**
	 * Attach a writer, note that this collector is not asynchronous and will write
	 * the data immediatelly
	 *
	 * @param {object} writer - The writer to send the data to
	 */
	attach(writer) {
		const win = this.getWindow();
		const doc = this.getDocument();

		const data: any = {
			type: this.getType(),
			touch: ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
		}

		if (this.recordLanguage)
			data.lang = win.navigator.language;

		if (this.recordUrl)
			data.url = win.location.href;

		if (this.recordReferrer)
			data.ref = doc.referrer;

		writer.write(data);
	}
}