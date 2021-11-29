import {Writer} from "./Writer";
import {Context} from "../utils/Context";

export type BrowserTrackingWriterOptions = {
	recordUrl: boolean,
	recordReferrer: boolean,
	recordLanguage: boolean,
	context?: Context
}

export class BrowserTrackingWriter implements Writer {

	constructor(private readonly delegate: Writer,
							private readonly options: BrowserTrackingWriterOptions) {
	}

	write(data: any) {
		const {recordUrl, recordReferrer, recordLanguage} = this.options;

		if (recordUrl && !data.url)
			data.url = this.getWindow().location.href;

		if (recordReferrer && !data.ref)
			data.ref = this.getDocument().referrer;

		if (recordLanguage && !data.lang)
			data.lang = this.getWindow().navigator.language;

		this.delegate.write(data);
	}

	private getDocument() {
		const {context} = this.options;
		return context ? context.getDocument() : document;
	}

	private getWindow() {
		const {context} = this.options;
		return context ? context.getWindow() : window;
	}

}