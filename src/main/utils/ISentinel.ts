/**
 * Common interface for DOM element watchers
 *
 * Implementations can use different strategies (CSS animations, MutationObserver, etc.)
 * to detect when new elements matching CSS selectors are added to the DOM.
 */
export interface ISentinel {
  /**
   * Add watcher for CSS selector(s)
   * @param cssSelectors - Single selector string or array of selectors
   * @param callback - Function to call when matching elements are added
   */
  on(cssSelectors: string | string[], callback: (element: Element) => void): void;

  /**
   * Remove watcher for CSS selector(s)
   * @param cssSelectors - Single selector string or array of selectors
   * @param callback - Optional specific callback to remove. If not provided, removes all callbacks for the selector(s)
   */
  off(cssSelectors: string | string[], callback?: (element: Element) => void): void;

  /**
   * Reset all watchers for this instance
   * Removes all selectors that were registered by this instance
   */
  reset(): void;
}
