import {ISentinel} from './ISentinel';

/**
 * StaticSentinel - A one-time DOM query implementation
 *
 * Performs a single querySelectorAll on the document and immediately invokes
 * the callback for all matching elements. Does not watch for future changes.
 *
 * Use this when:
 * - You know all elements are already in the DOM
 * - Maximum performance is needed (no observer overhead)
 * - Working with server-side rendered static content
 *
 * @example
 * const sentinel = new StaticSentinel(document);
 * sentinel.on('.my-class', (element) => {
 *   console.log('Found element:', element);
 * });
 */
export class StaticSentinel implements ISentinel {
	document: Document;

	constructor(doc: Document = document) {
		this.document = doc;
	}

	/**
	 * Query for elements matching CSS selector(s) and immediately invoke callback
	 * @param cssSelectors - Single selector string or array of selectors
	 * @param callback - Function to call for each matching element
	 */
	on(cssSelectors: string | string[], callback: (element: Element) => void): void {
		if (!callback) return;

		const selectors = Array.isArray(cssSelectors) ? cssSelectors : [cssSelectors];

		selectors.forEach(selector => {
			try {
				const elements = this.document.querySelectorAll(selector);
				elements.forEach(element => callback(element));
			} catch (e) {
				// Invalid selector, ignore
			}
		});
	}

	/**
	 * No-op: StaticSentinel doesn't maintain watchers, so there's nothing to remove
	 * @param cssSelectors - Ignored
	 * @param callback - Ignored
	 */
	off(cssSelectors: string | string[], callback?: (element: Element) => void): void {
		// No-op: static query doesn't maintain watchers
	}

	/**
	 * No-op: StaticSentinel doesn't maintain state, so there's nothing to reset
	 */
	reset(): void {
		// No-op: static query doesn't maintain state
	}
}
