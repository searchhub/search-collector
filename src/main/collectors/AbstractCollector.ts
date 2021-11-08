import {ContextResolver} from "../resolvers/ContextResolver";

export class AbstractCollector {
	type: string;
	contextResolver: ContextResolver;

	constructor(type: string) {
		this.type = type;
	}

	getType() {
		return this.type;
	}

	setContext(contextResolver: ContextResolver) {
		this.contextResolver = contextResolver;
	}

	getContext() {
		return this.contextResolver;
	}

	getWindow(): Window {
		return this.contextResolver?.getWindow() || window;
	}

	getDocument(): Document {
		return this.contextResolver?.getDocument() || window.document;
	}
}