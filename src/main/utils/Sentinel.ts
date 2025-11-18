import {ISentinel} from "./ISentinel";

/**
 * Cloned from https://github.com/muicss/sentineljs until a patched version
 * supporing iframes gets available
 * License under MIT
 */
var isArray = Array.isArray,
	selectorToAnimationMap = {},
	animationCallbacks = {},
	styleEl,
	styleSheet,
	cssRules;

/**
 * Clear document state for testing purposes
 * Note: The legacy Sentinel implementation uses global state, not per-document state
 * This function resets the global state
 */
export function clearDocumentState(doc: Document): void {
	// Legacy Sentinel uses global state, so we reset it regardless of document
	selectorToAnimationMap = {};
	animationCallbacks = {};
	if (styleEl && styleEl.parentNode) {
		styleEl.parentNode.removeChild(styleEl);
	}
	styleEl = undefined;
	styleSheet = undefined;
	cssRules = undefined;
}

export class Sentinel implements ISentinel {

	document: Document;

	constructor(doc = document) {
		this.document = doc;
	}

	/**
	 * Add watcher.
	 * @param {array} cssSelectors - List of CSS selector strings
	 * @param {Function} callback - The callback function
	 */
	on(cssSelectors, callback) {
		if (!callback) return;

		// initialize animationstart event listener
		if (!styleEl) {
			var doc = this.document,
				head = doc.head;

			// add animationstart event listener
			//@ts-ignore
			doc.addEventListener('animationstart', (ev, callbacks, l, i) => {
				callbacks = animationCallbacks[ev.animationName];

				// exit if callbacks haven't been registered
				if (!callbacks) return;

				// stop other callbacks from firing
				ev.stopImmediatePropagation();

				// iterate through callbacks
				l = callbacks.length;
				for (i = 0; i < l; i++) callbacks[i](ev.target);
			}, true);

			// add stylesheet to document
			styleEl = doc.createElement('style');
			head.insertBefore(styleEl, head.firstChild);
			styleSheet = styleEl.sheet;
			cssRules = styleSheet.cssRules;
		}

		// listify argument and add css rules/ cache callbacks
		(isArray(cssSelectors) ? cssSelectors : [cssSelectors])
			.map((selector, animId, isCustomName) => {
				animId = selectorToAnimationMap[selector];

				if (!animId) {
					//@ts-ignore
					isCustomName = selector[0] == '!';

					// define animation name and add to map
					selectorToAnimationMap[selector] = animId =
						isCustomName ? selector.slice(1) : 'sentinel-' +
							Math.random().toString(16).slice(2);

					// add keyframe rule
					cssRules[this.insertRule(styleSheet,
						'@keyframes ' + animId + '{from{transform:none;}to{transform:none;}}',
						cssRules.length)]
						._id = selector;

					// add selector animation rule
					if (!isCustomName) {
						cssRules[this.insertRule(styleSheet, selector + '{animation-duration:0.0001s;animation-name:' +
							animId + ';}', cssRules.length)]
							._id = selector;
					}

					// add to map
					selectorToAnimationMap[selector] = animId;
				}

				// add to callbacks
				(animationCallbacks[animId] = animationCallbacks[animId] || [])
					.push(callback);
			});
	}

	/**
	 * For unknown reasons CSSStyleSheet: insertRule() does not return an index on some environments..
	 * This method ensures that an index will be returned.
	 * @param styleSheet
	 * @param name
	 * @param index
	 * @private
	 */
	private insertRule(styleSheet:CSSStyleSheet, name:string, index?:number) {
		const prevLength = styleSheet.cssRules.length;
		const i = styleSheet.insertRule(name, index);
		if (isNaN(i)) {
			if (!isNaN(index) && index < prevLength){
				return index;
			}

			return  Math.max(styleSheet.cssRules.length-1, 0);
		}
		return i;
	}

	/**
	 * Remove watcher.
	 * @param {array} cssSelectors - List of CSS selector strings
	 * @param {Function} callback - The callback function (optional)
	 */
	off(cssSelectors, callback?) {
		// listify argument and iterate through rules
		(isArray(cssSelectors) ? cssSelectors : [cssSelectors])
			//@ts-ignore
			.map(function (selector, animId, callbackList, i) {
				// get animId
				if (!(animId = selectorToAnimationMap[selector])) return;

				// get callbacks
				callbackList = animationCallbacks[animId];

				// remove callback from list
				if (callback) {
					i = callbackList.length;

					while (i--) {
						if (callbackList[i] === callback) callbackList.splice(i, 1);
					}
				} else {
					callbackList = [];
				}

				// exit if callbacks still exist
				if (callbackList.length) return;

				// clear cache and remove css rules
				i = cssRules.length;

				while (i--) {
					if (cssRules[i]._id == selector) styleSheet.deleteRule(i);
				}

				delete selectorToAnimationMap[selector];
				delete animationCallbacks[animId];
			});
	}

	/**
	 * Reset watchers and cache
	 */
	reset() {
		selectorToAnimationMap = {};
		animationCallbacks = {};
		if (styleEl) styleEl.parentNode.removeChild(styleEl);
		styleEl = 0;
	}
}
