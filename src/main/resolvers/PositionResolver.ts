/**
 * Find the position of a DOM element relative to other DOM elements of the same type.
 * To be used to find the position of an item in a search result.
 */
export class PositionResolver {

	selector: string;
	element: HTMLElement;

	/**
	 * @constructor
	 * @param {string} selector - Document query selector identifying all elements from the search result
	 * @param {DOMElement} element - The element which position we need to find
	 */
	constructor(selector, element) {
		this.selector = selector;
		this.element = element;
	}

	/**
	 * Resolve the element position, undefined if the element cannot be found
	 *
	 * @returns {number|undefined}
	 */
	get() {
		const nodes = document.querySelectorAll(this.selector);

		if (nodes.length > 0) {
			let position = 0;
			for (let i = 0; i < nodes.length; i++) {
				const item = nodes[i];
				if (item === this.element) {
					position = i;
				}
			}

			return position;
		} else {
			return undefined;
		}
	}
}
