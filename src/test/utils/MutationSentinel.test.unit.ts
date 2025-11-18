import { MutationSentinel, clearMutationDocumentState } from '../../main/utils/MutationSentinel';

describe('MutationSentinel', () => {
	let mainDocument: Document;
	let iframeDocument: Document;

	beforeEach(() => {
		// Clear document
		document.body.innerHTML = '';

		// Setup main document
		mainDocument = document;

		// Create a mock iframe document
		const iframe = document.createElement('iframe');
		document.body.appendChild(iframe);
		iframeDocument = iframe.contentDocument!;
	});

	afterEach(() => {
		// Cleanup
		document.body.innerHTML = '';

		// Clear document state
		clearMutationDocumentState(mainDocument);
		if (iframeDocument) {
			clearMutationDocumentState(iframeDocument);
		}
	});

	describe('Basic Functionality', () => {
		test('should detect new elements matching selector', (done) => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on('.test-class', callback);

			// Add element
			const element = mainDocument.createElement('div');
			element.className = 'test-class';
			mainDocument.body.appendChild(element);

			// MutationObserver is async, need to wait
			setTimeout(() => {
				expect(callback).toHaveBeenCalledTimes(1);
				expect(callback).toHaveBeenCalledWith(element);
				done();
			}, 50);
		});

		test('should detect existing elements on registration', () => {
			// Add element before creating sentinel
			const existingElement = mainDocument.createElement('div');
			existingElement.className = 'existing-class';
			mainDocument.body.appendChild(existingElement);

			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on('.existing-class', callback);

			// Should be called immediately for existing element
			expect(callback).toHaveBeenCalledTimes(1);
			expect(callback).toHaveBeenCalledWith(existingElement);
		});

		test('should detect nested elements', (done) => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on('.nested-class', callback);

			// Add container with nested element
			const container = mainDocument.createElement('div');
			const nestedElement = mainDocument.createElement('span');
			nestedElement.className = 'nested-class';
			container.appendChild(nestedElement);
			mainDocument.body.appendChild(container);

			setTimeout(() => {
				expect(callback).toHaveBeenCalledTimes(1);
				expect(callback).toHaveBeenCalledWith(nestedElement);
				done();
			}, 50);
		});

		test('should handle multiple matching elements added at once', (done) => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on('.batch-class', callback);

			// Add container with multiple matching elements
			const container = mainDocument.createElement('div');
			for (let i = 0; i < 5; i++) {
				const element = mainDocument.createElement('div');
				element.className = 'batch-class';
				container.appendChild(element);
			}
			mainDocument.body.appendChild(container);

			setTimeout(() => {
				expect(callback).toHaveBeenCalledTimes(5);
				done();
			}, 50);
		});
	});

	describe('Multiple Documents Isolation', () => {
		test('should handle multiple sentinel instances with different documents', (done) => {
			const sentinel1 = new MutationSentinel(mainDocument);
			const sentinel2 = new MutationSentinel(iframeDocument);

			const callback1 = jest.fn();
			const callback2 = jest.fn();

			sentinel1.on('.test-class-main', callback1);
			sentinel2.on('.test-class-iframe', callback2);

			// Add element to main document
			const mainElement = mainDocument.createElement('div');
			mainElement.className = 'test-class-main';
			mainDocument.body.appendChild(mainElement);

			// Add element to iframe document
			const iframeElement = iframeDocument.createElement('div');
			iframeElement.className = 'test-class-iframe';
			iframeDocument.body.appendChild(iframeElement);

			setTimeout(() => {
				expect(callback1).toHaveBeenCalledTimes(1);
				expect(callback2).toHaveBeenCalledTimes(1);
				expect(callback1).toHaveBeenCalledWith(mainElement);
				expect(callback2).toHaveBeenCalledWith(iframeElement);
				done();
			}, 50);
		});

		test('should not mix callbacks between different documents', (done) => {
			const sentinel1 = new MutationSentinel(mainDocument);
			const sentinel2 = new MutationSentinel(iframeDocument);

			const callback1 = jest.fn();
			const callback2 = jest.fn();

			sentinel1.on('.shared-class', callback1);
			sentinel2.on('.shared-class', callback2);

			// Add element only to main document
			const mainElement = mainDocument.createElement('div');
			mainElement.className = 'shared-class';
			mainDocument.body.appendChild(mainElement);

			setTimeout(() => {
				// Only callback1 should be called
				expect(callback1).toHaveBeenCalledTimes(1);
				expect(callback2).toHaveBeenCalledTimes(0);
				done();
			}, 50);
		});
	});

	describe('reset() Isolation', () => {
		test('should not affect other instances when reset() is called', (done) => {
			const sentinel1 = new MutationSentinel(mainDocument);
			const sentinel2 = new MutationSentinel(mainDocument);

			const callback1 = jest.fn();
			const callback2 = jest.fn();

			sentinel1.on('.class-a', callback1);
			sentinel2.on('.class-b', callback2);

			// Reset only sentinel1
			sentinel1.reset();

			// Add element for sentinel2's selector
			const element = mainDocument.createElement('div');
			element.className = 'class-b';
			mainDocument.body.appendChild(element);

			setTimeout(() => {
				// sentinel2 should still work
				expect(callback2).toHaveBeenCalledTimes(1);
				expect(callback1).toHaveBeenCalledTimes(0);
				done();
			}, 50);
		});

		test('should clear own watchers after reset()', (done) => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on('.my-class', callback);
			sentinel.reset();

			// Add element
			const element = mainDocument.createElement('div');
			element.className = 'my-class';
			mainDocument.body.appendChild(element);

			setTimeout(() => {
				// Callback should not be called after reset
				expect(callback).toHaveBeenCalledTimes(0);
				done();
			}, 50);
		});

		test('should be able to re-register watchers after reset()', (done) => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on('.my-class', callback);
			sentinel.reset();
			sentinel.on('.my-class', callback);

			// Add element
			const element = mainDocument.createElement('div');
			element.className = 'my-class';
			mainDocument.body.appendChild(element);

			setTimeout(() => {
				// Callback should be called once (after re-registration)
				expect(callback).toHaveBeenCalledTimes(1);
				done();
			}, 50);
		});
	});

	describe('Multiple Instance Support', () => {
		test('should support multiple instances watching same selector on same document', (done) => {
			const sentinel1 = new MutationSentinel(mainDocument);
			const sentinel2 = new MutationSentinel(mainDocument);

			const callback1 = jest.fn();
			const callback2 = jest.fn();

			sentinel1.on('.my-class', callback1);
			sentinel2.on('.my-class', callback2);

			// Add element
			const element = mainDocument.createElement('div');
			element.className = 'my-class';
			mainDocument.body.appendChild(element);

			setTimeout(() => {
				// Both callbacks should be called
				expect(callback1).toHaveBeenCalledTimes(1);
				expect(callback2).toHaveBeenCalledTimes(1);
				done();
			}, 50);
		});

		test('should handle multiple callbacks for same selector', (done) => {
			const sentinel = new MutationSentinel(mainDocument);

			const callback1 = jest.fn();
			const callback2 = jest.fn();
			const callback3 = jest.fn();

			sentinel.on('.my-class', callback1);
			sentinel.on('.my-class', callback2);
			sentinel.on('.my-class', callback3);

			// Add element
			const element = mainDocument.createElement('div');
			element.className = 'my-class';
			mainDocument.body.appendChild(element);

			setTimeout(() => {
				// All callbacks should be called
				expect(callback1).toHaveBeenCalledTimes(1);
				expect(callback2).toHaveBeenCalledTimes(1);
				expect(callback3).toHaveBeenCalledTimes(1);
				done();
			}, 50);
		});
	});

	describe('off() Method', () => {
		test('should remove specific callback when callback is provided', (done) => {
			const sentinel = new MutationSentinel(mainDocument);

			const callback1 = jest.fn();
			const callback2 = jest.fn();

			sentinel.on('.my-class', callback1);
			sentinel.on('.my-class', callback2);

			// Remove only callback1
			sentinel.off('.my-class', callback1);

			// Add element
			const element = mainDocument.createElement('div');
			element.className = 'my-class';
			mainDocument.body.appendChild(element);

			setTimeout(() => {
				// Only callback2 should be called
				expect(callback1).toHaveBeenCalledTimes(0);
				expect(callback2).toHaveBeenCalledTimes(1);
				done();
			}, 50);
		});

		test('should remove all callbacks when no callback is provided', (done) => {
			const sentinel = new MutationSentinel(mainDocument);

			const callback1 = jest.fn();
			const callback2 = jest.fn();

			sentinel.on('.my-class', callback1);
			sentinel.on('.my-class', callback2);

			// Remove all callbacks
			sentinel.off('.my-class');

			// Add element
			const element = mainDocument.createElement('div');
			element.className = 'my-class';
			mainDocument.body.appendChild(element);

			setTimeout(() => {
				// No callbacks should be called
				expect(callback1).toHaveBeenCalledTimes(0);
				expect(callback2).toHaveBeenCalledTimes(0);
				done();
			}, 50);
		});

		test('should handle off() for non-existent selector gracefully', () => {
			const sentinel = new MutationSentinel(mainDocument);

			// Should not throw
			expect(() => {
				sentinel.off('.non-existent-selector');
			}).not.toThrow();
		});

		test('should disconnect observer when all selectors are removed', () => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on('.my-class', callback);

			// Get the state to check observer
			const state = (sentinel as any).state;
			expect(state.observer).toBeTruthy();

			// Remove all watchers
			sentinel.off('.my-class');

			// Observer should be disconnected
			expect(state.observer).toBeNull();
		});
	});

	describe('Multiple Selectors', () => {
		test('should handle array of selectors', (done) => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on(['.class-a', '.class-b', '.class-c'], callback);

			// Add elements for each selector
			const elementA = mainDocument.createElement('div');
			elementA.className = 'class-a';
			mainDocument.body.appendChild(elementA);

			const elementB = mainDocument.createElement('div');
			elementB.className = 'class-b';
			mainDocument.body.appendChild(elementB);

			const elementC = mainDocument.createElement('div');
			elementC.className = 'class-c';
			mainDocument.body.appendChild(elementC);

			setTimeout(() => {
				// Callback should be called 3 times
				expect(callback).toHaveBeenCalledTimes(3);
				expect(callback).toHaveBeenCalledWith(elementA);
				expect(callback).toHaveBeenCalledWith(elementB);
				expect(callback).toHaveBeenCalledWith(elementC);
				done();
			}, 50);
		});

		test('should remove array of selectors with off()', (done) => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on(['.class-a', '.class-b'], callback);
			sentinel.off(['.class-a', '.class-b']);

			// Add elements
			const elementA = mainDocument.createElement('div');
			elementA.className = 'class-a';
			mainDocument.body.appendChild(elementA);

			const elementB = mainDocument.createElement('div');
			elementB.className = 'class-b';
			mainDocument.body.appendChild(elementB);

			setTimeout(() => {
				// Callback should not be called
				expect(callback).toHaveBeenCalledTimes(0);
				done();
			}, 50);
		});
	});

	describe('Edge Cases', () => {
		test('should handle on() with no callback gracefully', () => {
			const sentinel = new MutationSentinel(mainDocument);

			// Should not throw
			expect(() => {
				sentinel.on('.my-class', null as any);
			}).not.toThrow();

			expect(() => {
				sentinel.on('.my-class', undefined as any);
			}).not.toThrow();
		});

		test('should handle complex selectors', (done) => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on('div.container > span.item[data-test="value"]', callback);

			// Add matching element
			const container = mainDocument.createElement('div');
			container.className = 'container';
			const span = mainDocument.createElement('span');
			span.className = 'item';
			span.setAttribute('data-test', 'value');
			container.appendChild(span);
			mainDocument.body.appendChild(container);

			setTimeout(() => {
				expect(callback).toHaveBeenCalledTimes(1);
				expect(callback).toHaveBeenCalledWith(span);
				done();
			}, 50);
		});

		test('should handle invalid selectors gracefully', () => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			// Should not throw
			expect(() => {
				sentinel.on(':::invalid:::', callback);
			}).not.toThrow();
		});

		test('should handle elements that match the selector itself', (done) => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on('.root-class', callback);

			// Add element that matches and contains children
			const element = mainDocument.createElement('div');
			element.className = 'root-class';
			const child = mainDocument.createElement('span');
			element.appendChild(child);
			mainDocument.body.appendChild(element);

			setTimeout(() => {
				// Should be called once for the root element
				expect(callback).toHaveBeenCalledTimes(1);
				expect(callback).toHaveBeenCalledWith(element);
				done();
			}, 50);
		});

		test('should handle text nodes gracefully', (done) => {
			const sentinel = new MutationSentinel(mainDocument);
			const callback = jest.fn();

			sentinel.on('.text-container', callback);

			// Add container with text node
			const container = mainDocument.createElement('div');
			container.className = 'text-container';
			const textNode = mainDocument.createTextNode('Hello');
			container.appendChild(textNode);
			mainDocument.body.appendChild(container);

			setTimeout(() => {
				// Should be called once for the container, not the text node
				expect(callback).toHaveBeenCalledTimes(1);
				expect(callback).toHaveBeenCalledWith(container);
				done();
			}, 50);
		});
	});

	describe('Memory Management', () => {
		test('should not accumulate observers with repeated instantiation', (done) => {
			const callbacks: jest.Mock[] = [];

			// Create 10 sentinel instances
			for (let i = 0; i < 10; i++) {
				const sentinel = new MutationSentinel(mainDocument);
				const callback = jest.fn();
				callbacks.push(callback);
				sentinel.on('.test-class', callback);
			}

			// Add element
			const element = mainDocument.createElement('div');
			element.className = 'test-class';
			mainDocument.body.appendChild(element);

			setTimeout(() => {
				// Each callback should be called exactly once
				callbacks.forEach(callback => {
					expect(callback).toHaveBeenCalledTimes(1);
				});
				done();
			}, 50);
		});

		test('should properly clean up when using off()', (done) => {
			const sentinel = new MutationSentinel(mainDocument);
			const callbacks: jest.Mock[] = [];

			// Register 10 callbacks
			for (let i = 0; i < 10; i++) {
				const callback = jest.fn();
				callbacks.push(callback);
				sentinel.on('.test-class', callback);
			}

			// Remove all but the last callback
			for (let i = 0; i < 9; i++) {
				sentinel.off('.test-class', callbacks[i]);
			}

			// Add element
			const element = mainDocument.createElement('div');
			element.className = 'test-class';
			mainDocument.body.appendChild(element);

			setTimeout(() => {
				// Only the last callback should be called
				for (let i = 0; i < 9; i++) {
					expect(callbacks[i]).toHaveBeenCalledTimes(0);
				}
				expect(callbacks[9]).toHaveBeenCalledTimes(1);
				done();
			}, 50);
		});
	});
});
