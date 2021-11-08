export class ContextResolver {
	private readonly window: Window;
	private readonly document: Document;

	constructor(window, document) {
		this.window = window;
		this.document = document;
	}

	getWindow(): Window {
		return this.window;
	}

	getDocument(): Document {
		return this.document;
	}
}