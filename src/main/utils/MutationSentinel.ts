import {ISentinel} from './ISentinel';

interface SelectorCallbacks {
  selector: string;
  callbacks: Function[];
}

interface DocumentObserverState {
  observer: MutationObserver | null;
  selectorCallbacks: SelectorCallbacks[];
}

const documentStates = new WeakMap<Document, DocumentObserverState>();

export function clearMutationDocumentState(doc: Document) {
  const state = documentStates.get(doc);
  if (state?.observer) {
    state.observer.disconnect();
  }
  documentStates.delete(doc);
}

/**
 * MutationSentinel - A DOM element watcher using MutationObserver API
 *
 * Watches for new elements matching CSS selectors using the MutationObserver API.
 *
 * @example
 * const sentinel = new MutationSentinel(document);
 * sentinel.on('.my-class', (element) => {
 *   console.log('New element found:', element);
 * });
 */
export class MutationSentinel implements ISentinel {
  document: Document;
  private state: DocumentObserverState;
  private registeredSelectors: Set<string> = new Set();

  constructor(doc: Document = document) {
    this.document = doc;

    if (!documentStates.has(doc)) {
      const state: DocumentObserverState = {
        observer: null,
        selectorCallbacks: []
      };
      documentStates.set(doc, state);
    }

    this.state = documentStates.get(doc)!;
  }

  /**
   * Add watcher for CSS selector(s)
   * @param cssSelectors - Single selector string or array of selectors
   * @param callback - Function to call when matching elements are added
   */
  on(cssSelectors: string | string[], callback: (element: Element) => void): void {
    if (!callback) return;

    const selectors = Array.isArray(cssSelectors) ? cssSelectors : [cssSelectors];

    if (!this.state.observer) {
      this.initializeObserver();
    }

    selectors.forEach(selector => {
      let selectorEntry = this.state.selectorCallbacks.find(sc => sc.selector === selector);

      if (!selectorEntry) {
        selectorEntry = {
          selector: selector,
          callbacks: []
        };
        this.state.selectorCallbacks.push(selectorEntry);
      }

      selectorEntry.callbacks.push(callback);
      this.registeredSelectors.add(selector);
    });

    selectors.forEach(selector => {
      try {
        const existingElements = this.document.querySelectorAll(selector);
        existingElements.forEach(element => {
          callback(element);
        });
      } catch (e) {
        // Invalid selector, ignore
      }
    });
  }

  /**
   * Remove watcher for CSS selector(s)
   * @param cssSelectors - Single selector string or array of selectors
   * @param callback - Optional specific callback to remove. If not provided, removes all callbacks for the selector(s)
   */
  off(cssSelectors: string | string[], callback?: (element: Element) => void): void {
    const selectors = Array.isArray(cssSelectors) ? cssSelectors : [cssSelectors];

    selectors.forEach(selector => {
      const index = this.state.selectorCallbacks.findIndex(sc => sc.selector === selector);

      if (index === -1) return;

      const selectorEntry = this.state.selectorCallbacks[index];

      if (callback) {
        const callbackIndex = selectorEntry.callbacks.indexOf(callback);
        if (callbackIndex !== -1) {
          selectorEntry.callbacks.splice(callbackIndex, 1);
        }
      } else {
        selectorEntry.callbacks = [];
      }

      if (selectorEntry.callbacks.length === 0) {
        this.state.selectorCallbacks.splice(index, 1);
        this.registeredSelectors.delete(selector);
      }
    });

    if (this.state.selectorCallbacks.length === 0 && this.state.observer) {
      this.state.observer.disconnect();
      this.state.observer = null;
    }
  }

  /**
   * Reset all watchers for this instance
   * Only removes selectors that were registered by this instance
   */
  reset(): void {
    const selectorsToRemove = Array.from(this.registeredSelectors);
    selectorsToRemove.forEach(selector => {
      this.off(selector);
    });
    this.registeredSelectors.clear();
  }

  /**
   * Initialize the MutationObserver
   */
  private initializeObserver(): void {
    this.state.observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;

          const element = node as Element;

          this.checkElement(element);
          this.checkDescendants(element);
        });
      });
    });

    this.state.observer.observe(this.document.body || this.document.documentElement, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
  }

  /**
   * Check if an element matches any registered selector and trigger callbacks
   */
  private checkElement(element: Element): void {
    this.state.selectorCallbacks.forEach(selectorEntry => {
      try {
        if (element.matches(selectorEntry.selector)) {
          selectorEntry.callbacks.forEach(callback => {
            callback(element);
          });
        }
      } catch (e) {
        // Invalid selector, ignore
      }
    });
  }

  /**
   * Check all descendants of an element
   */
  private checkDescendants(element: Element): void {
    this.state.selectorCallbacks.forEach(selectorEntry => {
      try {
        const matchingElements = element.querySelectorAll(selectorEntry.selector);
        matchingElements.forEach(matchedElement => {
          selectorEntry.callbacks.forEach(callback => {
            callback(matchedElement);
          });
        });
      } catch (e) {
        // Invalid selector, ignore
      }
    });
  }
}
