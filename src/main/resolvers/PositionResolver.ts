/**
 * Find the position of a DOM element relative to other DOM elements of the same type.
 * To be used to find the position of an item in a search result.
 */
export const positionResolver = (selectorExpression: string, element: HTMLElement) => Array.from(document.querySelectorAll(selectorExpression))
	.reduce((acc, node, index) => node === element ? index : acc, undefined);