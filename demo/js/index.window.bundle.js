/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/scrollmonitor/dist/module/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/scrollmonitor/dist/module/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollMonitorContainer": () => (/* reexport safe */ _src_container_js__WEBPACK_IMPORTED_MODULE_0__.ScrollMonitorContainer),
/* harmony export */   "Watcher": () => (/* reexport safe */ _src_watcher_js__WEBPACK_IMPORTED_MODULE_1__.Watcher),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_container_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/container.js */ "./node_modules/scrollmonitor/dist/module/src/container.js");
/* harmony import */ var _src_watcher_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/watcher.js */ "./node_modules/scrollmonitor/dist/module/src/watcher.js");
/* harmony import */ var _src_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/types */ "./node_modules/scrollmonitor/dist/module/src/types.js");
/* harmony import */ var _src_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/constants.js */ "./node_modules/scrollmonitor/dist/module/src/constants.js");





// this is needed for the type, but if we're not in a browser the only
// way listenToDOM will be called is if you call scrollmonitor.createContainer
// and you can't do that until you have a DOM element.
var scrollMonitor = new _src_container_js__WEBPACK_IMPORTED_MODULE_0__.ScrollMonitorContainer(_src_constants_js__WEBPACK_IMPORTED_MODULE_3__.isInBrowser ? document.body : undefined);
if (_src_constants_js__WEBPACK_IMPORTED_MODULE_3__.isInBrowser) {
    scrollMonitor.updateState();
    scrollMonitor.listenToDOM();
}
//@ts-ignore
window.scrollMonitor = scrollMonitor;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scrollMonitor);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/scrollmonitor/dist/module/src/constants.js":
/*!*****************************************************************!*\
  !*** ./node_modules/scrollmonitor/dist/module/src/constants.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ENTERVIEWPORT": () => (/* binding */ ENTERVIEWPORT),
/* harmony export */   "EXITVIEWPORT": () => (/* binding */ EXITVIEWPORT),
/* harmony export */   "FULLYENTERVIEWPORT": () => (/* binding */ FULLYENTERVIEWPORT),
/* harmony export */   "LOCATIONCHANGE": () => (/* binding */ LOCATIONCHANGE),
/* harmony export */   "PARTIALLYEXITVIEWPORT": () => (/* binding */ PARTIALLYEXITVIEWPORT),
/* harmony export */   "STATECHANGE": () => (/* binding */ STATECHANGE),
/* harmony export */   "VISIBILITYCHANGE": () => (/* binding */ VISIBILITYCHANGE),
/* harmony export */   "defaultOffsets": () => (/* binding */ defaultOffsets),
/* harmony export */   "eventTypes": () => (/* binding */ eventTypes),
/* harmony export */   "isInBrowser": () => (/* binding */ isInBrowser),
/* harmony export */   "isOnServer": () => (/* binding */ isOnServer)
/* harmony export */ });
var VISIBILITYCHANGE = 'visibilityChange';
var ENTERVIEWPORT = 'enterViewport';
var FULLYENTERVIEWPORT = 'fullyEnterViewport';
var EXITVIEWPORT = 'exitViewport';
var PARTIALLYEXITVIEWPORT = 'partiallyExitViewport';
var LOCATIONCHANGE = 'locationChange';
var STATECHANGE = 'stateChange';
var eventTypes = [
    VISIBILITYCHANGE,
    ENTERVIEWPORT,
    FULLYENTERVIEWPORT,
    EXITVIEWPORT,
    PARTIALLYEXITVIEWPORT,
    LOCATIONCHANGE,
    STATECHANGE,
];
var isOnServer = typeof window === 'undefined';
var isInBrowser = !isOnServer;
var defaultOffsets = { top: 0, bottom: 0 };
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/scrollmonitor/dist/module/src/container.js":
/*!*****************************************************************!*\
  !*** ./node_modules/scrollmonitor/dist/module/src/container.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollMonitorContainer": () => (/* binding */ ScrollMonitorContainer)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/scrollmonitor/dist/module/src/constants.js");
/* harmony import */ var _watcher_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./watcher.js */ "./node_modules/scrollmonitor/dist/module/src/watcher.js");


function getViewportHeight(element) {
    if (_constants_js__WEBPACK_IMPORTED_MODULE_0__.isOnServer) {
        return 0;
    }
    if (element === document.body) {
        return window.innerHeight || document.documentElement.clientHeight;
    }
    else {
        return element.clientHeight;
    }
}
function getContentHeight(element) {
    if (_constants_js__WEBPACK_IMPORTED_MODULE_0__.isOnServer) {
        return 0;
    }
    if (element === document.body) {
        // jQuery approach
        // whichever is greatest
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
    }
    else {
        return element.scrollHeight;
    }
}
function scrollTop(element) {
    if (_constants_js__WEBPACK_IMPORTED_MODULE_0__.isOnServer) {
        return 0;
    }
    if (element === document.body) {
        return (window.pageYOffset ||
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop);
    }
    else {
        return element.scrollTop;
    }
}
var browserSupportsPassive = false;
if (_constants_js__WEBPACK_IMPORTED_MODULE_0__.isInBrowser) {
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                browserSupportsPassive = true;
            },
        });
        window.addEventListener('test', null, opts);
    }
    catch (e) { }
}
var useCapture = browserSupportsPassive ? { capture: false, passive: true } : false;
var ScrollMonitorContainer = /** @class */ (function () {
    function ScrollMonitorContainer(item, parentWatcher) {
        this.eventTypes = _constants_js__WEBPACK_IMPORTED_MODULE_0__.eventTypes;
        var self = this;
        this.item = item;
        this.watchers = [];
        this.viewportTop = null;
        this.viewportBottom = null;
        this.documentHeight = getContentHeight(item);
        this.viewportHeight = getViewportHeight(item);
        this.DOMListener = function () {
            ScrollMonitorContainer.prototype.DOMListener.apply(self, arguments);
        };
        if (parentWatcher) {
            this.containerWatcher = parentWatcher.create(item);
        }
        var previousDocumentHeight;
        var calculateViewportI;
        function calculateViewport() {
            self.viewportTop = scrollTop(item);
            self.viewportBottom = self.viewportTop + self.viewportHeight;
            self.documentHeight = getContentHeight(item);
            if (self.documentHeight !== previousDocumentHeight) {
                calculateViewportI = self.watchers.length;
                while (calculateViewportI--) {
                    self.watchers[calculateViewportI].recalculateLocation();
                }
                previousDocumentHeight = self.documentHeight;
            }
        }
        var updateAndTriggerWatchersI;
        function updateAndTriggerWatchers() {
            // update all watchers then trigger the events so one can rely on another being up to date.
            updateAndTriggerWatchersI = self.watchers.length;
            while (updateAndTriggerWatchersI--) {
                self.watchers[updateAndTriggerWatchersI].update();
            }
            updateAndTriggerWatchersI = self.watchers.length;
            while (updateAndTriggerWatchersI--) {
                self.watchers[updateAndTriggerWatchersI].triggerCallbacks(undefined);
            }
        }
        this.update = function () {
            calculateViewport();
            updateAndTriggerWatchers();
        };
        this.recalculateLocations = function () {
            this.documentHeight = 0;
            this.update();
        };
    }
    ScrollMonitorContainer.prototype.listenToDOM = function () {
        if (_constants_js__WEBPACK_IMPORTED_MODULE_0__.isInBrowser) {
            if (this.item === document.body) {
                window.addEventListener('scroll', this.DOMListener, useCapture);
            }
            else {
                this.item.addEventListener('scroll', this.DOMListener, useCapture);
            }
            window.addEventListener('resize', this.DOMListener);
            this.destroy = function () {
                if (this.item === document.body) {
                    window.removeEventListener('scroll', this.DOMListener, useCapture);
                    this.containerWatcher.destroy();
                }
                else {
                    this.item.removeEventListener('scroll', this.DOMListener, useCapture);
                }
                window.removeEventListener('resize', this.DOMListener);
            };
        }
    };
    ScrollMonitorContainer.prototype.destroy = function () {
        // noop, override for your own purposes.
        // in listenToDOM, for example.
    };
    ScrollMonitorContainer.prototype.DOMListener = function (event) {
        //alert('got scroll');
        this.updateState();
        this.updateAndTriggerWatchers(event);
    };
    ScrollMonitorContainer.prototype.updateState = function () {
        var viewportTop = scrollTop(this.item);
        var viewportHeight = getViewportHeight(this.item);
        var contentHeight = getContentHeight(this.item);
        var needsRecalcuate = viewportHeight !== this.viewportHeight || contentHeight !== this.contentHeight;
        this.viewportTop = viewportTop;
        this.viewportHeight = viewportHeight;
        this.viewportBottom = viewportTop + viewportHeight;
        this.contentHeight = contentHeight;
        if (needsRecalcuate) {
            var i = this.watchers.length;
            while (i--) {
                this.watchers[i].recalculateLocation();
            }
        }
    };
    ScrollMonitorContainer.prototype.updateAndTriggerWatchers = function (event) {
        var i = this.watchers.length;
        while (i--) {
            this.watchers[i].update();
        }
        i = this.watchers.length;
        while (i--) {
            this.watchers[i].triggerCallbacks(event);
        }
    };
    ScrollMonitorContainer.prototype.createContainer = function (input) {
        var item;
        if (typeof input === 'string') {
            item = document.querySelector(input);
        }
        else if (Array.isArray(input) || input instanceof NodeList) {
            item = input[0];
        }
        else {
            item = input;
        }
        var container = new ScrollMonitorContainer(item, this);
        this.updateState();
        container.listenToDOM();
        return container;
    };
    ScrollMonitorContainer.prototype.create = function (input, offsets) {
        var item;
        if (typeof item === 'string') {
            item = document.querySelector(item);
        }
        else if (Array.isArray(input) || input instanceof NodeList) {
            item = input[0];
        }
        else {
            item = input;
        }
        var watcher = new _watcher_js__WEBPACK_IMPORTED_MODULE_1__.Watcher(this, item, offsets);
        this.watchers.push(watcher);
        return watcher;
    };
    /**
     * @deprecated since version 1.1
     */
    ScrollMonitorContainer.prototype.beget = function (input, offsets) {
        return this.create(input, offsets);
    };
    return ScrollMonitorContainer;
}());

//# sourceMappingURL=container.js.map

/***/ }),

/***/ "./node_modules/scrollmonitor/dist/module/src/types.js":
/*!*************************************************************!*\
  !*** ./node_modules/scrollmonitor/dist/module/src/types.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/scrollmonitor/dist/module/src/watcher.js":
/*!***************************************************************!*\
  !*** ./node_modules/scrollmonitor/dist/module/src/watcher.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Watcher": () => (/* binding */ Watcher)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/scrollmonitor/dist/module/src/constants.js");

var Watcher = /** @class */ (function () {
    function Watcher(container, watchItem, offsets) {
        this.container = container;
        this.watchItem = watchItem;
        this.locked = false;
        this.callbacks = {};
        var self = this;
        if (!offsets) {
            this.offsets = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOffsets;
        }
        else if (typeof offsets === 'number') {
            this.offsets = { top: offsets, bottom: offsets };
        }
        else {
            this.offsets = {
                top: 'top' in offsets ? offsets.top : _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOffsets.top,
                bottom: 'bottom' in offsets ? offsets.bottom : _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOffsets.bottom,
            };
        }
        for (var i = 0, j = _constants_js__WEBPACK_IMPORTED_MODULE_0__.eventTypes.length; i < j; i++) {
            self.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.eventTypes[i]] = [];
        }
        this.locked = false;
        var wasInViewport;
        var wasFullyInViewport;
        var wasAboveViewport;
        var wasBelowViewport;
        var listenerToTriggerListI;
        var listener;
        var needToTriggerStateChange = false;
        function triggerCallbackArray(listeners, event) {
            needToTriggerStateChange = true;
            if (listeners.length === 0) {
                return;
            }
            listenerToTriggerListI = listeners.length;
            while (listenerToTriggerListI--) {
                listener = listeners[listenerToTriggerListI];
                listener.callback.call(self, event, self);
                if (listener.isOne) {
                    listeners.splice(listenerToTriggerListI, 1);
                }
            }
        }
        this.triggerCallbacks = function triggerCallbacks(event) {
            if (this.isInViewport && !wasInViewport) {
                triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.ENTERVIEWPORT], event);
            }
            if (this.isFullyInViewport && !wasFullyInViewport) {
                triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.FULLYENTERVIEWPORT], event);
            }
            if (this.isAboveViewport !== wasAboveViewport &&
                this.isBelowViewport !== wasBelowViewport) {
                triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.VISIBILITYCHANGE], event);
                // if you skip completely past this element
                if (!wasFullyInViewport && !this.isFullyInViewport) {
                    triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.FULLYENTERVIEWPORT], event);
                    triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.PARTIALLYEXITVIEWPORT], event);
                }
                if (!wasInViewport && !this.isInViewport) {
                    triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.ENTERVIEWPORT], event);
                    triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.EXITVIEWPORT], event);
                }
            }
            if (!this.isFullyInViewport && wasFullyInViewport) {
                triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.PARTIALLYEXITVIEWPORT], event);
            }
            if (!this.isInViewport && wasInViewport) {
                triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.EXITVIEWPORT], event);
            }
            if (this.isInViewport !== wasInViewport) {
                triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.VISIBILITYCHANGE], event);
            }
            if (needToTriggerStateChange) {
                needToTriggerStateChange = false;
                triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.STATECHANGE], event);
            }
            wasInViewport = this.isInViewport;
            wasFullyInViewport = this.isFullyInViewport;
            wasAboveViewport = this.isAboveViewport;
            wasBelowViewport = this.isBelowViewport;
        };
        this.recalculateLocation = function () {
            if (this.locked) {
                return;
            }
            var previousTop = this.top;
            var previousBottom = this.bottom;
            if (this.watchItem.nodeName) {
                // a dom element
                var cachedDisplay = this.watchItem.style.display;
                if (cachedDisplay === 'none') {
                    this.watchItem.style.display = '';
                }
                var containerOffset = 0;
                var container = this.container;
                while (container.containerWatcher) {
                    containerOffset +=
                        container.containerWatcher.top -
                            container.containerWatcher.container.viewportTop;
                    container = container.containerWatcher.container;
                }
                var boundingRect = this.watchItem.getBoundingClientRect();
                this.top = boundingRect.top + this.container.viewportTop - containerOffset;
                this.bottom = boundingRect.bottom + this.container.viewportTop - containerOffset;
                if (cachedDisplay === 'none') {
                    this.watchItem.style.display = cachedDisplay;
                }
            }
            else if (this.watchItem === +this.watchItem) {
                // number
                if (this.watchItem > 0) {
                    this.top = this.bottom = this.watchItem;
                }
                else {
                    this.top = this.bottom = this.container.documentHeight - this.watchItem;
                }
            }
            else {
                // an object with a top and bottom property
                this.top = this.watchItem.top;
                this.bottom = this.watchItem.bottom;
            }
            this.top -= this.offsets.top;
            this.bottom += this.offsets.bottom;
            this.height = this.bottom - this.top;
            if ((previousTop !== undefined || previousBottom !== undefined) &&
                (this.top !== previousTop || this.bottom !== previousBottom)) {
                triggerCallbackArray(this.callbacks[_constants_js__WEBPACK_IMPORTED_MODULE_0__.LOCATIONCHANGE], undefined);
            }
        };
        this.recalculateLocation();
        this.update();
        wasInViewport = this.isInViewport;
        wasFullyInViewport = this.isFullyInViewport;
        wasAboveViewport = this.isAboveViewport;
        wasBelowViewport = this.isBelowViewport;
    }
    Watcher.prototype.on = function (event, callback, isOne) {
        if (isOne === void 0) { isOne = false; }
        // trigger the event if it applies to the element right now.
        switch (true) {
            case event === _constants_js__WEBPACK_IMPORTED_MODULE_0__.VISIBILITYCHANGE && !this.isInViewport && this.isAboveViewport:
            case event === _constants_js__WEBPACK_IMPORTED_MODULE_0__.ENTERVIEWPORT && this.isInViewport:
            case event === _constants_js__WEBPACK_IMPORTED_MODULE_0__.FULLYENTERVIEWPORT && this.isFullyInViewport:
            case event === _constants_js__WEBPACK_IMPORTED_MODULE_0__.EXITVIEWPORT && this.isAboveViewport && !this.isInViewport:
            case event === _constants_js__WEBPACK_IMPORTED_MODULE_0__.PARTIALLYEXITVIEWPORT && this.isInViewport && this.isAboveViewport:
                callback.call(this, this);
                if (isOne) {
                    return;
                }
        }
        if (this.callbacks[event]) {
            this.callbacks[event].push({ callback: callback, isOne: isOne });
        }
        else {
            throw new Error('Tried to add a scroll monitor listener of type ' +
                event +
                '. Your options are: ' +
                _constants_js__WEBPACK_IMPORTED_MODULE_0__.eventTypes.join(', '));
        }
    };
    Watcher.prototype.off = function (event, callback) {
        if (this.callbacks[event]) {
            for (var i = 0, item; (item = this.callbacks[event][i]); i++) {
                if (item.callback === callback) {
                    this.callbacks[event].splice(i, 1);
                    break;
                }
            }
        }
        else {
            throw new Error('Tried to remove a scroll monitor listener of type ' +
                event +
                '. Your options are: ' +
                _constants_js__WEBPACK_IMPORTED_MODULE_0__.eventTypes.join(', '));
        }
    };
    Watcher.prototype.one = function (event, callback) {
        this.on(event, callback, true);
    };
    Watcher.prototype.recalculateSize = function () {
        if (this.watchItem instanceof HTMLElement) {
            this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom;
            this.bottom = this.top + this.height;
        }
    };
    Watcher.prototype.update = function () {
        this.isAboveViewport = this.top < this.container.viewportTop;
        this.isBelowViewport = this.bottom > this.container.viewportBottom;
        this.isInViewport =
            this.top < this.container.viewportBottom && this.bottom > this.container.viewportTop;
        this.isFullyInViewport =
            (this.top >= this.container.viewportTop &&
                this.bottom <= this.container.viewportBottom) ||
                (this.isAboveViewport && this.isBelowViewport);
    };
    Watcher.prototype.destroy = function () {
        var index = this.container.watchers.indexOf(this), self = this;
        this.container.watchers.splice(index, 1);
        self.callbacks = {};
    };
    // prevent recalculating the element location
    Watcher.prototype.lock = function () {
        this.locked = true;
    };
    Watcher.prototype.unlock = function () {
        this.locked = false;
    };
    return Watcher;
}());

var eventHandlerFactory = function (type) {
    return function (callback, isOne) {
        if (isOne === void 0) { isOne = false; }
        this.on.call(this, type, callback, isOne);
    };
};
for (var i = 0, j = _constants_js__WEBPACK_IMPORTED_MODULE_0__.eventTypes.length; i < j; i++) {
    var type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.eventTypes[i];
    Watcher.prototype[type] = eventHandlerFactory(type);
}
//# sourceMappingURL=watcher.js.map

/***/ }),

/***/ "./src/main/CollectorModule.ts":
/*!*************************************!*\
  !*** ./src/main/CollectorModule.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectorModule": () => (/* binding */ CollectorModule)
/* harmony export */ });
/* harmony import */ var _writers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./writers */ "./src/main/writers/index.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "./src/main/logger/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/main/utils/index.ts");



/**
 * Default assembly point of collectors and writers.
 */
class CollectorModule {
    constructor(options) {
        this.collectors = [];
        this.writers = [];
        this.transports = [];
        this.hasStarted = false;
        this.options = options || {};
    }
    add(collector) {
        if (!collector.getContext())
            collector.setContext(this.options.context || new _utils__WEBPACK_IMPORTED_MODULE_2__.Context(window, document));
        this.collectors.push(collector);
        if (this.hasStarted === true)
            this.invokedCollector(collector);
    }
    /**
     * Start collecting data by attaching all collectors
     */
    start() {
        this.collectors.forEach(collector => this.invokedCollector(collector));
        this.hasStarted = true;
    }
    addLogTransport(transport) {
        this.transports.push(transport);
    }
    setTransports(transports) {
        this.transports = transports || [];
    }
    setWriters(replacementWriters) {
        this.writers = Array.isArray(replacementWriters) ? [...replacementWriters] : [replacementWriters];
    }
    setLogger(logger) {
        this.logger = logger;
    }
    invokedCollector(collector) {
        const writer = this.getWriter();
        const log = this.getLogger();
        try {
            collector.attach(writer, log);
        }
        catch (e) {
            log.error(`[${collector.constructor.name}] Unexpected Exception during collector attach: `, e);
        }
    }
    getLogger() {
        const hasLogger = !!this.logger;
        if (hasLogger)
            return this.logger;
        if (!this.transports || this.transports.length === 0) {
            return new _logger__WEBPACK_IMPORTED_MODULE_1__.TransportLogger([new _logger__WEBPACK_IMPORTED_MODULE_1__.ConsoleTransport()]);
        }
        return new _logger__WEBPACK_IMPORTED_MODULE_1__.TransportLogger(this.transports);
    }
    getWriter() {
        return this.writers.length == 0
            ? this.options.writer || new _writers__WEBPACK_IMPORTED_MODULE_0__.ConsoleWriter()
            : new _writers__WEBPACK_IMPORTED_MODULE_0__.SplitStreamWriter(this.writers);
    }
}


/***/ }),

/***/ "./src/main/collectors/AbstractCollector.ts":
/*!**************************************************!*\
  !*** ./src/main/collectors/AbstractCollector.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractCollector": () => (/* binding */ AbstractCollector)
/* harmony export */ });
class AbstractCollector {
    constructor(type, context) {
        this.type = type;
        this.context = context;
    }
    getType() {
        return this.type;
    }
    setContext(context) {
        this.context = context;
    }
    getContext() {
        return this.context;
    }
    getWindow() {
        return this.context.getWindow();
    }
    getDocument() {
        return this.context.getDocument();
    }
    attach(writer, log) {
        // override in subclass
    }
    /**
     * Used to log if a handler fails its execution
     * Usage: document.addEventListener("click", this.logWrapHandler(yourhandler, logger))
     * @param handler
     * @param log
     * @param handlerArgs
     * @protected
     */
    logWrapHandler(handler, log, ...handlerArgs) {
        return (...args) => {
            try {
                return handler(...args, ...handlerArgs);
            }
            catch (e) {
                if (log)
                    log.error(`[${this.constructor.name}] Unexpected error during resolver execution: `, e);
            }
        };
    }
    /**
     * Used to execute resolver functions.
     * Logs a debug message if the value is undefined or logs an error if an exception is thrown by the resolver
     * @param resolver A resolver function
     * @param log the logger
     * @param resolverArgs arguments to be passed to the resolver function
     * @protected
     */
    resolve(resolver, log, ...resolverArgs) {
        try {
            if (resolver) {
                const val = resolver(...resolverArgs);
                if (val == void 0)
                    log.debug("Resolver returned no value.", resolver);
                return val;
            }
        }
        catch (e) {
            if (log && log.error) {
                log.error(`[${this.constructor.name}] Unexpected error during resolver execution: `, e);
            }
        }
    }
}


/***/ }),

/***/ "./src/main/collectors/AssociatedProductCollector.ts":
/*!***********************************************************!*\
  !*** ./src/main/collectors/AssociatedProductCollector.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AssociatedProductCollector": () => (/* binding */ AssociatedProductCollector)
/* harmony export */ });
/* harmony import */ var _utils_Sentinel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Sentinel */ "./src/main/utils/Sentinel.ts");
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");
/* harmony import */ var _query_TrailType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../query/TrailType */ "./src/main/query/TrailType.ts");



/**
 * Collect clicks on elements matching a query selector. Handles both DOM elements
 * present in the DOM and elements inserted after the page load / collector construction.
 *
 * When a click occurs, a function provided at construction time get invoked to collect data points
 * from the element.
 */
class AssociatedProductCollector extends _AbstractCollector__WEBPACK_IMPORTED_MODULE_1__.AbstractCollector {
    /**
     * Construct a click collector
     *
     * @constructor
     * @param {string} selectorExpression - Document query selector identifying the elements to attach to
     * @param mainProductId
     * @param resolvers
     */
    constructor(selectorExpression, mainProductId, resolvers) {
        super("associated-product");
        this.mainProductId = mainProductId;
        this.selectorExpression = selectorExpression;
        this.idResolver = resolvers.idResolver;
        this.positionResolver = resolvers.positionResolver;
        this.priceResolver = resolvers.priceResolver;
        this.trail = resolvers.trail;
    }
    /**
     * Add click event listeners to the identified elements, write the data
     * when the event occurs
     *
     * @param {object} writer - The writer to send the data to
     * @param log
     */
    attach(writer, log) {
        const collect = element => {
            const id = this.resolve(this.idResolver, log, element);
            if (id) {
                if (this.trail) {
                    // Find out the query source of the main product. Note that despite being a
                    // "main" product, it could be a 2nd or 3rd, 4th level of associated product browsing
                    const previousTrail = this.trail.fetch(this.mainProductId);
                    if (previousTrail) {
                        // Upon a follow-up event for this product (ex. basket), we would pick this trail
                        this.trail.register(id, _query_TrailType__WEBPACK_IMPORTED_MODULE_2__.TrailType.Associated, previousTrail.query);
                    }
                }
                return {
                    id,
                    position: this.resolve(this.positionResolver, log, element),
                    price: this.resolve(this.priceResolver, log, element)
                };
            }
        };
        const handler = el => {
            el.addEventListener("click", this.logWrapHandler(ev => {
                const payload = collect(el);
                if (payload) {
                    writer.write({
                        "type": this.getType(),
                        ...payload
                    });
                }
            }, log));
        };
        new _utils_Sentinel__WEBPACK_IMPORTED_MODULE_0__.Sentinel(this.getDocument()).on(this.selectorExpression, handler);
    }
}


/***/ }),

/***/ "./src/main/collectors/BasketClickCollector.ts":
/*!*****************************************************!*\
  !*** ./src/main/collectors/BasketClickCollector.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasketClickCollector": () => (/* binding */ BasketClickCollector)
/* harmony export */ });
/* harmony import */ var _ClickCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClickCollector */ "./src/main/collectors/ClickCollector.ts");
/* harmony import */ var _utils_ListenerType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ListenerType */ "./src/main/utils/ListenerType.ts");


/**
 * Collect id and price if an item was add into the basket
 */
class BasketClickCollector extends _ClickCollector__WEBPACK_IMPORTED_MODULE_0__.ClickCollector {
    constructor(selector, idResolver, priceResolver, listenerType = _utils_ListenerType__WEBPACK_IMPORTED_MODULE_1__.ListenerType.Sentinel) {
        super(selector, "basket", listenerType);
        this.idResolver = idResolver;
        this.priceResolver = priceResolver;
    }
    /**
     * Collect the product click information from the element
     * @override
     */
    collect(element, event, log) {
        const id = this.resolve(this.idResolver, log, element, event);
        if (id) {
            return {
                id,
                price: this.resolve(this.priceResolver, log, element, event)
            };
        }
    }
}


/***/ }),

/***/ "./src/main/collectors/BrowserCollector.ts":
/*!*************************************************!*\
  !*** ./src/main/collectors/BrowserCollector.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowserCollector": () => (/* binding */ BrowserCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");

/**
 * Collect basic browser information. Note that depending on how you use this you may
 * need to consult the GDPR guidelines
 */
class BrowserCollector extends _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__.AbstractCollector {
    constructor(options = { recordUrl: true, recordReferrer: true, recordLanguage: false, recordUserAgent: false }) {
        super("browser");
        this.recordUrl = options.recordUrl || false;
        this.recordReferrer = options.recordReferrer || false;
        this.recordLanguage = options.recordLanguage || false;
        this.recordUserAgent = options.recordUserAgent || false;
    }
    /**
     * Attach a writer, note that this collector is not asynchronous and will write
     * the data immediatelly
     *
     * @param {object} writer - The writer to send the data to
     */
    attach(writer) {
        const win = this.getWindow();
        const doc = this.getDocument();
        const data = {
            type: this.getType(),
            touch: ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
        };
        if (this.recordLanguage)
            data.lang = win.navigator.language;
        if (this.recordUrl)
            data.url = win.location.href;
        if (this.recordReferrer)
            data.ref = doc.referrer;
        if (this.recordUserAgent)
            data.agent = window.navigator.userAgent;
        writer.write(data);
    }
}


/***/ }),

/***/ "./src/main/collectors/CheckoutClickCollector.ts":
/*!*******************************************************!*\
  !*** ./src/main/collectors/CheckoutClickCollector.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckoutClickCollector": () => (/* binding */ CheckoutClickCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");
/* harmony import */ var _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Sentinel */ "./src/main/utils/Sentinel.ts");
/* harmony import */ var _utils_ListenerType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/ListenerType */ "./src/main/utils/ListenerType.ts");



/**
 * Triggered by a clickSelector, the collector will fire the contentSelector to select elements to collect
 * information from and write to the collector writer
 */
class CheckoutClickCollector extends _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__.AbstractCollector {
    constructor(clickSelector, contentSelector, idResolver, priceResolver, amountResolver, listenerType = _utils_ListenerType__WEBPACK_IMPORTED_MODULE_2__.ListenerType.Sentinel) {
        super("checkout");
        this.clickSelector = clickSelector;
        this.contentSelector = contentSelector;
        this.idResolver = idResolver;
        this.priceResolver = priceResolver;
        this.amountResolver = amountResolver;
        this.listenerType = listenerType;
    }
    /**
     * Add click event listeners to the identified elements, write the data
     * when the event occurs
     *
     * @param {object} writer - The writer to send the data to
     * @param log
     */
    attach(writer, log) {
        const doc = this.getDocument();
        // Activates on click of the element selected using the clickSelector
        const handler = (event) => {
            const elements = doc.querySelectorAll(this.contentSelector);
            elements.forEach(element => {
                const id = this.resolve(this.idResolver, log, element, event);
                if (id) {
                    const data = {
                        id,
                        price: this.resolve(this.priceResolver, log, element, event),
                        amount: this.resolve(this.amountResolver, log, element, event)
                    };
                    // We write each item separately - they may be coming from different queries
                    // thus when we try to resolve the trail for each of them we need to have them
                    // as separate records
                    writer.write({
                        type: this.getType(),
                        ...data
                    });
                }
            });
        };
        // The Sentiel library uses animationstart event listeners which may interfere with
        // animations attached on elemenets. The in-library provided workaround mechanism does not work
        // 100%, thus we provide the listenerType choice below. The tradeoffs
        // "dom" - no animation interference, only onclick attached, but does not handle elements inserted in the DOM later
        // "sentinel (default)" - works on elements inserted in the DOM anytime, but interferes with CSS animations on these elements
        if (this.listenerType === _utils_ListenerType__WEBPACK_IMPORTED_MODULE_2__.ListenerType.Dom) {
            const nodeList = doc.querySelectorAll(this.clickSelector);
            nodeList.forEach((el) => el.addEventListener("click", this.logWrapHandler(handler, log), {
                passive: true,
                capture: true
            }));
        }
        else {
            const sentinel = new _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__.Sentinel(this.getDocument());
            sentinel.on(this.clickSelector, el => el.addEventListener("click", this.logWrapHandler(handler, log), {
                passive: true,
                capture: true
            }));
        }
    }
}


/***/ }),

/***/ "./src/main/collectors/ClickCollector.ts":
/*!***********************************************!*\
  !*** ./src/main/collectors/ClickCollector.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClickCollector": () => (/* binding */ ClickCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");
/* harmony import */ var _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Sentinel */ "./src/main/utils/Sentinel.ts");
/* harmony import */ var _utils_ListenerType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/ListenerType */ "./src/main/utils/ListenerType.ts");



/**
 * Collect clicks on elements matching a query selector. Handles both DOM elements
 * present in the DOM and elements inserted after the page load / collector construction.
 *
 * When a click occurs, a function provided at construction time get invoked to collect data points
 * from the element.
 */
class ClickCollector extends _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__.AbstractCollector {
    /**
     * Construct a click collector
     *
     * @constructor
     * @param {string} selectorExpression - Document query selector identifying the elements to attach to
     * @param {string} type - The type OF element click to report
     * @param {string} listenerType - Whether the listener should be a dom or sentinel listener
     * @param context
     */
    constructor(selectorExpression, type = "click", listenerType = _utils_ListenerType__WEBPACK_IMPORTED_MODULE_2__.ListenerType.Sentinel, context) {
        super(type, context);
        this.selectorExpression = selectorExpression;
        this.listenerType = listenerType;
    }
    /**
     * Abstract collection method, must be overridden in the subclasses
     * @abstract
     */
    collect(element, event, log) {
        return undefined;
    }
    /**
     * Add click event listeners to the identified elements, write the data
     * when the event occurs
     *
     * @param {object} writer - The writer to send the data to
     * @param log
     */
    attach(writer, log) {
        const handler = (event, element) => {
            const payload = this.collect(element, event, log);
            if (payload) {
                writer.write({
                    type: this.type,
                    ...payload
                });
            }
        };
        // The Sentiel library uses animationstart event listeners which may interfere with
        // animations attached on elemenets. The in-library provided workaround mechanism does not work
        // 100%, thus we provide the listenerType choice below. The tradeoffs
        // "dom" - no animation interference, only onclick attached, but does not handle elements inserted in the DOM later
        // "sentinel (default)" - works on elements inserted in the DOM anytime, but interferes with CSS animations on these elements
        if (this.listenerType === _utils_ListenerType__WEBPACK_IMPORTED_MODULE_2__.ListenerType.Dom) {
            const nodeList = this.getDocument().querySelectorAll(this.selectorExpression);
            nodeList.forEach((el) => el.addEventListener("click", this.logWrapHandler(handler, log, el), {
                passive: true,
                capture: true
            }));
        }
        else {
            const sentinel = new _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__.Sentinel(this.getDocument());
            sentinel.on(this.selectorExpression, el => el.addEventListener("click", this.logWrapHandler(handler, log, el), {
                passive: true,
                capture: true
            }));
        }
    }
}


/***/ }),

/***/ "./src/main/collectors/ClickWriterResolverCollector.ts":
/*!*************************************************************!*\
  !*** ./src/main/collectors/ClickWriterResolverCollector.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClickWriterResolverCollector": () => (/* binding */ ClickWriterResolverCollector)
/* harmony export */ });
/* harmony import */ var _utils_ListenerType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ListenerType */ "./src/main/utils/ListenerType.ts");
/* harmony import */ var _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Sentinel */ "./src/main/utils/Sentinel.ts");
/* harmony import */ var _WriterResolverCollector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WriterResolverCollector */ "./src/main/collectors/WriterResolverCollector.ts");



/**
 * Extends WriterResolverCollector and invokes the WriterResolverCollector#attach(writer, log)
 * when a click on an element for the provided "selectorExpression" occurs
 */
class ClickWriterResolverCollector extends _WriterResolverCollector__WEBPACK_IMPORTED_MODULE_2__.WriterResolverCollector {
    /**
     *
     * @param selectorExpression the css expression to query for other elements
     * @param type the type of the event
     * @param resolver a {WriterResolver} which will be executed as soon as an element matching the selectorExpression is clicked
     * @param listenerType {ListenerType}
     */
    constructor(selectorExpression, type, resolver, listenerType = _utils_ListenerType__WEBPACK_IMPORTED_MODULE_0__.ListenerType.Sentinel) {
        super(type, resolver);
        this.selectorExpression = selectorExpression;
        this.listenerType = listenerType;
    }
    attach(writer, log) {
        const handler = (el, event) => {
            super.attach(writer, log);
        };
        if (this.listenerType === _utils_ListenerType__WEBPACK_IMPORTED_MODULE_0__.ListenerType.Dom) {
            const nodeList = this.getDocument().querySelectorAll(this.selectorExpression);
            nodeList.forEach(el => el.addEventListener("click", ev => this.logWrapHandler(handler, log, el, ev)(), {
                passive: true,
                capture: true
            }));
        }
        else {
            const sentinel = new _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__.Sentinel(this.getDocument());
            sentinel.on(this.selectorExpression, el => el.addEventListener("click", ev => this.logWrapHandler(handler, log, el, ev)(), {
                passive: true,
                capture: true
            }));
        }
    }
}


/***/ }),

/***/ "./src/main/collectors/FilterClickCollector.ts":
/*!*****************************************************!*\
  !*** ./src/main/collectors/FilterClickCollector.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilterClickCollector": () => (/* binding */ FilterClickCollector)
/* harmony export */ });
/* harmony import */ var _ClickCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClickCollector */ "./src/main/collectors/ClickCollector.ts");

/**
 * ClickCollector emitting "filter" events, attach to facet links
 */
class FilterClickCollector extends _ClickCollector__WEBPACK_IMPORTED_MODULE_0__.ClickCollector {
    constructor(selector, collector) {
        super(selector, "filter");
        this.resolver = collector;
    }
    /**
     * Collect the product click information from the element
     * @override
     */
    collect(element, event, log) {
        return { query: this.resolve(this.resolver, log, element, event) };
    }
}


/***/ }),

/***/ "./src/main/collectors/FiredSearchCollector.ts":
/*!*****************************************************!*\
  !*** ./src/main/collectors/FiredSearchCollector.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FiredSearchCollector": () => (/* binding */ FiredSearchCollector)
/* harmony export */ });
/* harmony import */ var _WriterResolverCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WriterResolverCollector */ "./src/main/collectors/WriterResolverCollector.ts");

/**
 * Triggered when the client has triggered/fired a search
 */
class FiredSearchCollector extends _WriterResolverCollector__WEBPACK_IMPORTED_MODULE_0__.WriterResolverCollector {
    /**
     * Construct fired search collector
     *
     * @constructor
     * @param {function} resolver - Function that triggers the writing. We can't always determine when search triggers, leave to the implementation to determine when/how
     */
    constructor(resolver) {
        super("fired-search", resolver);
    }
}


/***/ }),

/***/ "./src/main/collectors/GenericEventCollector.ts":
/*!******************************************************!*\
  !*** ./src/main/collectors/GenericEventCollector.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenericEventCollector": () => (/* binding */ GenericEventCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");

/**
 * Collect different type of events via a custom event. The custom event should hold the properties
 * "type" and "data" in the custom payload.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events for guidance
 */
class GenericEventCollector extends _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__.AbstractCollector {
    /**
     * Construct event based collector
     *
     * @constructor
     * @param {string} eventName - the name of the event to react on
     * @param type
     */
    constructor(eventName, type = "GenericEvent") {
        super(type);
        this.eventName = eventName;
    }
    /**
     * Attach a writer, note that this collector is asynchronous and will write
     * the data when the event triggers
     *
     * @param {object} writer - The writer to send the data to
     * @param log
     */
    attach(writer, log) {
        this.getWindow().addEventListener(this.eventName, this.logWrapHandler((e) => {
            writer.write({
                "type": e.detail.type,
                ...e.detail.data
            });
        }, log));
    }
}


/***/ }),

/***/ "./src/main/collectors/ImpressionCollector.ts":
/*!****************************************************!*\
  !*** ./src/main/collectors/ImpressionCollector.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImpressionCollector": () => (/* binding */ ImpressionCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");
/* harmony import */ var _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Sentinel */ "./src/main/utils/Sentinel.ts");
/* harmony import */ var scrollmonitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scrollmonitor */ "./node_modules/scrollmonitor/dist/module/index.js");
/* harmony import */ var _utils_LocalStorageQueue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/LocalStorageQueue */ "./src/main/utils/LocalStorageQueue.ts");
/* harmony import */ var _utils_Util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Util */ "./src/main/utils/Util.ts");





/**
 * Collect impressions - a display of a product in the browser viewport. If the product is shown multiple
 * times, the collector will record multiple events i.e. we don't apply filter logic here.
 *
 * Handles both DOM elements present in the DOM and elements inserted after the page load / collector construction.
 */
class ImpressionCollector extends _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__.AbstractCollector {
    /**
     * Construct impression collector
     *
     * @constructor
     * @param {string} selectorExpression - Document query selector identifying the elements to attach to
     * @param idResolver - Resolve the id of the element
     * @param positionResolver - Resolve the position of the element in dom
     * @param expectedPageResolver - If supplied, impressions will only be tracked if this resolver returns true. Comes in handy for single page applications
     */
    constructor(selectorExpression, idResolver, positionResolver, expectedPageResolver) {
        super("impression");
        this.selectorExpression = selectorExpression;
        this.idResolver = idResolver;
        this.positionResolver = positionResolver;
        this.expectedPageResolver = expectedPageResolver;
        this.queue = new _utils_LocalStorageQueue__WEBPACK_IMPORTED_MODULE_3__.LocalStorageQueue("impressions");
    }
    /**
     * Add impression event listeners to the identified elements, write the data
     * when the event occurs, with a delay of 1s - we could gather many events within this timeframe
     *
     * @param {object} writer - The writer to send the data to
     * @param {Logger} log - The logger
     */
    attach(writer, log) {
        const flush = (0,_utils_Util__WEBPACK_IMPORTED_MODULE_4__.debounce)(() => {
            this.queue.transactionalDrain(queue => new Promise(res => {
                res(writer.write({
                    type: this.type,
                    data: queue
                }));
            }))
                .catch(err => log.error("Could not drain queue: ", err));
        }, 250);
        const handler = element => {
            scrollmonitor__WEBPACK_IMPORTED_MODULE_2__["default"].create(element).enterViewport(() => {
                if (this.expectedPageResolver && !this.expectedPageResolver()) {
                    return;
                }
                this.queue.push({
                    id: this.resolve(this.idResolver, log, element),
                    position: this.resolve(this.positionResolver, log, element)
                });
                flush();
            }, true);
        };
        new _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__.Sentinel(this.getDocument()).on(this.selectorExpression, this.logWrapHandler(handler, log));
    }
}


/***/ }),

/***/ "./src/main/collectors/InstantSearchQueryCollector.ts":
/*!************************************************************!*\
  !*** ./src/main/collectors/InstantSearchQueryCollector.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InstantSearchQueryCollector": () => (/* binding */ InstantSearchQueryCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");
/* harmony import */ var _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Sentinel */ "./src/main/utils/Sentinel.ts");
/* harmony import */ var _utils_ListenerType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/ListenerType */ "./src/main/utils/ListenerType.ts");



/**
 * Collect search information from a field that has a "as-you-type" trigger and
 * renders search results immediately. May trigger multiple times depending on
 * type speed patterns - we expect that the interval between key strokes would be
 * less than 500ms
 */
class InstantSearchQueryCollector extends _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__.AbstractCollector {
    /**
     * Construct instant search collector
     *
     * @constructor
     * @param {string} selectorExpression - Document query selector identifying the elements to attach to
     * @param delayMs
     * @param minLength
     * @param listenerType
     */
    constructor(selectorExpression, delayMs = 500, minLength = 2, listenerType = _utils_ListenerType__WEBPACK_IMPORTED_MODULE_2__.ListenerType.Sentinel) {
        super("instant-search");
        this.selectorExpression = selectorExpression;
        this.delayMs = delayMs;
        this.minLength = minLength;
        this.listenerType = listenerType;
    }
    /**
     * Add impression event listeners to the identified elements, write the data
     * when the event occurs
     *
     * @param {object} writer - The writer to send the data to
     * @param log
     */
    attach(writer, log) {
        const type = this.getType();
        const handler = (e, searchBox) => {
            // Ignore shift, ctrl, etc. presses, react only on characters
            if (e.which === 0) {
                return;
            }
            // Delay the reaction of the event, clean the timeout if the event fires
            // again and start counting from 0
            delay((timestamp) => {
                const keywords = searchBox.value;
                if (keywords && keywords.length >= this.minLength) {
                    writer.write({
                        "type": type,
                        "keywords": keywords,
                        timestamp
                    });
                }
            }, this.delayMs);
        };
        // The Sentiel library uses animationstart event listeners which may interfere with
        // animations attached on elemenets. The in-library provided workaround mechanism does not work
        // 100%, thus we provide the listenerType choice below. The tradeoffs
        // "dom" - no animation interference, only onclick attached, but does not handle elements inserted in the DOM later
        // "sentinel (default)" - works on elements inserted in the DOM anytime, but interferes with CSS animations on these elements
        if (this.listenerType === _utils_ListenerType__WEBPACK_IMPORTED_MODULE_2__.ListenerType.Dom) {
            const nodeList = this.getDocument().querySelectorAll(this.selectorExpression);
            nodeList.forEach(el => el.addEventListener("keyup", this.logWrapHandler(handler, log, el)));
        }
        else {
            new _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__.Sentinel(this.getDocument()).on(this.selectorExpression, (el) => {
                el.addEventListener("keyup", this.logWrapHandler(handler, log, el));
            });
        }
    }
}
const delay = (function () {
    let timer;
    let time;
    return function (callback, ms) {
        clearTimeout(timer);
        if (!time)
            time = new Date().getTime();
        timer = setTimeout(() => {
            callback(time);
            time = null;
        }, ms);
    };
})();


/***/ }),

/***/ "./src/main/collectors/ProductClickCollector.ts":
/*!******************************************************!*\
  !*** ./src/main/collectors/ProductClickCollector.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductClickCollector": () => (/* binding */ ProductClickCollector)
/* harmony export */ });
/* harmony import */ var _ClickCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClickCollector */ "./src/main/collectors/ClickCollector.ts");
/* harmony import */ var _utils_ListenerType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ListenerType */ "./src/main/utils/ListenerType.ts");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../query */ "./src/main/query/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/main/utils/index.ts");




/**
 * ClickCollector emitting "product" events, attach to product links
 */
class ProductClickCollector extends _ClickCollector__WEBPACK_IMPORTED_MODULE_0__.ClickCollector {
    constructor(selector, resolvers, listenerType = _utils_ListenerType__WEBPACK_IMPORTED_MODULE_1__.ListenerType.Sentinel) {
        super(selector, "product", listenerType);
        this.idResolver = resolvers.idResolver;
        this.positionResolver = resolvers.positionResolver;
        this.priceResolver = resolvers.priceResolver;
        this.imageResolver = resolvers.imageResolver;
        this.metadataResolver = resolvers.metadataResolver;
        this.trail = resolvers.trail;
    }
    /**
     * Collect the product click information from the element
     * @override
     */
    collect(element, event, log) {
        const id = this.resolve(this.idResolver, log, element, event);
        if (id) {
            const clickData = {
                id,
                position: this.resolve(this.positionResolver, log, element, event),
                price: this.resolve(this.priceResolver, log, element, event),
                image: this.resolve(this.imageResolver, log, element, event),
                metadata: this.resolve(this.metadataResolver, log, element, event)
            };
            if (this.trail) {
                // After a redirect a trail with the pathname is registered containing the query which triggered the redirect.
                // If we have such a query we use it to build the trail.
                const trailData = this.trail.fetch((0,_utils__WEBPACK_IMPORTED_MODULE_3__.normalizePathname)(location.pathname));
                if (trailData) {
                    clickData.query = trailData.query;
                }
                // Register that this product journey into potential purchase started
                // with this query
                this.trail.register(id, _query__WEBPACK_IMPORTED_MODULE_2__.TrailType.Main, trailData === null || trailData === void 0 ? void 0 : trailData.query);
            }
            return clickData;
        }
    }
}


/***/ }),

/***/ "./src/main/collectors/RedirectCollector.ts":
/*!**************************************************!*\
  !*** ./src/main/collectors/RedirectCollector.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RedirectCollector": () => (/* binding */ RedirectCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");
/* harmony import */ var _resolvers_Resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resolvers/Resolver */ "./src/main/resolvers/Resolver.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/main/utils/index.ts");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../query */ "./src/main/query/index.ts");




/**
 * Keep track of human triggered searches followed by a redirect to a page different than the search result page
 */
class RedirectCollector extends _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__.AbstractCollector {
    /**
     * Construct redirect collector
     *
     * @constructor
     * @param {function} triggerResolver - Function that fires when a search happens, should return the keyword
     * @param {function} expectedPageResolver - Function that should return whether the page we load is the expected one
     * @param redirectKpiParams - Parameters for collecting KPI's after a redirect
     * @param listenerType
     * @param context
     */
    constructor(triggerResolver, expectedPageResolver, redirectKpiParams = {}, listenerType = _utils__WEBPACK_IMPORTED_MODULE_2__.ListenerType.Sentinel, context) {
        var _a, _b;
        super("redirect", context);
        this.triggerResolver = triggerResolver;
        this.expectedPageResolver = expectedPageResolver;
        this.redirectKpiParams = redirectKpiParams;
        this.listenerType = listenerType;
        /**
         * Used to track if the collectors have been attached already in case attached is called multiple times
         * @private
         */
        this.isCollectorsAttached = false;
        /**
         * Used to track if the trigger has been installed already in case attached is called multiple times
         */
        this.isTriggerInstalled = false;
        this.triggerResolver = triggerResolver;
        this.expectedPageResolver = expectedPageResolver;
        this.listenerType = listenerType;
        this.collectors = redirectKpiParams.collectors || [];
        this.resultCountResolver = redirectKpiParams.resultCountResolver || (_ => void 0);
        this.redirectTTL = this.redirectKpiParams.redirectTTLMillis || 86400000;
        this.maxPathSegments = this.redirectKpiParams.maxPathSegments || -1;
        this.subSelectors = ((_a = this.redirectKpiParams.nestedRedirects) === null || _a === void 0 ? void 0 : _a.subSelectors) || [];
        this.depth = ((_b = this.redirectKpiParams.nestedRedirects) === null || _b === void 0 ? void 0 : _b.depth) || 1;
        this.queryResolver = (phrase) => {
            if (phrase.indexOf("$s=") > -1) {
                return new _query__WEBPACK_IMPORTED_MODULE_3__.Query(phrase);
            }
            const query = new _query__WEBPACK_IMPORTED_MODULE_3__.Query();
            query.setSearch(phrase);
            return query;
        };
        this.sessionResolver = () => (0,_resolvers_Resolver__WEBPACK_IMPORTED_MODULE_1__.cookieSessionResolver)();
        this.redirectTrail = new _query__WEBPACK_IMPORTED_MODULE_3__.Trail(() => {
            const pathInfo = RedirectCollector.getRedirectPathInfo(this.getPathname());
            return new _query__WEBPACK_IMPORTED_MODULE_3__.Query(pathInfo === null || pathInfo === void 0 ? void 0 : pathInfo.query);
        }, this.sessionResolver);
    }
    setContext(context) {
        super.setContext(context);
        this.collectors.forEach(collector => collector.setContext(context));
    }
    /**
     * Marks this path as a redirect landing page.
     * @param path the pathname e.g. /some-path
     * @param query the query which lead to this path
     * @param key the key to store the redirect path in
     * @private
     */
    static setRedirectPath(path, query, key = RedirectCollector.PATH_STORAGE_KEY) {
        const redirectPaths = this.getRedirectPaths();
        redirectPaths[path] = {
            query,
            timestamp: new Date().getTime()
        };
        (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getSessionStorage)().setItem(key, JSON.stringify(redirectPaths));
    }
    /**
     * Get all marked paths
     * @private
     */
    static getRedirectPaths(key = RedirectCollector.PATH_STORAGE_KEY) {
        return JSON.parse((0,_utils__WEBPACK_IMPORTED_MODULE_2__.getSessionStorage)().getItem(key) || "{}");
    }
    /**
     * Retrieve data for the given path
     * @param path
     * @param key
     * @private
     */
    static getRedirectPathInfo(path, key = RedirectCollector.PATH_STORAGE_KEY) {
        return this.getRedirectPaths(key)[path];
    }
    /**
     * Delete all expired redirect paths
     * @private
     */
    expireRedirectPaths(key = RedirectCollector.PATH_STORAGE_KEY) {
        const redirectPaths = RedirectCollector.getRedirectPaths(key);
        const now = new Date().getTime();
        Object.keys(redirectPaths).forEach(path => {
            const pathInfo = redirectPaths[path];
            if (now - Number(pathInfo.timestamp) > this.redirectTTL) {
                delete redirectPaths[path];
            }
        });
        (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getSessionStorage)().setItem(key, JSON.stringify(redirectPaths));
    }
    /**
     * Check whether we should be recording a redirect event
     *
     * @param {object} writer - The writer to send the data to
     * @param log
     */
    attach(writer, log) {
        if (this.isTriggerInstalled === false) {
            this.resolve(this.triggerResolver, log, keyword => (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getSessionStorage)().setItem(RedirectCollector.LAST_SEARCH_STORAGE_KEY, keyword));
            this.isTriggerInstalled = true;
        }
        this.expireRedirectPaths();
        // Fetch the latest search if any
        const lastSearch = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getSessionStorage)().getItem(RedirectCollector.LAST_SEARCH_STORAGE_KEY);
        const pathname = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.normalizePathname)(this.getWindow().location.pathname);
        if (lastSearch) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getSessionStorage)().removeItem(RedirectCollector.LAST_SEARCH_STORAGE_KEY);
            // If we have not landed on the expected search page, it must have been a redirect
            if (shouldTrackRedirect(document.referrer) && !this.resolve(this.expectedPageResolver, log)) {
                const query = this.queryResolver(lastSearch).toString();
                writer.write({
                    type: "redirect",
                    keywords: lastSearch,
                    query,
                    url: window.location.href,
                    resultCount: this.resolve(this.resultCountResolver, log)
                });
                // mark as redirect landing page
                RedirectCollector.setRedirectPath(this.getPathname(), query);
                // register trail on the current pathname because the ProductClick collector doesn't know about the maxPathSegments property
                this.redirectTrail.register(pathname, _query__WEBPACK_IMPORTED_MODULE_3__.TrailType.Main);
            }
        }
        // this is only  triggered when a subSelector item was clicked i.e. a nested redirect
        const lastSearchNestedRedirect = this.getNestedRedirect();
        if (lastSearchNestedRedirect) {
            const query = this.queryResolver(lastSearchNestedRedirect.query).toString();
            RedirectCollector.setRedirectPath(this.getPathname(), query);
            // register trail on the current pathname because the ProductClick collector doesn't know about the maxPathSegments property
            this.redirectTrail.register(pathname, _query__WEBPACK_IMPORTED_MODULE_3__.TrailType.Main);
            (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getSessionStorage)().removeItem(RedirectCollector.NESTED_REDIRECT_KEYWORDS_STORAGE_KEY);
        }
        /**
         * Check if we have tracked this path before and if it is still valid.
         * If valid, we have to attach the KPI collectors to gather KPIs for this landing page.
         * We have to do this because people can navigate away from the landing page and back again and we don't want to lose all subsequent clicks etc.
         */
        const pathInfo = this.redirectTrail.fetch(this.getPathname());
        if (pathInfo && this.isCollectorsAttached !== true) {
            this.attachCollectors(writer, log, pathInfo.query);
            this.isCollectorsAttached = true;
            // register trail on the current pathname because the ProductClick collector doesn't know about the maxPathSegments property
            this.redirectTrail.register(pathname, _query__WEBPACK_IMPORTED_MODULE_3__.TrailType.Main);
            // if we have nested redirects, we have to carry the query parameters over to the next page
            this.attachSubSelectors(pathInfo, (lastSearchNestedRedirect === null || lastSearchNestedRedirect === void 0 ? void 0 : lastSearchNestedRedirect.depth) || 0);
        }
    }
    getNestedRedirect() {
        const payload = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getSessionStorage)().getItem(RedirectCollector.NESTED_REDIRECT_KEYWORDS_STORAGE_KEY);
        if (payload) {
            return JSON.parse(payload);
        }
        return undefined;
    }
    isMaxDepthExceeded(currentDepth = 0) {
        return currentDepth >= this.depth;
    }
    registerNestedRedirect(query, currentDepth = 0) {
        if (this.isMaxDepthExceeded(currentDepth))
            return;
        const payload = {
            query: query,
            depth: currentDepth + 1
        };
        (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getSessionStorage)().setItem(RedirectCollector.NESTED_REDIRECT_KEYWORDS_STORAGE_KEY, JSON.stringify(payload));
    }
    attachSubSelectors(pathInfo, currentDepth) {
        if (this.isMaxDepthExceeded(currentDepth))
            return;
        this.subSelectors.forEach(selector => {
            const handleClick = () => {
                this.registerNestedRedirect(pathInfo.query, currentDepth);
            };
            if (this.listenerType === _utils__WEBPACK_IMPORTED_MODULE_2__.ListenerType.Sentinel) {
                const sentinel = new _utils__WEBPACK_IMPORTED_MODULE_2__.Sentinel(this.getDocument());
                sentinel.on(selector, element => {
                    const info = this.redirectTrail.fetch(this.getPathname());
                    if (info) { // the sentinel can trigger on any page, we need to make sure we attach subSelectors only on valid redirect paths
                        element.addEventListener("click", handleClick);
                    }
                });
            }
            else {
                document.querySelectorAll(selector).forEach(element => {
                    element.addEventListener("click", handleClick);
                });
            }
        });
    }
    getPathname() {
        const pathname = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.normalizePathname)(this.getWindow().location.pathname);
        if (this.maxPathSegments > 0) {
            const pathSegments = pathname.split("/");
            return (0,_utils__WEBPACK_IMPORTED_MODULE_2__.normalizePathname)(pathSegments.filter(s => !!s).slice(0, this.maxPathSegments).join("/"));
        }
        return pathname;
    }
    attachCollectors(writer, log, query) {
        // attach all collectors which are responsible to gather kpi's after the redirect
        this.collectors.forEach(collector => {
            try {
                collector.attach({
                    write(data) {
                        writer.write({ ...data, query: data.query || query });
                    }
                }, log);
            }
            catch (e) {
                if (log)
                    log.error(e);
            }
        });
    }
}
/**
 * Key used to store the keywords of the last executed search
 */
RedirectCollector.LAST_SEARCH_STORAGE_KEY = "__lastSearch";
/**
 * Key used to store query information for a given redirect landing page (path of the url)
 */
RedirectCollector.PATH_STORAGE_KEY = "___pathStorage";
RedirectCollector.NESTED_REDIRECT_KEYWORDS_STORAGE_KEY = "___nestedRedirectKeywordsStorage";
function shouldTrackRedirect(referer) {
    if (referer) {
        try {
            const refUrl = new URL(referer);
            const currentUrl = new URL(window.location.href);
            if (currentUrl.origin && refUrl.origin)
                return refUrl.origin === currentUrl.origin;
        }
        catch (e) {
            console.error(e);
        }
    }
    return true;
}


/***/ }),

/***/ "./src/main/collectors/SearchResultCollector.ts":
/*!******************************************************!*\
  !*** ./src/main/collectors/SearchResultCollector.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchResultCollector": () => (/* binding */ SearchResultCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");

/**
 * Collect the basic search information - the keywords used for the search and
 * the number of results. Synchronous i.e. the writing happens directly when a writer is attached.
 * See the other search collectors for dynamic ones.
 */
class SearchResultCollector extends _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__.AbstractCollector {
    /**
     * Construct search result collector
     *
     * @constructor
     * @param {function} phraseResolver - Function that should return the search phrase used for the search
     * @param {function} countResolver - Function that should return the numnber of results in the search
     * @param {function} actionResolver - A search result may be refined or a client may browse 2,3,4 page.
     * This function should provide a text represantion of the action
     */
    constructor(phraseResolver, countResolver, actionResolver) {
        super("search");
        this.phraseResolver = phraseResolver;
        this.countResolver = countResolver;
        this.actionResolver = actionResolver;
    }
    /**
     * Attach a writer, note that this collector is not asynchronous and will write
     * the data immediatelly
     *
     * @param {object} writer - The writer to send the data to
     * @param {object} log - The logger
     */
    attach(writer, log) {
        writer.write({
            type: "search",
            keywords: this.resolve(this.phraseResolver, log, {}),
            count: this.resolve(this.countResolver, log, {}),
            action: this.resolve(this.actionResolver, log, {}) || "search"
        });
    }
}


/***/ }),

/***/ "./src/main/collectors/SuggestSearchCollector.ts":
/*!*******************************************************!*\
  !*** ./src/main/collectors/SuggestSearchCollector.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SuggestSearchCollector": () => (/* binding */ SuggestSearchCollector)
/* harmony export */ });
/* harmony import */ var _WriterResolverCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WriterResolverCollector */ "./src/main/collectors/WriterResolverCollector.ts");

/**
 * Collect suggest search information - keyword searches coming from a suggestion widget/functionality
 */
class SuggestSearchCollector extends _WriterResolverCollector__WEBPACK_IMPORTED_MODULE_0__.WriterResolverCollector {
    /**
     * Construct suggest search collector
     *
     * @constructor
     * @param {function} resolver - Function that triggers the writing. Suggest might be complex, leave to the implementation to determine when/how
     */
    constructor(resolver) {
        super("suggest-search", resolver);
    }
}


/***/ }),

/***/ "./src/main/collectors/WriterResolverCollector.ts":
/*!********************************************************!*\
  !*** ./src/main/collectors/WriterResolverCollector.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WriterResolverCollector": () => (/* binding */ WriterResolverCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");

/**
 * Resolves immediately and passing the writer, the type of the event + context to the provided resolver function.
 */
class WriterResolverCollector extends _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__.AbstractCollector {
    constructor(type, resolver) {
        super(type);
        this.resolver = resolver;
    }
    attach(writer, log) {
        this.resolve(this.resolver, log, writer, this.getType(), this.getContext());
    }
}


/***/ }),

/***/ "./src/main/collectors/index.ts":
/*!**************************************!*\
  !*** ./src/main/collectors/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractCollector": () => (/* reexport safe */ _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__.AbstractCollector),
/* harmony export */   "AssociatedProductCollector": () => (/* reexport safe */ _AssociatedProductCollector__WEBPACK_IMPORTED_MODULE_1__.AssociatedProductCollector),
/* harmony export */   "BasketClickCollector": () => (/* reexport safe */ _BasketClickCollector__WEBPACK_IMPORTED_MODULE_2__.BasketClickCollector),
/* harmony export */   "BrowserCollector": () => (/* reexport safe */ _BrowserCollector__WEBPACK_IMPORTED_MODULE_3__.BrowserCollector),
/* harmony export */   "CheckoutClickCollector": () => (/* reexport safe */ _CheckoutClickCollector__WEBPACK_IMPORTED_MODULE_4__.CheckoutClickCollector),
/* harmony export */   "ClickCollector": () => (/* reexport safe */ _ClickCollector__WEBPACK_IMPORTED_MODULE_5__.ClickCollector),
/* harmony export */   "ClickWriterResolverCollector": () => (/* reexport safe */ _ClickWriterResolverCollector__WEBPACK_IMPORTED_MODULE_6__.ClickWriterResolverCollector),
/* harmony export */   "FilterClickCollector": () => (/* reexport safe */ _FilterClickCollector__WEBPACK_IMPORTED_MODULE_7__.FilterClickCollector),
/* harmony export */   "FiredSearchCollector": () => (/* reexport safe */ _FiredSearchCollector__WEBPACK_IMPORTED_MODULE_8__.FiredSearchCollector),
/* harmony export */   "GenericEventCollector": () => (/* reexport safe */ _GenericEventCollector__WEBPACK_IMPORTED_MODULE_9__.GenericEventCollector),
/* harmony export */   "ImpressionCollector": () => (/* reexport safe */ _ImpressionCollector__WEBPACK_IMPORTED_MODULE_10__.ImpressionCollector),
/* harmony export */   "InstantSearchQueryCollector": () => (/* reexport safe */ _InstantSearchQueryCollector__WEBPACK_IMPORTED_MODULE_11__.InstantSearchQueryCollector),
/* harmony export */   "ProductClickCollector": () => (/* reexport safe */ _ProductClickCollector__WEBPACK_IMPORTED_MODULE_12__.ProductClickCollector),
/* harmony export */   "RedirectCollector": () => (/* reexport safe */ _RedirectCollector__WEBPACK_IMPORTED_MODULE_13__.RedirectCollector),
/* harmony export */   "SearchResultCollector": () => (/* reexport safe */ _SearchResultCollector__WEBPACK_IMPORTED_MODULE_14__.SearchResultCollector),
/* harmony export */   "SuggestSearchCollector": () => (/* reexport safe */ _SuggestSearchCollector__WEBPACK_IMPORTED_MODULE_15__.SuggestSearchCollector),
/* harmony export */   "WriterResolverCollector": () => (/* reexport safe */ _WriterResolverCollector__WEBPACK_IMPORTED_MODULE_16__.WriterResolverCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");
/* harmony import */ var _AssociatedProductCollector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssociatedProductCollector */ "./src/main/collectors/AssociatedProductCollector.ts");
/* harmony import */ var _BasketClickCollector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BasketClickCollector */ "./src/main/collectors/BasketClickCollector.ts");
/* harmony import */ var _BrowserCollector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BrowserCollector */ "./src/main/collectors/BrowserCollector.ts");
/* harmony import */ var _CheckoutClickCollector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CheckoutClickCollector */ "./src/main/collectors/CheckoutClickCollector.ts");
/* harmony import */ var _ClickCollector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ClickCollector */ "./src/main/collectors/ClickCollector.ts");
/* harmony import */ var _ClickWriterResolverCollector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ClickWriterResolverCollector */ "./src/main/collectors/ClickWriterResolverCollector.ts");
/* harmony import */ var _FilterClickCollector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FilterClickCollector */ "./src/main/collectors/FilterClickCollector.ts");
/* harmony import */ var _FiredSearchCollector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FiredSearchCollector */ "./src/main/collectors/FiredSearchCollector.ts");
/* harmony import */ var _GenericEventCollector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./GenericEventCollector */ "./src/main/collectors/GenericEventCollector.ts");
/* harmony import */ var _ImpressionCollector__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ImpressionCollector */ "./src/main/collectors/ImpressionCollector.ts");
/* harmony import */ var _InstantSearchQueryCollector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./InstantSearchQueryCollector */ "./src/main/collectors/InstantSearchQueryCollector.ts");
/* harmony import */ var _ProductClickCollector__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ProductClickCollector */ "./src/main/collectors/ProductClickCollector.ts");
/* harmony import */ var _RedirectCollector__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./RedirectCollector */ "./src/main/collectors/RedirectCollector.ts");
/* harmony import */ var _SearchResultCollector__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./SearchResultCollector */ "./src/main/collectors/SearchResultCollector.ts");
/* harmony import */ var _SuggestSearchCollector__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./SuggestSearchCollector */ "./src/main/collectors/SuggestSearchCollector.ts");
/* harmony import */ var _WriterResolverCollector__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./WriterResolverCollector */ "./src/main/collectors/WriterResolverCollector.ts");



















/***/ }),

/***/ "./src/main/logger/Logger.ts":
/*!***********************************!*\
  !*** ./src/main/logger/Logger.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/main/logger/LoggerTransport.ts":
/*!********************************************!*\
  !*** ./src/main/logger/LoggerTransport.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/main/logger/TransportLogger.ts":
/*!********************************************!*\
  !*** ./src/main/logger/TransportLogger.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransportLogger": () => (/* binding */ TransportLogger)
/* harmony export */ });
/**
 * Passes all log messages to the provided transports
 */
class TransportLogger {
    constructor(transports, isDebugEnabled = false) {
        this.transports = transports;
        this.isDebugEnabled = isDebugEnabled;
    }
    debug(msg, ...dataArgs) {
        this.transports.forEach(transport => this.callTransport(transport, "debug", msg, ...dataArgs));
    }
    error(msg, ...dataArgs) {
        this.transports.forEach(transport => this.callTransport(transport, "error", msg, ...dataArgs));
    }
    info(msg, ...dataArgs) {
        this.transports.forEach(transport => this.callTransport(transport, "info", msg, ...dataArgs));
    }
    warn(msg, ...dataArgs) {
        this.transports.forEach(transport => this.callTransport(transport, "warn", msg, ...dataArgs));
    }
    callTransport(transport, level, msg, ...dataArgs) {
        try {
            if (transport[level] && typeof transport[level] === "function")
                transport[level](msg, ...dataArgs);
        }
        catch (e) {
            if (this.isDebugEnabled)
                console.error("Could not call transport: ", e);
        }
    }
}


/***/ }),

/***/ "./src/main/logger/index.ts":
/*!**********************************!*\
  !*** ./src/main/logger/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleTransport": () => (/* reexport safe */ _transport__WEBPACK_IMPORTED_MODULE_3__.ConsoleTransport),
/* harmony export */   "SQSErrorTransport": () => (/* reexport safe */ _transport__WEBPACK_IMPORTED_MODULE_3__.SQSErrorTransport),
/* harmony export */   "SQSTransport": () => (/* reexport safe */ _transport__WEBPACK_IMPORTED_MODULE_3__.SQSTransport),
/* harmony export */   "TransportLogger": () => (/* reexport safe */ _TransportLogger__WEBPACK_IMPORTED_MODULE_2__.TransportLogger)
/* harmony export */ });
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ "./src/main/logger/Logger.ts");
/* harmony import */ var _LoggerTransport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoggerTransport */ "./src/main/logger/LoggerTransport.ts");
/* harmony import */ var _TransportLogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TransportLogger */ "./src/main/logger/TransportLogger.ts");
/* harmony import */ var _transport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transport */ "./src/main/logger/transport/index.ts");






/***/ }),

/***/ "./src/main/logger/transport/ConsoleTransport.ts":
/*!*******************************************************!*\
  !*** ./src/main/logger/transport/ConsoleTransport.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleTransport": () => (/* binding */ ConsoleTransport)
/* harmony export */ });
class ConsoleTransport {
    debug(msg, ...dataArgs) {
        console.debug(msg, ...dataArgs);
    }
    ;
    info(msg, ...dataArgs) {
        console.info(msg, ...dataArgs);
    }
    ;
    warn(msg, ...dataArgs) {
        console.warn(msg, ...dataArgs);
    }
    ;
    error(msg, ...dataArgs) {
        console.error(msg, ...dataArgs);
    }
    ;
}


/***/ }),

/***/ "./src/main/logger/transport/SQSErrorTransport.ts":
/*!********************************************************!*\
  !*** ./src/main/logger/transport/SQSErrorTransport.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SQSErrorTransport": () => (/* binding */ SQSErrorTransport)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/main/utils/index.ts");

/**
 * Only adds error messages to an sqs queue
 */
class SQSErrorTransport {
    constructor(queue, channel, sessionResolver, fifo = false) {
        this.queue = queue;
        this.channel = channel;
        this.sessionResolver = sessionResolver;
        this.fifo = fifo;
    }
    send(data) {
        const img = new Image();
        let src = this.queue + "?Version=2012-11-05&Action=SendMessage";
        // SQS supports FIFO queues in some regions that can also guarantee the order
        // of the messages.
        if (this.fifo) {
            // TODO when enough information is present to uniquely identify a message, switch the deduplication id to a message hash
            src += "&MessageGroupId=1&MessageDeduplicationId=" + Math.random();
        }
        if (!Array.isArray(data) && typeof data !== "string") {
            data = [data];
        }
        if (typeof data !== "string") {
            data = JSON.stringify(data);
        }
        src += "&MessageBody=" + (0,_utils__WEBPACK_IMPORTED_MODULE_0__.base64Encode)(encodeURIComponent(data));
        img.src = src;
    }
    error(msg, ...dataArgs) {
        this.send({
            type: "error",
            msg,
            channel: this.channel,
            session: this.sessionResolver(),
            timestamp: new Date().getTime(),
            ...dataArgs
        });
    }
    ;
}


/***/ }),

/***/ "./src/main/logger/transport/SQSTransport.ts":
/*!***************************************************!*\
  !*** ./src/main/logger/transport/SQSTransport.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SQSTransport": () => (/* binding */ SQSTransport)
/* harmony export */ });
/* harmony import */ var _SQSErrorTransport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SQSErrorTransport */ "./src/main/logger/transport/SQSErrorTransport.ts");

/**
 * Adds all log levels to an SQS queue
 */
class SQSTransport extends _SQSErrorTransport__WEBPACK_IMPORTED_MODULE_0__.SQSErrorTransport {
    debug(msg, ...dataArgs) {
        this.send({
            type: "debug",
            msg,
            ...dataArgs
        });
    }
    ;
    info(msg, ...dataArgs) {
        this.send({
            type: "info",
            msg,
            ...dataArgs
        });
    }
    ;
    warn(msg, ...dataArgs) {
        this.send({
            type: "warning",
            msg,
            ...dataArgs
        });
    }
    ;
}


/***/ }),

/***/ "./src/main/logger/transport/index.ts":
/*!********************************************!*\
  !*** ./src/main/logger/transport/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleTransport": () => (/* reexport safe */ _ConsoleTransport__WEBPACK_IMPORTED_MODULE_0__.ConsoleTransport),
/* harmony export */   "SQSErrorTransport": () => (/* reexport safe */ _SQSErrorTransport__WEBPACK_IMPORTED_MODULE_1__.SQSErrorTransport),
/* harmony export */   "SQSTransport": () => (/* reexport safe */ _SQSTransport__WEBPACK_IMPORTED_MODULE_2__.SQSTransport)
/* harmony export */ });
/* harmony import */ var _ConsoleTransport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConsoleTransport */ "./src/main/logger/transport/ConsoleTransport.ts");
/* harmony import */ var _SQSErrorTransport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SQSErrorTransport */ "./src/main/logger/transport/SQSErrorTransport.ts");
/* harmony import */ var _SQSTransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SQSTransport */ "./src/main/logger/transport/SQSTransport.ts");





/***/ }),

/***/ "./src/main/query/Query.ts":
/*!*********************************!*\
  !*** ./src/main/query/Query.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Query": () => (/* binding */ Query)
/* harmony export */ });
class Query {
    constructor(queryString) {
        /**
         * Remove all selections on this field
         */
        this.removeSelectionAt = function (pos) {
            arrayRemove(this.criteria, pos, pos);
        };
        this.criteria = [];
        var self = this;
        if (queryString) {
            var criteria = [];
            var ands = queryString.split("/");
            ands.forEach(function (and) {
                if (and.indexOf("|") != -1) {
                    var ors = and.split("|");
                    ors.forEach(function (or) {
                        criteria.push({ "selection": or, "type": "or" });
                    });
                }
                else {
                    criteria.push({ "selection": and, "type": "and" });
                }
            });
            criteria.forEach(function (criterion) {
                var c = unescape(criterion.selection);
                if (c.indexOf("=") != -1) {
                    var valueSplit = c.split("=");
                    self.criteria.push({
                        "field": valueSplit[0],
                        "operation": "=",
                        "value": valueSplit[1],
                        "aggregation": criterion.type
                    });
                }
                else if (c.indexOf("<") != -1) {
                    var valueSplit = c.split("<");
                    if (2 == valueSplit.length) {
                        self.criteria.push({
                            "field": valueSplit[0],
                            "operation": "<",
                            "value": valueSplit[1],
                            "aggregation": criterion.type
                        });
                    }
                    else if (3 == valueSplit.length) {
                        self.criteria.push({
                            "field": valueSplit[1],
                            "operation": "><",
                            "lowerValue": valueSplit[0],
                            "upperValue": valueSplit[2],
                            "aggregation": criterion.type
                        });
                    }
                }
                else if (c.indexOf(">") != -1) {
                    var valueSplit = c.split(">");
                    if (2 == valueSplit.length) {
                        self.criteria.push({
                            "field": valueSplit[0],
                            "operation": ">",
                            "value": valueSplit[1],
                            "aggregation": criterion.type
                        });
                    }
                    else if (3 == valueSplit.length) {
                        self.criteria.push({
                            "field": valueSplit[1],
                            "operation": "><",
                            "lowerValue": valueSplit[2],
                            "upperValue": valueSplit[1],
                            "aggregation": criterion.type
                        });
                    }
                }
            });
        }
    }
    /**
     * Put back to string the query object
     *
     * @returns a string in the form of /brand=debut/price>100/
     */
    toString() {
        var result = "";
        for (var i = 0; i < this.criteria.length; i++) {
            var criterion = this.criteria[i];
            var separator = "/";
            if ("or" == criterion.aggregation) {
                var next = this.criteria[i + 1];
                if (next && "or" == next.aggregation) {
                    separator = "|";
                }
            }
            if (criterion.operation == "><") {
                result += criterion.lowerValue + "<" + criterion.field + "<" + criterion.upperValue + separator;
            }
            else {
                result += criterion.field + criterion.operation + criterion.value + separator;
            }
        }
        return result;
    }
    /**
     * Add a selection to this query.
     *
     * @param field the name of the field we're drilling down with
     * @param operation the operation, ex =,>,<
     * @param value the value for the operation
     * @param value1 optional second value for constructing ranges like 100<price<200
     */
    addSelection(field, operation, value, value1, aggregation) {
        const agg = aggregation ? aggregation : "and";
        if (value1 && "><" == operation) {
            this.criteria.push({
                "field": field,
                "operation": "><",
                "lowerValue": value,
                "upperValue": value1,
                "aggregation": agg
            });
        }
        else {
            this.criteria.push({
                "field": field,
                "operation": operation,
                "value": value,
                "aggregation": agg
            });
        }
    }
    /**
     * Parse and construct a new object representation of the query string form
     *
     * @param queryString the query string in the form of "/" joined criteria. ex. /brand=debut/price>100/
     * @returns
     */
    getSelections() {
        return this.criteria;
    }
    getSelection(field) {
        for (var c in this.criteria) {
            var crit = this.criteria[c];
            if (crit.field == field) {
                return crit;
            }
        }
        return undefined;
    }
    /**
     * Check if this query already has a selection for the given field
     *
     * @returns true if we have a selection of this field, false otherwise
     */
    hasSelection(field) {
        for (var c in this.criteria) {
            var crit = this.criteria[c];
            if (crit.field == field) {
                return true;
            }
        }
        return false;
    }
    /**
     * Check if this query already has a selection for the given field
     *
     * @returns true if we have a selection of this field, false otherwise
     */
    hasExactSelection(field) {
        for (var c in this.criteria) {
            var crit = this.criteria[c];
            if (crit.field == field && crit.operation == "=") {
                return true;
            }
        }
        return false;
    }
    /**
     * Remove all selections on this field
     */
    removeSelection(field) {
        var criteria = [];
        for (var i = 0; i < this.criteria.length; i++) {
            var crit = this.criteria[i];
            if (crit.field == field) {
                criteria.push(i);
            }
        }
        while (criteria.length > 0) {
            var c = criteria.pop();
            arrayRemove(this.criteria, c, c);
        }
        for (var i = 0; i < this.criteria.length; i++) {
            var current = this.criteria[i];
            var previous = this.criteria[i - 1];
            var next = this.criteria[i + 1];
            if ("or" == current.aggregation) {
                if ((!next || "and" == next.aggregation) && (!previous || "and" == previous.aggregation)) {
                    current.aggregation = "and";
                }
            }
        }
    }
    setSearch(term) {
        if (term) {
            this.removeSelection("$s");
            this.criteria.unshift({
                "field": "$s",
                "operation": "=",
                "value": term
            });
        }
    }
    getSearch() {
        const s = this.getSelection("$s");
        return s ? s.value : undefined;
    }
    isValid() {
        return this.criteria.length > 0;
    }
}
/**
 * We have the same function in util but we want to have query.js without any dependencies
 *
 * @param array
 * @param from
 * @param to
 * @returns {Number|*}
 */
function arrayRemove(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
}


/***/ }),

/***/ "./src/main/query/Trail.ts":
/*!*********************************!*\
  !*** ./src/main/query/Trail.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Trail": () => (/* binding */ Trail)
/* harmony export */ });
/* harmony import */ var _utils_Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Util */ "./src/main/utils/Util.ts");
/* harmony import */ var _TrailType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TrailType */ "./src/main/query/TrailType.ts");


const TTL = 1000 * 60 * 60 * 24 * 2;
class Trail {
    /**
     *
     * @param queryResolver
     * @param sessionResolver
     * @param uid the unique id of this trail. Used as part of the key to save all Trail steps/parts
     */
    constructor(queryResolver, sessionResolver, uid) {
        this.queryResolver = queryResolver;
        this.sessionResolver = sessionResolver;
        this.key = "search-collector-trail" + (uid ? "-" + uid : "");
        try {
            const localTrails = this._load((0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)());
            const now = new Date().getTime();
            // Drop all expired trails, TTL in sync with session duration of 30 min
            for (let id of Object.keys(localTrails)) {
                if (now > localTrails[id].timestamp + TTL) {
                    delete localTrails[id];
                }
            }
            this._save((0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)(), localTrails);
            // Load existing session trails and merge it with the local storage trails.
            // This should guarantee that regardless of whether the pages further down the trail
            // (basket, checkout) were open in a new tab or not, we have a full representation
            // of all product clicks within the session. Reminder, sessionStorage is maintained
            // per tab/window and is deleted upon closing, localStorage is per website with no
            // default expiry.
            const sessionTrails = this._load((0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.getSessionStorage)());
            const trails = Object.assign(localTrails, sessionTrails);
            this._save((0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.getSessionStorage)(), trails);
        }
        catch (e) {
            console.log("Error parsing stored event queue " + e);
        }
    }
    /**
     * Register this product id as starting a purchase journey at this session/query
     * Possible trail types are "main" and "associated"
     */
    register(id, trailType = _TrailType__WEBPACK_IMPORTED_MODULE_1__.TrailType.Main, queryString) {
        const trail = {
            timestamp: new Date().getTime(),
            query: queryString || this.queryResolver().toString(),
            type: trailType
        };
        for (let storage of [(0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)(), (0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.getSessionStorage)()]) {
            const trails = this._load(storage);
            trails[id] = trail;
            this._save(storage, trails);
        }
    }
    fetch(id) {
        const trails = this._load((0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.getSessionStorage)());
        return trails[id];
    }
    _load(storage) {
        const data = storage.getItem(this.key);
        return data ? JSON.parse(data) : {};
    }
    _save(storage, data) {
        storage.setItem(this.key, JSON.stringify(data));
    }
}


/***/ }),

/***/ "./src/main/query/TrailType.ts":
/*!*************************************!*\
  !*** ./src/main/query/TrailType.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TrailType": () => (/* binding */ TrailType)
/* harmony export */ });
var TrailType;
(function (TrailType) {
    TrailType["Main"] = "main";
    TrailType["Associated"] = "associated";
})(TrailType || (TrailType = {}));


/***/ }),

/***/ "./src/main/query/index.ts":
/*!*********************************!*\
  !*** ./src/main/query/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Query": () => (/* reexport safe */ _Query__WEBPACK_IMPORTED_MODULE_0__.Query),
/* harmony export */   "Trail": () => (/* reexport safe */ _Trail__WEBPACK_IMPORTED_MODULE_1__.Trail),
/* harmony export */   "TrailType": () => (/* reexport safe */ _TrailType__WEBPACK_IMPORTED_MODULE_2__.TrailType)
/* harmony export */ });
/* harmony import */ var _Query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Query */ "./src/main/query/Query.ts");
/* harmony import */ var _Trail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Trail */ "./src/main/query/Trail.ts");
/* harmony import */ var _TrailType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TrailType */ "./src/main/query/TrailType.ts");





/***/ }),

/***/ "./src/main/resolvers/Resolver.ts":
/*!****************************************!*\
  !*** ./src/main/resolvers/Resolver.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cookieResolver": () => (/* binding */ cookieResolver),
/* harmony export */   "cookieSessionResolver": () => (/* binding */ cookieSessionResolver),
/* harmony export */   "debugResolver": () => (/* binding */ debugResolver),
/* harmony export */   "positionResolver": () => (/* binding */ positionResolver)
/* harmony export */ });
/* harmony import */ var _utils_Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Context */ "./src/main/utils/Context.ts");
/* harmony import */ var _utils_Util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Util */ "./src/main/utils/Util.ts");


const MINUTES_ONE_DAY = 60 * 24;
const MINUTES_TWO_DAYS = 60 * 24 * 2;
const MINUTES_HALF_HOUR = 30;
/**
 * Read the cookie with the provided name
 * @param name the name of the cookie
 */
const cookieResolver = (name = "") => (0,_utils_Util__WEBPACK_IMPORTED_MODULE_1__.getCookie)(name);
/**
 * Resolve the id of the current search session. A search session is defined as
 * limited time slice of search activity across multiple tabs. By default a session
 * would be considered expired after 30 min of inactivity.
 *
 * In case the resolver is constructed with a cookie name, the session lifecycle
 * will be governed by the lifecycle of that cookie. Otherwise the resolver will
 * set its own cookie.
 *
 * @param name the name of the session cookie
 */
const cookieSessionResolver = (name = "SearchCollectorSession") => (0,_utils_Util__WEBPACK_IMPORTED_MODULE_1__.setCookie)(name, cookieResolver(name) || (0,_utils_Util__WEBPACK_IMPORTED_MODULE_1__.generateId)(), MINUTES_TWO_DAYS);
/**
 * Find the position of a DOM element relative to other DOM elements of the same type.
 * To be used to find the position of an item in a search result.
 *
 * @param selectorExpression the css expression to query for other elements
 * @param element the element for which we want to know the position relative to the elements selected by selectorExpression
 * @param ctx the context to use. defaults to new Context(window, document)
 */
const positionResolver = (selectorExpression, element, ctx = new _utils_Context__WEBPACK_IMPORTED_MODULE_0__.Context(window, document)) => {
    return Array.from(ctx.getDocument().querySelectorAll(selectorExpression))
        .reduce((acc, node, index) => node === element ? index : acc, undefined);
};
/**
 * This is a persistent debug resolver which stores the debug query parameter across requests.
 */
const debugResolver = () => {
    const DEBUG_KEY = "__collectorDebug";
    const debugParam = new URLSearchParams(window.location.search).get("debug");
    const isDebugParamExists = debugParam != null;
    if (isDebugParamExists) {
        const debug = debugParam === "true";
        (0,_utils_Util__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage)().setItem(DEBUG_KEY, String(debug));
    }
    return (0,_utils_Util__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage)().getItem(DEBUG_KEY) === "true";
};


/***/ }),

/***/ "./src/main/resolvers/index.ts":
/*!*************************************!*\
  !*** ./src/main/resolvers/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cookieResolver": () => (/* reexport safe */ _Resolver__WEBPACK_IMPORTED_MODULE_0__.cookieResolver),
/* harmony export */   "cookieSessionResolver": () => (/* reexport safe */ _Resolver__WEBPACK_IMPORTED_MODULE_0__.cookieSessionResolver),
/* harmony export */   "debugResolver": () => (/* reexport safe */ _Resolver__WEBPACK_IMPORTED_MODULE_0__.debugResolver),
/* harmony export */   "positionResolver": () => (/* reexport safe */ _Resolver__WEBPACK_IMPORTED_MODULE_0__.positionResolver)
/* harmony export */ });
/* harmony import */ var _Resolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Resolver */ "./src/main/resolvers/Resolver.ts");



/***/ }),

/***/ "./src/main/utils/Context.ts":
/*!***********************************!*\
  !*** ./src/main/utils/Context.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Context": () => (/* binding */ Context)
/* harmony export */ });
class Context {
    constructor(window, document) {
        this.window = window;
        this.document = document;
    }
    getWindow() {
        return this.window;
    }
    getDocument() {
        return this.document;
    }
}


/***/ }),

/***/ "./src/main/utils/ListenerType.ts":
/*!****************************************!*\
  !*** ./src/main/utils/ListenerType.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListenerType": () => (/* binding */ ListenerType)
/* harmony export */ });
var ListenerType;
(function (ListenerType) {
    ListenerType["Dom"] = "dom";
    ListenerType["Sentinel"] = "sentinel";
})(ListenerType || (ListenerType = {}));


/***/ }),

/***/ "./src/main/utils/LocalStorageQueue.ts":
/*!*********************************************!*\
  !*** ./src/main/utils/LocalStorageQueue.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorageQueue": () => (/* binding */ LocalStorageQueue)
/* harmony export */ });
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util */ "./src/main/utils/Util.ts");

class LocalStorageQueue {
    constructor(id) {
        this.name = "search-collector-queue" + (id ? "-" + id : "");
        this.queue = [];
        const storedQueue = (0,_Util__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)().getItem(this.name);
        if (storedQueue) {
            try {
                this.queue = JSON.parse(storedQueue);
            }
            catch (e) {
                console.error("Error parsing stored event queue " + e);
            }
        }
    }
    push(data) {
        this.queue.push(data);
        this._save();
    }
    drain() {
        const buffer = this.queue;
        this.queue = [];
        this._save();
        return buffer;
    }
    transactionalDrain(asyncCallback) {
        const buffer = this.queue;
        return asyncCallback(this.queue)
            .then(res => {
            this.queue = [];
            this._save();
            return buffer;
        });
    }
    size() {
        return this.queue.length;
    }
    _save() {
        (0,_Util__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)().setItem(this.name, JSON.stringify(this.queue));
    }
}


/***/ }),

/***/ "./src/main/utils/Sentinel.ts":
/*!************************************!*\
  !*** ./src/main/utils/Sentinel.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sentinel": () => (/* binding */ Sentinel)
/* harmony export */ });
/**
 * Cloned from https://github.com/muicss/sentineljs until a patched version
 * supporing iframes gets available
 * License under MIT
 */
var isArray = Array.isArray, selectorToAnimationMap = {}, animationCallbacks = {}, styleEl, styleSheet, cssRules;
class Sentinel {
    constructor(doc = document) {
        this.document = doc;
    }
    /**
     * Add watcher.
     * @param {array} cssSelectors - List of CSS selector strings
     * @param {Function} callback - The callback function
     */
    on(cssSelectors, callback) {
        if (!callback)
            return;
        // initialize animationstart event listener
        if (!styleEl) {
            var doc = this.document, head = doc.head;
            // add animationstart event listener
            //@ts-ignore
            doc.addEventListener('animationstart', function (ev, callbacks, l, i) {
                callbacks = animationCallbacks[ev.animationName];
                // exit if callbacks haven't been registered
                if (!callbacks)
                    return;
                // stop other callbacks from firing
                ev.stopImmediatePropagation();
                // iterate through callbacks
                l = callbacks.length;
                for (i = 0; i < l; i++)
                    callbacks[i](ev.target);
            }, true);
            // add stylesheet to document
            styleEl = doc.createElement('style');
            head.insertBefore(styleEl, head.firstChild);
            styleSheet = styleEl.sheet;
            cssRules = styleSheet.cssRules;
        }
        // listify argument and add css rules/ cache callbacks
        (isArray(cssSelectors) ? cssSelectors : [cssSelectors])
            .map(function (selector, animId, isCustomName) {
            animId = selectorToAnimationMap[selector];
            if (!animId) {
                //@ts-ignore
                isCustomName = selector[0] == '!';
                // define animation name and add to map
                selectorToAnimationMap[selector] = animId =
                    isCustomName ? selector.slice(1) : 'sentinel-' +
                        Math.random().toString(16).slice(2);
                // add keyframe rule
                cssRules[styleSheet.insertRule('@keyframes ' + animId +
                    '{from{transform:none;}to{transform:none;}}', cssRules.length)]
                    ._id = selector;
                // add selector animation rule
                if (!isCustomName) {
                    cssRules[styleSheet.insertRule(selector + '{animation-duration:0.0001s;animation-name:' +
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
     * Remove watcher.
     * @param {array} cssSelectors - List of CSS selector strings
     * @param {Function} callback - The callback function (optional)
     */
    off(cssSelectors, callback) {
        // listify argument and iterate through rules
        (isArray(cssSelectors) ? cssSelectors : [cssSelectors])
            //@ts-ignore
            .map(function (selector, animId, callbackList, i) {
            // get animId
            if (!(animId = selectorToAnimationMap[selector]))
                return;
            // get callbacks
            callbackList = animationCallbacks[animId];
            // remove callback from list
            if (callback) {
                i = callbackList.length;
                while (i--) {
                    if (callbackList[i] === callback)
                        callbackList.splice(i, 1);
                }
            }
            else {
                callbackList = [];
            }
            // exit if callbacks still exist
            if (callbackList.length)
                return;
            // clear cache and remove css rules
            i = cssRules.length;
            while (i--) {
                if (cssRules[i]._id == selector)
                    styleSheet.deleteRule(i);
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
        if (styleEl)
            styleEl.parentNode.removeChild(styleEl);
        styleEl = 0;
    }
}


/***/ }),

/***/ "./src/main/utils/Util.ts":
/*!********************************!*\
  !*** ./src/main/utils/Util.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "base64Encode": () => (/* binding */ base64Encode),
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "generateId": () => (/* binding */ generateId),
/* harmony export */   "getCookie": () => (/* binding */ getCookie),
/* harmony export */   "getLocalStorage": () => (/* binding */ getLocalStorage),
/* harmony export */   "getSessionStorage": () => (/* binding */ getSessionStorage),
/* harmony export */   "normalizePathname": () => (/* binding */ normalizePathname),
/* harmony export */   "parseQueryString": () => (/* binding */ parseQueryString),
/* harmony export */   "setCookie": () => (/* binding */ setCookie)
/* harmony export */ });
/**
 * Parse the browser query string or the passed string into a javascript object
 * with keys the query parameter names and values the corresponding values.
 *
 * @param {string} queryString - the query string to parse, window.location.search if not available
 * @return {object}
 */
const parseQueryString = (queryString = window.location.search) => {
    return new URLSearchParams(queryString);
};
const normalizePathname = (path) => {
    if (!path.startsWith("/"))
        path = "/" + path;
    if (path.endsWith("/"))
        path = path.substring(0, path.length - 1);
    return path;
};
/**
 * Some browser like Safari prevent accessing localStorage in private mode by throwing exceptions.
 * Use this method to retrieve a mock impl which will at least prevent errors.
 */
const getLocalStorage = () => {
    if ("localStorage" in window) {
        try {
            localStorage.getItem("abc"); // access localStorage to trigger incognito mode exceptions
            return localStorage;
        }
        catch (e) {
            console.error(e);
        }
    }
    return cookieStorage(525600, "__localStorageMock___");
};
/**
 * URL safe base64 encoding
 *
 * @param {string} str - The string to be encoded, only ASCII/ISO-8859-1 supported
 */
const base64Encode = (str) => {
    // Note, + replaced with -, / replaced with _
    const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
    let o1, o2, o3, bits, h1, h2, h3, h4, e = [], pad = '', c;
    c = str.length % 3; // pad string to length of multiple of 3
    if (c > 0) {
        while (c++ < 3) {
            pad += '=';
            str += '\0';
        }
    }
    // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars
    for (c = 0; c < str.length; c += 3) { // pack three octets into four hexets
        o1 = str.charCodeAt(c);
        o2 = str.charCodeAt(c + 1);
        o3 = str.charCodeAt(c + 2);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        // use hextets to index into code string
        e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    }
    str = e.join(''); // use Array.join() for better performance than repeated string appends
    // replace 'A's from padded nulls with '='s
    str = str.slice(0, str.length - pad.length) + pad;
    return str;
};
const generateId = () => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    for (let i = 0; i < 7; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
const getSessionStorage = () => {
    if ("sessionStorage" in window) {
        try {
            sessionStorage.getItem("abc"); // access sessionStorage to trigger incognito mode exceptions
            return sessionStorage;
        }
        catch (e) {
            console.error(e);
        }
    }
    return cookieStorage(void 0, "__sessionStorageMock___");
};
function cookieStorage(ttlMinutes, storageName) {
    const LOCAL_STORAGE_COOKIE_NAME = storageName;
    function getStorageFromCookie() {
        return JSON.parse(getCookie(LOCAL_STORAGE_COOKIE_NAME) || "{}");
    }
    function saveStorageToCookie(data) {
        setCookie(LOCAL_STORAGE_COOKIE_NAME, data, ttlMinutes); // one year
    }
    return {
        getItem(key) {
            return getStorageFromCookie()[key] || null;
        },
        setItem(key, value) {
            const localStorageState = getStorageFromCookie();
            localStorageState[key] = value;
            saveStorageToCookie(JSON.stringify(localStorageState));
        },
        removeItem(key) {
            const localStorageState = getStorageFromCookie();
            delete localStorageState[key];
            saveStorageToCookie(JSON.stringify(localStorageState));
        },
        clear() {
            const localStorageState = {};
            saveStorageToCookie(JSON.stringify(localStorageState));
        },
        key(n) {
            const localStorageState = getStorageFromCookie();
            const keys = Object.keys(localStorageState);
            if (n > keys.length - 1)
                return null;
            return keys[n];
        },
        get length() {
            const localStorageState = getStorageFromCookie();
            return Object.keys(localStorageState).length;
        }
    };
}
const setCookie = (name, value, ttlMinutes) => {
    let expires = "";
    if (ttlMinutes) {
        const date = new Date();
        date.setTime(date.getTime() + (ttlMinutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Handle the upcoming forced switch to SameSite & Secure params https://www.chromestatus.com/feature/5633521622188032
    // Since this is a generic library, we can't restrict the domain under which it's beeing served, thus not setting domain
    // for the cookie. It's usually loaded and subsequently requested from a third-party domain, thus we need to specify SameSite=None which
    // per the latest specifications requires the Secure attribute.
    //
    // To allow local debugging, we won't set these when loaded on localhost. Note, after this change, you won't be able to serve
    // the collector to real clients over non-https connections - the session cookies won't match
    const sameSite = window.location.hostname === "localhost" ? "" : "; SameSite=None; Secure";
    document.cookie = name + "=" + (value || "") + expires + "; path=/" + sameSite;
    return value;
};
const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear'
 * that is a function which will clear the timer to prevent previously scheduled executions.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param func {Function} function to wrap
 * @param wait {Number} timeout in ms (`100`)
 * @param immediate {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
const debounce = (func, wait = 100, immediate = false) => {
    var timeout, args, context, timestamp, result;
    function later() {
        var last = Date.now() - timestamp;
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        }
        else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    }
    const debounced = function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var callNow = immediate && !timeout;
        if (!timeout)
            timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
    debounced.clear = function () {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };
    debounced.flush = function () {
        if (timeout) {
            result = func.apply(context, args);
            context = args = null;
            clearTimeout(timeout);
            timeout = null;
        }
    };
    return debounced;
};


/***/ }),

/***/ "./src/main/utils/index.ts":
/*!*********************************!*\
  !*** ./src/main/utils/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Context": () => (/* reexport safe */ _Context__WEBPACK_IMPORTED_MODULE_0__.Context),
/* harmony export */   "ListenerType": () => (/* reexport safe */ _ListenerType__WEBPACK_IMPORTED_MODULE_1__.ListenerType),
/* harmony export */   "LocalStorageQueue": () => (/* reexport safe */ _LocalStorageQueue__WEBPACK_IMPORTED_MODULE_2__.LocalStorageQueue),
/* harmony export */   "Sentinel": () => (/* reexport safe */ _Sentinel__WEBPACK_IMPORTED_MODULE_3__.Sentinel),
/* harmony export */   "base64Encode": () => (/* reexport safe */ _Util__WEBPACK_IMPORTED_MODULE_4__.base64Encode),
/* harmony export */   "debounce": () => (/* reexport safe */ _Util__WEBPACK_IMPORTED_MODULE_4__.debounce),
/* harmony export */   "generateId": () => (/* reexport safe */ _Util__WEBPACK_IMPORTED_MODULE_4__.generateId),
/* harmony export */   "getCookie": () => (/* reexport safe */ _Util__WEBPACK_IMPORTED_MODULE_4__.getCookie),
/* harmony export */   "getLocalStorage": () => (/* reexport safe */ _Util__WEBPACK_IMPORTED_MODULE_4__.getLocalStorage),
/* harmony export */   "getSessionStorage": () => (/* reexport safe */ _Util__WEBPACK_IMPORTED_MODULE_4__.getSessionStorage),
/* harmony export */   "normalizePathname": () => (/* reexport safe */ _Util__WEBPACK_IMPORTED_MODULE_4__.normalizePathname),
/* harmony export */   "parseQueryString": () => (/* reexport safe */ _Util__WEBPACK_IMPORTED_MODULE_4__.parseQueryString),
/* harmony export */   "setCookie": () => (/* reexport safe */ _Util__WEBPACK_IMPORTED_MODULE_4__.setCookie)
/* harmony export */ });
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Context */ "./src/main/utils/Context.ts");
/* harmony import */ var _ListenerType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListenerType */ "./src/main/utils/ListenerType.ts");
/* harmony import */ var _LocalStorageQueue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocalStorageQueue */ "./src/main/utils/LocalStorageQueue.ts");
/* harmony import */ var _Sentinel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Sentinel */ "./src/main/utils/Sentinel.ts");
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Util */ "./src/main/utils/Util.ts");







/***/ }),

/***/ "./src/main/writers/Base64EncodeWriter.ts":
/*!************************************************!*\
  !*** ./src/main/writers/Base64EncodeWriter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Base64EncodeWriter": () => (/* binding */ Base64EncodeWriter)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/main/utils/index.ts");

class Base64EncodeWriter {
    constructor(delegate) {
        this.delegate = delegate;
    }
    write(data) {
        const d = JSON.stringify(data);
        this.delegate.write((0,_utils__WEBPACK_IMPORTED_MODULE_0__.base64Encode)(encodeURIComponent(d)));
    }
}


/***/ }),

/***/ "./src/main/writers/BrowserTrackingWriter.ts":
/*!***************************************************!*\
  !*** ./src/main/writers/BrowserTrackingWriter.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowserTrackingWriter": () => (/* binding */ BrowserTrackingWriter)
/* harmony export */ });
class BrowserTrackingWriter {
    constructor(delegate, options) {
        this.delegate = delegate;
        this.options = options;
    }
    write(data) {
        const { recordUrl, recordReferrer, recordLanguage } = this.options;
        if (recordUrl && !data.url)
            data.url = this.getWindow().location.href;
        if (recordReferrer && !data.ref)
            data.ref = this.getDocument().referrer;
        if (recordLanguage && !data.lang)
            data.lang = this.getWindow().navigator.language;
        this.delegate.write(data);
    }
    getDocument() {
        const { context } = this.options;
        return context ? context.getDocument() : document;
    }
    getWindow() {
        const { context } = this.options;
        return context ? context.getWindow() : window;
    }
}


/***/ }),

/***/ "./src/main/writers/BufferingWriter.ts":
/*!*********************************************!*\
  !*** ./src/main/writers/BufferingWriter.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BufferingWriter": () => (/* binding */ BufferingWriter)
/* harmony export */ });
/* harmony import */ var _utils_LocalStorageQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/LocalStorageQueue */ "./src/main/utils/LocalStorageQueue.ts");

/**
 * A writer that buffers the incoming events in a local storage queue and writes
 * them out in batches every second. If the queue is not empty, when the timer ticks
 * the writer will send the available data regardless of whether there are collector events i.e.
 * even in times of inactivity or when loading the page and previous state is available.
 *
 * The writer will also try to send the available data on browser unload event.
 */
class BufferingWriter {
    constructor(delegate, id, timerMs = 1000) {
        this.delegate = delegate;
        this.queue = new _utils_LocalStorageQueue__WEBPACK_IMPORTED_MODULE_0__.LocalStorageQueue(id);
        this.timerMs = timerMs;
        this.timer = setTimeout(this.flush.bind(this), timerMs);
        this.id = id;
    }
    write(data) {
        this.queue.push(data);
    }
    flush(cancelTimer) {
        if (this.queue.size() > 0) {
            // if the browser shutsdown before the write is complete
            this.queue.transactionalDrain(queue => new Promise(res => res(this.delegate.write(queue))))
                .catch(err => console.error("could not drain queue: ", err));
        }
        if (!cancelTimer) {
            this.timer = setTimeout(this.flush.bind(this), this.timerMs);
        }
    }
}


/***/ }),

/***/ "./src/main/writers/ConsoleWriter.ts":
/*!*******************************************!*\
  !*** ./src/main/writers/ConsoleWriter.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleWriter": () => (/* binding */ ConsoleWriter)
/* harmony export */ });
class ConsoleWriter {
    write(data) {
        console.debug("ConsoleWriter receiving new data: ");
        console.log(data);
    }
}


/***/ }),

/***/ "./src/main/writers/DebugWriter.ts":
/*!*****************************************!*\
  !*** ./src/main/writers/DebugWriter.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DebugWriter": () => (/* binding */ DebugWriter)
/* harmony export */ });
/**
 * Logs the data to the browser console using console.debug
 */
class DebugWriter {
    constructor(delegate, debug) {
        this.delegate = delegate;
        this.debug = debug;
    }
    write(data) {
        if (this.debug)
            console.log(data);
        this.delegate.write(data);
    }
}


/***/ }),

/***/ "./src/main/writers/DefaultWriter.ts":
/*!*******************************************!*\
  !*** ./src/main/writers/DefaultWriter.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultWriter": () => (/* binding */ DefaultWriter)
/* harmony export */ });
/* harmony import */ var _SQSEventWriter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SQSEventWriter */ "./src/main/writers/SQSEventWriter.ts");
/* harmony import */ var _RestEventWriter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RestEventWriter */ "./src/main/writers/RestEventWriter.ts");
/* harmony import */ var _BufferingWriter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BufferingWriter */ "./src/main/writers/BufferingWriter.ts");
/* harmony import */ var _Base64EncodeWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Base64EncodeWriter */ "./src/main/writers/Base64EncodeWriter.ts");
/* harmony import */ var _JSONEnvelopeWriter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./JSONEnvelopeWriter */ "./src/main/writers/JSONEnvelopeWriter.ts");
/* harmony import */ var _TrailWriter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TrailWriter */ "./src/main/writers/TrailWriter.ts");
/* harmony import */ var _BrowserTrackingWriter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BrowserTrackingWriter */ "./src/main/writers/BrowserTrackingWriter.ts");
/* harmony import */ var _DebugWriter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DebugWriter */ "./src/main/writers/DebugWriter.ts");
/* harmony import */ var _QueryWriter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./QueryWriter */ "./src/main/writers/QueryWriter.ts");
/* harmony import */ var _query_Trail__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../query/Trail */ "./src/main/query/Trail.ts");










class DefaultWriter {
    constructor(options) {
        const { endpoint, sqs } = options;
        // Writer pipeline, add/remove pieces according to use case
        // This writer pipeline will send Base64 encoded array of json events
        let writer = isSQS(endpoint, sqs) ? new _SQSEventWriter__WEBPACK_IMPORTED_MODULE_0__.SQSEventWriter(endpoint) : new _RestEventWriter__WEBPACK_IMPORTED_MODULE_1__.RestEventWriter(endpoint);
        writer = new _Base64EncodeWriter__WEBPACK_IMPORTED_MODULE_3__.Base64EncodeWriter(writer);
        writer = new _BufferingWriter__WEBPACK_IMPORTED_MODULE_2__.BufferingWriter(writer, "buffer:" + options.endpoint);
        writer = new _DebugWriter__WEBPACK_IMPORTED_MODULE_7__.DebugWriter(writer, options.debug);
        writer = new _QueryWriter__WEBPACK_IMPORTED_MODULE_8__.QueryWriter(writer, options.resolver.queryResolver);
        writer = new _TrailWriter__WEBPACK_IMPORTED_MODULE_5__.TrailWriter(writer, options.trail || new _query_Trail__WEBPACK_IMPORTED_MODULE_9__.Trail(options.resolver.queryResolver, options.resolver.sessionResolver), options.resolver.queryResolver);
        writer = new _JSONEnvelopeWriter__WEBPACK_IMPORTED_MODULE_4__.JSONEnvelopeWriter(writer, options.resolver.sessionResolver, options.channel);
        writer = new _BrowserTrackingWriter__WEBPACK_IMPORTED_MODULE_6__.BrowserTrackingWriter(writer, {
            recordReferrer: options.recordReferrer,
            recordUrl: options.recordUrl,
            recordLanguage: options.recordLanguage
        });
        this.writer = writer;
    }
    write(data) {
        this.writer.write(data);
    }
}
function isSQS(endpoint, forceSQS) {
    return forceSQS || (endpoint.indexOf("sqs") != -1 && endpoint.indexOf("amazonaws.com") != -1);
}


/***/ }),

/***/ "./src/main/writers/JSONEnvelopeWriter.ts":
/*!************************************************!*\
  !*** ./src/main/writers/JSONEnvelopeWriter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JSONEnvelopeWriter": () => (/* binding */ JSONEnvelopeWriter)
/* harmony export */ });
/**
 * Wrap the events in a JSON envelope, enrich each record with timestamp, session and channel information.
 */
class JSONEnvelopeWriter {
    constructor(delegate, sessionResolver, channel) {
        this.delegate = delegate;
        this.sessionResolver = sessionResolver;
        this.channel = channel;
    }
    write(data) {
        if (!data.timestamp)
            data.timestamp = new Date().getTime();
        data.session = this.sessionResolver();
        data.channel = this.channel;
        this.delegate.write(data);
    }
}


/***/ }),

/***/ "./src/main/writers/QueryWriter.ts":
/*!*****************************************!*\
  !*** ./src/main/writers/QueryWriter.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueryWriter": () => (/* binding */ QueryWriter)
/* harmony export */ });
/**
 * Appends the query to the data if no query property exists
 */
class QueryWriter {
    constructor(delegate, queryResolver) {
        this.delegate = delegate;
        this.queryResolver = queryResolver;
    }
    write(data) {
        if (!data.query)
            data.query = this.queryResolver().toString();
        this.delegate.write(data);
    }
}


/***/ }),

/***/ "./src/main/writers/RestEventWriter.ts":
/*!*********************************************!*\
  !*** ./src/main/writers/RestEventWriter.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RestEventWriter": () => (/* binding */ RestEventWriter)
/* harmony export */ });
/**
 * Straight-forward REST write via GET request
 */
class RestEventWriter {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    write(data) {
        const img = new Image();
        img.src = this.endpoint + "?data=" + JSON.stringify(data);
    }
}


/***/ }),

/***/ "./src/main/writers/SQSEventWriter.ts":
/*!********************************************!*\
  !*** ./src/main/writers/SQSEventWriter.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SQSEventWriter": () => (/* binding */ SQSEventWriter)
/* harmony export */ });
class SQSEventWriter {
    constructor(queue, fifo = false) {
        this.queue = queue;
        this.fifo = fifo;
    }
    write(data) {
        const img = new Image();
        let src = this.queue + "?Version=2012-11-05&Action=SendMessage";
        // SQS supports FIFO queues in some regions that can also guarantee the order
        // of the messages.
        if (this.fifo) {
            // TODO when enough information is present to uniquely identify a message, switch the deduplication id to a message hash
            src += "&MessageGroupId=1&MessageDeduplicationId=" + Math.random();
        }
        if (typeof data !== "string") {
            data = JSON.stringify(data);
        }
        src += "&MessageBody=" + data;
        img.src = src;
    }
}


/***/ }),

/***/ "./src/main/writers/SplitStreamWriter.ts":
/*!***********************************************!*\
  !*** ./src/main/writers/SplitStreamWriter.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SplitStreamWriter": () => (/* binding */ SplitStreamWriter)
/* harmony export */ });
/**
 * Calls all writers passed to the constructor error safe
 */
class SplitStreamWriter {
    constructor(writers) {
        this.writers = writers;
    }
    write(data) {
        for (let writer of this.writers) {
            try {
                writer.write(data);
            }
            catch (e) {
                console.error("Could not write data: ", e);
            }
        }
    }
}


/***/ }),

/***/ "./src/main/writers/TrailWriter.ts":
/*!*****************************************!*\
  !*** ./src/main/writers/TrailWriter.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TrailWriter": () => (/* binding */ TrailWriter)
/* harmony export */ });
class TrailWriter {
    constructor(delegate, trail, queryResolver) {
        this.delegate = delegate;
        this.trail = trail;
        this.queryResolver = queryResolver;
    }
    write(data) {
        const q = this.queryResolver();
        if ((!q || !q.isValid()) && !data.query && this.isAppendTrail(data)) {
            // See if we have a payload id and a trail for it. This means we
            // are collecting data for an event that does not have a query context
            // on the page anymore but we want to associate the event with the query
            // context of the original search result
            this.appendTrail(data);
        }
        this.delegate.write(data);
    }
    /**
     * Append the Trail if any
     * @param data
     * @private
     */
    appendTrail(data) {
        const trail = this.trail.fetch(this.getId(data));
        if (trail && trail.query) {
            data.query = trail.query;
            data.queryTime = trail.timestamp;
            data.trailType = trail.type;
        }
    }
    /**
     * for legacy support: sometimes data was wrapped in property called "data"
     * @param data
     * @private
     */
    getId(data) {
        var _a;
        if (data)
            return data.id || ((_a = data.data) === null || _a === void 0 ? void 0 : _a.id);
    }
    /**
     * Evaluates if the Trail should be appended to this event
     * @param data
     * @private
     */
    isAppendTrail(data) {
        return data && ["checkout", "basket", "filter"].indexOf(data.type) > -1;
        // TA: This was previously "data.data && data.data.id && this.trail"
        // the only Collectors appending a property called "data" to its event are ClickCollector i.e.
        // CheckoutClickCollector, BasketClickCollector, FilterClickCollector
        // I've refactored this implicit condition to this function
        // TODO validate if things will break with new impl
    }
}


/***/ }),

/***/ "./src/main/writers/Writer.ts":
/*!************************************!*\
  !*** ./src/main/writers/Writer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Base64EncodeWriter": () => (/* reexport safe */ _Base64EncodeWriter__WEBPACK_IMPORTED_MODULE_0__.Base64EncodeWriter),
/* harmony export */   "BufferingWriter": () => (/* reexport safe */ _BufferingWriter__WEBPACK_IMPORTED_MODULE_1__.BufferingWriter),
/* harmony export */   "DefaultWriter": () => (/* reexport safe */ _DefaultWriter__WEBPACK_IMPORTED_MODULE_2__.DefaultWriter),
/* harmony export */   "JSONEnvelopeWriter": () => (/* reexport safe */ _JSONEnvelopeWriter__WEBPACK_IMPORTED_MODULE_3__.JSONEnvelopeWriter),
/* harmony export */   "RestEventWriter": () => (/* reexport safe */ _RestEventWriter__WEBPACK_IMPORTED_MODULE_4__.RestEventWriter),
/* harmony export */   "SQSEventWriter": () => (/* reexport safe */ _SQSEventWriter__WEBPACK_IMPORTED_MODULE_6__.SQSEventWriter),
/* harmony export */   "SplitStreamWriter": () => (/* reexport safe */ _SplitStreamWriter__WEBPACK_IMPORTED_MODULE_5__.SplitStreamWriter)
/* harmony export */ });
/* harmony import */ var _Base64EncodeWriter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base64EncodeWriter */ "./src/main/writers/Base64EncodeWriter.ts");
/* harmony import */ var _BufferingWriter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BufferingWriter */ "./src/main/writers/BufferingWriter.ts");
/* harmony import */ var _DefaultWriter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultWriter */ "./src/main/writers/DefaultWriter.ts");
/* harmony import */ var _JSONEnvelopeWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JSONEnvelopeWriter */ "./src/main/writers/JSONEnvelopeWriter.ts");
/* harmony import */ var _RestEventWriter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RestEventWriter */ "./src/main/writers/RestEventWriter.ts");
/* harmony import */ var _SplitStreamWriter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SplitStreamWriter */ "./src/main/writers/SplitStreamWriter.ts");
/* harmony import */ var _SQSEventWriter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SQSEventWriter */ "./src/main/writers/SQSEventWriter.ts");









/***/ }),

/***/ "./src/main/writers/index.ts":
/*!***********************************!*\
  !*** ./src/main/writers/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Base64EncodeWriter": () => (/* reexport safe */ _Base64EncodeWriter__WEBPACK_IMPORTED_MODULE_0__.Base64EncodeWriter),
/* harmony export */   "BrowserTrackingWriter": () => (/* reexport safe */ _BrowserTrackingWriter__WEBPACK_IMPORTED_MODULE_1__.BrowserTrackingWriter),
/* harmony export */   "BufferingWriter": () => (/* reexport safe */ _BufferingWriter__WEBPACK_IMPORTED_MODULE_2__.BufferingWriter),
/* harmony export */   "ConsoleWriter": () => (/* reexport safe */ _ConsoleWriter__WEBPACK_IMPORTED_MODULE_3__.ConsoleWriter),
/* harmony export */   "DebugWriter": () => (/* reexport safe */ _DebugWriter__WEBPACK_IMPORTED_MODULE_4__.DebugWriter),
/* harmony export */   "DefaultWriter": () => (/* reexport safe */ _DefaultWriter__WEBPACK_IMPORTED_MODULE_5__.DefaultWriter),
/* harmony export */   "JSONEnvelopeWriter": () => (/* reexport safe */ _JSONEnvelopeWriter__WEBPACK_IMPORTED_MODULE_6__.JSONEnvelopeWriter),
/* harmony export */   "QueryWriter": () => (/* reexport safe */ _QueryWriter__WEBPACK_IMPORTED_MODULE_7__.QueryWriter),
/* harmony export */   "RestEventWriter": () => (/* reexport safe */ _RestEventWriter__WEBPACK_IMPORTED_MODULE_8__.RestEventWriter),
/* harmony export */   "SQSEventWriter": () => (/* reexport safe */ _SQSEventWriter__WEBPACK_IMPORTED_MODULE_10__.SQSEventWriter),
/* harmony export */   "SplitStreamWriter": () => (/* reexport safe */ _SplitStreamWriter__WEBPACK_IMPORTED_MODULE_9__.SplitStreamWriter),
/* harmony export */   "TrailWriter": () => (/* reexport safe */ _TrailWriter__WEBPACK_IMPORTED_MODULE_11__.TrailWriter)
/* harmony export */ });
/* harmony import */ var _Base64EncodeWriter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base64EncodeWriter */ "./src/main/writers/Base64EncodeWriter.ts");
/* harmony import */ var _BrowserTrackingWriter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BrowserTrackingWriter */ "./src/main/writers/BrowserTrackingWriter.ts");
/* harmony import */ var _BufferingWriter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BufferingWriter */ "./src/main/writers/BufferingWriter.ts");
/* harmony import */ var _ConsoleWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConsoleWriter */ "./src/main/writers/ConsoleWriter.ts");
/* harmony import */ var _DebugWriter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DebugWriter */ "./src/main/writers/DebugWriter.ts");
/* harmony import */ var _DefaultWriter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DefaultWriter */ "./src/main/writers/DefaultWriter.ts");
/* harmony import */ var _JSONEnvelopeWriter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./JSONEnvelopeWriter */ "./src/main/writers/JSONEnvelopeWriter.ts");
/* harmony import */ var _QueryWriter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./QueryWriter */ "./src/main/writers/QueryWriter.ts");
/* harmony import */ var _RestEventWriter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./RestEventWriter */ "./src/main/writers/RestEventWriter.ts");
/* harmony import */ var _SplitStreamWriter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SplitStreamWriter */ "./src/main/writers/SplitStreamWriter.ts");
/* harmony import */ var _SQSEventWriter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SQSEventWriter */ "./src/main/writers/SQSEventWriter.ts");
/* harmony import */ var _TrailWriter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./TrailWriter */ "./src/main/writers/TrailWriter.ts");
/* harmony import */ var _Writer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Writer */ "./src/main/writers/Writer.ts");















/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/main/index.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.AbstractCollector),
/* harmony export */   "AssociatedProductCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.AssociatedProductCollector),
/* harmony export */   "Base64EncodeWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.Base64EncodeWriter),
/* harmony export */   "BasketClickCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.BasketClickCollector),
/* harmony export */   "BrowserCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.BrowserCollector),
/* harmony export */   "BrowserTrackingWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.BrowserTrackingWriter),
/* harmony export */   "BufferingWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.BufferingWriter),
/* harmony export */   "CheckoutClickCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.CheckoutClickCollector),
/* harmony export */   "ClickCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.ClickCollector),
/* harmony export */   "ClickWriterResolverCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.ClickWriterResolverCollector),
/* harmony export */   "CollectorModule": () => (/* reexport safe */ _CollectorModule__WEBPACK_IMPORTED_MODULE_0__.CollectorModule),
/* harmony export */   "ConsoleTransport": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_4__.ConsoleTransport),
/* harmony export */   "ConsoleWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.ConsoleWriter),
/* harmony export */   "Context": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.Context),
/* harmony export */   "DebugWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.DebugWriter),
/* harmony export */   "DefaultWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.DefaultWriter),
/* harmony export */   "FilterClickCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.FilterClickCollector),
/* harmony export */   "FiredSearchCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.FiredSearchCollector),
/* harmony export */   "GenericEventCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.GenericEventCollector),
/* harmony export */   "ImpressionCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.ImpressionCollector),
/* harmony export */   "InstantSearchQueryCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.InstantSearchQueryCollector),
/* harmony export */   "JSONEnvelopeWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.JSONEnvelopeWriter),
/* harmony export */   "ListenerType": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.ListenerType),
/* harmony export */   "LocalStorageQueue": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.LocalStorageQueue),
/* harmony export */   "ProductClickCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.ProductClickCollector),
/* harmony export */   "Query": () => (/* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_3__.Query),
/* harmony export */   "QueryWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.QueryWriter),
/* harmony export */   "RedirectCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.RedirectCollector),
/* harmony export */   "RestEventWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.RestEventWriter),
/* harmony export */   "SQSErrorTransport": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_4__.SQSErrorTransport),
/* harmony export */   "SQSEventWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.SQSEventWriter),
/* harmony export */   "SQSTransport": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_4__.SQSTransport),
/* harmony export */   "SearchResultCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.SearchResultCollector),
/* harmony export */   "Sentinel": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.Sentinel),
/* harmony export */   "SplitStreamWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.SplitStreamWriter),
/* harmony export */   "SuggestSearchCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.SuggestSearchCollector),
/* harmony export */   "Trail": () => (/* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_3__.Trail),
/* harmony export */   "TrailType": () => (/* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_3__.TrailType),
/* harmony export */   "TrailWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.TrailWriter),
/* harmony export */   "TransportLogger": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_4__.TransportLogger),
/* harmony export */   "WriterResolverCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.WriterResolverCollector),
/* harmony export */   "base64Encode": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.base64Encode),
/* harmony export */   "cookieResolver": () => (/* reexport safe */ _resolvers__WEBPACK_IMPORTED_MODULE_5__.cookieResolver),
/* harmony export */   "cookieSessionResolver": () => (/* reexport safe */ _resolvers__WEBPACK_IMPORTED_MODULE_5__.cookieSessionResolver),
/* harmony export */   "debounce": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.debounce),
/* harmony export */   "debugResolver": () => (/* reexport safe */ _resolvers__WEBPACK_IMPORTED_MODULE_5__.debugResolver),
/* harmony export */   "generateId": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.generateId),
/* harmony export */   "getCookie": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.getCookie),
/* harmony export */   "getLocalStorage": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.getLocalStorage),
/* harmony export */   "getSessionStorage": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.getSessionStorage),
/* harmony export */   "normalizePathname": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.normalizePathname),
/* harmony export */   "parseQueryString": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.parseQueryString),
/* harmony export */   "positionResolver": () => (/* reexport safe */ _resolvers__WEBPACK_IMPORTED_MODULE_5__.positionResolver),
/* harmony export */   "setCookie": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.setCookie)
/* harmony export */ });
/* harmony import */ var _CollectorModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollectorModule */ "./src/main/CollectorModule.ts");
/* harmony import */ var _collectors___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collectors/ */ "./src/main/collectors/index.ts");
/* harmony import */ var _writers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./writers */ "./src/main/writers/index.ts");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./query */ "./src/main/query/index.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logger */ "./src/main/logger/index.ts");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resolvers */ "./src/main/resolvers/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./src/main/utils/index.ts");








})();

window.SearchCollector = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOa0M7QUFDSjtBQUNKO0FBQ0Y7QUFDQztBQUNHO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9ub2RlX21vZHVsZXMvc2Nyb2xsbW9uaXRvci9kaXN0L21vZHVsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9ub2RlX21vZHVsZXMvc2Nyb2xsbW9uaXRvci9kaXN0L21vZHVsZS9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL25vZGVfbW9kdWxlcy9zY3JvbGxtb25pdG9yL2Rpc3QvbW9kdWxlL3NyYy9jb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vbm9kZV9tb2R1bGVzL3Njcm9sbG1vbml0b3IvZGlzdC9tb2R1bGUvc3JjL3R5cGVzLmpzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL25vZGVfbW9kdWxlcy9zY3JvbGxtb25pdG9yL2Rpc3QvbW9kdWxlL3NyYy93YXRjaGVyLmpzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL0NvbGxlY3Rvck1vZHVsZS50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9jb2xsZWN0b3JzL0Fic3RyYWN0Q29sbGVjdG9yLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2NvbGxlY3RvcnMvQXNzb2NpYXRlZFByb2R1Y3RDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9CYXNrZXRDbGlja0NvbGxlY3Rvci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9jb2xsZWN0b3JzL0Jyb3dzZXJDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9DaGVja291dENsaWNrQ29sbGVjdG9yLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2NvbGxlY3RvcnMvQ2xpY2tDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9DbGlja1dyaXRlclJlc29sdmVyQ29sbGVjdG9yLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2NvbGxlY3RvcnMvRmlsdGVyQ2xpY2tDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9GaXJlZFNlYXJjaENvbGxlY3Rvci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9jb2xsZWN0b3JzL0dlbmVyaWNFdmVudENvbGxlY3Rvci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9jb2xsZWN0b3JzL0ltcHJlc3Npb25Db2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9JbnN0YW50U2VhcmNoUXVlcnlDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9Qcm9kdWN0Q2xpY2tDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9SZWRpcmVjdENvbGxlY3Rvci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9jb2xsZWN0b3JzL1NlYXJjaFJlc3VsdENvbGxlY3Rvci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9jb2xsZWN0b3JzL1N1Z2dlc3RTZWFyY2hDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9Xcml0ZXJSZXNvbHZlckNvbGxlY3Rvci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9jb2xsZWN0b3JzL2luZGV4LnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2xvZ2dlci9Mb2dnZXIudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vbG9nZ2VyL0xvZ2dlclRyYW5zcG9ydC50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9sb2dnZXIvVHJhbnNwb3J0TG9nZ2VyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2xvZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9sb2dnZXIvdHJhbnNwb3J0L0NvbnNvbGVUcmFuc3BvcnQudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vbG9nZ2VyL3RyYW5zcG9ydC9TUVNFcnJvclRyYW5zcG9ydC50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9sb2dnZXIvdHJhbnNwb3J0L1NRU1RyYW5zcG9ydC50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9sb2dnZXIvdHJhbnNwb3J0L2luZGV4LnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3F1ZXJ5L1F1ZXJ5LnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3F1ZXJ5L1RyYWlsLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3F1ZXJ5L1RyYWlsVHlwZS50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9xdWVyeS9pbmRleC50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9yZXNvbHZlcnMvUmVzb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vcmVzb2x2ZXJzL2luZGV4LnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3V0aWxzL0NvbnRleHQudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vdXRpbHMvTGlzdGVuZXJUeXBlLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3V0aWxzL0xvY2FsU3RvcmFnZVF1ZXVlLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3V0aWxzL1NlbnRpbmVsLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3V0aWxzL1V0aWwudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vd3JpdGVycy9CYXNlNjRFbmNvZGVXcml0ZXIudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vd3JpdGVycy9Ccm93c2VyVHJhY2tpbmdXcml0ZXIudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vd3JpdGVycy9CdWZmZXJpbmdXcml0ZXIudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vd3JpdGVycy9Db25zb2xlV3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvRGVidWdXcml0ZXIudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vd3JpdGVycy9EZWZhdWx0V3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvSlNPTkVudmVsb3BlV3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvUXVlcnlXcml0ZXIudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vd3JpdGVycy9SZXN0RXZlbnRXcml0ZXIudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vd3JpdGVycy9TUVNFdmVudFdyaXRlci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi93cml0ZXJzL1NwbGl0U3RyZWFtV3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvVHJhaWxXcml0ZXIudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vd3JpdGVycy9Xcml0ZXIudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vd3JpdGVycy9pbmRleC50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBTY3JvbGxNb25pdG9yQ29udGFpbmVyIH0gZnJvbSAnLi9zcmMvY29udGFpbmVyLmpzJztcbmV4cG9ydCB7IFdhdGNoZXIgfSBmcm9tICcuL3NyYy93YXRjaGVyLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL3R5cGVzJztcbmltcG9ydCB7IGlzSW5Ccm93c2VyIH0gZnJvbSAnLi9zcmMvY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IFNjcm9sbE1vbml0b3JDb250YWluZXIgfSBmcm9tICcuL3NyYy9jb250YWluZXIuanMnO1xuLy8gdGhpcyBpcyBuZWVkZWQgZm9yIHRoZSB0eXBlLCBidXQgaWYgd2UncmUgbm90IGluIGEgYnJvd3NlciB0aGUgb25seVxuLy8gd2F5IGxpc3RlblRvRE9NIHdpbGwgYmUgY2FsbGVkIGlzIGlmIHlvdSBjYWxsIHNjcm9sbG1vbml0b3IuY3JlYXRlQ29udGFpbmVyXG4vLyBhbmQgeW91IGNhbid0IGRvIHRoYXQgdW50aWwgeW91IGhhdmUgYSBET00gZWxlbWVudC5cbnZhciBzY3JvbGxNb25pdG9yID0gbmV3IFNjcm9sbE1vbml0b3JDb250YWluZXIoaXNJbkJyb3dzZXIgPyBkb2N1bWVudC5ib2R5IDogdW5kZWZpbmVkKTtcbmlmIChpc0luQnJvd3Nlcikge1xuICAgIHNjcm9sbE1vbml0b3IudXBkYXRlU3RhdGUoKTtcbiAgICBzY3JvbGxNb25pdG9yLmxpc3RlblRvRE9NKCk7XG59XG4vL0B0cy1pZ25vcmVcbndpbmRvdy5zY3JvbGxNb25pdG9yID0gc2Nyb2xsTW9uaXRvcjtcbmV4cG9ydCBkZWZhdWx0IHNjcm9sbE1vbml0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgdmFyIFZJU0lCSUxJVFlDSEFOR0UgPSAndmlzaWJpbGl0eUNoYW5nZSc7XG5leHBvcnQgdmFyIEVOVEVSVklFV1BPUlQgPSAnZW50ZXJWaWV3cG9ydCc7XG5leHBvcnQgdmFyIEZVTExZRU5URVJWSUVXUE9SVCA9ICdmdWxseUVudGVyVmlld3BvcnQnO1xuZXhwb3J0IHZhciBFWElUVklFV1BPUlQgPSAnZXhpdFZpZXdwb3J0JztcbmV4cG9ydCB2YXIgUEFSVElBTExZRVhJVFZJRVdQT1JUID0gJ3BhcnRpYWxseUV4aXRWaWV3cG9ydCc7XG5leHBvcnQgdmFyIExPQ0FUSU9OQ0hBTkdFID0gJ2xvY2F0aW9uQ2hhbmdlJztcbmV4cG9ydCB2YXIgU1RBVEVDSEFOR0UgPSAnc3RhdGVDaGFuZ2UnO1xuZXhwb3J0IHZhciBldmVudFR5cGVzID0gW1xuICAgIFZJU0lCSUxJVFlDSEFOR0UsXG4gICAgRU5URVJWSUVXUE9SVCxcbiAgICBGVUxMWUVOVEVSVklFV1BPUlQsXG4gICAgRVhJVFZJRVdQT1JULFxuICAgIFBBUlRJQUxMWUVYSVRWSUVXUE9SVCxcbiAgICBMT0NBVElPTkNIQU5HRSxcbiAgICBTVEFURUNIQU5HRSxcbl07XG5leHBvcnQgdmFyIGlzT25TZXJ2ZXIgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJztcbmV4cG9ydCB2YXIgaXNJbkJyb3dzZXIgPSAhaXNPblNlcnZlcjtcbmV4cG9ydCB2YXIgZGVmYXVsdE9mZnNldHMgPSB7IHRvcDogMCwgYm90dG9tOiAwIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIiwiaW1wb3J0IHsgaXNPblNlcnZlciwgaXNJbkJyb3dzZXIsIGV2ZW50VHlwZXMgfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBXYXRjaGVyIH0gZnJvbSAnLi93YXRjaGVyLmpzJztcbmZ1bmN0aW9uIGdldFZpZXdwb3J0SGVpZ2h0KGVsZW1lbnQpIHtcbiAgICBpZiAoaXNPblNlcnZlcikge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldENvbnRlbnRIZWlnaHQoZWxlbWVudCkge1xuICAgIGlmIChpc09uU2VydmVyKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoZWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAvLyBqUXVlcnkgYXBwcm9hY2hcbiAgICAgICAgLy8gd2hpY2hldmVyIGlzIGdyZWF0ZXN0XG4gICAgICAgIHJldHVybiBNYXRoLm1heChkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNjcm9sbFRvcChlbGVtZW50KSB7XG4gICAgaWYgKGlzT25TZXJ2ZXIpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmIChlbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIHJldHVybiAod2luZG93LnBhZ2VZT2Zmc2V0IHx8XG4gICAgICAgICAgICAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApIHx8XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgfVxufVxudmFyIGJyb3dzZXJTdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcbmlmIChpc0luQnJvd3Nlcikge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJyb3dzZXJTdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwgb3B0cyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7IH1cbn1cbnZhciB1c2VDYXB0dXJlID0gYnJvd3NlclN1cHBvcnRzUGFzc2l2ZSA/IHsgY2FwdHVyZTogZmFsc2UsIHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlO1xudmFyIFNjcm9sbE1vbml0b3JDb250YWluZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2Nyb2xsTW9uaXRvckNvbnRhaW5lcihpdGVtLCBwYXJlbnRXYXRjaGVyKSB7XG4gICAgICAgIHRoaXMuZXZlbnRUeXBlcyA9IGV2ZW50VHlwZXM7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgICAgICAgdGhpcy53YXRjaGVycyA9IFtdO1xuICAgICAgICB0aGlzLnZpZXdwb3J0VG9wID0gbnVsbDtcbiAgICAgICAgdGhpcy52aWV3cG9ydEJvdHRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRIZWlnaHQgPSBnZXRDb250ZW50SGVpZ2h0KGl0ZW0pO1xuICAgICAgICB0aGlzLnZpZXdwb3J0SGVpZ2h0ID0gZ2V0Vmlld3BvcnRIZWlnaHQoaXRlbSk7XG4gICAgICAgIHRoaXMuRE9NTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBTY3JvbGxNb25pdG9yQ29udGFpbmVyLnByb3RvdHlwZS5ET01MaXN0ZW5lci5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAocGFyZW50V2F0Y2hlcikge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJXYXRjaGVyID0gcGFyZW50V2F0Y2hlci5jcmVhdGUoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZpb3VzRG9jdW1lbnRIZWlnaHQ7XG4gICAgICAgIHZhciBjYWxjdWxhdGVWaWV3cG9ydEk7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVZpZXdwb3J0KCkge1xuICAgICAgICAgICAgc2VsZi52aWV3cG9ydFRvcCA9IHNjcm9sbFRvcChpdGVtKTtcbiAgICAgICAgICAgIHNlbGYudmlld3BvcnRCb3R0b20gPSBzZWxmLnZpZXdwb3J0VG9wICsgc2VsZi52aWV3cG9ydEhlaWdodDtcbiAgICAgICAgICAgIHNlbGYuZG9jdW1lbnRIZWlnaHQgPSBnZXRDb250ZW50SGVpZ2h0KGl0ZW0pO1xuICAgICAgICAgICAgaWYgKHNlbGYuZG9jdW1lbnRIZWlnaHQgIT09IHByZXZpb3VzRG9jdW1lbnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVWaWV3cG9ydEkgPSBzZWxmLndhdGNoZXJzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY2FsY3VsYXRlVmlld3BvcnRJLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53YXRjaGVyc1tjYWxjdWxhdGVWaWV3cG9ydEldLnJlY2FsY3VsYXRlTG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldmlvdXNEb2N1bWVudEhlaWdodCA9IHNlbGYuZG9jdW1lbnRIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVwZGF0ZUFuZFRyaWdnZXJXYXRjaGVyc0k7XG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUFuZFRyaWdnZXJXYXRjaGVycygpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBhbGwgd2F0Y2hlcnMgdGhlbiB0cmlnZ2VyIHRoZSBldmVudHMgc28gb25lIGNhbiByZWx5IG9uIGFub3RoZXIgYmVpbmcgdXAgdG8gZGF0ZS5cbiAgICAgICAgICAgIHVwZGF0ZUFuZFRyaWdnZXJXYXRjaGVyc0kgPSBzZWxmLndhdGNoZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICh1cGRhdGVBbmRUcmlnZ2VyV2F0Y2hlcnNJLS0pIHtcbiAgICAgICAgICAgICAgICBzZWxmLndhdGNoZXJzW3VwZGF0ZUFuZFRyaWdnZXJXYXRjaGVyc0ldLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlQW5kVHJpZ2dlcldhdGNoZXJzSSA9IHNlbGYud2F0Y2hlcnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKHVwZGF0ZUFuZFRyaWdnZXJXYXRjaGVyc0ktLSkge1xuICAgICAgICAgICAgICAgIHNlbGYud2F0Y2hlcnNbdXBkYXRlQW5kVHJpZ2dlcldhdGNoZXJzSV0udHJpZ2dlckNhbGxiYWNrcyh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FsY3VsYXRlVmlld3BvcnQoKTtcbiAgICAgICAgICAgIHVwZGF0ZUFuZFRyaWdnZXJXYXRjaGVycygpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlY2FsY3VsYXRlTG9jYXRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEhlaWdodCA9IDA7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTY3JvbGxNb25pdG9yQ29udGFpbmVyLnByb3RvdHlwZS5saXN0ZW5Ub0RPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzSW5Ccm93c2VyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pdGVtID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuRE9NTGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuRE9NTGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuRE9NTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLml0ZW0gPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuRE9NTGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lcldhdGNoZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuRE9NTGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5ET01MaXN0ZW5lcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTY3JvbGxNb25pdG9yQ29udGFpbmVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBub29wLCBvdmVycmlkZSBmb3IgeW91ciBvd24gcHVycG9zZXMuXG4gICAgICAgIC8vIGluIGxpc3RlblRvRE9NLCBmb3IgZXhhbXBsZS5cbiAgICB9O1xuICAgIFNjcm9sbE1vbml0b3JDb250YWluZXIucHJvdG90eXBlLkRPTUxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vYWxlcnQoJ2dvdCBzY3JvbGwnKTtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUFuZFRyaWdnZXJXYXRjaGVycyhldmVudCk7XG4gICAgfTtcbiAgICBTY3JvbGxNb25pdG9yQ29udGFpbmVyLnByb3RvdHlwZS51cGRhdGVTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZpZXdwb3J0VG9wID0gc2Nyb2xsVG9wKHRoaXMuaXRlbSk7XG4gICAgICAgIHZhciB2aWV3cG9ydEhlaWdodCA9IGdldFZpZXdwb3J0SGVpZ2h0KHRoaXMuaXRlbSk7XG4gICAgICAgIHZhciBjb250ZW50SGVpZ2h0ID0gZ2V0Q29udGVudEhlaWdodCh0aGlzLml0ZW0pO1xuICAgICAgICB2YXIgbmVlZHNSZWNhbGN1YXRlID0gdmlld3BvcnRIZWlnaHQgIT09IHRoaXMudmlld3BvcnRIZWlnaHQgfHwgY29udGVudEhlaWdodCAhPT0gdGhpcy5jb250ZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnZpZXdwb3J0VG9wID0gdmlld3BvcnRUb3A7XG4gICAgICAgIHRoaXMudmlld3BvcnRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgdGhpcy52aWV3cG9ydEJvdHRvbSA9IHZpZXdwb3J0VG9wICsgdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIHRoaXMuY29udGVudEhlaWdodCA9IGNvbnRlbnRIZWlnaHQ7XG4gICAgICAgIGlmIChuZWVkc1JlY2FsY3VhdGUpIHtcbiAgICAgICAgICAgIHZhciBpID0gdGhpcy53YXRjaGVycy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXRjaGVyc1tpXS5yZWNhbGN1bGF0ZUxvY2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNjcm9sbE1vbml0b3JDb250YWluZXIucHJvdG90eXBlLnVwZGF0ZUFuZFRyaWdnZXJXYXRjaGVycyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgaSA9IHRoaXMud2F0Y2hlcnMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoZXJzW2ldLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGkgPSB0aGlzLndhdGNoZXJzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdGhpcy53YXRjaGVyc1tpXS50cmlnZ2VyQ2FsbGJhY2tzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2Nyb2xsTW9uaXRvckNvbnRhaW5lci5wcm90b3R5cGUuY3JlYXRlQ29udGFpbmVyID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHZhciBpdGVtO1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpIHx8IGlucHV0IGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBpbnB1dFswXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0gPSBpbnB1dDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IFNjcm9sbE1vbml0b3JDb250YWluZXIoaXRlbSwgdGhpcyk7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoKTtcbiAgICAgICAgY29udGFpbmVyLmxpc3RlblRvRE9NKCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfTtcbiAgICBTY3JvbGxNb25pdG9yQ29udGFpbmVyLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoaW5wdXQsIG9mZnNldHMpIHtcbiAgICAgICAgdmFyIGl0ZW07XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpIHx8IGlucHV0IGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBpbnB1dFswXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0gPSBpbnB1dDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2F0Y2hlciA9IG5ldyBXYXRjaGVyKHRoaXMsIGl0ZW0sIG9mZnNldHMpO1xuICAgICAgICB0aGlzLndhdGNoZXJzLnB1c2god2F0Y2hlcik7XG4gICAgICAgIHJldHVybiB3YXRjaGVyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAxLjFcbiAgICAgKi9cbiAgICBTY3JvbGxNb25pdG9yQ29udGFpbmVyLnByb3RvdHlwZS5iZWdldCA9IGZ1bmN0aW9uIChpbnB1dCwgb2Zmc2V0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoaW5wdXQsIG9mZnNldHMpO1xuICAgIH07XG4gICAgcmV0dXJuIFNjcm9sbE1vbml0b3JDb250YWluZXI7XG59KCkpO1xuZXhwb3J0IHsgU2Nyb2xsTW9uaXRvckNvbnRhaW5lciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGFpbmVyLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsImltcG9ydCB7IFZJU0lCSUxJVFlDSEFOR0UsIEVOVEVSVklFV1BPUlQsIEZVTExZRU5URVJWSUVXUE9SVCwgRVhJVFZJRVdQT1JULCBQQVJUSUFMTFlFWElUVklFV1BPUlQsIExPQ0FUSU9OQ0hBTkdFLCBTVEFURUNIQU5HRSwgZXZlbnRUeXBlcywgZGVmYXVsdE9mZnNldHMsIH0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xudmFyIFdhdGNoZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gV2F0Y2hlcihjb250YWluZXIsIHdhdGNoSXRlbSwgb2Zmc2V0cykge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy53YXRjaEl0ZW0gPSB3YXRjaEl0ZW07XG4gICAgICAgIHRoaXMubG9ja2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0ge307XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFvZmZzZXRzKSB7XG4gICAgICAgICAgICB0aGlzLm9mZnNldHMgPSBkZWZhdWx0T2Zmc2V0cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2Zmc2V0cyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0cyA9IHsgdG9wOiBvZmZzZXRzLCBib3R0b206IG9mZnNldHMgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0cyA9IHtcbiAgICAgICAgICAgICAgICB0b3A6ICd0b3AnIGluIG9mZnNldHMgPyBvZmZzZXRzLnRvcCA6IGRlZmF1bHRPZmZzZXRzLnRvcCxcbiAgICAgICAgICAgICAgICBib3R0b206ICdib3R0b20nIGluIG9mZnNldHMgPyBvZmZzZXRzLmJvdHRvbSA6IGRlZmF1bHRPZmZzZXRzLmJvdHRvbSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBldmVudFR5cGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgc2VsZi5jYWxsYmFja3NbZXZlbnRUeXBlc1tpXV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgd2FzSW5WaWV3cG9ydDtcbiAgICAgICAgdmFyIHdhc0Z1bGx5SW5WaWV3cG9ydDtcbiAgICAgICAgdmFyIHdhc0Fib3ZlVmlld3BvcnQ7XG4gICAgICAgIHZhciB3YXNCZWxvd1ZpZXdwb3J0O1xuICAgICAgICB2YXIgbGlzdGVuZXJUb1RyaWdnZXJMaXN0STtcbiAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICB2YXIgbmVlZFRvVHJpZ2dlclN0YXRlQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGZ1bmN0aW9uIHRyaWdnZXJDYWxsYmFja0FycmF5KGxpc3RlbmVycywgZXZlbnQpIHtcbiAgICAgICAgICAgIG5lZWRUb1RyaWdnZXJTdGF0ZUNoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RlbmVyVG9UcmlnZ2VyTGlzdEkgPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGxpc3RlbmVyVG9UcmlnZ2VyTGlzdEktLSkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbGlzdGVuZXJzW2xpc3RlbmVyVG9UcmlnZ2VyTGlzdEldO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwoc2VsZiwgZXZlbnQsIHNlbGYpO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5pc09uZSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGxpc3RlbmVyVG9UcmlnZ2VyTGlzdEksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyaWdnZXJDYWxsYmFja3MgPSBmdW5jdGlvbiB0cmlnZ2VyQ2FsbGJhY2tzKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0luVmlld3BvcnQgJiYgIXdhc0luVmlld3BvcnQpIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ2FsbGJhY2tBcnJheSh0aGlzLmNhbGxiYWNrc1tFTlRFUlZJRVdQT1JUXSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGdWxseUluVmlld3BvcnQgJiYgIXdhc0Z1bGx5SW5WaWV3cG9ydCkge1xuICAgICAgICAgICAgICAgIHRyaWdnZXJDYWxsYmFja0FycmF5KHRoaXMuY2FsbGJhY2tzW0ZVTExZRU5URVJWSUVXUE9SVF0sIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmlzQWJvdmVWaWV3cG9ydCAhPT0gd2FzQWJvdmVWaWV3cG9ydCAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaXNCZWxvd1ZpZXdwb3J0ICE9PSB3YXNCZWxvd1ZpZXdwb3J0KSB7XG4gICAgICAgICAgICAgICAgdHJpZ2dlckNhbGxiYWNrQXJyYXkodGhpcy5jYWxsYmFja3NbVklTSUJJTElUWUNIQU5HRV0sIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAvLyBpZiB5b3Ugc2tpcCBjb21wbGV0ZWx5IHBhc3QgdGhpcyBlbGVtZW50XG4gICAgICAgICAgICAgICAgaWYgKCF3YXNGdWxseUluVmlld3BvcnQgJiYgIXRoaXMuaXNGdWxseUluVmlld3BvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckNhbGxiYWNrQXJyYXkodGhpcy5jYWxsYmFja3NbRlVMTFlFTlRFUlZJRVdQT1JUXSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQ2FsbGJhY2tBcnJheSh0aGlzLmNhbGxiYWNrc1tQQVJUSUFMTFlFWElUVklFV1BPUlRdLCBldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghd2FzSW5WaWV3cG9ydCAmJiAhdGhpcy5pc0luVmlld3BvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckNhbGxiYWNrQXJyYXkodGhpcy5jYWxsYmFja3NbRU5URVJWSUVXUE9SVF0sIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckNhbGxiYWNrQXJyYXkodGhpcy5jYWxsYmFja3NbRVhJVFZJRVdQT1JUXSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0Z1bGx5SW5WaWV3cG9ydCAmJiB3YXNGdWxseUluVmlld3BvcnQpIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ2FsbGJhY2tBcnJheSh0aGlzLmNhbGxiYWNrc1tQQVJUSUFMTFlFWElUVklFV1BPUlRdLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJblZpZXdwb3J0ICYmIHdhc0luVmlld3BvcnQpIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ2FsbGJhY2tBcnJheSh0aGlzLmNhbGxiYWNrc1tFWElUVklFV1BPUlRdLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pc0luVmlld3BvcnQgIT09IHdhc0luVmlld3BvcnQpIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ2FsbGJhY2tBcnJheSh0aGlzLmNhbGxiYWNrc1tWSVNJQklMSVRZQ0hBTkdFXSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5lZWRUb1RyaWdnZXJTdGF0ZUNoYW5nZSkge1xuICAgICAgICAgICAgICAgIG5lZWRUb1RyaWdnZXJTdGF0ZUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRyaWdnZXJDYWxsYmFja0FycmF5KHRoaXMuY2FsbGJhY2tzW1NUQVRFQ0hBTkdFXSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2FzSW5WaWV3cG9ydCA9IHRoaXMuaXNJblZpZXdwb3J0O1xuICAgICAgICAgICAgd2FzRnVsbHlJblZpZXdwb3J0ID0gdGhpcy5pc0Z1bGx5SW5WaWV3cG9ydDtcbiAgICAgICAgICAgIHdhc0Fib3ZlVmlld3BvcnQgPSB0aGlzLmlzQWJvdmVWaWV3cG9ydDtcbiAgICAgICAgICAgIHdhc0JlbG93Vmlld3BvcnQgPSB0aGlzLmlzQmVsb3dWaWV3cG9ydDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZUxvY2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByZXZpb3VzVG9wID0gdGhpcy50b3A7XG4gICAgICAgICAgICB2YXIgcHJldmlvdXNCb3R0b20gPSB0aGlzLmJvdHRvbTtcbiAgICAgICAgICAgIGlmICh0aGlzLndhdGNoSXRlbS5ub2RlTmFtZSkge1xuICAgICAgICAgICAgICAgIC8vIGEgZG9tIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB2YXIgY2FjaGVkRGlzcGxheSA9IHRoaXMud2F0Y2hJdGVtLnN0eWxlLmRpc3BsYXk7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlZERpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGNoSXRlbS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXJPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29udGFpbmVyLmNvbnRhaW5lcldhdGNoZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyT2Zmc2V0ICs9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuY29udGFpbmVyV2F0Y2hlci50b3AgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jb250YWluZXJXYXRjaGVyLmNvbnRhaW5lci52aWV3cG9ydFRvcDtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyLmNvbnRhaW5lcldhdGNoZXIuY29udGFpbmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgYm91bmRpbmdSZWN0ID0gdGhpcy53YXRjaEl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3AgPSBib3VuZGluZ1JlY3QudG9wICsgdGhpcy5jb250YWluZXIudmlld3BvcnRUb3AgLSBjb250YWluZXJPZmZzZXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3R0b20gPSBib3VuZGluZ1JlY3QuYm90dG9tICsgdGhpcy5jb250YWluZXIudmlld3BvcnRUb3AgLSBjb250YWluZXJPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlZERpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGNoSXRlbS5zdHlsZS5kaXNwbGF5ID0gY2FjaGVkRGlzcGxheTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLndhdGNoSXRlbSA9PT0gK3RoaXMud2F0Y2hJdGVtKSB7XG4gICAgICAgICAgICAgICAgLy8gbnVtYmVyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2F0Y2hJdGVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcCA9IHRoaXMuYm90dG9tID0gdGhpcy53YXRjaEl0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcCA9IHRoaXMuYm90dG9tID0gdGhpcy5jb250YWluZXIuZG9jdW1lbnRIZWlnaHQgLSB0aGlzLndhdGNoSXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBhbiBvYmplY3Qgd2l0aCBhIHRvcCBhbmQgYm90dG9tIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgdGhpcy50b3AgPSB0aGlzLndhdGNoSXRlbS50b3A7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3R0b20gPSB0aGlzLndhdGNoSXRlbS5ib3R0b207XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRvcCAtPSB0aGlzLm9mZnNldHMudG9wO1xuICAgICAgICAgICAgdGhpcy5ib3R0b20gKz0gdGhpcy5vZmZzZXRzLmJvdHRvbTtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5ib3R0b20gLSB0aGlzLnRvcDtcbiAgICAgICAgICAgIGlmICgocHJldmlvdXNUb3AgIT09IHVuZGVmaW5lZCB8fCBwcmV2aW91c0JvdHRvbSAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgICAgICh0aGlzLnRvcCAhPT0gcHJldmlvdXNUb3AgfHwgdGhpcy5ib3R0b20gIT09IHByZXZpb3VzQm90dG9tKSkge1xuICAgICAgICAgICAgICAgIHRyaWdnZXJDYWxsYmFja0FycmF5KHRoaXMuY2FsbGJhY2tzW0xPQ0FUSU9OQ0hBTkdFXSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZUxvY2F0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHdhc0luVmlld3BvcnQgPSB0aGlzLmlzSW5WaWV3cG9ydDtcbiAgICAgICAgd2FzRnVsbHlJblZpZXdwb3J0ID0gdGhpcy5pc0Z1bGx5SW5WaWV3cG9ydDtcbiAgICAgICAgd2FzQWJvdmVWaWV3cG9ydCA9IHRoaXMuaXNBYm92ZVZpZXdwb3J0O1xuICAgICAgICB3YXNCZWxvd1ZpZXdwb3J0ID0gdGhpcy5pc0JlbG93Vmlld3BvcnQ7XG4gICAgfVxuICAgIFdhdGNoZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBjYWxsYmFjaywgaXNPbmUpIHtcbiAgICAgICAgaWYgKGlzT25lID09PSB2b2lkIDApIHsgaXNPbmUgPSBmYWxzZTsgfVxuICAgICAgICAvLyB0cmlnZ2VyIHRoZSBldmVudCBpZiBpdCBhcHBsaWVzIHRvIHRoZSBlbGVtZW50IHJpZ2h0IG5vdy5cbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIGV2ZW50ID09PSBWSVNJQklMSVRZQ0hBTkdFICYmICF0aGlzLmlzSW5WaWV3cG9ydCAmJiB0aGlzLmlzQWJvdmVWaWV3cG9ydDpcbiAgICAgICAgICAgIGNhc2UgZXZlbnQgPT09IEVOVEVSVklFV1BPUlQgJiYgdGhpcy5pc0luVmlld3BvcnQ6XG4gICAgICAgICAgICBjYXNlIGV2ZW50ID09PSBGVUxMWUVOVEVSVklFV1BPUlQgJiYgdGhpcy5pc0Z1bGx5SW5WaWV3cG9ydDpcbiAgICAgICAgICAgIGNhc2UgZXZlbnQgPT09IEVYSVRWSUVXUE9SVCAmJiB0aGlzLmlzQWJvdmVWaWV3cG9ydCAmJiAhdGhpcy5pc0luVmlld3BvcnQ6XG4gICAgICAgICAgICBjYXNlIGV2ZW50ID09PSBQQVJUSUFMTFlFWElUVklFV1BPUlQgJiYgdGhpcy5pc0luVmlld3BvcnQgJiYgdGhpcy5pc0Fib3ZlVmlld3BvcnQ6XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNPbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jYWxsYmFja3NbZXZlbnRdKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tldmVudF0ucHVzaCh7IGNhbGxiYWNrOiBjYWxsYmFjaywgaXNPbmU6IGlzT25lIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBhZGQgYSBzY3JvbGwgbW9uaXRvciBsaXN0ZW5lciBvZiB0eXBlICcgK1xuICAgICAgICAgICAgICAgIGV2ZW50ICtcbiAgICAgICAgICAgICAgICAnLiBZb3VyIG9wdGlvbnMgYXJlOiAnICtcbiAgICAgICAgICAgICAgICBldmVudFR5cGVzLmpvaW4oJywgJykpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBXYXRjaGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrc1tldmVudF0pIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBpdGVtOyAoaXRlbSA9IHRoaXMuY2FsbGJhY2tzW2V2ZW50XVtpXSk7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNhbGxiYWNrID09PSBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tldmVudF0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIHJlbW92ZSBhIHNjcm9sbCBtb25pdG9yIGxpc3RlbmVyIG9mIHR5cGUgJyArXG4gICAgICAgICAgICAgICAgZXZlbnQgK1xuICAgICAgICAgICAgICAgICcuIFlvdXIgb3B0aW9ucyBhcmU6ICcgK1xuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMuam9pbignLCAnKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFdhdGNoZXIucHJvdG90eXBlLm9uZSA9IGZ1bmN0aW9uIChldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5vbihldmVudCwgY2FsbGJhY2ssIHRydWUpO1xuICAgIH07XG4gICAgV2F0Y2hlci5wcm90b3R5cGUucmVjYWxjdWxhdGVTaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy53YXRjaEl0ZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLndhdGNoSXRlbS5vZmZzZXRIZWlnaHQgKyB0aGlzLm9mZnNldHMudG9wICsgdGhpcy5vZmZzZXRzLmJvdHRvbTtcbiAgICAgICAgICAgIHRoaXMuYm90dG9tID0gdGhpcy50b3AgKyB0aGlzLmhlaWdodDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgV2F0Y2hlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzQWJvdmVWaWV3cG9ydCA9IHRoaXMudG9wIDwgdGhpcy5jb250YWluZXIudmlld3BvcnRUb3A7XG4gICAgICAgIHRoaXMuaXNCZWxvd1ZpZXdwb3J0ID0gdGhpcy5ib3R0b20gPiB0aGlzLmNvbnRhaW5lci52aWV3cG9ydEJvdHRvbTtcbiAgICAgICAgdGhpcy5pc0luVmlld3BvcnQgPVxuICAgICAgICAgICAgdGhpcy50b3AgPCB0aGlzLmNvbnRhaW5lci52aWV3cG9ydEJvdHRvbSAmJiB0aGlzLmJvdHRvbSA+IHRoaXMuY29udGFpbmVyLnZpZXdwb3J0VG9wO1xuICAgICAgICB0aGlzLmlzRnVsbHlJblZpZXdwb3J0ID1cbiAgICAgICAgICAgICh0aGlzLnRvcCA+PSB0aGlzLmNvbnRhaW5lci52aWV3cG9ydFRvcCAmJlxuICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tIDw9IHRoaXMuY29udGFpbmVyLnZpZXdwb3J0Qm90dG9tKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLmlzQWJvdmVWaWV3cG9ydCAmJiB0aGlzLmlzQmVsb3dWaWV3cG9ydCk7XG4gICAgfTtcbiAgICBXYXRjaGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmNvbnRhaW5lci53YXRjaGVycy5pbmRleE9mKHRoaXMpLCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5jb250YWluZXIud2F0Y2hlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgc2VsZi5jYWxsYmFja3MgPSB7fTtcbiAgICB9O1xuICAgIC8vIHByZXZlbnQgcmVjYWxjdWxhdGluZyB0aGUgZWxlbWVudCBsb2NhdGlvblxuICAgIFdhdGNoZXIucHJvdG90eXBlLmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubG9ja2VkID0gdHJ1ZTtcbiAgICB9O1xuICAgIFdhdGNoZXIucHJvdG90eXBlLnVubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBXYXRjaGVyO1xufSgpKTtcbmV4cG9ydCB7IFdhdGNoZXIgfTtcbnZhciBldmVudEhhbmRsZXJGYWN0b3J5ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrLCBpc09uZSkge1xuICAgICAgICBpZiAoaXNPbmUgPT09IHZvaWQgMCkgeyBpc09uZSA9IGZhbHNlOyB9XG4gICAgICAgIHRoaXMub24uY2FsbCh0aGlzLCB0eXBlLCBjYWxsYmFjaywgaXNPbmUpO1xuICAgIH07XG59O1xuZm9yICh2YXIgaSA9IDAsIGogPSBldmVudFR5cGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgIHZhciB0eXBlID0gZXZlbnRUeXBlc1tpXTtcbiAgICBXYXRjaGVyLnByb3RvdHlwZVt0eXBlXSA9IGV2ZW50SGFuZGxlckZhY3RvcnkodHlwZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13YXRjaGVyLmpzLm1hcCIsImltcG9ydCB7IENvbnNvbGVXcml0ZXIsIFNwbGl0U3RyZWFtV3JpdGVyIH0gZnJvbSBcIi4vd3JpdGVyc1wiO1xuaW1wb3J0IHsgQ29uc29sZVRyYW5zcG9ydCwgVHJhbnNwb3J0TG9nZ2VyIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcIi4vdXRpbHNcIjtcbi8qKlxuICogRGVmYXVsdCBhc3NlbWJseSBwb2ludCBvZiBjb2xsZWN0b3JzIGFuZCB3cml0ZXJzLlxuICovXG5leHBvcnQgY2xhc3MgQ29sbGVjdG9yTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdG9ycyA9IFtdO1xuICAgICAgICB0aGlzLndyaXRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy50cmFuc3BvcnRzID0gW107XG4gICAgICAgIHRoaXMuaGFzU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIH1cbiAgICBhZGQoY29sbGVjdG9yKSB7XG4gICAgICAgIGlmICghY29sbGVjdG9yLmdldENvbnRleHQoKSlcbiAgICAgICAgICAgIGNvbGxlY3Rvci5zZXRDb250ZXh0KHRoaXMub3B0aW9ucy5jb250ZXh0IHx8IG5ldyBDb250ZXh0KHdpbmRvdywgZG9jdW1lbnQpKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0b3JzLnB1c2goY29sbGVjdG9yKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzU3RhcnRlZCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHRoaXMuaW52b2tlZENvbGxlY3Rvcihjb2xsZWN0b3IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydCBjb2xsZWN0aW5nIGRhdGEgYnkgYXR0YWNoaW5nIGFsbCBjb2xsZWN0b3JzXG4gICAgICovXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdG9ycy5mb3JFYWNoKGNvbGxlY3RvciA9PiB0aGlzLmludm9rZWRDb2xsZWN0b3IoY29sbGVjdG9yKSk7XG4gICAgICAgIHRoaXMuaGFzU3RhcnRlZCA9IHRydWU7XG4gICAgfVxuICAgIGFkZExvZ1RyYW5zcG9ydCh0cmFuc3BvcnQpIHtcbiAgICAgICAgdGhpcy50cmFuc3BvcnRzLnB1c2godHJhbnNwb3J0KTtcbiAgICB9XG4gICAgc2V0VHJhbnNwb3J0cyh0cmFuc3BvcnRzKSB7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IHRyYW5zcG9ydHMgfHwgW107XG4gICAgfVxuICAgIHNldFdyaXRlcnMocmVwbGFjZW1lbnRXcml0ZXJzKSB7XG4gICAgICAgIHRoaXMud3JpdGVycyA9IEFycmF5LmlzQXJyYXkocmVwbGFjZW1lbnRXcml0ZXJzKSA/IFsuLi5yZXBsYWNlbWVudFdyaXRlcnNdIDogW3JlcGxhY2VtZW50V3JpdGVyc107XG4gICAgfVxuICAgIHNldExvZ2dlcihsb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuICAgIGludm9rZWRDb2xsZWN0b3IoY29sbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IHdyaXRlciA9IHRoaXMuZ2V0V3JpdGVyKCk7XG4gICAgICAgIGNvbnN0IGxvZyA9IHRoaXMuZ2V0TG9nZ2VyKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb2xsZWN0b3IuYXR0YWNoKHdyaXRlciwgbG9nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgbG9nLmVycm9yKGBbJHtjb2xsZWN0b3IuY29uc3RydWN0b3IubmFtZX1dIFVuZXhwZWN0ZWQgRXhjZXB0aW9uIGR1cmluZyBjb2xsZWN0b3IgYXR0YWNoOiBgLCBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRMb2dnZXIoKSB7XG4gICAgICAgIGNvbnN0IGhhc0xvZ2dlciA9ICEhdGhpcy5sb2dnZXI7XG4gICAgICAgIGlmIChoYXNMb2dnZXIpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2dnZXI7XG4gICAgICAgIGlmICghdGhpcy50cmFuc3BvcnRzIHx8IHRoaXMudHJhbnNwb3J0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVHJhbnNwb3J0TG9nZ2VyKFtuZXcgQ29uc29sZVRyYW5zcG9ydCgpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBUcmFuc3BvcnRMb2dnZXIodGhpcy50cmFuc3BvcnRzKTtcbiAgICB9XG4gICAgZ2V0V3JpdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53cml0ZXJzLmxlbmd0aCA9PSAwXG4gICAgICAgICAgICA/IHRoaXMub3B0aW9ucy53cml0ZXIgfHwgbmV3IENvbnNvbGVXcml0ZXIoKVxuICAgICAgICAgICAgOiBuZXcgU3BsaXRTdHJlYW1Xcml0ZXIodGhpcy53cml0ZXJzKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQWJzdHJhY3RDb2xsZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG4gICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG4gICAgc2V0Q29udGV4dChjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuICAgIGdldENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gICAgfVxuICAgIGdldFdpbmRvdygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRXaW5kb3coKTtcbiAgICB9XG4gICAgZ2V0RG9jdW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0RG9jdW1lbnQoKTtcbiAgICB9XG4gICAgYXR0YWNoKHdyaXRlciwgbG9nKSB7XG4gICAgICAgIC8vIG92ZXJyaWRlIGluIHN1YmNsYXNzXG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gbG9nIGlmIGEgaGFuZGxlciBmYWlscyBpdHMgZXhlY3V0aW9uXG4gICAgICogVXNhZ2U6IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmxvZ1dyYXBIYW5kbGVyKHlvdXJoYW5kbGVyLCBsb2dnZXIpKVxuICAgICAqIEBwYXJhbSBoYW5kbGVyXG4gICAgICogQHBhcmFtIGxvZ1xuICAgICAqIEBwYXJhbSBoYW5kbGVyQXJnc1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBsb2dXcmFwSGFuZGxlcihoYW5kbGVyLCBsb2csIC4uLmhhbmRsZXJBcmdzKSB7XG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlciguLi5hcmdzLCAuLi5oYW5kbGVyQXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChsb2cpXG4gICAgICAgICAgICAgICAgICAgIGxvZy5lcnJvcihgWyR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfV0gVW5leHBlY3RlZCBlcnJvciBkdXJpbmcgcmVzb2x2ZXIgZXhlY3V0aW9uOiBgLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBleGVjdXRlIHJlc29sdmVyIGZ1bmN0aW9ucy5cbiAgICAgKiBMb2dzIGEgZGVidWcgbWVzc2FnZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkIG9yIGxvZ3MgYW4gZXJyb3IgaWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBieSB0aGUgcmVzb2x2ZXJcbiAgICAgKiBAcGFyYW0gcmVzb2x2ZXIgQSByZXNvbHZlciBmdW5jdGlvblxuICAgICAqIEBwYXJhbSBsb2cgdGhlIGxvZ2dlclxuICAgICAqIEBwYXJhbSByZXNvbHZlckFyZ3MgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byB0aGUgcmVzb2x2ZXIgZnVuY3Rpb25cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcmVzb2x2ZShyZXNvbHZlciwgbG9nLCAuLi5yZXNvbHZlckFyZ3MpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyZXNvbHZlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHJlc29sdmVyKC4uLnJlc29sdmVyQXJncyk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA9PSB2b2lkIDApXG4gICAgICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIlJlc29sdmVyIHJldHVybmVkIG5vIHZhbHVlLlwiLCByZXNvbHZlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGxvZyAmJiBsb2cuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBsb2cuZXJyb3IoYFske3RoaXMuY29uc3RydWN0b3IubmFtZX1dIFVuZXhwZWN0ZWQgZXJyb3IgZHVyaW5nIHJlc29sdmVyIGV4ZWN1dGlvbjogYCwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTZW50aW5lbCB9IGZyb20gXCIuLi91dGlscy9TZW50aW5lbFwiO1xuaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuaW1wb3J0IHsgVHJhaWxUeXBlIH0gZnJvbSBcIi4uL3F1ZXJ5L1RyYWlsVHlwZVwiO1xuLyoqXG4gKiBDb2xsZWN0IGNsaWNrcyBvbiBlbGVtZW50cyBtYXRjaGluZyBhIHF1ZXJ5IHNlbGVjdG9yLiBIYW5kbGVzIGJvdGggRE9NIGVsZW1lbnRzXG4gKiBwcmVzZW50IGluIHRoZSBET00gYW5kIGVsZW1lbnRzIGluc2VydGVkIGFmdGVyIHRoZSBwYWdlIGxvYWQgLyBjb2xsZWN0b3IgY29uc3RydWN0aW9uLlxuICpcbiAqIFdoZW4gYSBjbGljayBvY2N1cnMsIGEgZnVuY3Rpb24gcHJvdmlkZWQgYXQgY29uc3RydWN0aW9uIHRpbWUgZ2V0IGludm9rZWQgdG8gY29sbGVjdCBkYXRhIHBvaW50c1xuICogZnJvbSB0aGUgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEFzc29jaWF0ZWRQcm9kdWN0Q29sbGVjdG9yIGV4dGVuZHMgQWJzdHJhY3RDb2xsZWN0b3Ige1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGNsaWNrIGNvbGxlY3RvclxuICAgICAqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yRXhwcmVzc2lvbiAtIERvY3VtZW50IHF1ZXJ5IHNlbGVjdG9yIGlkZW50aWZ5aW5nIHRoZSBlbGVtZW50cyB0byBhdHRhY2ggdG9cbiAgICAgKiBAcGFyYW0gbWFpblByb2R1Y3RJZFxuICAgICAqIEBwYXJhbSByZXNvbHZlcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvckV4cHJlc3Npb24sIG1haW5Qcm9kdWN0SWQsIHJlc29sdmVycykge1xuICAgICAgICBzdXBlcihcImFzc29jaWF0ZWQtcHJvZHVjdFwiKTtcbiAgICAgICAgdGhpcy5tYWluUHJvZHVjdElkID0gbWFpblByb2R1Y3RJZDtcbiAgICAgICAgdGhpcy5zZWxlY3RvckV4cHJlc3Npb24gPSBzZWxlY3RvckV4cHJlc3Npb247XG4gICAgICAgIHRoaXMuaWRSZXNvbHZlciA9IHJlc29sdmVycy5pZFJlc29sdmVyO1xuICAgICAgICB0aGlzLnBvc2l0aW9uUmVzb2x2ZXIgPSByZXNvbHZlcnMucG9zaXRpb25SZXNvbHZlcjtcbiAgICAgICAgdGhpcy5wcmljZVJlc29sdmVyID0gcmVzb2x2ZXJzLnByaWNlUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMudHJhaWwgPSByZXNvbHZlcnMudHJhaWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBjbGljayBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGlkZW50aWZpZWQgZWxlbWVudHMsIHdyaXRlIHRoZSBkYXRhXG4gICAgICogd2hlbiB0aGUgZXZlbnQgb2NjdXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gd3JpdGVyIC0gVGhlIHdyaXRlciB0byBzZW5kIHRoZSBkYXRhIHRvXG4gICAgICogQHBhcmFtIGxvZ1xuICAgICAqL1xuICAgIGF0dGFjaCh3cml0ZXIsIGxvZykge1xuICAgICAgICBjb25zdCBjb2xsZWN0ID0gZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHRoaXMucmVzb2x2ZSh0aGlzLmlkUmVzb2x2ZXIsIGxvZywgZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIG91dCB0aGUgcXVlcnkgc291cmNlIG9mIHRoZSBtYWluIHByb2R1Y3QuIE5vdGUgdGhhdCBkZXNwaXRlIGJlaW5nIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gXCJtYWluXCIgcHJvZHVjdCwgaXQgY291bGQgYmUgYSAybmQgb3IgM3JkLCA0dGggbGV2ZWwgb2YgYXNzb2NpYXRlZCBwcm9kdWN0IGJyb3dzaW5nXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVHJhaWwgPSB0aGlzLnRyYWlsLmZldGNoKHRoaXMubWFpblByb2R1Y3RJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1RyYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVcG9uIGEgZm9sbG93LXVwIGV2ZW50IGZvciB0aGlzIHByb2R1Y3QgKGV4LiBiYXNrZXQpLCB3ZSB3b3VsZCBwaWNrIHRoaXMgdHJhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhaWwucmVnaXN0ZXIoaWQsIFRyYWlsVHlwZS5Bc3NvY2lhdGVkLCBwcmV2aW91c1RyYWlsLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMucmVzb2x2ZSh0aGlzLnBvc2l0aW9uUmVzb2x2ZXIsIGxvZywgZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIHByaWNlOiB0aGlzLnJlc29sdmUodGhpcy5wcmljZVJlc29sdmVyLCBsb2csIGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGVsID0+IHtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmxvZ1dyYXBIYW5kbGVyKGV2ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gY29sbGVjdChlbCk7XG4gICAgICAgICAgICAgICAgaWYgKHBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVyLndyaXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiB0aGlzLmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnBheWxvYWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgbG9nKSk7XG4gICAgICAgIH07XG4gICAgICAgIG5ldyBTZW50aW5lbCh0aGlzLmdldERvY3VtZW50KCkpLm9uKHRoaXMuc2VsZWN0b3JFeHByZXNzaW9uLCBoYW5kbGVyKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDbGlja0NvbGxlY3RvciB9IGZyb20gXCIuL0NsaWNrQ29sbGVjdG9yXCI7XG5pbXBvcnQgeyBMaXN0ZW5lclR5cGUgfSBmcm9tIFwiLi4vdXRpbHMvTGlzdGVuZXJUeXBlXCI7XG4vKipcbiAqIENvbGxlY3QgaWQgYW5kIHByaWNlIGlmIGFuIGl0ZW0gd2FzIGFkZCBpbnRvIHRoZSBiYXNrZXRcbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2tldENsaWNrQ29sbGVjdG9yIGV4dGVuZHMgQ2xpY2tDb2xsZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBpZFJlc29sdmVyLCBwcmljZVJlc29sdmVyLCBsaXN0ZW5lclR5cGUgPSBMaXN0ZW5lclR5cGUuU2VudGluZWwpIHtcbiAgICAgICAgc3VwZXIoc2VsZWN0b3IsIFwiYmFza2V0XCIsIGxpc3RlbmVyVHlwZSk7XG4gICAgICAgIHRoaXMuaWRSZXNvbHZlciA9IGlkUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMucHJpY2VSZXNvbHZlciA9IHByaWNlUmVzb2x2ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbGxlY3QgdGhlIHByb2R1Y3QgY2xpY2sgaW5mb3JtYXRpb24gZnJvbSB0aGUgZWxlbWVudFxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIGNvbGxlY3QoZWxlbWVudCwgZXZlbnQsIGxvZykge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMucmVzb2x2ZSh0aGlzLmlkUmVzb2x2ZXIsIGxvZywgZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgcHJpY2U6IHRoaXMucmVzb2x2ZSh0aGlzLnByaWNlUmVzb2x2ZXIsIGxvZywgZWxlbWVudCwgZXZlbnQpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuLyoqXG4gKiBDb2xsZWN0IGJhc2ljIGJyb3dzZXIgaW5mb3JtYXRpb24uIE5vdGUgdGhhdCBkZXBlbmRpbmcgb24gaG93IHlvdSB1c2UgdGhpcyB5b3UgbWF5XG4gKiBuZWVkIHRvIGNvbnN1bHQgdGhlIEdEUFIgZ3VpZGVsaW5lc1xuICovXG5leHBvcnQgY2xhc3MgQnJvd3NlckNvbGxlY3RvciBleHRlbmRzIEFic3RyYWN0Q29sbGVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0geyByZWNvcmRVcmw6IHRydWUsIHJlY29yZFJlZmVycmVyOiB0cnVlLCByZWNvcmRMYW5ndWFnZTogZmFsc2UsIHJlY29yZFVzZXJBZ2VudDogZmFsc2UgfSkge1xuICAgICAgICBzdXBlcihcImJyb3dzZXJcIik7XG4gICAgICAgIHRoaXMucmVjb3JkVXJsID0gb3B0aW9ucy5yZWNvcmRVcmwgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMucmVjb3JkUmVmZXJyZXIgPSBvcHRpb25zLnJlY29yZFJlZmVycmVyIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLnJlY29yZExhbmd1YWdlID0gb3B0aW9ucy5yZWNvcmRMYW5ndWFnZSB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWNvcmRVc2VyQWdlbnQgPSBvcHRpb25zLnJlY29yZFVzZXJBZ2VudCB8fCBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0YWNoIGEgd3JpdGVyLCBub3RlIHRoYXQgdGhpcyBjb2xsZWN0b3IgaXMgbm90IGFzeW5jaHJvbm91cyBhbmQgd2lsbCB3cml0ZVxuICAgICAqIHRoZSBkYXRhIGltbWVkaWF0ZWxseVxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHdyaXRlciAtIFRoZSB3cml0ZXIgdG8gc2VuZCB0aGUgZGF0YSB0b1xuICAgICAqL1xuICAgIGF0dGFjaCh3cml0ZXIpIHtcbiAgICAgICAgY29uc3Qgd2luID0gdGhpcy5nZXRXaW5kb3coKTtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5nZXREb2N1bWVudCgpO1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgdHlwZTogdGhpcy5nZXRUeXBlKCksXG4gICAgICAgICAgICB0b3VjaDogKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgKG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDApXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnJlY29yZExhbmd1YWdlKVxuICAgICAgICAgICAgZGF0YS5sYW5nID0gd2luLm5hdmlnYXRvci5sYW5ndWFnZTtcbiAgICAgICAgaWYgKHRoaXMucmVjb3JkVXJsKVxuICAgICAgICAgICAgZGF0YS51cmwgPSB3aW4ubG9jYXRpb24uaHJlZjtcbiAgICAgICAgaWYgKHRoaXMucmVjb3JkUmVmZXJyZXIpXG4gICAgICAgICAgICBkYXRhLnJlZiA9IGRvYy5yZWZlcnJlcjtcbiAgICAgICAgaWYgKHRoaXMucmVjb3JkVXNlckFnZW50KVxuICAgICAgICAgICAgZGF0YS5hZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICB3cml0ZXIud3JpdGUoZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuaW1wb3J0IHsgU2VudGluZWwgfSBmcm9tIFwiLi4vdXRpbHMvU2VudGluZWxcIjtcbmltcG9ydCB7IExpc3RlbmVyVHlwZSB9IGZyb20gXCIuLi91dGlscy9MaXN0ZW5lclR5cGVcIjtcbi8qKlxuICogVHJpZ2dlcmVkIGJ5IGEgY2xpY2tTZWxlY3RvciwgdGhlIGNvbGxlY3RvciB3aWxsIGZpcmUgdGhlIGNvbnRlbnRTZWxlY3RvciB0byBzZWxlY3QgZWxlbWVudHMgdG8gY29sbGVjdFxuICogaW5mb3JtYXRpb24gZnJvbSBhbmQgd3JpdGUgdG8gdGhlIGNvbGxlY3RvciB3cml0ZXJcbiAqL1xuZXhwb3J0IGNsYXNzIENoZWNrb3V0Q2xpY2tDb2xsZWN0b3IgZXh0ZW5kcyBBYnN0cmFjdENvbGxlY3RvciB7XG4gICAgY29uc3RydWN0b3IoY2xpY2tTZWxlY3RvciwgY29udGVudFNlbGVjdG9yLCBpZFJlc29sdmVyLCBwcmljZVJlc29sdmVyLCBhbW91bnRSZXNvbHZlciwgbGlzdGVuZXJUeXBlID0gTGlzdGVuZXJUeXBlLlNlbnRpbmVsKSB7XG4gICAgICAgIHN1cGVyKFwiY2hlY2tvdXRcIik7XG4gICAgICAgIHRoaXMuY2xpY2tTZWxlY3RvciA9IGNsaWNrU2VsZWN0b3I7XG4gICAgICAgIHRoaXMuY29udGVudFNlbGVjdG9yID0gY29udGVudFNlbGVjdG9yO1xuICAgICAgICB0aGlzLmlkUmVzb2x2ZXIgPSBpZFJlc29sdmVyO1xuICAgICAgICB0aGlzLnByaWNlUmVzb2x2ZXIgPSBwcmljZVJlc29sdmVyO1xuICAgICAgICB0aGlzLmFtb3VudFJlc29sdmVyID0gYW1vdW50UmVzb2x2ZXI7XG4gICAgICAgIHRoaXMubGlzdGVuZXJUeXBlID0gbGlzdGVuZXJUeXBlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgY2xpY2sgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBpZGVudGlmaWVkIGVsZW1lbnRzLCB3cml0ZSB0aGUgZGF0YVxuICAgICAqIHdoZW4gdGhlIGV2ZW50IG9jY3Vyc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHdyaXRlciAtIFRoZSB3cml0ZXIgdG8gc2VuZCB0aGUgZGF0YSB0b1xuICAgICAqIEBwYXJhbSBsb2dcbiAgICAgKi9cbiAgICBhdHRhY2god3JpdGVyLCBsb2cpIHtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5nZXREb2N1bWVudCgpO1xuICAgICAgICAvLyBBY3RpdmF0ZXMgb24gY2xpY2sgb2YgdGhlIGVsZW1lbnQgc2VsZWN0ZWQgdXNpbmcgdGhlIGNsaWNrU2VsZWN0b3JcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbCh0aGlzLmNvbnRlbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gdGhpcy5yZXNvbHZlKHRoaXMuaWRSZXNvbHZlciwgbG9nLCBlbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiB0aGlzLnJlc29sdmUodGhpcy5wcmljZVJlc29sdmVyLCBsb2csIGVsZW1lbnQsIGV2ZW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogdGhpcy5yZXNvbHZlKHRoaXMuYW1vdW50UmVzb2x2ZXIsIGxvZywgZWxlbWVudCwgZXZlbnQpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIHdyaXRlIGVhY2ggaXRlbSBzZXBhcmF0ZWx5IC0gdGhleSBtYXkgYmUgY29taW5nIGZyb20gZGlmZmVyZW50IHF1ZXJpZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gdGh1cyB3aGVuIHdlIHRyeSB0byByZXNvbHZlIHRoZSB0cmFpbCBmb3IgZWFjaCBvZiB0aGVtIHdlIG5lZWQgdG8gaGF2ZSB0aGVtXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIHNlcGFyYXRlIHJlY29yZHNcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVyLndyaXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uZGF0YVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gVGhlIFNlbnRpZWwgbGlicmFyeSB1c2VzIGFuaW1hdGlvbnN0YXJ0IGV2ZW50IGxpc3RlbmVycyB3aGljaCBtYXkgaW50ZXJmZXJlIHdpdGhcbiAgICAgICAgLy8gYW5pbWF0aW9ucyBhdHRhY2hlZCBvbiBlbGVtZW5ldHMuIFRoZSBpbi1saWJyYXJ5IHByb3ZpZGVkIHdvcmthcm91bmQgbWVjaGFuaXNtIGRvZXMgbm90IHdvcmtcbiAgICAgICAgLy8gMTAwJSwgdGh1cyB3ZSBwcm92aWRlIHRoZSBsaXN0ZW5lclR5cGUgY2hvaWNlIGJlbG93LiBUaGUgdHJhZGVvZmZzXG4gICAgICAgIC8vIFwiZG9tXCIgLSBubyBhbmltYXRpb24gaW50ZXJmZXJlbmNlLCBvbmx5IG9uY2xpY2sgYXR0YWNoZWQsIGJ1dCBkb2VzIG5vdCBoYW5kbGUgZWxlbWVudHMgaW5zZXJ0ZWQgaW4gdGhlIERPTSBsYXRlclxuICAgICAgICAvLyBcInNlbnRpbmVsIChkZWZhdWx0KVwiIC0gd29ya3Mgb24gZWxlbWVudHMgaW5zZXJ0ZWQgaW4gdGhlIERPTSBhbnl0aW1lLCBidXQgaW50ZXJmZXJlcyB3aXRoIENTUyBhbmltYXRpb25zIG9uIHRoZXNlIGVsZW1lbnRzXG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyVHlwZSA9PT0gTGlzdGVuZXJUeXBlLkRvbSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZUxpc3QgPSBkb2MucXVlcnlTZWxlY3RvckFsbCh0aGlzLmNsaWNrU2VsZWN0b3IpO1xuICAgICAgICAgICAgbm9kZUxpc3QuZm9yRWFjaCgoZWwpID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmxvZ1dyYXBIYW5kbGVyKGhhbmRsZXIsIGxvZyksIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhcHR1cmU6IHRydWVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbnRpbmVsID0gbmV3IFNlbnRpbmVsKHRoaXMuZ2V0RG9jdW1lbnQoKSk7XG4gICAgICAgICAgICBzZW50aW5lbC5vbih0aGlzLmNsaWNrU2VsZWN0b3IsIGVsID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmxvZ1dyYXBIYW5kbGVyKGhhbmRsZXIsIGxvZyksIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhcHR1cmU6IHRydWVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEFic3RyYWN0Q29sbGVjdG9yIH0gZnJvbSBcIi4vQWJzdHJhY3RDb2xsZWN0b3JcIjtcbmltcG9ydCB7IFNlbnRpbmVsIH0gZnJvbSBcIi4uL3V0aWxzL1NlbnRpbmVsXCI7XG5pbXBvcnQgeyBMaXN0ZW5lclR5cGUgfSBmcm9tIFwiLi4vdXRpbHMvTGlzdGVuZXJUeXBlXCI7XG4vKipcbiAqIENvbGxlY3QgY2xpY2tzIG9uIGVsZW1lbnRzIG1hdGNoaW5nIGEgcXVlcnkgc2VsZWN0b3IuIEhhbmRsZXMgYm90aCBET00gZWxlbWVudHNcbiAqIHByZXNlbnQgaW4gdGhlIERPTSBhbmQgZWxlbWVudHMgaW5zZXJ0ZWQgYWZ0ZXIgdGhlIHBhZ2UgbG9hZCAvIGNvbGxlY3RvciBjb25zdHJ1Y3Rpb24uXG4gKlxuICogV2hlbiBhIGNsaWNrIG9jY3VycywgYSBmdW5jdGlvbiBwcm92aWRlZCBhdCBjb25zdHJ1Y3Rpb24gdGltZSBnZXQgaW52b2tlZCB0byBjb2xsZWN0IGRhdGEgcG9pbnRzXG4gKiBmcm9tIHRoZSBlbGVtZW50LlxuICovXG5leHBvcnQgY2xhc3MgQ2xpY2tDb2xsZWN0b3IgZXh0ZW5kcyBBYnN0cmFjdENvbGxlY3RvciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgY2xpY2sgY29sbGVjdG9yXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JFeHByZXNzaW9uIC0gRG9jdW1lbnQgcXVlcnkgc2VsZWN0b3IgaWRlbnRpZnlpbmcgdGhlIGVsZW1lbnRzIHRvIGF0dGFjaCB0b1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgT0YgZWxlbWVudCBjbGljayB0byByZXBvcnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdGVuZXJUeXBlIC0gV2hldGhlciB0aGUgbGlzdGVuZXIgc2hvdWxkIGJlIGEgZG9tIG9yIHNlbnRpbmVsIGxpc3RlbmVyXG4gICAgICogQHBhcmFtIGNvbnRleHRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvckV4cHJlc3Npb24sIHR5cGUgPSBcImNsaWNrXCIsIGxpc3RlbmVyVHlwZSA9IExpc3RlbmVyVHlwZS5TZW50aW5lbCwgY29udGV4dCkge1xuICAgICAgICBzdXBlcih0eXBlLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy5zZWxlY3RvckV4cHJlc3Npb24gPSBzZWxlY3RvckV4cHJlc3Npb247XG4gICAgICAgIHRoaXMubGlzdGVuZXJUeXBlID0gbGlzdGVuZXJUeXBlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBYnN0cmFjdCBjb2xsZWN0aW9uIG1ldGhvZCwgbXVzdCBiZSBvdmVycmlkZGVuIGluIHRoZSBzdWJjbGFzc2VzXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgY29sbGVjdChlbGVtZW50LCBldmVudCwgbG9nKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBjbGljayBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGlkZW50aWZpZWQgZWxlbWVudHMsIHdyaXRlIHRoZSBkYXRhXG4gICAgICogd2hlbiB0aGUgZXZlbnQgb2NjdXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gd3JpdGVyIC0gVGhlIHdyaXRlciB0byBzZW5kIHRoZSBkYXRhIHRvXG4gICAgICogQHBhcmFtIGxvZ1xuICAgICAqL1xuICAgIGF0dGFjaCh3cml0ZXIsIGxvZykge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gKGV2ZW50LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5jb2xsZWN0KGVsZW1lbnQsIGV2ZW50LCBsb2cpO1xuICAgICAgICAgICAgaWYgKHBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICB3cml0ZXIud3JpdGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIC4uLnBheWxvYWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gVGhlIFNlbnRpZWwgbGlicmFyeSB1c2VzIGFuaW1hdGlvbnN0YXJ0IGV2ZW50IGxpc3RlbmVycyB3aGljaCBtYXkgaW50ZXJmZXJlIHdpdGhcbiAgICAgICAgLy8gYW5pbWF0aW9ucyBhdHRhY2hlZCBvbiBlbGVtZW5ldHMuIFRoZSBpbi1saWJyYXJ5IHByb3ZpZGVkIHdvcmthcm91bmQgbWVjaGFuaXNtIGRvZXMgbm90IHdvcmtcbiAgICAgICAgLy8gMTAwJSwgdGh1cyB3ZSBwcm92aWRlIHRoZSBsaXN0ZW5lclR5cGUgY2hvaWNlIGJlbG93LiBUaGUgdHJhZGVvZmZzXG4gICAgICAgIC8vIFwiZG9tXCIgLSBubyBhbmltYXRpb24gaW50ZXJmZXJlbmNlLCBvbmx5IG9uY2xpY2sgYXR0YWNoZWQsIGJ1dCBkb2VzIG5vdCBoYW5kbGUgZWxlbWVudHMgaW5zZXJ0ZWQgaW4gdGhlIERPTSBsYXRlclxuICAgICAgICAvLyBcInNlbnRpbmVsIChkZWZhdWx0KVwiIC0gd29ya3Mgb24gZWxlbWVudHMgaW5zZXJ0ZWQgaW4gdGhlIERPTSBhbnl0aW1lLCBidXQgaW50ZXJmZXJlcyB3aXRoIENTUyBhbmltYXRpb25zIG9uIHRoZXNlIGVsZW1lbnRzXG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyVHlwZSA9PT0gTGlzdGVuZXJUeXBlLkRvbSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZUxpc3QgPSB0aGlzLmdldERvY3VtZW50KCkucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yRXhwcmVzc2lvbik7XG4gICAgICAgICAgICBub2RlTGlzdC5mb3JFYWNoKChlbCkgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMubG9nV3JhcEhhbmRsZXIoaGFuZGxlciwgbG9nLCBlbCksIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhcHR1cmU6IHRydWVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbnRpbmVsID0gbmV3IFNlbnRpbmVsKHRoaXMuZ2V0RG9jdW1lbnQoKSk7XG4gICAgICAgICAgICBzZW50aW5lbC5vbih0aGlzLnNlbGVjdG9yRXhwcmVzc2lvbiwgZWwgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMubG9nV3JhcEhhbmRsZXIoaGFuZGxlciwgbG9nLCBlbCksIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhcHR1cmU6IHRydWVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IExpc3RlbmVyVHlwZSB9IGZyb20gXCIuLi91dGlscy9MaXN0ZW5lclR5cGVcIjtcbmltcG9ydCB7IFNlbnRpbmVsIH0gZnJvbSBcIi4uL3V0aWxzL1NlbnRpbmVsXCI7XG5pbXBvcnQgeyBXcml0ZXJSZXNvbHZlckNvbGxlY3RvciB9IGZyb20gXCIuL1dyaXRlclJlc29sdmVyQ29sbGVjdG9yXCI7XG4vKipcbiAqIEV4dGVuZHMgV3JpdGVyUmVzb2x2ZXJDb2xsZWN0b3IgYW5kIGludm9rZXMgdGhlIFdyaXRlclJlc29sdmVyQ29sbGVjdG9yI2F0dGFjaCh3cml0ZXIsIGxvZylcbiAqIHdoZW4gYSBjbGljayBvbiBhbiBlbGVtZW50IGZvciB0aGUgcHJvdmlkZWQgXCJzZWxlY3RvckV4cHJlc3Npb25cIiBvY2N1cnNcbiAqL1xuZXhwb3J0IGNsYXNzIENsaWNrV3JpdGVyUmVzb2x2ZXJDb2xsZWN0b3IgZXh0ZW5kcyBXcml0ZXJSZXNvbHZlckNvbGxlY3RvciB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3JFeHByZXNzaW9uIHRoZSBjc3MgZXhwcmVzc2lvbiB0byBxdWVyeSBmb3Igb3RoZXIgZWxlbWVudHNcbiAgICAgKiBAcGFyYW0gdHlwZSB0aGUgdHlwZSBvZiB0aGUgZXZlbnRcbiAgICAgKiBAcGFyYW0gcmVzb2x2ZXIgYSB7V3JpdGVyUmVzb2x2ZXJ9IHdoaWNoIHdpbGwgYmUgZXhlY3V0ZWQgYXMgc29vbiBhcyBhbiBlbGVtZW50IG1hdGNoaW5nIHRoZSBzZWxlY3RvckV4cHJlc3Npb24gaXMgY2xpY2tlZFxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclR5cGUge0xpc3RlbmVyVHlwZX1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvckV4cHJlc3Npb24sIHR5cGUsIHJlc29sdmVyLCBsaXN0ZW5lclR5cGUgPSBMaXN0ZW5lclR5cGUuU2VudGluZWwpIHtcbiAgICAgICAgc3VwZXIodHlwZSwgcmVzb2x2ZXIpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yRXhwcmVzc2lvbiA9IHNlbGVjdG9yRXhwcmVzc2lvbjtcbiAgICAgICAgdGhpcy5saXN0ZW5lclR5cGUgPSBsaXN0ZW5lclR5cGU7XG4gICAgfVxuICAgIGF0dGFjaCh3cml0ZXIsIGxvZykge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gKGVsLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgc3VwZXIuYXR0YWNoKHdyaXRlciwgbG9nKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJUeXBlID09PSBMaXN0ZW5lclR5cGUuRG9tKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlTGlzdCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZWN0b3JFeHByZXNzaW9uKTtcbiAgICAgICAgICAgIG5vZGVMaXN0LmZvckVhY2goZWwgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ID0+IHRoaXMubG9nV3JhcEhhbmRsZXIoaGFuZGxlciwgbG9nLCBlbCwgZXYpKCksIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhcHR1cmU6IHRydWVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbnRpbmVsID0gbmV3IFNlbnRpbmVsKHRoaXMuZ2V0RG9jdW1lbnQoKSk7XG4gICAgICAgICAgICBzZW50aW5lbC5vbih0aGlzLnNlbGVjdG9yRXhwcmVzc2lvbiwgZWwgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ID0+IHRoaXMubG9nV3JhcEhhbmRsZXIoaGFuZGxlciwgbG9nLCBlbCwgZXYpKCksIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhcHR1cmU6IHRydWVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENsaWNrQ29sbGVjdG9yIH0gZnJvbSBcIi4vQ2xpY2tDb2xsZWN0b3JcIjtcbi8qKlxuICogQ2xpY2tDb2xsZWN0b3IgZW1pdHRpbmcgXCJmaWx0ZXJcIiBldmVudHMsIGF0dGFjaCB0byBmYWNldCBsaW5rc1xuICovXG5leHBvcnQgY2xhc3MgRmlsdGVyQ2xpY2tDb2xsZWN0b3IgZXh0ZW5kcyBDbGlja0NvbGxlY3RvciB7XG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNvbGxlY3Rvcikge1xuICAgICAgICBzdXBlcihzZWxlY3RvciwgXCJmaWx0ZXJcIik7XG4gICAgICAgIHRoaXMucmVzb2x2ZXIgPSBjb2xsZWN0b3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbGxlY3QgdGhlIHByb2R1Y3QgY2xpY2sgaW5mb3JtYXRpb24gZnJvbSB0aGUgZWxlbWVudFxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIGNvbGxlY3QoZWxlbWVudCwgZXZlbnQsIGxvZykge1xuICAgICAgICByZXR1cm4geyBxdWVyeTogdGhpcy5yZXNvbHZlKHRoaXMucmVzb2x2ZXIsIGxvZywgZWxlbWVudCwgZXZlbnQpIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgV3JpdGVyUmVzb2x2ZXJDb2xsZWN0b3IgfSBmcm9tIFwiLi9Xcml0ZXJSZXNvbHZlckNvbGxlY3RvclwiO1xuLyoqXG4gKiBUcmlnZ2VyZWQgd2hlbiB0aGUgY2xpZW50IGhhcyB0cmlnZ2VyZWQvZmlyZWQgYSBzZWFyY2hcbiAqL1xuZXhwb3J0IGNsYXNzIEZpcmVkU2VhcmNoQ29sbGVjdG9yIGV4dGVuZHMgV3JpdGVyUmVzb2x2ZXJDb2xsZWN0b3Ige1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBmaXJlZCBzZWFyY2ggY29sbGVjdG9yXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlciAtIEZ1bmN0aW9uIHRoYXQgdHJpZ2dlcnMgdGhlIHdyaXRpbmcuIFdlIGNhbid0IGFsd2F5cyBkZXRlcm1pbmUgd2hlbiBzZWFyY2ggdHJpZ2dlcnMsIGxlYXZlIHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0byBkZXRlcm1pbmUgd2hlbi9ob3dcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXNvbHZlcikge1xuICAgICAgICBzdXBlcihcImZpcmVkLXNlYXJjaFwiLCByZXNvbHZlcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuLyoqXG4gKiBDb2xsZWN0IGRpZmZlcmVudCB0eXBlIG9mIGV2ZW50cyB2aWEgYSBjdXN0b20gZXZlbnQuIFRoZSBjdXN0b20gZXZlbnQgc2hvdWxkIGhvbGQgdGhlIHByb3BlcnRpZXNcbiAqIFwidHlwZVwiIGFuZCBcImRhdGFcIiBpbiB0aGUgY3VzdG9tIHBheWxvYWQuXG4gKlxuICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0d1aWRlL0V2ZW50cy9DcmVhdGluZ19hbmRfdHJpZ2dlcmluZ19ldmVudHMgZm9yIGd1aWRhbmNlXG4gKi9cbmV4cG9ydCBjbGFzcyBHZW5lcmljRXZlbnRDb2xsZWN0b3IgZXh0ZW5kcyBBYnN0cmFjdENvbGxlY3RvciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGV2ZW50IGJhc2VkIGNvbGxlY3RvclxuICAgICAqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZWFjdCBvblxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZXZlbnROYW1lLCB0eXBlID0gXCJHZW5lcmljRXZlbnRcIikge1xuICAgICAgICBzdXBlcih0eXBlKTtcbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBldmVudE5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhIHdyaXRlciwgbm90ZSB0aGF0IHRoaXMgY29sbGVjdG9yIGlzIGFzeW5jaHJvbm91cyBhbmQgd2lsbCB3cml0ZVxuICAgICAqIHRoZSBkYXRhIHdoZW4gdGhlIGV2ZW50IHRyaWdnZXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gd3JpdGVyIC0gVGhlIHdyaXRlciB0byBzZW5kIHRoZSBkYXRhIHRvXG4gICAgICogQHBhcmFtIGxvZ1xuICAgICAqL1xuICAgIGF0dGFjaCh3cml0ZXIsIGxvZykge1xuICAgICAgICB0aGlzLmdldFdpbmRvdygpLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsIHRoaXMubG9nV3JhcEhhbmRsZXIoKGUpID0+IHtcbiAgICAgICAgICAgIHdyaXRlci53cml0ZSh7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IGUuZGV0YWlsLnR5cGUsXG4gICAgICAgICAgICAgICAgLi4uZS5kZXRhaWwuZGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGxvZykpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEFic3RyYWN0Q29sbGVjdG9yIH0gZnJvbSBcIi4vQWJzdHJhY3RDb2xsZWN0b3JcIjtcbmltcG9ydCB7IFNlbnRpbmVsIH0gZnJvbSBcIi4uL3V0aWxzL1NlbnRpbmVsXCI7XG5pbXBvcnQgU2Nyb2xsTW9uaXRvciBmcm9tIFwic2Nyb2xsbW9uaXRvclwiO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlUXVldWUgfSBmcm9tIFwiLi4vdXRpbHMvTG9jYWxTdG9yYWdlUXVldWVcIjtcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbi8qKlxuICogQ29sbGVjdCBpbXByZXNzaW9ucyAtIGEgZGlzcGxheSBvZiBhIHByb2R1Y3QgaW4gdGhlIGJyb3dzZXIgdmlld3BvcnQuIElmIHRoZSBwcm9kdWN0IGlzIHNob3duIG11bHRpcGxlXG4gKiB0aW1lcywgdGhlIGNvbGxlY3RvciB3aWxsIHJlY29yZCBtdWx0aXBsZSBldmVudHMgaS5lLiB3ZSBkb24ndCBhcHBseSBmaWx0ZXIgbG9naWMgaGVyZS5cbiAqXG4gKiBIYW5kbGVzIGJvdGggRE9NIGVsZW1lbnRzIHByZXNlbnQgaW4gdGhlIERPTSBhbmQgZWxlbWVudHMgaW5zZXJ0ZWQgYWZ0ZXIgdGhlIHBhZ2UgbG9hZCAvIGNvbGxlY3RvciBjb25zdHJ1Y3Rpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBJbXByZXNzaW9uQ29sbGVjdG9yIGV4dGVuZHMgQWJzdHJhY3RDb2xsZWN0b3Ige1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBpbXByZXNzaW9uIGNvbGxlY3RvclxuICAgICAqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yRXhwcmVzc2lvbiAtIERvY3VtZW50IHF1ZXJ5IHNlbGVjdG9yIGlkZW50aWZ5aW5nIHRoZSBlbGVtZW50cyB0byBhdHRhY2ggdG9cbiAgICAgKiBAcGFyYW0gaWRSZXNvbHZlciAtIFJlc29sdmUgdGhlIGlkIG9mIHRoZSBlbGVtZW50XG4gICAgICogQHBhcmFtIHBvc2l0aW9uUmVzb2x2ZXIgLSBSZXNvbHZlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudCBpbiBkb21cbiAgICAgKiBAcGFyYW0gZXhwZWN0ZWRQYWdlUmVzb2x2ZXIgLSBJZiBzdXBwbGllZCwgaW1wcmVzc2lvbnMgd2lsbCBvbmx5IGJlIHRyYWNrZWQgaWYgdGhpcyByZXNvbHZlciByZXR1cm5zIHRydWUuIENvbWVzIGluIGhhbmR5IGZvciBzaW5nbGUgcGFnZSBhcHBsaWNhdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvckV4cHJlc3Npb24sIGlkUmVzb2x2ZXIsIHBvc2l0aW9uUmVzb2x2ZXIsIGV4cGVjdGVkUGFnZVJlc29sdmVyKSB7XG4gICAgICAgIHN1cGVyKFwiaW1wcmVzc2lvblwiKTtcbiAgICAgICAgdGhpcy5zZWxlY3RvckV4cHJlc3Npb24gPSBzZWxlY3RvckV4cHJlc3Npb247XG4gICAgICAgIHRoaXMuaWRSZXNvbHZlciA9IGlkUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMucG9zaXRpb25SZXNvbHZlciA9IHBvc2l0aW9uUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMuZXhwZWN0ZWRQYWdlUmVzb2x2ZXIgPSBleHBlY3RlZFBhZ2VSZXNvbHZlcjtcbiAgICAgICAgdGhpcy5xdWV1ZSA9IG5ldyBMb2NhbFN0b3JhZ2VRdWV1ZShcImltcHJlc3Npb25zXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgaW1wcmVzc2lvbiBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGlkZW50aWZpZWQgZWxlbWVudHMsIHdyaXRlIHRoZSBkYXRhXG4gICAgICogd2hlbiB0aGUgZXZlbnQgb2NjdXJzLCB3aXRoIGEgZGVsYXkgb2YgMXMgLSB3ZSBjb3VsZCBnYXRoZXIgbWFueSBldmVudHMgd2l0aGluIHRoaXMgdGltZWZyYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gd3JpdGVyIC0gVGhlIHdyaXRlciB0byBzZW5kIHRoZSBkYXRhIHRvXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZyAtIFRoZSBsb2dnZXJcbiAgICAgKi9cbiAgICBhdHRhY2god3JpdGVyLCBsb2cpIHtcbiAgICAgICAgY29uc3QgZmx1c2ggPSBkZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnF1ZXVlLnRyYW5zYWN0aW9uYWxEcmFpbihxdWV1ZSA9PiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHJlcyh3cml0ZXIud3JpdGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHF1ZXVlXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBsb2cuZXJyb3IoXCJDb3VsZCBub3QgZHJhaW4gcXVldWU6IFwiLCBlcnIpKTtcbiAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgU2Nyb2xsTW9uaXRvci5jcmVhdGUoZWxlbWVudCkuZW50ZXJWaWV3cG9ydCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhwZWN0ZWRQYWdlUmVzb2x2ZXIgJiYgIXRoaXMuZXhwZWN0ZWRQYWdlUmVzb2x2ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucXVldWUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnJlc29sdmUodGhpcy5pZFJlc29sdmVyLCBsb2csIGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5yZXNvbHZlKHRoaXMucG9zaXRpb25SZXNvbHZlciwgbG9nLCBlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgbmV3IFNlbnRpbmVsKHRoaXMuZ2V0RG9jdW1lbnQoKSkub24odGhpcy5zZWxlY3RvckV4cHJlc3Npb24sIHRoaXMubG9nV3JhcEhhbmRsZXIoaGFuZGxlciwgbG9nKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuaW1wb3J0IHsgU2VudGluZWwgfSBmcm9tIFwiLi4vdXRpbHMvU2VudGluZWxcIjtcbmltcG9ydCB7IExpc3RlbmVyVHlwZSB9IGZyb20gXCIuLi91dGlscy9MaXN0ZW5lclR5cGVcIjtcbi8qKlxuICogQ29sbGVjdCBzZWFyY2ggaW5mb3JtYXRpb24gZnJvbSBhIGZpZWxkIHRoYXQgaGFzIGEgXCJhcy15b3UtdHlwZVwiIHRyaWdnZXIgYW5kXG4gKiByZW5kZXJzIHNlYXJjaCByZXN1bHRzIGltbWVkaWF0ZWx5LiBNYXkgdHJpZ2dlciBtdWx0aXBsZSB0aW1lcyBkZXBlbmRpbmcgb25cbiAqIHR5cGUgc3BlZWQgcGF0dGVybnMgLSB3ZSBleHBlY3QgdGhhdCB0aGUgaW50ZXJ2YWwgYmV0d2VlbiBrZXkgc3Ryb2tlcyB3b3VsZCBiZVxuICogbGVzcyB0aGFuIDUwMG1zXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnN0YW50U2VhcmNoUXVlcnlDb2xsZWN0b3IgZXh0ZW5kcyBBYnN0cmFjdENvbGxlY3RvciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGluc3RhbnQgc2VhcmNoIGNvbGxlY3RvclxuICAgICAqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yRXhwcmVzc2lvbiAtIERvY3VtZW50IHF1ZXJ5IHNlbGVjdG9yIGlkZW50aWZ5aW5nIHRoZSBlbGVtZW50cyB0byBhdHRhY2ggdG9cbiAgICAgKiBAcGFyYW0gZGVsYXlNc1xuICAgICAqIEBwYXJhbSBtaW5MZW5ndGhcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJUeXBlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3JFeHByZXNzaW9uLCBkZWxheU1zID0gNTAwLCBtaW5MZW5ndGggPSAyLCBsaXN0ZW5lclR5cGUgPSBMaXN0ZW5lclR5cGUuU2VudGluZWwpIHtcbiAgICAgICAgc3VwZXIoXCJpbnN0YW50LXNlYXJjaFwiKTtcbiAgICAgICAgdGhpcy5zZWxlY3RvckV4cHJlc3Npb24gPSBzZWxlY3RvckV4cHJlc3Npb247XG4gICAgICAgIHRoaXMuZGVsYXlNcyA9IGRlbGF5TXM7XG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gbWluTGVuZ3RoO1xuICAgICAgICB0aGlzLmxpc3RlbmVyVHlwZSA9IGxpc3RlbmVyVHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGltcHJlc3Npb24gZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBpZGVudGlmaWVkIGVsZW1lbnRzLCB3cml0ZSB0aGUgZGF0YVxuICAgICAqIHdoZW4gdGhlIGV2ZW50IG9jY3Vyc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHdyaXRlciAtIFRoZSB3cml0ZXIgdG8gc2VuZCB0aGUgZGF0YSB0b1xuICAgICAqIEBwYXJhbSBsb2dcbiAgICAgKi9cbiAgICBhdHRhY2god3JpdGVyLCBsb2cpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZ2V0VHlwZSgpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gKGUsIHNlYXJjaEJveCkgPT4ge1xuICAgICAgICAgICAgLy8gSWdub3JlIHNoaWZ0LCBjdHJsLCBldGMuIHByZXNzZXMsIHJlYWN0IG9ubHkgb24gY2hhcmFjdGVyc1xuICAgICAgICAgICAgaWYgKGUud2hpY2ggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEZWxheSB0aGUgcmVhY3Rpb24gb2YgdGhlIGV2ZW50LCBjbGVhbiB0aGUgdGltZW91dCBpZiB0aGUgZXZlbnQgZmlyZXNcbiAgICAgICAgICAgIC8vIGFnYWluIGFuZCBzdGFydCBjb3VudGluZyBmcm9tIDBcbiAgICAgICAgICAgIGRlbGF5KCh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXl3b3JkcyA9IHNlYXJjaEJveC52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5d29yZHMgJiYga2V5d29yZHMubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlci53cml0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5d29yZHNcIjoga2V5d29yZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcy5kZWxheU1zKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gVGhlIFNlbnRpZWwgbGlicmFyeSB1c2VzIGFuaW1hdGlvbnN0YXJ0IGV2ZW50IGxpc3RlbmVycyB3aGljaCBtYXkgaW50ZXJmZXJlIHdpdGhcbiAgICAgICAgLy8gYW5pbWF0aW9ucyBhdHRhY2hlZCBvbiBlbGVtZW5ldHMuIFRoZSBpbi1saWJyYXJ5IHByb3ZpZGVkIHdvcmthcm91bmQgbWVjaGFuaXNtIGRvZXMgbm90IHdvcmtcbiAgICAgICAgLy8gMTAwJSwgdGh1cyB3ZSBwcm92aWRlIHRoZSBsaXN0ZW5lclR5cGUgY2hvaWNlIGJlbG93LiBUaGUgdHJhZGVvZmZzXG4gICAgICAgIC8vIFwiZG9tXCIgLSBubyBhbmltYXRpb24gaW50ZXJmZXJlbmNlLCBvbmx5IG9uY2xpY2sgYXR0YWNoZWQsIGJ1dCBkb2VzIG5vdCBoYW5kbGUgZWxlbWVudHMgaW5zZXJ0ZWQgaW4gdGhlIERPTSBsYXRlclxuICAgICAgICAvLyBcInNlbnRpbmVsIChkZWZhdWx0KVwiIC0gd29ya3Mgb24gZWxlbWVudHMgaW5zZXJ0ZWQgaW4gdGhlIERPTSBhbnl0aW1lLCBidXQgaW50ZXJmZXJlcyB3aXRoIENTUyBhbmltYXRpb25zIG9uIHRoZXNlIGVsZW1lbnRzXG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyVHlwZSA9PT0gTGlzdGVuZXJUeXBlLkRvbSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZUxpc3QgPSB0aGlzLmdldERvY3VtZW50KCkucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yRXhwcmVzc2lvbik7XG4gICAgICAgICAgICBub2RlTGlzdC5mb3JFYWNoKGVsID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLmxvZ1dyYXBIYW5kbGVyKGhhbmRsZXIsIGxvZywgZWwpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXcgU2VudGluZWwodGhpcy5nZXREb2N1bWVudCgpKS5vbih0aGlzLnNlbGVjdG9yRXhwcmVzc2lvbiwgKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMubG9nV3JhcEhhbmRsZXIoaGFuZGxlciwgbG9nLCBlbCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jb25zdCBkZWxheSA9IChmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHRpbWVyO1xuICAgIGxldCB0aW1lO1xuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2ssIG1zKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIGlmICghdGltZSlcbiAgICAgICAgICAgIHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRpbWUpO1xuICAgICAgICAgICAgdGltZSA9IG51bGw7XG4gICAgICAgIH0sIG1zKTtcbiAgICB9O1xufSkoKTtcbiIsImltcG9ydCB7IENsaWNrQ29sbGVjdG9yIH0gZnJvbSBcIi4vQ2xpY2tDb2xsZWN0b3JcIjtcbmltcG9ydCB7IExpc3RlbmVyVHlwZSB9IGZyb20gXCIuLi91dGlscy9MaXN0ZW5lclR5cGVcIjtcbmltcG9ydCB7IFRyYWlsVHlwZSB9IGZyb20gXCIuLi9xdWVyeVwiO1xuaW1wb3J0IHsgbm9ybWFsaXplUGF0aG5hbWUgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbi8qKlxuICogQ2xpY2tDb2xsZWN0b3IgZW1pdHRpbmcgXCJwcm9kdWN0XCIgZXZlbnRzLCBhdHRhY2ggdG8gcHJvZHVjdCBsaW5rc1xuICovXG5leHBvcnQgY2xhc3MgUHJvZHVjdENsaWNrQ29sbGVjdG9yIGV4dGVuZHMgQ2xpY2tDb2xsZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZXNvbHZlcnMsIGxpc3RlbmVyVHlwZSA9IExpc3RlbmVyVHlwZS5TZW50aW5lbCkge1xuICAgICAgICBzdXBlcihzZWxlY3RvciwgXCJwcm9kdWN0XCIsIGxpc3RlbmVyVHlwZSk7XG4gICAgICAgIHRoaXMuaWRSZXNvbHZlciA9IHJlc29sdmVycy5pZFJlc29sdmVyO1xuICAgICAgICB0aGlzLnBvc2l0aW9uUmVzb2x2ZXIgPSByZXNvbHZlcnMucG9zaXRpb25SZXNvbHZlcjtcbiAgICAgICAgdGhpcy5wcmljZVJlc29sdmVyID0gcmVzb2x2ZXJzLnByaWNlUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMuaW1hZ2VSZXNvbHZlciA9IHJlc29sdmVycy5pbWFnZVJlc29sdmVyO1xuICAgICAgICB0aGlzLm1ldGFkYXRhUmVzb2x2ZXIgPSByZXNvbHZlcnMubWV0YWRhdGFSZXNvbHZlcjtcbiAgICAgICAgdGhpcy50cmFpbCA9IHJlc29sdmVycy50cmFpbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29sbGVjdCB0aGUgcHJvZHVjdCBjbGljayBpbmZvcm1hdGlvbiBmcm9tIHRoZSBlbGVtZW50XG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgY29sbGVjdChlbGVtZW50LCBldmVudCwgbG9nKSB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5yZXNvbHZlKHRoaXMuaWRSZXNvbHZlciwgbG9nLCBlbGVtZW50LCBldmVudCk7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgY29uc3QgY2xpY2tEYXRhID0ge1xuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnJlc29sdmUodGhpcy5wb3NpdGlvblJlc29sdmVyLCBsb2csIGVsZW1lbnQsIGV2ZW50KSxcbiAgICAgICAgICAgICAgICBwcmljZTogdGhpcy5yZXNvbHZlKHRoaXMucHJpY2VSZXNvbHZlciwgbG9nLCBlbGVtZW50LCBldmVudCksXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHRoaXMucmVzb2x2ZSh0aGlzLmltYWdlUmVzb2x2ZXIsIGxvZywgZWxlbWVudCwgZXZlbnQpLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB0aGlzLnJlc29sdmUodGhpcy5tZXRhZGF0YVJlc29sdmVyLCBsb2csIGVsZW1lbnQsIGV2ZW50KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWlsKSB7XG4gICAgICAgICAgICAgICAgLy8gQWZ0ZXIgYSByZWRpcmVjdCBhIHRyYWlsIHdpdGggdGhlIHBhdGhuYW1lIGlzIHJlZ2lzdGVyZWQgY29udGFpbmluZyB0aGUgcXVlcnkgd2hpY2ggdHJpZ2dlcmVkIHRoZSByZWRpcmVjdC5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIHN1Y2ggYSBxdWVyeSB3ZSB1c2UgaXQgdG8gYnVpbGQgdGhlIHRyYWlsLlxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYWlsRGF0YSA9IHRoaXMudHJhaWwuZmV0Y2gobm9ybWFsaXplUGF0aG5hbWUobG9jYXRpb24ucGF0aG5hbWUpKTtcbiAgICAgICAgICAgICAgICBpZiAodHJhaWxEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRGF0YS5xdWVyeSA9IHRyYWlsRGF0YS5xdWVyeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gUmVnaXN0ZXIgdGhhdCB0aGlzIHByb2R1Y3Qgam91cm5leSBpbnRvIHBvdGVudGlhbCBwdXJjaGFzZSBzdGFydGVkXG4gICAgICAgICAgICAgICAgLy8gd2l0aCB0aGlzIHF1ZXJ5XG4gICAgICAgICAgICAgICAgdGhpcy50cmFpbC5yZWdpc3RlcihpZCwgVHJhaWxUeXBlLk1haW4sIHRyYWlsRGF0YSA9PT0gbnVsbCB8fCB0cmFpbERhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRyYWlsRGF0YS5xdWVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2xpY2tEYXRhO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuaW1wb3J0IHsgY29va2llU2Vzc2lvblJlc29sdmVyIH0gZnJvbSBcIi4uL3Jlc29sdmVycy9SZXNvbHZlclwiO1xuaW1wb3J0IHsgZ2V0U2Vzc2lvblN0b3JhZ2UsIExpc3RlbmVyVHlwZSwgbm9ybWFsaXplUGF0aG5hbWUsIFNlbnRpbmVsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyBRdWVyeSwgVHJhaWwsIFRyYWlsVHlwZSB9IGZyb20gXCIuLi9xdWVyeVwiO1xuLyoqXG4gKiBLZWVwIHRyYWNrIG9mIGh1bWFuIHRyaWdnZXJlZCBzZWFyY2hlcyBmb2xsb3dlZCBieSBhIHJlZGlyZWN0IHRvIGEgcGFnZSBkaWZmZXJlbnQgdGhhbiB0aGUgc2VhcmNoIHJlc3VsdCBwYWdlXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWRpcmVjdENvbGxlY3RvciBleHRlbmRzIEFic3RyYWN0Q29sbGVjdG9yIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgcmVkaXJlY3QgY29sbGVjdG9yXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0cmlnZ2VyUmVzb2x2ZXIgLSBGdW5jdGlvbiB0aGF0IGZpcmVzIHdoZW4gYSBzZWFyY2ggaGFwcGVucywgc2hvdWxkIHJldHVybiB0aGUga2V5d29yZFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGV4cGVjdGVkUGFnZVJlc29sdmVyIC0gRnVuY3Rpb24gdGhhdCBzaG91bGQgcmV0dXJuIHdoZXRoZXIgdGhlIHBhZ2Ugd2UgbG9hZCBpcyB0aGUgZXhwZWN0ZWQgb25lXG4gICAgICogQHBhcmFtIHJlZGlyZWN0S3BpUGFyYW1zIC0gUGFyYW1ldGVycyBmb3IgY29sbGVjdGluZyBLUEkncyBhZnRlciBhIHJlZGlyZWN0XG4gICAgICogQHBhcmFtIGxpc3RlbmVyVHlwZVxuICAgICAqIEBwYXJhbSBjb250ZXh0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IodHJpZ2dlclJlc29sdmVyLCBleHBlY3RlZFBhZ2VSZXNvbHZlciwgcmVkaXJlY3RLcGlQYXJhbXMgPSB7fSwgbGlzdGVuZXJUeXBlID0gTGlzdGVuZXJUeXBlLlNlbnRpbmVsLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHN1cGVyKFwicmVkaXJlY3RcIiwgY29udGV4dCk7XG4gICAgICAgIHRoaXMudHJpZ2dlclJlc29sdmVyID0gdHJpZ2dlclJlc29sdmVyO1xuICAgICAgICB0aGlzLmV4cGVjdGVkUGFnZVJlc29sdmVyID0gZXhwZWN0ZWRQYWdlUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMucmVkaXJlY3RLcGlQYXJhbXMgPSByZWRpcmVjdEtwaVBhcmFtcztcbiAgICAgICAgdGhpcy5saXN0ZW5lclR5cGUgPSBsaXN0ZW5lclR5cGU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2VkIHRvIHRyYWNrIGlmIHRoZSBjb2xsZWN0b3JzIGhhdmUgYmVlbiBhdHRhY2hlZCBhbHJlYWR5IGluIGNhc2UgYXR0YWNoZWQgaXMgY2FsbGVkIG11bHRpcGxlIHRpbWVzXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzQ29sbGVjdG9yc0F0dGFjaGVkID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2VkIHRvIHRyYWNrIGlmIHRoZSB0cmlnZ2VyIGhhcyBiZWVuIGluc3RhbGxlZCBhbHJlYWR5IGluIGNhc2UgYXR0YWNoZWQgaXMgY2FsbGVkIG11bHRpcGxlIHRpbWVzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzVHJpZ2dlckluc3RhbGxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyaWdnZXJSZXNvbHZlciA9IHRyaWdnZXJSZXNvbHZlcjtcbiAgICAgICAgdGhpcy5leHBlY3RlZFBhZ2VSZXNvbHZlciA9IGV4cGVjdGVkUGFnZVJlc29sdmVyO1xuICAgICAgICB0aGlzLmxpc3RlbmVyVHlwZSA9IGxpc3RlbmVyVHlwZTtcbiAgICAgICAgdGhpcy5jb2xsZWN0b3JzID0gcmVkaXJlY3RLcGlQYXJhbXMuY29sbGVjdG9ycyB8fCBbXTtcbiAgICAgICAgdGhpcy5yZXN1bHRDb3VudFJlc29sdmVyID0gcmVkaXJlY3RLcGlQYXJhbXMucmVzdWx0Q291bnRSZXNvbHZlciB8fCAoXyA9PiB2b2lkIDApO1xuICAgICAgICB0aGlzLnJlZGlyZWN0VFRMID0gdGhpcy5yZWRpcmVjdEtwaVBhcmFtcy5yZWRpcmVjdFRUTE1pbGxpcyB8fCA4NjQwMDAwMDtcbiAgICAgICAgdGhpcy5tYXhQYXRoU2VnbWVudHMgPSB0aGlzLnJlZGlyZWN0S3BpUGFyYW1zLm1heFBhdGhTZWdtZW50cyB8fCAtMTtcbiAgICAgICAgdGhpcy5zdWJTZWxlY3RvcnMgPSAoKF9hID0gdGhpcy5yZWRpcmVjdEtwaVBhcmFtcy5uZXN0ZWRSZWRpcmVjdHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdWJTZWxlY3RvcnMpIHx8IFtdO1xuICAgICAgICB0aGlzLmRlcHRoID0gKChfYiA9IHRoaXMucmVkaXJlY3RLcGlQYXJhbXMubmVzdGVkUmVkaXJlY3RzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZGVwdGgpIHx8IDE7XG4gICAgICAgIHRoaXMucXVlcnlSZXNvbHZlciA9IChwaHJhc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChwaHJhc2UuaW5kZXhPZihcIiRzPVwiKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBRdWVyeShwaHJhc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgUXVlcnkoKTtcbiAgICAgICAgICAgIHF1ZXJ5LnNldFNlYXJjaChwaHJhc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNlc3Npb25SZXNvbHZlciA9ICgpID0+IGNvb2tpZVNlc3Npb25SZXNvbHZlcigpO1xuICAgICAgICB0aGlzLnJlZGlyZWN0VHJhaWwgPSBuZXcgVHJhaWwoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF0aEluZm8gPSBSZWRpcmVjdENvbGxlY3Rvci5nZXRSZWRpcmVjdFBhdGhJbmZvKHRoaXMuZ2V0UGF0aG5hbWUoKSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFF1ZXJ5KHBhdGhJbmZvID09PSBudWxsIHx8IHBhdGhJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXRoSW5mby5xdWVyeSk7XG4gICAgICAgIH0sIHRoaXMuc2Vzc2lvblJlc29sdmVyKTtcbiAgICB9XG4gICAgc2V0Q29udGV4dChjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyLnNldENvbnRleHQoY29udGV4dCk7XG4gICAgICAgIHRoaXMuY29sbGVjdG9ycy5mb3JFYWNoKGNvbGxlY3RvciA9PiBjb2xsZWN0b3Iuc2V0Q29udGV4dChjb250ZXh0KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hcmtzIHRoaXMgcGF0aCBhcyBhIHJlZGlyZWN0IGxhbmRpbmcgcGFnZS5cbiAgICAgKiBAcGFyYW0gcGF0aCB0aGUgcGF0aG5hbWUgZS5nLiAvc29tZS1wYXRoXG4gICAgICogQHBhcmFtIHF1ZXJ5IHRoZSBxdWVyeSB3aGljaCBsZWFkIHRvIHRoaXMgcGF0aFxuICAgICAqIEBwYXJhbSBrZXkgdGhlIGtleSB0byBzdG9yZSB0aGUgcmVkaXJlY3QgcGF0aCBpblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc3RhdGljIHNldFJlZGlyZWN0UGF0aChwYXRoLCBxdWVyeSwga2V5ID0gUmVkaXJlY3RDb2xsZWN0b3IuUEFUSF9TVE9SQUdFX0tFWSkge1xuICAgICAgICBjb25zdCByZWRpcmVjdFBhdGhzID0gdGhpcy5nZXRSZWRpcmVjdFBhdGhzKCk7XG4gICAgICAgIHJlZGlyZWN0UGF0aHNbcGF0aF0gPSB7XG4gICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0U2Vzc2lvblN0b3JhZ2UoKS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkocmVkaXJlY3RQYXRocykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIG1hcmtlZCBwYXRoc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc3RhdGljIGdldFJlZGlyZWN0UGF0aHMoa2V5ID0gUmVkaXJlY3RDb2xsZWN0b3IuUEFUSF9TVE9SQUdFX0tFWSkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShnZXRTZXNzaW9uU3RvcmFnZSgpLmdldEl0ZW0oa2V5KSB8fCBcInt9XCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSBkYXRhIGZvciB0aGUgZ2l2ZW4gcGF0aFxuICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc3RhdGljIGdldFJlZGlyZWN0UGF0aEluZm8ocGF0aCwga2V5ID0gUmVkaXJlY3RDb2xsZWN0b3IuUEFUSF9TVE9SQUdFX0tFWSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZWRpcmVjdFBhdGhzKGtleSlbcGF0aF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhbGwgZXhwaXJlZCByZWRpcmVjdCBwYXRoc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZXhwaXJlUmVkaXJlY3RQYXRocyhrZXkgPSBSZWRpcmVjdENvbGxlY3Rvci5QQVRIX1NUT1JBR0VfS0VZKSB7XG4gICAgICAgIGNvbnN0IHJlZGlyZWN0UGF0aHMgPSBSZWRpcmVjdENvbGxlY3Rvci5nZXRSZWRpcmVjdFBhdGhzKGtleSk7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBPYmplY3Qua2V5cyhyZWRpcmVjdFBhdGhzKS5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF0aEluZm8gPSByZWRpcmVjdFBhdGhzW3BhdGhdO1xuICAgICAgICAgICAgaWYgKG5vdyAtIE51bWJlcihwYXRoSW5mby50aW1lc3RhbXApID4gdGhpcy5yZWRpcmVjdFRUTCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByZWRpcmVjdFBhdGhzW3BhdGhdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZ2V0U2Vzc2lvblN0b3JhZ2UoKS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkocmVkaXJlY3RQYXRocykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayB3aGV0aGVyIHdlIHNob3VsZCBiZSByZWNvcmRpbmcgYSByZWRpcmVjdCBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHdyaXRlciAtIFRoZSB3cml0ZXIgdG8gc2VuZCB0aGUgZGF0YSB0b1xuICAgICAqIEBwYXJhbSBsb2dcbiAgICAgKi9cbiAgICBhdHRhY2god3JpdGVyLCBsb2cpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUcmlnZ2VySW5zdGFsbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlKHRoaXMudHJpZ2dlclJlc29sdmVyLCBsb2csIGtleXdvcmQgPT4gZ2V0U2Vzc2lvblN0b3JhZ2UoKS5zZXRJdGVtKFJlZGlyZWN0Q29sbGVjdG9yLkxBU1RfU0VBUkNIX1NUT1JBR0VfS0VZLCBrZXl3b3JkKSk7XG4gICAgICAgICAgICB0aGlzLmlzVHJpZ2dlckluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5leHBpcmVSZWRpcmVjdFBhdGhzKCk7XG4gICAgICAgIC8vIEZldGNoIHRoZSBsYXRlc3Qgc2VhcmNoIGlmIGFueVxuICAgICAgICBjb25zdCBsYXN0U2VhcmNoID0gZ2V0U2Vzc2lvblN0b3JhZ2UoKS5nZXRJdGVtKFJlZGlyZWN0Q29sbGVjdG9yLkxBU1RfU0VBUkNIX1NUT1JBR0VfS0VZKTtcbiAgICAgICAgY29uc3QgcGF0aG5hbWUgPSBub3JtYWxpemVQYXRobmFtZSh0aGlzLmdldFdpbmRvdygpLmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgICAgaWYgKGxhc3RTZWFyY2gpIHtcbiAgICAgICAgICAgIGdldFNlc3Npb25TdG9yYWdlKCkucmVtb3ZlSXRlbShSZWRpcmVjdENvbGxlY3Rvci5MQVNUX1NFQVJDSF9TVE9SQUdFX0tFWSk7XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIG5vdCBsYW5kZWQgb24gdGhlIGV4cGVjdGVkIHNlYXJjaCBwYWdlLCBpdCBtdXN0IGhhdmUgYmVlbiBhIHJlZGlyZWN0XG4gICAgICAgICAgICBpZiAoc2hvdWxkVHJhY2tSZWRpcmVjdChkb2N1bWVudC5yZWZlcnJlcikgJiYgIXRoaXMucmVzb2x2ZSh0aGlzLmV4cGVjdGVkUGFnZVJlc29sdmVyLCBsb2cpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5UmVzb2x2ZXIobGFzdFNlYXJjaCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3cml0ZXIud3JpdGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlZGlyZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGtleXdvcmRzOiBsYXN0U2VhcmNoLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Q291bnQ6IHRoaXMucmVzb2x2ZSh0aGlzLnJlc3VsdENvdW50UmVzb2x2ZXIsIGxvZylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyBtYXJrIGFzIHJlZGlyZWN0IGxhbmRpbmcgcGFnZVxuICAgICAgICAgICAgICAgIFJlZGlyZWN0Q29sbGVjdG9yLnNldFJlZGlyZWN0UGF0aCh0aGlzLmdldFBhdGhuYW1lKCksIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAvLyByZWdpc3RlciB0cmFpbCBvbiB0aGUgY3VycmVudCBwYXRobmFtZSBiZWNhdXNlIHRoZSBQcm9kdWN0Q2xpY2sgY29sbGVjdG9yIGRvZXNuJ3Qga25vdyBhYm91dCB0aGUgbWF4UGF0aFNlZ21lbnRzIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRyYWlsLnJlZ2lzdGVyKHBhdGhuYW1lLCBUcmFpbFR5cGUuTWFpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcyBpcyBvbmx5ICB0cmlnZ2VyZWQgd2hlbiBhIHN1YlNlbGVjdG9yIGl0ZW0gd2FzIGNsaWNrZWQgaS5lLiBhIG5lc3RlZCByZWRpcmVjdFxuICAgICAgICBjb25zdCBsYXN0U2VhcmNoTmVzdGVkUmVkaXJlY3QgPSB0aGlzLmdldE5lc3RlZFJlZGlyZWN0KCk7XG4gICAgICAgIGlmIChsYXN0U2VhcmNoTmVzdGVkUmVkaXJlY3QpIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeVJlc29sdmVyKGxhc3RTZWFyY2hOZXN0ZWRSZWRpcmVjdC5xdWVyeSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIFJlZGlyZWN0Q29sbGVjdG9yLnNldFJlZGlyZWN0UGF0aCh0aGlzLmdldFBhdGhuYW1lKCksIHF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIHRyYWlsIG9uIHRoZSBjdXJyZW50IHBhdGhuYW1lIGJlY2F1c2UgdGhlIFByb2R1Y3RDbGljayBjb2xsZWN0b3IgZG9lc24ndCBrbm93IGFib3V0IHRoZSBtYXhQYXRoU2VnbWVudHMgcHJvcGVydHlcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3RUcmFpbC5yZWdpc3RlcihwYXRobmFtZSwgVHJhaWxUeXBlLk1haW4pO1xuICAgICAgICAgICAgZ2V0U2Vzc2lvblN0b3JhZ2UoKS5yZW1vdmVJdGVtKFJlZGlyZWN0Q29sbGVjdG9yLk5FU1RFRF9SRURJUkVDVF9LRVlXT1JEU19TVE9SQUdFX0tFWSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIHdlIGhhdmUgdHJhY2tlZCB0aGlzIHBhdGggYmVmb3JlIGFuZCBpZiBpdCBpcyBzdGlsbCB2YWxpZC5cbiAgICAgICAgICogSWYgdmFsaWQsIHdlIGhhdmUgdG8gYXR0YWNoIHRoZSBLUEkgY29sbGVjdG9ycyB0byBnYXRoZXIgS1BJcyBmb3IgdGhpcyBsYW5kaW5nIHBhZ2UuXG4gICAgICAgICAqIFdlIGhhdmUgdG8gZG8gdGhpcyBiZWNhdXNlIHBlb3BsZSBjYW4gbmF2aWdhdGUgYXdheSBmcm9tIHRoZSBsYW5kaW5nIHBhZ2UgYW5kIGJhY2sgYWdhaW4gYW5kIHdlIGRvbid0IHdhbnQgdG8gbG9zZSBhbGwgc3Vic2VxdWVudCBjbGlja3MgZXRjLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcGF0aEluZm8gPSB0aGlzLnJlZGlyZWN0VHJhaWwuZmV0Y2godGhpcy5nZXRQYXRobmFtZSgpKTtcbiAgICAgICAgaWYgKHBhdGhJbmZvICYmIHRoaXMuaXNDb2xsZWN0b3JzQXR0YWNoZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoQ29sbGVjdG9ycyh3cml0ZXIsIGxvZywgcGF0aEluZm8ucXVlcnkpO1xuICAgICAgICAgICAgdGhpcy5pc0NvbGxlY3RvcnNBdHRhY2hlZCA9IHRydWU7XG4gICAgICAgICAgICAvLyByZWdpc3RlciB0cmFpbCBvbiB0aGUgY3VycmVudCBwYXRobmFtZSBiZWNhdXNlIHRoZSBQcm9kdWN0Q2xpY2sgY29sbGVjdG9yIGRvZXNuJ3Qga25vdyBhYm91dCB0aGUgbWF4UGF0aFNlZ21lbnRzIHByb3BlcnR5XG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0VHJhaWwucmVnaXN0ZXIocGF0aG5hbWUsIFRyYWlsVHlwZS5NYWluKTtcbiAgICAgICAgICAgIC8vIGlmIHdlIGhhdmUgbmVzdGVkIHJlZGlyZWN0cywgd2UgaGF2ZSB0byBjYXJyeSB0aGUgcXVlcnkgcGFyYW1ldGVycyBvdmVyIHRvIHRoZSBuZXh0IHBhZ2VcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoU3ViU2VsZWN0b3JzKHBhdGhJbmZvLCAobGFzdFNlYXJjaE5lc3RlZFJlZGlyZWN0ID09PSBudWxsIHx8IGxhc3RTZWFyY2hOZXN0ZWRSZWRpcmVjdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGFzdFNlYXJjaE5lc3RlZFJlZGlyZWN0LmRlcHRoKSB8fCAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXROZXN0ZWRSZWRpcmVjdCgpIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGdldFNlc3Npb25TdG9yYWdlKCkuZ2V0SXRlbShSZWRpcmVjdENvbGxlY3Rvci5ORVNURURfUkVESVJFQ1RfS0VZV09SRFNfU1RPUkFHRV9LRVkpO1xuICAgICAgICBpZiAocGF5bG9hZCkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaXNNYXhEZXB0aEV4Y2VlZGVkKGN1cnJlbnREZXB0aCA9IDApIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnREZXB0aCA+PSB0aGlzLmRlcHRoO1xuICAgIH1cbiAgICByZWdpc3Rlck5lc3RlZFJlZGlyZWN0KHF1ZXJ5LCBjdXJyZW50RGVwdGggPSAwKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTWF4RGVwdGhFeGNlZWRlZChjdXJyZW50RGVwdGgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgZGVwdGg6IGN1cnJlbnREZXB0aCArIDFcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0U2Vzc2lvblN0b3JhZ2UoKS5zZXRJdGVtKFJlZGlyZWN0Q29sbGVjdG9yLk5FU1RFRF9SRURJUkVDVF9LRVlXT1JEU19TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xuICAgIH1cbiAgICBhdHRhY2hTdWJTZWxlY3RvcnMocGF0aEluZm8sIGN1cnJlbnREZXB0aCkge1xuICAgICAgICBpZiAodGhpcy5pc01heERlcHRoRXhjZWVkZWQoY3VycmVudERlcHRoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5zdWJTZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTmVzdGVkUmVkaXJlY3QocGF0aEluZm8ucXVlcnksIGN1cnJlbnREZXB0aCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJUeXBlID09PSBMaXN0ZW5lclR5cGUuU2VudGluZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZW50aW5lbCA9IG5ldyBTZW50aW5lbCh0aGlzLmdldERvY3VtZW50KCkpO1xuICAgICAgICAgICAgICAgIHNlbnRpbmVsLm9uKHNlbGVjdG9yLCBlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mbyA9IHRoaXMucmVkaXJlY3RUcmFpbC5mZXRjaCh0aGlzLmdldFBhdGhuYW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbykgeyAvLyB0aGUgc2VudGluZWwgY2FuIHRyaWdnZXIgb24gYW55IHBhZ2UsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlIGF0dGFjaCBzdWJTZWxlY3RvcnMgb25seSBvbiB2YWxpZCByZWRpcmVjdCBwYXRoc1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRQYXRobmFtZSgpIHtcbiAgICAgICAgY29uc3QgcGF0aG5hbWUgPSBub3JtYWxpemVQYXRobmFtZSh0aGlzLmdldFdpbmRvdygpLmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgICAgaWYgKHRoaXMubWF4UGF0aFNlZ21lbnRzID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcGF0aFNlZ21lbnRzID0gcGF0aG5hbWUuc3BsaXQoXCIvXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVBhdGhuYW1lKHBhdGhTZWdtZW50cy5maWx0ZXIocyA9PiAhIXMpLnNsaWNlKDAsIHRoaXMubWF4UGF0aFNlZ21lbnRzKS5qb2luKFwiL1wiKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGhuYW1lO1xuICAgIH1cbiAgICBhdHRhY2hDb2xsZWN0b3JzKHdyaXRlciwgbG9nLCBxdWVyeSkge1xuICAgICAgICAvLyBhdHRhY2ggYWxsIGNvbGxlY3RvcnMgd2hpY2ggYXJlIHJlc3BvbnNpYmxlIHRvIGdhdGhlciBrcGkncyBhZnRlciB0aGUgcmVkaXJlY3RcbiAgICAgICAgdGhpcy5jb2xsZWN0b3JzLmZvckVhY2goY29sbGVjdG9yID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29sbGVjdG9yLmF0dGFjaCh7XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlci53cml0ZSh7IC4uLmRhdGEsIHF1ZXJ5OiBkYXRhLnF1ZXJ5IHx8IHF1ZXJ5IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgbG9nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvZylcbiAgICAgICAgICAgICAgICAgICAgbG9nLmVycm9yKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIEtleSB1c2VkIHRvIHN0b3JlIHRoZSBrZXl3b3JkcyBvZiB0aGUgbGFzdCBleGVjdXRlZCBzZWFyY2hcbiAqL1xuUmVkaXJlY3RDb2xsZWN0b3IuTEFTVF9TRUFSQ0hfU1RPUkFHRV9LRVkgPSBcIl9fbGFzdFNlYXJjaFwiO1xuLyoqXG4gKiBLZXkgdXNlZCB0byBzdG9yZSBxdWVyeSBpbmZvcm1hdGlvbiBmb3IgYSBnaXZlbiByZWRpcmVjdCBsYW5kaW5nIHBhZ2UgKHBhdGggb2YgdGhlIHVybClcbiAqL1xuUmVkaXJlY3RDb2xsZWN0b3IuUEFUSF9TVE9SQUdFX0tFWSA9IFwiX19fcGF0aFN0b3JhZ2VcIjtcblJlZGlyZWN0Q29sbGVjdG9yLk5FU1RFRF9SRURJUkVDVF9LRVlXT1JEU19TVE9SQUdFX0tFWSA9IFwiX19fbmVzdGVkUmVkaXJlY3RLZXl3b3Jkc1N0b3JhZ2VcIjtcbmZ1bmN0aW9uIHNob3VsZFRyYWNrUmVkaXJlY3QocmVmZXJlcikge1xuICAgIGlmIChyZWZlcmVyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWZVcmwgPSBuZXcgVVJMKHJlZmVyZXIpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRVcmwub3JpZ2luICYmIHJlZlVybC5vcmlnaW4pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZlVybC5vcmlnaW4gPT09IGN1cnJlbnRVcmwub3JpZ2luO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuLyoqXG4gKiBDb2xsZWN0IHRoZSBiYXNpYyBzZWFyY2ggaW5mb3JtYXRpb24gLSB0aGUga2V5d29yZHMgdXNlZCBmb3IgdGhlIHNlYXJjaCBhbmRcbiAqIHRoZSBudW1iZXIgb2YgcmVzdWx0cy4gU3luY2hyb25vdXMgaS5lLiB0aGUgd3JpdGluZyBoYXBwZW5zIGRpcmVjdGx5IHdoZW4gYSB3cml0ZXIgaXMgYXR0YWNoZWQuXG4gKiBTZWUgdGhlIG90aGVyIHNlYXJjaCBjb2xsZWN0b3JzIGZvciBkeW5hbWljIG9uZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRDb2xsZWN0b3IgZXh0ZW5kcyBBYnN0cmFjdENvbGxlY3RvciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IHNlYXJjaCByZXN1bHQgY29sbGVjdG9yXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwaHJhc2VSZXNvbHZlciAtIEZ1bmN0aW9uIHRoYXQgc2hvdWxkIHJldHVybiB0aGUgc2VhcmNoIHBocmFzZSB1c2VkIGZvciB0aGUgc2VhcmNoXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY291bnRSZXNvbHZlciAtIEZ1bmN0aW9uIHRoYXQgc2hvdWxkIHJldHVybiB0aGUgbnVtbmJlciBvZiByZXN1bHRzIGluIHRoZSBzZWFyY2hcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBhY3Rpb25SZXNvbHZlciAtIEEgc2VhcmNoIHJlc3VsdCBtYXkgYmUgcmVmaW5lZCBvciBhIGNsaWVudCBtYXkgYnJvd3NlIDIsMyw0IHBhZ2UuXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgcHJvdmlkZSBhIHRleHQgcmVwcmVzYW50aW9uIG9mIHRoZSBhY3Rpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwaHJhc2VSZXNvbHZlciwgY291bnRSZXNvbHZlciwgYWN0aW9uUmVzb2x2ZXIpIHtcbiAgICAgICAgc3VwZXIoXCJzZWFyY2hcIik7XG4gICAgICAgIHRoaXMucGhyYXNlUmVzb2x2ZXIgPSBwaHJhc2VSZXNvbHZlcjtcbiAgICAgICAgdGhpcy5jb3VudFJlc29sdmVyID0gY291bnRSZXNvbHZlcjtcbiAgICAgICAgdGhpcy5hY3Rpb25SZXNvbHZlciA9IGFjdGlvblJlc29sdmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRhY2ggYSB3cml0ZXIsIG5vdGUgdGhhdCB0aGlzIGNvbGxlY3RvciBpcyBub3QgYXN5bmNocm9ub3VzIGFuZCB3aWxsIHdyaXRlXG4gICAgICogdGhlIGRhdGEgaW1tZWRpYXRlbGx5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gd3JpdGVyIC0gVGhlIHdyaXRlciB0byBzZW5kIHRoZSBkYXRhIHRvXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGxvZyAtIFRoZSBsb2dnZXJcbiAgICAgKi9cbiAgICBhdHRhY2god3JpdGVyLCBsb2cpIHtcbiAgICAgICAgd3JpdGVyLndyaXRlKHtcbiAgICAgICAgICAgIHR5cGU6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICBrZXl3b3JkczogdGhpcy5yZXNvbHZlKHRoaXMucGhyYXNlUmVzb2x2ZXIsIGxvZywge30pLFxuICAgICAgICAgICAgY291bnQ6IHRoaXMucmVzb2x2ZSh0aGlzLmNvdW50UmVzb2x2ZXIsIGxvZywge30pLFxuICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnJlc29sdmUodGhpcy5hY3Rpb25SZXNvbHZlciwgbG9nLCB7fSkgfHwgXCJzZWFyY2hcIlxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBXcml0ZXJSZXNvbHZlckNvbGxlY3RvciB9IGZyb20gXCIuL1dyaXRlclJlc29sdmVyQ29sbGVjdG9yXCI7XG4vKipcbiAqIENvbGxlY3Qgc3VnZ2VzdCBzZWFyY2ggaW5mb3JtYXRpb24gLSBrZXl3b3JkIHNlYXJjaGVzIGNvbWluZyBmcm9tIGEgc3VnZ2VzdGlvbiB3aWRnZXQvZnVuY3Rpb25hbGl0eVxuICovXG5leHBvcnQgY2xhc3MgU3VnZ2VzdFNlYXJjaENvbGxlY3RvciBleHRlbmRzIFdyaXRlclJlc29sdmVyQ29sbGVjdG9yIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Qgc3VnZ2VzdCBzZWFyY2ggY29sbGVjdG9yXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlciAtIEZ1bmN0aW9uIHRoYXQgdHJpZ2dlcnMgdGhlIHdyaXRpbmcuIFN1Z2dlc3QgbWlnaHQgYmUgY29tcGxleCwgbGVhdmUgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRvIGRldGVybWluZSB3aGVuL2hvd1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlc29sdmVyKSB7XG4gICAgICAgIHN1cGVyKFwic3VnZ2VzdC1zZWFyY2hcIiwgcmVzb2x2ZXIpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEFic3RyYWN0Q29sbGVjdG9yIH0gZnJvbSBcIi4vQWJzdHJhY3RDb2xsZWN0b3JcIjtcbi8qKlxuICogUmVzb2x2ZXMgaW1tZWRpYXRlbHkgYW5kIHBhc3NpbmcgdGhlIHdyaXRlciwgdGhlIHR5cGUgb2YgdGhlIGV2ZW50ICsgY29udGV4dCB0byB0aGUgcHJvdmlkZWQgcmVzb2x2ZXIgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBXcml0ZXJSZXNvbHZlckNvbGxlY3RvciBleHRlbmRzIEFic3RyYWN0Q29sbGVjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCByZXNvbHZlcikge1xuICAgICAgICBzdXBlcih0eXBlKTtcbiAgICAgICAgdGhpcy5yZXNvbHZlciA9IHJlc29sdmVyO1xuICAgIH1cbiAgICBhdHRhY2god3JpdGVyLCBsb2cpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlKHRoaXMucmVzb2x2ZXIsIGxvZywgd3JpdGVyLCB0aGlzLmdldFR5cGUoKSwgdGhpcy5nZXRDb250ZXh0KCkpO1xuICAgIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gXCIuL0Fic3RyYWN0Q29sbGVjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Bc3NvY2lhdGVkUHJvZHVjdENvbGxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQmFza2V0Q2xpY2tDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0Jyb3dzZXJDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NoZWNrb3V0Q2xpY2tDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NsaWNrQ29sbGVjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9DbGlja1dyaXRlclJlc29sdmVyQ29sbGVjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9GaWx0ZXJDbGlja0NvbGxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vRmlyZWRTZWFyY2hDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0dlbmVyaWNFdmVudENvbGxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vSW1wcmVzc2lvbkNvbGxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vSW5zdGFudFNlYXJjaFF1ZXJ5Q29sbGVjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Qcm9kdWN0Q2xpY2tDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1JlZGlyZWN0Q29sbGVjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9TZWFyY2hSZXN1bHRDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1N1Z2dlc3RTZWFyY2hDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1dyaXRlclJlc29sdmVyQ29sbGVjdG9yXCI7XG4iLCJleHBvcnQge307XG4iLCJleHBvcnQge307XG4iLCIvKipcbiAqIFBhc3NlcyBhbGwgbG9nIG1lc3NhZ2VzIHRvIHRoZSBwcm92aWRlZCB0cmFuc3BvcnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBUcmFuc3BvcnRMb2dnZXIge1xuICAgIGNvbnN0cnVjdG9yKHRyYW5zcG9ydHMsIGlzRGVidWdFbmFibGVkID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy50cmFuc3BvcnRzID0gdHJhbnNwb3J0cztcbiAgICAgICAgdGhpcy5pc0RlYnVnRW5hYmxlZCA9IGlzRGVidWdFbmFibGVkO1xuICAgIH1cbiAgICBkZWJ1Zyhtc2csIC4uLmRhdGFBcmdzKSB7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cy5mb3JFYWNoKHRyYW5zcG9ydCA9PiB0aGlzLmNhbGxUcmFuc3BvcnQodHJhbnNwb3J0LCBcImRlYnVnXCIsIG1zZywgLi4uZGF0YUFyZ3MpKTtcbiAgICB9XG4gICAgZXJyb3IobXNnLCAuLi5kYXRhQXJncykge1xuICAgICAgICB0aGlzLnRyYW5zcG9ydHMuZm9yRWFjaCh0cmFuc3BvcnQgPT4gdGhpcy5jYWxsVHJhbnNwb3J0KHRyYW5zcG9ydCwgXCJlcnJvclwiLCBtc2csIC4uLmRhdGFBcmdzKSk7XG4gICAgfVxuICAgIGluZm8obXNnLCAuLi5kYXRhQXJncykge1xuICAgICAgICB0aGlzLnRyYW5zcG9ydHMuZm9yRWFjaCh0cmFuc3BvcnQgPT4gdGhpcy5jYWxsVHJhbnNwb3J0KHRyYW5zcG9ydCwgXCJpbmZvXCIsIG1zZywgLi4uZGF0YUFyZ3MpKTtcbiAgICB9XG4gICAgd2Fybihtc2csIC4uLmRhdGFBcmdzKSB7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cy5mb3JFYWNoKHRyYW5zcG9ydCA9PiB0aGlzLmNhbGxUcmFuc3BvcnQodHJhbnNwb3J0LCBcIndhcm5cIiwgbXNnLCAuLi5kYXRhQXJncykpO1xuICAgIH1cbiAgICBjYWxsVHJhbnNwb3J0KHRyYW5zcG9ydCwgbGV2ZWwsIG1zZywgLi4uZGF0YUFyZ3MpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0cmFuc3BvcnRbbGV2ZWxdICYmIHR5cGVvZiB0cmFuc3BvcnRbbGV2ZWxdID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0W2xldmVsXShtc2csIC4uLmRhdGFBcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEZWJ1Z0VuYWJsZWQpXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkIG5vdCBjYWxsIHRyYW5zcG9ydDogXCIsIGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSBcIi4vTG9nZ2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Mb2dnZXJUcmFuc3BvcnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1RyYW5zcG9ydExvZ2dlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vdHJhbnNwb3J0XCI7XG4iLCJleHBvcnQgY2xhc3MgQ29uc29sZVRyYW5zcG9ydCB7XG4gICAgZGVidWcobXNnLCAuLi5kYXRhQXJncykge1xuICAgICAgICBjb25zb2xlLmRlYnVnKG1zZywgLi4uZGF0YUFyZ3MpO1xuICAgIH1cbiAgICA7XG4gICAgaW5mbyhtc2csIC4uLmRhdGFBcmdzKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhtc2csIC4uLmRhdGFBcmdzKTtcbiAgICB9XG4gICAgO1xuICAgIHdhcm4obXNnLCAuLi5kYXRhQXJncykge1xuICAgICAgICBjb25zb2xlLndhcm4obXNnLCAuLi5kYXRhQXJncyk7XG4gICAgfVxuICAgIDtcbiAgICBlcnJvcihtc2csIC4uLmRhdGFBcmdzKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnLCAuLi5kYXRhQXJncyk7XG4gICAgfVxuICAgIDtcbn1cbiIsImltcG9ydCB7IGJhc2U2NEVuY29kZSB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuLyoqXG4gKiBPbmx5IGFkZHMgZXJyb3IgbWVzc2FnZXMgdG8gYW4gc3FzIHF1ZXVlXG4gKi9cbmV4cG9ydCBjbGFzcyBTUVNFcnJvclRyYW5zcG9ydCB7XG4gICAgY29uc3RydWN0b3IocXVldWUsIGNoYW5uZWwsIHNlc3Npb25SZXNvbHZlciwgZmlmbyA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucXVldWUgPSBxdWV1ZTtcbiAgICAgICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbDtcbiAgICAgICAgdGhpcy5zZXNzaW9uUmVzb2x2ZXIgPSBzZXNzaW9uUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMuZmlmbyA9IGZpZm87XG4gICAgfVxuICAgIHNlbmQoZGF0YSkge1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgbGV0IHNyYyA9IHRoaXMucXVldWUgKyBcIj9WZXJzaW9uPTIwMTItMTEtMDUmQWN0aW9uPVNlbmRNZXNzYWdlXCI7XG4gICAgICAgIC8vIFNRUyBzdXBwb3J0cyBGSUZPIHF1ZXVlcyBpbiBzb21lIHJlZ2lvbnMgdGhhdCBjYW4gYWxzbyBndWFyYW50ZWUgdGhlIG9yZGVyXG4gICAgICAgIC8vIG9mIHRoZSBtZXNzYWdlcy5cbiAgICAgICAgaWYgKHRoaXMuZmlmbykge1xuICAgICAgICAgICAgLy8gVE9ETyB3aGVuIGVub3VnaCBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IHRvIHVuaXF1ZWx5IGlkZW50aWZ5IGEgbWVzc2FnZSwgc3dpdGNoIHRoZSBkZWR1cGxpY2F0aW9uIGlkIHRvIGEgbWVzc2FnZSBoYXNoXG4gICAgICAgICAgICBzcmMgKz0gXCImTWVzc2FnZUdyb3VwSWQ9MSZNZXNzYWdlRGVkdXBsaWNhdGlvbklkPVwiICsgTWF0aC5yYW5kb20oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkgJiYgdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGRhdGEgPSBbZGF0YV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgc3JjICs9IFwiJk1lc3NhZ2VCb2R5PVwiICsgYmFzZTY0RW5jb2RlKGVuY29kZVVSSUNvbXBvbmVudChkYXRhKSk7XG4gICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgfVxuICAgIGVycm9yKG1zZywgLi4uZGF0YUFyZ3MpIHtcbiAgICAgICAgdGhpcy5zZW5kKHtcbiAgICAgICAgICAgIHR5cGU6IFwiZXJyb3JcIixcbiAgICAgICAgICAgIG1zZyxcbiAgICAgICAgICAgIGNoYW5uZWw6IHRoaXMuY2hhbm5lbCxcbiAgICAgICAgICAgIHNlc3Npb246IHRoaXMuc2Vzc2lvblJlc29sdmVyKCksXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgLi4uZGF0YUFyZ3NcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIDtcbn1cbiIsImltcG9ydCB7IFNRU0Vycm9yVHJhbnNwb3J0IH0gZnJvbSBcIi4vU1FTRXJyb3JUcmFuc3BvcnRcIjtcbi8qKlxuICogQWRkcyBhbGwgbG9nIGxldmVscyB0byBhbiBTUVMgcXVldWVcbiAqL1xuZXhwb3J0IGNsYXNzIFNRU1RyYW5zcG9ydCBleHRlbmRzIFNRU0Vycm9yVHJhbnNwb3J0IHtcbiAgICBkZWJ1Zyhtc2csIC4uLmRhdGFBcmdzKSB7XG4gICAgICAgIHRoaXMuc2VuZCh7XG4gICAgICAgICAgICB0eXBlOiBcImRlYnVnXCIsXG4gICAgICAgICAgICBtc2csXG4gICAgICAgICAgICAuLi5kYXRhQXJnc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgO1xuICAgIGluZm8obXNnLCAuLi5kYXRhQXJncykge1xuICAgICAgICB0aGlzLnNlbmQoe1xuICAgICAgICAgICAgdHlwZTogXCJpbmZvXCIsXG4gICAgICAgICAgICBtc2csXG4gICAgICAgICAgICAuLi5kYXRhQXJnc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgO1xuICAgIHdhcm4obXNnLCAuLi5kYXRhQXJncykge1xuICAgICAgICB0aGlzLnNlbmQoe1xuICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICBtc2csXG4gICAgICAgICAgICAuLi5kYXRhQXJnc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgO1xufVxuIiwiZXhwb3J0ICogZnJvbSBcIi4vQ29uc29sZVRyYW5zcG9ydFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vU1FTRXJyb3JUcmFuc3BvcnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1NRU1RyYW5zcG9ydFwiO1xuIiwiZXhwb3J0IGNsYXNzIFF1ZXJ5IHtcbiAgICBjb25zdHJ1Y3RvcihxdWVyeVN0cmluZykge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGFsbCBzZWxlY3Rpb25zIG9uIHRoaXMgZmllbGRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0aW9uQXQgPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgICAgICBhcnJheVJlbW92ZSh0aGlzLmNyaXRlcmlhLCBwb3MsIHBvcyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JpdGVyaWEgPSBbXTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAocXVlcnlTdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciBjcml0ZXJpYSA9IFtdO1xuICAgICAgICAgICAgdmFyIGFuZHMgPSBxdWVyeVN0cmluZy5zcGxpdChcIi9cIik7XG4gICAgICAgICAgICBhbmRzLmZvckVhY2goZnVuY3Rpb24gKGFuZCkge1xuICAgICAgICAgICAgICAgIGlmIChhbmQuaW5kZXhPZihcInxcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9ycyA9IGFuZC5zcGxpdChcInxcIik7XG4gICAgICAgICAgICAgICAgICAgIG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JpdGVyaWEucHVzaCh7IFwic2VsZWN0aW9uXCI6IG9yLCBcInR5cGVcIjogXCJvclwiIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNyaXRlcmlhLnB1c2goeyBcInNlbGVjdGlvblwiOiBhbmQsIFwidHlwZVwiOiBcImFuZFwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3JpdGVyaWEuZm9yRWFjaChmdW5jdGlvbiAoY3JpdGVyaW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSB1bmVzY2FwZShjcml0ZXJpb24uc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoYy5pbmRleE9mKFwiPVwiKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVTcGxpdCA9IGMuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNyaXRlcmlhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmaWVsZFwiOiB2YWx1ZVNwbGl0WzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJvcGVyYXRpb25cIjogXCI9XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHZhbHVlU3BsaXRbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFnZ3JlZ2F0aW9uXCI6IGNyaXRlcmlvbi50eXBlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjLmluZGV4T2YoXCI8XCIpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVNwbGl0ID0gYy5zcGxpdChcIjxcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmICgyID09IHZhbHVlU3BsaXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNyaXRlcmlhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmllbGRcIjogdmFsdWVTcGxpdFswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9wZXJhdGlvblwiOiBcIjxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHZhbHVlU3BsaXRbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ2dyZWdhdGlvblwiOiBjcml0ZXJpb24udHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoMyA9PSB2YWx1ZVNwbGl0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jcml0ZXJpYS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpZWxkXCI6IHZhbHVlU3BsaXRbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvcGVyYXRpb25cIjogXCI+PFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG93ZXJWYWx1ZVwiOiB2YWx1ZVNwbGl0WzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBwZXJWYWx1ZVwiOiB2YWx1ZVNwbGl0WzJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdncmVnYXRpb25cIjogY3JpdGVyaW9uLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGMuaW5kZXhPZihcIj5cIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlU3BsaXQgPSBjLnNwbGl0KFwiPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDIgPT0gdmFsdWVTcGxpdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3JpdGVyaWEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaWVsZFwiOiB2YWx1ZVNwbGl0WzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3BlcmF0aW9uXCI6IFwiPlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogdmFsdWVTcGxpdFsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFnZ3JlZ2F0aW9uXCI6IGNyaXRlcmlvbi50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgzID09IHZhbHVlU3BsaXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNyaXRlcmlhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmllbGRcIjogdmFsdWVTcGxpdFsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9wZXJhdGlvblwiOiBcIj48XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsb3dlclZhbHVlXCI6IHZhbHVlU3BsaXRbMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cHBlclZhbHVlXCI6IHZhbHVlU3BsaXRbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ2dyZWdhdGlvblwiOiBjcml0ZXJpb24udHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXQgYmFjayB0byBzdHJpbmcgdGhlIHF1ZXJ5IG9iamVjdFxuICAgICAqXG4gICAgICogQHJldHVybnMgYSBzdHJpbmcgaW4gdGhlIGZvcm0gb2YgL2JyYW5kPWRlYnV0L3ByaWNlPjEwMC9cbiAgICAgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jcml0ZXJpYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNyaXRlcmlvbiA9IHRoaXMuY3JpdGVyaWFbaV07XG4gICAgICAgICAgICB2YXIgc2VwYXJhdG9yID0gXCIvXCI7XG4gICAgICAgICAgICBpZiAoXCJvclwiID09IGNyaXRlcmlvbi5hZ2dyZWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gdGhpcy5jcml0ZXJpYVtpICsgMV07XG4gICAgICAgICAgICAgICAgaWYgKG5leHQgJiYgXCJvclwiID09IG5leHQuYWdncmVnYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VwYXJhdG9yID0gXCJ8XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNyaXRlcmlvbi5vcGVyYXRpb24gPT0gXCI+PFwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGNyaXRlcmlvbi5sb3dlclZhbHVlICsgXCI8XCIgKyBjcml0ZXJpb24uZmllbGQgKyBcIjxcIiArIGNyaXRlcmlvbi51cHBlclZhbHVlICsgc2VwYXJhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGNyaXRlcmlvbi5maWVsZCArIGNyaXRlcmlvbi5vcGVyYXRpb24gKyBjcml0ZXJpb24udmFsdWUgKyBzZXBhcmF0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgc2VsZWN0aW9uIHRvIHRoaXMgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmllbGQgdGhlIG5hbWUgb2YgdGhlIGZpZWxkIHdlJ3JlIGRyaWxsaW5nIGRvd24gd2l0aFxuICAgICAqIEBwYXJhbSBvcGVyYXRpb24gdGhlIG9wZXJhdGlvbiwgZXggPSw+LDxcbiAgICAgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIGZvciB0aGUgb3BlcmF0aW9uXG4gICAgICogQHBhcmFtIHZhbHVlMSBvcHRpb25hbCBzZWNvbmQgdmFsdWUgZm9yIGNvbnN0cnVjdGluZyByYW5nZXMgbGlrZSAxMDA8cHJpY2U8MjAwXG4gICAgICovXG4gICAgYWRkU2VsZWN0aW9uKGZpZWxkLCBvcGVyYXRpb24sIHZhbHVlLCB2YWx1ZTEsIGFnZ3JlZ2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IGFnZyA9IGFnZ3JlZ2F0aW9uID8gYWdncmVnYXRpb24gOiBcImFuZFwiO1xuICAgICAgICBpZiAodmFsdWUxICYmIFwiPjxcIiA9PSBvcGVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY3JpdGVyaWEucHVzaCh7XG4gICAgICAgICAgICAgICAgXCJmaWVsZFwiOiBmaWVsZCxcbiAgICAgICAgICAgICAgICBcIm9wZXJhdGlvblwiOiBcIj48XCIsXG4gICAgICAgICAgICAgICAgXCJsb3dlclZhbHVlXCI6IHZhbHVlLFxuICAgICAgICAgICAgICAgIFwidXBwZXJWYWx1ZVwiOiB2YWx1ZTEsXG4gICAgICAgICAgICAgICAgXCJhZ2dyZWdhdGlvblwiOiBhZ2dcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jcml0ZXJpYS5wdXNoKHtcbiAgICAgICAgICAgICAgICBcImZpZWxkXCI6IGZpZWxkLFxuICAgICAgICAgICAgICAgIFwib3BlcmF0aW9uXCI6IG9wZXJhdGlvbixcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHZhbHVlLFxuICAgICAgICAgICAgICAgIFwiYWdncmVnYXRpb25cIjogYWdnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhbmQgY29uc3RydWN0IGEgbmV3IG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcXVlcnkgc3RyaW5nIGZvcm1cbiAgICAgKlxuICAgICAqIEBwYXJhbSBxdWVyeVN0cmluZyB0aGUgcXVlcnkgc3RyaW5nIGluIHRoZSBmb3JtIG9mIFwiL1wiIGpvaW5lZCBjcml0ZXJpYS4gZXguIC9icmFuZD1kZWJ1dC9wcmljZT4xMDAvXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBnZXRTZWxlY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jcml0ZXJpYTtcbiAgICB9XG4gICAgZ2V0U2VsZWN0aW9uKGZpZWxkKSB7XG4gICAgICAgIGZvciAodmFyIGMgaW4gdGhpcy5jcml0ZXJpYSkge1xuICAgICAgICAgICAgdmFyIGNyaXQgPSB0aGlzLmNyaXRlcmlhW2NdO1xuICAgICAgICAgICAgaWYgKGNyaXQuZmllbGQgPT0gZmllbGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JpdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGlzIHF1ZXJ5IGFscmVhZHkgaGFzIGEgc2VsZWN0aW9uIGZvciB0aGUgZ2l2ZW4gZmllbGRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgd2UgaGF2ZSBhIHNlbGVjdGlvbiBvZiB0aGlzIGZpZWxkLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBoYXNTZWxlY3Rpb24oZmllbGQpIHtcbiAgICAgICAgZm9yICh2YXIgYyBpbiB0aGlzLmNyaXRlcmlhKSB7XG4gICAgICAgICAgICB2YXIgY3JpdCA9IHRoaXMuY3JpdGVyaWFbY107XG4gICAgICAgICAgICBpZiAoY3JpdC5maWVsZCA9PSBmaWVsZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhpcyBxdWVyeSBhbHJlYWR5IGhhcyBhIHNlbGVjdGlvbiBmb3IgdGhlIGdpdmVuIGZpZWxkXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHdlIGhhdmUgYSBzZWxlY3Rpb24gb2YgdGhpcyBmaWVsZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICovXG4gICAgaGFzRXhhY3RTZWxlY3Rpb24oZmllbGQpIHtcbiAgICAgICAgZm9yICh2YXIgYyBpbiB0aGlzLmNyaXRlcmlhKSB7XG4gICAgICAgICAgICB2YXIgY3JpdCA9IHRoaXMuY3JpdGVyaWFbY107XG4gICAgICAgICAgICBpZiAoY3JpdC5maWVsZCA9PSBmaWVsZCAmJiBjcml0Lm9wZXJhdGlvbiA9PSBcIj1cIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBzZWxlY3Rpb25zIG9uIHRoaXMgZmllbGRcbiAgICAgKi9cbiAgICByZW1vdmVTZWxlY3Rpb24oZmllbGQpIHtcbiAgICAgICAgdmFyIGNyaXRlcmlhID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jcml0ZXJpYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNyaXQgPSB0aGlzLmNyaXRlcmlhW2ldO1xuICAgICAgICAgICAgaWYgKGNyaXQuZmllbGQgPT0gZmllbGQpIHtcbiAgICAgICAgICAgICAgICBjcml0ZXJpYS5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChjcml0ZXJpYS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgYyA9IGNyaXRlcmlhLnBvcCgpO1xuICAgICAgICAgICAgYXJyYXlSZW1vdmUodGhpcy5jcml0ZXJpYSwgYywgYyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNyaXRlcmlhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuY3JpdGVyaWFbaV07XG4gICAgICAgICAgICB2YXIgcHJldmlvdXMgPSB0aGlzLmNyaXRlcmlhW2kgLSAxXTtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gdGhpcy5jcml0ZXJpYVtpICsgMV07XG4gICAgICAgICAgICBpZiAoXCJvclwiID09IGN1cnJlbnQuYWdncmVnYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoKCFuZXh0IHx8IFwiYW5kXCIgPT0gbmV4dC5hZ2dyZWdhdGlvbikgJiYgKCFwcmV2aW91cyB8fCBcImFuZFwiID09IHByZXZpb3VzLmFnZ3JlZ2F0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmFnZ3JlZ2F0aW9uID0gXCJhbmRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0U2VhcmNoKHRlcm0pIHtcbiAgICAgICAgaWYgKHRlcm0pIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0aW9uKFwiJHNcIik7XG4gICAgICAgICAgICB0aGlzLmNyaXRlcmlhLnVuc2hpZnQoe1xuICAgICAgICAgICAgICAgIFwiZmllbGRcIjogXCIkc1wiLFxuICAgICAgICAgICAgICAgIFwib3BlcmF0aW9uXCI6IFwiPVwiLFxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogdGVybVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U2VhcmNoKCkge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTZWxlY3Rpb24oXCIkc1wiKTtcbiAgICAgICAgcmV0dXJuIHMgPyBzLnZhbHVlIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpc1ZhbGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jcml0ZXJpYS5sZW5ndGggPiAwO1xuICAgIH1cbn1cbi8qKlxuICogV2UgaGF2ZSB0aGUgc2FtZSBmdW5jdGlvbiBpbiB1dGlsIGJ1dCB3ZSB3YW50IHRvIGhhdmUgcXVlcnkuanMgd2l0aG91dCBhbnkgZGVwZW5kZW5jaWVzXG4gKlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gZnJvbVxuICogQHBhcmFtIHRvXG4gKiBAcmV0dXJucyB7TnVtYmVyfCp9XG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFycmF5LCBmcm9tLCB0bykge1xuICAgIHZhciByZXN0ID0gYXJyYXkuc2xpY2UoKHRvIHx8IGZyb20pICsgMSB8fCBhcnJheS5sZW5ndGgpO1xuICAgIGFycmF5Lmxlbmd0aCA9IGZyb20gPCAwID8gYXJyYXkubGVuZ3RoICsgZnJvbSA6IGZyb207XG4gICAgcmV0dXJuIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHJlc3QpO1xufVxuIiwiaW1wb3J0IHsgZ2V0TG9jYWxTdG9yYWdlLCBnZXRTZXNzaW9uU3RvcmFnZSB9IGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgeyBUcmFpbFR5cGUgfSBmcm9tIFwiLi9UcmFpbFR5cGVcIjtcbmNvbnN0IFRUTCA9IDEwMDAgKiA2MCAqIDYwICogMjQgKiAyO1xuZXhwb3J0IGNsYXNzIFRyYWlsIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBxdWVyeVJlc29sdmVyXG4gICAgICogQHBhcmFtIHNlc3Npb25SZXNvbHZlclxuICAgICAqIEBwYXJhbSB1aWQgdGhlIHVuaXF1ZSBpZCBvZiB0aGlzIHRyYWlsLiBVc2VkIGFzIHBhcnQgb2YgdGhlIGtleSB0byBzYXZlIGFsbCBUcmFpbCBzdGVwcy9wYXJ0c1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHF1ZXJ5UmVzb2x2ZXIsIHNlc3Npb25SZXNvbHZlciwgdWlkKSB7XG4gICAgICAgIHRoaXMucXVlcnlSZXNvbHZlciA9IHF1ZXJ5UmVzb2x2ZXI7XG4gICAgICAgIHRoaXMuc2Vzc2lvblJlc29sdmVyID0gc2Vzc2lvblJlc29sdmVyO1xuICAgICAgICB0aGlzLmtleSA9IFwic2VhcmNoLWNvbGxlY3Rvci10cmFpbFwiICsgKHVpZCA/IFwiLVwiICsgdWlkIDogXCJcIik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFRyYWlscyA9IHRoaXMuX2xvYWQoZ2V0TG9jYWxTdG9yYWdlKCkpO1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAvLyBEcm9wIGFsbCBleHBpcmVkIHRyYWlscywgVFRMIGluIHN5bmMgd2l0aCBzZXNzaW9uIGR1cmF0aW9uIG9mIDMwIG1pblxuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgT2JqZWN0LmtleXMobG9jYWxUcmFpbHMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+IGxvY2FsVHJhaWxzW2lkXS50aW1lc3RhbXAgKyBUVEwpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGxvY2FsVHJhaWxzW2lkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zYXZlKGdldExvY2FsU3RvcmFnZSgpLCBsb2NhbFRyYWlscyk7XG4gICAgICAgICAgICAvLyBMb2FkIGV4aXN0aW5nIHNlc3Npb24gdHJhaWxzIGFuZCBtZXJnZSBpdCB3aXRoIHRoZSBsb2NhbCBzdG9yYWdlIHRyYWlscy5cbiAgICAgICAgICAgIC8vIFRoaXMgc2hvdWxkIGd1YXJhbnRlZSB0aGF0IHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgcGFnZXMgZnVydGhlciBkb3duIHRoZSB0cmFpbFxuICAgICAgICAgICAgLy8gKGJhc2tldCwgY2hlY2tvdXQpIHdlcmUgb3BlbiBpbiBhIG5ldyB0YWIgb3Igbm90LCB3ZSBoYXZlIGEgZnVsbCByZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgLy8gb2YgYWxsIHByb2R1Y3QgY2xpY2tzIHdpdGhpbiB0aGUgc2Vzc2lvbi4gUmVtaW5kZXIsIHNlc3Npb25TdG9yYWdlIGlzIG1haW50YWluZWRcbiAgICAgICAgICAgIC8vIHBlciB0YWIvd2luZG93IGFuZCBpcyBkZWxldGVkIHVwb24gY2xvc2luZywgbG9jYWxTdG9yYWdlIGlzIHBlciB3ZWJzaXRlIHdpdGggbm9cbiAgICAgICAgICAgIC8vIGRlZmF1bHQgZXhwaXJ5LlxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblRyYWlscyA9IHRoaXMuX2xvYWQoZ2V0U2Vzc2lvblN0b3JhZ2UoKSk7XG4gICAgICAgICAgICBjb25zdCB0cmFpbHMgPSBPYmplY3QuYXNzaWduKGxvY2FsVHJhaWxzLCBzZXNzaW9uVHJhaWxzKTtcbiAgICAgICAgICAgIHRoaXMuX3NhdmUoZ2V0U2Vzc2lvblN0b3JhZ2UoKSwgdHJhaWxzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBwYXJzaW5nIHN0b3JlZCBldmVudCBxdWV1ZSBcIiArIGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIHRoaXMgcHJvZHVjdCBpZCBhcyBzdGFydGluZyBhIHB1cmNoYXNlIGpvdXJuZXkgYXQgdGhpcyBzZXNzaW9uL3F1ZXJ5XG4gICAgICogUG9zc2libGUgdHJhaWwgdHlwZXMgYXJlIFwibWFpblwiIGFuZCBcImFzc29jaWF0ZWRcIlxuICAgICAqL1xuICAgIHJlZ2lzdGVyKGlkLCB0cmFpbFR5cGUgPSBUcmFpbFR5cGUuTWFpbiwgcXVlcnlTdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdHJhaWwgPSB7XG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5U3RyaW5nIHx8IHRoaXMucXVlcnlSZXNvbHZlcigpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICB0eXBlOiB0cmFpbFR5cGVcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChsZXQgc3RvcmFnZSBvZiBbZ2V0TG9jYWxTdG9yYWdlKCksIGdldFNlc3Npb25TdG9yYWdlKCldKSB7XG4gICAgICAgICAgICBjb25zdCB0cmFpbHMgPSB0aGlzLl9sb2FkKHN0b3JhZ2UpO1xuICAgICAgICAgICAgdHJhaWxzW2lkXSA9IHRyYWlsO1xuICAgICAgICAgICAgdGhpcy5fc2F2ZShzdG9yYWdlLCB0cmFpbHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZldGNoKGlkKSB7XG4gICAgICAgIGNvbnN0IHRyYWlscyA9IHRoaXMuX2xvYWQoZ2V0U2Vzc2lvblN0b3JhZ2UoKSk7XG4gICAgICAgIHJldHVybiB0cmFpbHNbaWRdO1xuICAgIH1cbiAgICBfbG9hZChzdG9yYWdlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBzdG9yYWdlLmdldEl0ZW0odGhpcy5rZXkpO1xuICAgICAgICByZXR1cm4gZGF0YSA/IEpTT04ucGFyc2UoZGF0YSkgOiB7fTtcbiAgICB9XG4gICAgX3NhdmUoc3RvcmFnZSwgZGF0YSkge1xuICAgICAgICBzdG9yYWdlLnNldEl0ZW0odGhpcy5rZXksIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9XG59XG4iLCJleHBvcnQgdmFyIFRyYWlsVHlwZTtcbihmdW5jdGlvbiAoVHJhaWxUeXBlKSB7XG4gICAgVHJhaWxUeXBlW1wiTWFpblwiXSA9IFwibWFpblwiO1xuICAgIFRyYWlsVHlwZVtcIkFzc29jaWF0ZWRcIl0gPSBcImFzc29jaWF0ZWRcIjtcbn0pKFRyYWlsVHlwZSB8fCAoVHJhaWxUeXBlID0ge30pKTtcbiIsImV4cG9ydCAqIGZyb20gXCIuL1F1ZXJ5XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UcmFpbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vVHJhaWxUeXBlXCI7XG4iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcIi4uL3V0aWxzL0NvbnRleHRcIjtcbmltcG9ydCB7IGdlbmVyYXRlSWQsIGdldENvb2tpZSwgZ2V0TG9jYWxTdG9yYWdlLCBzZXRDb29raWUgfSBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuY29uc3QgTUlOVVRFU19PTkVfREFZID0gNjAgKiAyNDtcbmNvbnN0IE1JTlVURVNfVFdPX0RBWVMgPSA2MCAqIDI0ICogMjtcbmNvbnN0IE1JTlVURVNfSEFMRl9IT1VSID0gMzA7XG4vKipcbiAqIFJlYWQgdGhlIGNvb2tpZSB3aXRoIHRoZSBwcm92aWRlZCBuYW1lXG4gKiBAcGFyYW0gbmFtZSB0aGUgbmFtZSBvZiB0aGUgY29va2llXG4gKi9cbmV4cG9ydCBjb25zdCBjb29raWVSZXNvbHZlciA9IChuYW1lID0gXCJcIikgPT4gZ2V0Q29va2llKG5hbWUpO1xuLyoqXG4gKiBSZXNvbHZlIHRoZSBpZCBvZiB0aGUgY3VycmVudCBzZWFyY2ggc2Vzc2lvbi4gQSBzZWFyY2ggc2Vzc2lvbiBpcyBkZWZpbmVkIGFzXG4gKiBsaW1pdGVkIHRpbWUgc2xpY2Ugb2Ygc2VhcmNoIGFjdGl2aXR5IGFjcm9zcyBtdWx0aXBsZSB0YWJzLiBCeSBkZWZhdWx0IGEgc2Vzc2lvblxuICogd291bGQgYmUgY29uc2lkZXJlZCBleHBpcmVkIGFmdGVyIDMwIG1pbiBvZiBpbmFjdGl2aXR5LlxuICpcbiAqIEluIGNhc2UgdGhlIHJlc29sdmVyIGlzIGNvbnN0cnVjdGVkIHdpdGggYSBjb29raWUgbmFtZSwgdGhlIHNlc3Npb24gbGlmZWN5Y2xlXG4gKiB3aWxsIGJlIGdvdmVybmVkIGJ5IHRoZSBsaWZlY3ljbGUgb2YgdGhhdCBjb29raWUuIE90aGVyd2lzZSB0aGUgcmVzb2x2ZXIgd2lsbFxuICogc2V0IGl0cyBvd24gY29va2llLlxuICpcbiAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBzZXNzaW9uIGNvb2tpZVxuICovXG5leHBvcnQgY29uc3QgY29va2llU2Vzc2lvblJlc29sdmVyID0gKG5hbWUgPSBcIlNlYXJjaENvbGxlY3RvclNlc3Npb25cIikgPT4gc2V0Q29va2llKG5hbWUsIGNvb2tpZVJlc29sdmVyKG5hbWUpIHx8IGdlbmVyYXRlSWQoKSwgTUlOVVRFU19UV09fREFZUyk7XG4vKipcbiAqIEZpbmQgdGhlIHBvc2l0aW9uIG9mIGEgRE9NIGVsZW1lbnQgcmVsYXRpdmUgdG8gb3RoZXIgRE9NIGVsZW1lbnRzIG9mIHRoZSBzYW1lIHR5cGUuXG4gKiBUbyBiZSB1c2VkIHRvIGZpbmQgdGhlIHBvc2l0aW9uIG9mIGFuIGl0ZW0gaW4gYSBzZWFyY2ggcmVzdWx0LlxuICpcbiAqIEBwYXJhbSBzZWxlY3RvckV4cHJlc3Npb24gdGhlIGNzcyBleHByZXNzaW9uIHRvIHF1ZXJ5IGZvciBvdGhlciBlbGVtZW50c1xuICogQHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnQgZm9yIHdoaWNoIHdlIHdhbnQgdG8ga25vdyB0aGUgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIGVsZW1lbnRzIHNlbGVjdGVkIGJ5IHNlbGVjdG9yRXhwcmVzc2lvblxuICogQHBhcmFtIGN0eCB0aGUgY29udGV4dCB0byB1c2UuIGRlZmF1bHRzIHRvIG5ldyBDb250ZXh0KHdpbmRvdywgZG9jdW1lbnQpXG4gKi9cbmV4cG9ydCBjb25zdCBwb3NpdGlvblJlc29sdmVyID0gKHNlbGVjdG9yRXhwcmVzc2lvbiwgZWxlbWVudCwgY3R4ID0gbmV3IENvbnRleHQod2luZG93LCBkb2N1bWVudCkpID0+IHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShjdHguZ2V0RG9jdW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yRXhwcmVzc2lvbikpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgbm9kZSwgaW5kZXgpID0+IG5vZGUgPT09IGVsZW1lbnQgPyBpbmRleCA6IGFjYywgdW5kZWZpbmVkKTtcbn07XG4vKipcbiAqIFRoaXMgaXMgYSBwZXJzaXN0ZW50IGRlYnVnIHJlc29sdmVyIHdoaWNoIHN0b3JlcyB0aGUgZGVidWcgcXVlcnkgcGFyYW1ldGVyIGFjcm9zcyByZXF1ZXN0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlYnVnUmVzb2x2ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgREVCVUdfS0VZID0gXCJfX2NvbGxlY3RvckRlYnVnXCI7XG4gICAgY29uc3QgZGVidWdQYXJhbSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCkuZ2V0KFwiZGVidWdcIik7XG4gICAgY29uc3QgaXNEZWJ1Z1BhcmFtRXhpc3RzID0gZGVidWdQYXJhbSAhPSBudWxsO1xuICAgIGlmIChpc0RlYnVnUGFyYW1FeGlzdHMpIHtcbiAgICAgICAgY29uc3QgZGVidWcgPSBkZWJ1Z1BhcmFtID09PSBcInRydWVcIjtcbiAgICAgICAgZ2V0TG9jYWxTdG9yYWdlKCkuc2V0SXRlbShERUJVR19LRVksIFN0cmluZyhkZWJ1ZykpO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0TG9jYWxTdG9yYWdlKCkuZ2V0SXRlbShERUJVR19LRVkpID09PSBcInRydWVcIjtcbn07XG4iLCJleHBvcnQgKiBmcm9tIFwiLi9SZXNvbHZlclwiO1xuIiwiZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKHdpbmRvdywgZG9jdW1lbnQpIHtcbiAgICAgICAgdGhpcy53aW5kb3cgPSB3aW5kb3c7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB9XG4gICAgZ2V0V2luZG93KCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aW5kb3c7XG4gICAgfVxuICAgIGdldERvY3VtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb2N1bWVudDtcbiAgICB9XG59XG4iLCJleHBvcnQgdmFyIExpc3RlbmVyVHlwZTtcbihmdW5jdGlvbiAoTGlzdGVuZXJUeXBlKSB7XG4gICAgTGlzdGVuZXJUeXBlW1wiRG9tXCJdID0gXCJkb21cIjtcbiAgICBMaXN0ZW5lclR5cGVbXCJTZW50aW5lbFwiXSA9IFwic2VudGluZWxcIjtcbn0pKExpc3RlbmVyVHlwZSB8fCAoTGlzdGVuZXJUeXBlID0ge30pKTtcbiIsImltcG9ydCB7IGdldExvY2FsU3RvcmFnZSB9IGZyb20gXCIuL1V0aWxcIjtcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VRdWV1ZSB7XG4gICAgY29uc3RydWN0b3IoaWQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJzZWFyY2gtY29sbGVjdG9yLXF1ZXVlXCIgKyAoaWQgPyBcIi1cIiArIGlkIDogXCJcIik7XG4gICAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgICAgY29uc3Qgc3RvcmVkUXVldWUgPSBnZXRMb2NhbFN0b3JhZ2UoKS5nZXRJdGVtKHRoaXMubmFtZSk7XG4gICAgICAgIGlmIChzdG9yZWRRdWV1ZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlID0gSlNPTi5wYXJzZShzdG9yZWRRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIHN0b3JlZCBldmVudCBxdWV1ZSBcIiArIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1c2goZGF0YSkge1xuICAgICAgICB0aGlzLnF1ZXVlLnB1c2goZGF0YSk7XG4gICAgICAgIHRoaXMuX3NhdmUoKTtcbiAgICB9XG4gICAgZHJhaW4oKSB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMucXVldWU7XG4gICAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgICAgdGhpcy5fc2F2ZSgpO1xuICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgIH1cbiAgICB0cmFuc2FjdGlvbmFsRHJhaW4oYXN5bmNDYWxsYmFjaykge1xuICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLnF1ZXVlO1xuICAgICAgICByZXR1cm4gYXN5bmNDYWxsYmFjayh0aGlzLnF1ZXVlKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3NhdmUoKTtcbiAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIF9zYXZlKCkge1xuICAgICAgICBnZXRMb2NhbFN0b3JhZ2UoKS5zZXRJdGVtKHRoaXMubmFtZSwgSlNPTi5zdHJpbmdpZnkodGhpcy5xdWV1ZSkpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQ2xvbmVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL211aWNzcy9zZW50aW5lbGpzIHVudGlsIGEgcGF0Y2hlZCB2ZXJzaW9uXG4gKiBzdXBwb3JpbmcgaWZyYW1lcyBnZXRzIGF2YWlsYWJsZVxuICogTGljZW5zZSB1bmRlciBNSVRcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5LCBzZWxlY3RvclRvQW5pbWF0aW9uTWFwID0ge30sIGFuaW1hdGlvbkNhbGxiYWNrcyA9IHt9LCBzdHlsZUVsLCBzdHlsZVNoZWV0LCBjc3NSdWxlcztcbmV4cG9ydCBjbGFzcyBTZW50aW5lbCB7XG4gICAgY29uc3RydWN0b3IoZG9jID0gZG9jdW1lbnQpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudCA9IGRvYztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIHdhdGNoZXIuXG4gICAgICogQHBhcmFtIHthcnJheX0gY3NzU2VsZWN0b3JzIC0gTGlzdCBvZiBDU1Mgc2VsZWN0b3Igc3RyaW5nc1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICovXG4gICAgb24oY3NzU2VsZWN0b3JzLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoIWNhbGxiYWNrKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBpbml0aWFsaXplIGFuaW1hdGlvbnN0YXJ0IGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGlmICghc3R5bGVFbCkge1xuICAgICAgICAgICAgdmFyIGRvYyA9IHRoaXMuZG9jdW1lbnQsIGhlYWQgPSBkb2MuaGVhZDtcbiAgICAgICAgICAgIC8vIGFkZCBhbmltYXRpb25zdGFydCBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uc3RhcnQnLCBmdW5jdGlvbiAoZXYsIGNhbGxiYWNrcywgbCwgaSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcyA9IGFuaW1hdGlvbkNhbGxiYWNrc1tldi5hbmltYXRpb25OYW1lXTtcbiAgICAgICAgICAgICAgICAvLyBleGl0IGlmIGNhbGxiYWNrcyBoYXZlbid0IGJlZW4gcmVnaXN0ZXJlZFxuICAgICAgICAgICAgICAgIGlmICghY2FsbGJhY2tzKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gc3RvcCBvdGhlciBjYWxsYmFja3MgZnJvbSBmaXJpbmdcbiAgICAgICAgICAgICAgICBldi5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggY2FsbGJhY2tzXG4gICAgICAgICAgICAgICAgbCA9IGNhbGxiYWNrcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKylcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldKGV2LnRhcmdldCk7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgIC8vIGFkZCBzdHlsZXNoZWV0IHRvIGRvY3VtZW50XG4gICAgICAgICAgICBzdHlsZUVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsLCBoZWFkLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgc3R5bGVTaGVldCA9IHN0eWxlRWwuc2hlZXQ7XG4gICAgICAgICAgICBjc3NSdWxlcyA9IHN0eWxlU2hlZXQuY3NzUnVsZXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbGlzdGlmeSBhcmd1bWVudCBhbmQgYWRkIGNzcyBydWxlcy8gY2FjaGUgY2FsbGJhY2tzXG4gICAgICAgIChpc0FycmF5KGNzc1NlbGVjdG9ycykgPyBjc3NTZWxlY3RvcnMgOiBbY3NzU2VsZWN0b3JzXSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yLCBhbmltSWQsIGlzQ3VzdG9tTmFtZSkge1xuICAgICAgICAgICAgYW5pbUlkID0gc2VsZWN0b3JUb0FuaW1hdGlvbk1hcFtzZWxlY3Rvcl07XG4gICAgICAgICAgICBpZiAoIWFuaW1JZCkge1xuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGlzQ3VzdG9tTmFtZSA9IHNlbGVjdG9yWzBdID09ICchJztcbiAgICAgICAgICAgICAgICAvLyBkZWZpbmUgYW5pbWF0aW9uIG5hbWUgYW5kIGFkZCB0byBtYXBcbiAgICAgICAgICAgICAgICBzZWxlY3RvclRvQW5pbWF0aW9uTWFwW3NlbGVjdG9yXSA9IGFuaW1JZCA9XG4gICAgICAgICAgICAgICAgICAgIGlzQ3VzdG9tTmFtZSA/IHNlbGVjdG9yLnNsaWNlKDEpIDogJ3NlbnRpbmVsLScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMik7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGtleWZyYW1lIHJ1bGVcbiAgICAgICAgICAgICAgICBjc3NSdWxlc1tzdHlsZVNoZWV0Lmluc2VydFJ1bGUoJ0BrZXlmcmFtZXMgJyArIGFuaW1JZCArXG4gICAgICAgICAgICAgICAgICAgICd7ZnJvbXt0cmFuc2Zvcm06bm9uZTt9dG97dHJhbnNmb3JtOm5vbmU7fX0nLCBjc3NSdWxlcy5sZW5ndGgpXVxuICAgICAgICAgICAgICAgICAgICAuX2lkID0gc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgLy8gYWRkIHNlbGVjdG9yIGFuaW1hdGlvbiBydWxlXG4gICAgICAgICAgICAgICAgaWYgKCFpc0N1c3RvbU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzUnVsZXNbc3R5bGVTaGVldC5pbnNlcnRSdWxlKHNlbGVjdG9yICsgJ3thbmltYXRpb24tZHVyYXRpb246MC4wMDAxczthbmltYXRpb24tbmFtZTonICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1JZCArICc7fScsIGNzc1J1bGVzLmxlbmd0aCldXG4gICAgICAgICAgICAgICAgICAgICAgICAuX2lkID0gc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGFkZCB0byBtYXBcbiAgICAgICAgICAgICAgICBzZWxlY3RvclRvQW5pbWF0aW9uTWFwW3NlbGVjdG9yXSA9IGFuaW1JZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFkZCB0byBjYWxsYmFja3NcbiAgICAgICAgICAgIChhbmltYXRpb25DYWxsYmFja3NbYW5pbUlkXSA9IGFuaW1hdGlvbkNhbGxiYWNrc1thbmltSWRdIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB3YXRjaGVyLlxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGNzc1NlbGVjdG9ycyAtIExpc3Qgb2YgQ1NTIHNlbGVjdG9yIHN0cmluZ3NcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiAob3B0aW9uYWwpXG4gICAgICovXG4gICAgb2ZmKGNzc1NlbGVjdG9ycywgY2FsbGJhY2spIHtcbiAgICAgICAgLy8gbGlzdGlmeSBhcmd1bWVudCBhbmQgaXRlcmF0ZSB0aHJvdWdoIHJ1bGVzXG4gICAgICAgIChpc0FycmF5KGNzc1NlbGVjdG9ycykgPyBjc3NTZWxlY3RvcnMgOiBbY3NzU2VsZWN0b3JzXSlcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoc2VsZWN0b3IsIGFuaW1JZCwgY2FsbGJhY2tMaXN0LCBpKSB7XG4gICAgICAgICAgICAvLyBnZXQgYW5pbUlkXG4gICAgICAgICAgICBpZiAoIShhbmltSWQgPSBzZWxlY3RvclRvQW5pbWF0aW9uTWFwW3NlbGVjdG9yXSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gZ2V0IGNhbGxiYWNrc1xuICAgICAgICAgICAgY2FsbGJhY2tMaXN0ID0gYW5pbWF0aW9uQ2FsbGJhY2tzW2FuaW1JZF07XG4gICAgICAgICAgICAvLyByZW1vdmUgY2FsbGJhY2sgZnJvbSBsaXN0XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpID0gY2FsbGJhY2tMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja0xpc3RbaV0gPT09IGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja0xpc3QgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGV4aXQgaWYgY2FsbGJhY2tzIHN0aWxsIGV4aXN0XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tMaXN0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBjbGVhciBjYWNoZSBhbmQgcmVtb3ZlIGNzcyBydWxlc1xuICAgICAgICAgICAgaSA9IGNzc1J1bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAoY3NzUnVsZXNbaV0uX2lkID09IHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICBzdHlsZVNoZWV0LmRlbGV0ZVJ1bGUoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgc2VsZWN0b3JUb0FuaW1hdGlvbk1hcFtzZWxlY3Rvcl07XG4gICAgICAgICAgICBkZWxldGUgYW5pbWF0aW9uQ2FsbGJhY2tzW2FuaW1JZF07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNldCB3YXRjaGVycyBhbmQgY2FjaGVcbiAgICAgKi9cbiAgICByZXNldCgpIHtcbiAgICAgICAgc2VsZWN0b3JUb0FuaW1hdGlvbk1hcCA9IHt9O1xuICAgICAgICBhbmltYXRpb25DYWxsYmFja3MgPSB7fTtcbiAgICAgICAgaWYgKHN0eWxlRWwpXG4gICAgICAgICAgICBzdHlsZUVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbCk7XG4gICAgICAgIHN0eWxlRWwgPSAwO1xuICAgIH1cbn1cbiIsIi8qKlxuICogUGFyc2UgdGhlIGJyb3dzZXIgcXVlcnkgc3RyaW5nIG9yIHRoZSBwYXNzZWQgc3RyaW5nIGludG8gYSBqYXZhc2NyaXB0IG9iamVjdFxuICogd2l0aCBrZXlzIHRoZSBxdWVyeSBwYXJhbWV0ZXIgbmFtZXMgYW5kIHZhbHVlcyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5U3RyaW5nIC0gdGhlIHF1ZXJ5IHN0cmluZyB0byBwYXJzZSwgd2luZG93LmxvY2F0aW9uLnNlYXJjaCBpZiBub3QgYXZhaWxhYmxlXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBwYXJzZVF1ZXJ5U3RyaW5nID0gKHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaCkgPT4ge1xuICAgIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5U3RyaW5nKTtcbn07XG5leHBvcnQgY29uc3Qgbm9ybWFsaXplUGF0aG5hbWUgPSAocGF0aCkgPT4ge1xuICAgIGlmICghcGF0aC5zdGFydHNXaXRoKFwiL1wiKSlcbiAgICAgICAgcGF0aCA9IFwiL1wiICsgcGF0aDtcbiAgICBpZiAocGF0aC5lbmRzV2l0aChcIi9cIikpXG4gICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZygwLCBwYXRoLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiBwYXRoO1xufTtcbi8qKlxuICogU29tZSBicm93c2VyIGxpa2UgU2FmYXJpIHByZXZlbnQgYWNjZXNzaW5nIGxvY2FsU3RvcmFnZSBpbiBwcml2YXRlIG1vZGUgYnkgdGhyb3dpbmcgZXhjZXB0aW9ucy5cbiAqIFVzZSB0aGlzIG1ldGhvZCB0byByZXRyaWV2ZSBhIG1vY2sgaW1wbCB3aGljaCB3aWxsIGF0IGxlYXN0IHByZXZlbnQgZXJyb3JzLlxuICovXG5leHBvcnQgY29uc3QgZ2V0TG9jYWxTdG9yYWdlID0gKCkgPT4ge1xuICAgIGlmIChcImxvY2FsU3RvcmFnZVwiIGluIHdpbmRvdykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhYmNcIik7IC8vIGFjY2VzcyBsb2NhbFN0b3JhZ2UgdG8gdHJpZ2dlciBpbmNvZ25pdG8gbW9kZSBleGNlcHRpb25zXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb29raWVTdG9yYWdlKDUyNTYwMCwgXCJfX2xvY2FsU3RvcmFnZU1vY2tfX19cIik7XG59O1xuLyoqXG4gKiBVUkwgc2FmZSBiYXNlNjQgZW5jb2RpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkLCBvbmx5IEFTQ0lJL0lTTy04ODU5LTEgc3VwcG9ydGVkXG4gKi9cbmV4cG9ydCBjb25zdCBiYXNlNjRFbmNvZGUgPSAoc3RyKSA9PiB7XG4gICAgLy8gTm90ZSwgKyByZXBsYWNlZCB3aXRoIC0sIC8gcmVwbGFjZWQgd2l0aCBfXG4gICAgY29uc3QgYjY0ID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fPVwiO1xuICAgIGxldCBvMSwgbzIsIG8zLCBiaXRzLCBoMSwgaDIsIGgzLCBoNCwgZSA9IFtdLCBwYWQgPSAnJywgYztcbiAgICBjID0gc3RyLmxlbmd0aCAlIDM7IC8vIHBhZCBzdHJpbmcgdG8gbGVuZ3RoIG9mIG11bHRpcGxlIG9mIDNcbiAgICBpZiAoYyA+IDApIHtcbiAgICAgICAgd2hpbGUgKGMrKyA8IDMpIHtcbiAgICAgICAgICAgIHBhZCArPSAnPSc7XG4gICAgICAgICAgICBzdHIgKz0gJ1xcMCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gbm90ZTogZG9pbmcgcGFkZGluZyBoZXJlIHNhdmVzIHVzIGRvaW5nIHNwZWNpYWwtY2FzZSBwYWNraW5nIGZvciB0cmFpbGluZyAxIG9yIDIgY2hhcnNcbiAgICBmb3IgKGMgPSAwOyBjIDwgc3RyLmxlbmd0aDsgYyArPSAzKSB7IC8vIHBhY2sgdGhyZWUgb2N0ZXRzIGludG8gZm91ciBoZXhldHNcbiAgICAgICAgbzEgPSBzdHIuY2hhckNvZGVBdChjKTtcbiAgICAgICAgbzIgPSBzdHIuY2hhckNvZGVBdChjICsgMSk7XG4gICAgICAgIG8zID0gc3RyLmNoYXJDb2RlQXQoYyArIDIpO1xuICAgICAgICBiaXRzID0gbzEgPDwgMTYgfCBvMiA8PCA4IHwgbzM7XG4gICAgICAgIGgxID0gYml0cyA+PiAxOCAmIDB4M2Y7XG4gICAgICAgIGgyID0gYml0cyA+PiAxMiAmIDB4M2Y7XG4gICAgICAgIGgzID0gYml0cyA+PiA2ICYgMHgzZjtcbiAgICAgICAgaDQgPSBiaXRzICYgMHgzZjtcbiAgICAgICAgLy8gdXNlIGhleHRldHMgdG8gaW5kZXggaW50byBjb2RlIHN0cmluZ1xuICAgICAgICBlW2MgLyAzXSA9IGI2NC5jaGFyQXQoaDEpICsgYjY0LmNoYXJBdChoMikgKyBiNjQuY2hhckF0KGgzKSArIGI2NC5jaGFyQXQoaDQpO1xuICAgIH1cbiAgICBzdHIgPSBlLmpvaW4oJycpOyAvLyB1c2UgQXJyYXkuam9pbigpIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UgdGhhbiByZXBlYXRlZCBzdHJpbmcgYXBwZW5kc1xuICAgIC8vIHJlcGxhY2UgJ0EncyBmcm9tIHBhZGRlZCBudWxscyB3aXRoICc9J3NcbiAgICBzdHIgPSBzdHIuc2xpY2UoMCwgc3RyLmxlbmd0aCAtIHBhZC5sZW5ndGgpICsgcGFkO1xuICAgIHJldHVybiBzdHI7XG59O1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlSWQgPSAoKSA9PiB7XG4gICAgY29uc3QgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgbGV0IHRleHQgPSBcIlwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbn07XG5leHBvcnQgY29uc3QgZ2V0U2Vzc2lvblN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgaWYgKFwic2Vzc2lvblN0b3JhZ2VcIiBpbiB3aW5kb3cpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJhYmNcIik7IC8vIGFjY2VzcyBzZXNzaW9uU3RvcmFnZSB0byB0cmlnZ2VyIGluY29nbml0byBtb2RlIGV4Y2VwdGlvbnNcbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29va2llU3RvcmFnZSh2b2lkIDAsIFwiX19zZXNzaW9uU3RvcmFnZU1vY2tfX19cIik7XG59O1xuZnVuY3Rpb24gY29va2llU3RvcmFnZSh0dGxNaW51dGVzLCBzdG9yYWdlTmFtZSkge1xuICAgIGNvbnN0IExPQ0FMX1NUT1JBR0VfQ09PS0lFX05BTUUgPSBzdG9yYWdlTmFtZTtcbiAgICBmdW5jdGlvbiBnZXRTdG9yYWdlRnJvbUNvb2tpZSgpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZ2V0Q29va2llKExPQ0FMX1NUT1JBR0VfQ09PS0lFX05BTUUpIHx8IFwie31cIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNhdmVTdG9yYWdlVG9Db29raWUoZGF0YSkge1xuICAgICAgICBzZXRDb29raWUoTE9DQUxfU1RPUkFHRV9DT09LSUVfTkFNRSwgZGF0YSwgdHRsTWludXRlcyk7IC8vIG9uZSB5ZWFyXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGdldEl0ZW0oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0U3RvcmFnZUZyb21Db29raWUoKVtrZXldIHx8IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEl0ZW0oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlU3RhdGUgPSBnZXRTdG9yYWdlRnJvbUNvb2tpZSgpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlU3RhdGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgc2F2ZVN0b3JhZ2VUb0Nvb2tpZShKU09OLnN0cmluZ2lmeShsb2NhbFN0b3JhZ2VTdGF0ZSkpO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmVJdGVtKGtleSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlU3RhdGUgPSBnZXRTdG9yYWdlRnJvbUNvb2tpZSgpO1xuICAgICAgICAgICAgZGVsZXRlIGxvY2FsU3RvcmFnZVN0YXRlW2tleV07XG4gICAgICAgICAgICBzYXZlU3RvcmFnZVRvQ29va2llKEpTT04uc3RyaW5naWZ5KGxvY2FsU3RvcmFnZVN0YXRlKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyKCkge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlU3RhdGUgPSB7fTtcbiAgICAgICAgICAgIHNhdmVTdG9yYWdlVG9Db29raWUoSlNPTi5zdHJpbmdpZnkobG9jYWxTdG9yYWdlU3RhdGUpKTtcbiAgICAgICAgfSxcbiAgICAgICAga2V5KG4pIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsU3RvcmFnZVN0YXRlID0gZ2V0U3RvcmFnZUZyb21Db29raWUoKTtcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhsb2NhbFN0b3JhZ2VTdGF0ZSk7XG4gICAgICAgICAgICBpZiAobiA+IGtleXMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBrZXlzW25dO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlU3RhdGUgPSBnZXRTdG9yYWdlRnJvbUNvb2tpZSgpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZVN0YXRlKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0IGNvbnN0IHNldENvb2tpZSA9IChuYW1lLCB2YWx1ZSwgdHRsTWludXRlcykgPT4ge1xuICAgIGxldCBleHBpcmVzID0gXCJcIjtcbiAgICBpZiAodHRsTWludXRlcykge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKHR0bE1pbnV0ZXMgKiA2MCAqIDEwMDApKTtcbiAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b1VUQ1N0cmluZygpO1xuICAgIH1cbiAgICAvLyBIYW5kbGUgdGhlIHVwY29taW5nIGZvcmNlZCBzd2l0Y2ggdG8gU2FtZVNpdGUgJiBTZWN1cmUgcGFyYW1zIGh0dHBzOi8vd3d3LmNocm9tZXN0YXR1cy5jb20vZmVhdHVyZS81NjMzNTIxNjIyMTg4MDMyXG4gICAgLy8gU2luY2UgdGhpcyBpcyBhIGdlbmVyaWMgbGlicmFyeSwgd2UgY2FuJ3QgcmVzdHJpY3QgdGhlIGRvbWFpbiB1bmRlciB3aGljaCBpdCdzIGJlZWluZyBzZXJ2ZWQsIHRodXMgbm90IHNldHRpbmcgZG9tYWluXG4gICAgLy8gZm9yIHRoZSBjb29raWUuIEl0J3MgdXN1YWxseSBsb2FkZWQgYW5kIHN1YnNlcXVlbnRseSByZXF1ZXN0ZWQgZnJvbSBhIHRoaXJkLXBhcnR5IGRvbWFpbiwgdGh1cyB3ZSBuZWVkIHRvIHNwZWNpZnkgU2FtZVNpdGU9Tm9uZSB3aGljaFxuICAgIC8vIHBlciB0aGUgbGF0ZXN0IHNwZWNpZmljYXRpb25zIHJlcXVpcmVzIHRoZSBTZWN1cmUgYXR0cmlidXRlLlxuICAgIC8vXG4gICAgLy8gVG8gYWxsb3cgbG9jYWwgZGVidWdnaW5nLCB3ZSB3b24ndCBzZXQgdGhlc2Ugd2hlbiBsb2FkZWQgb24gbG9jYWxob3N0LiBOb3RlLCBhZnRlciB0aGlzIGNoYW5nZSwgeW91IHdvbid0IGJlIGFibGUgdG8gc2VydmVcbiAgICAvLyB0aGUgY29sbGVjdG9yIHRvIHJlYWwgY2xpZW50cyBvdmVyIG5vbi1odHRwcyBjb25uZWN0aW9ucyAtIHRoZSBzZXNzaW9uIGNvb2tpZXMgd29uJ3QgbWF0Y2hcbiAgICBjb25zdCBzYW1lU2l0ZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIiA/IFwiXCIgOiBcIjsgU2FtZVNpdGU9Tm9uZTsgU2VjdXJlXCI7XG4gICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgKHZhbHVlIHx8IFwiXCIpICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIiArIHNhbWVTaXRlO1xuICAgIHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgZ2V0Q29va2llID0gKGNuYW1lKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGNuYW1lICsgXCI9XCI7XG4gICAgY29uc3QgZGVjb2RlZENvb2tpZSA9IGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUpO1xuICAgIGNvbnN0IGNhID0gZGVjb2RlZENvb2tpZS5zcGxpdCgnOycpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGMgPSBjYVtpXTtcbiAgICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09ICcgJykge1xuICAgICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjLmluZGV4T2YobmFtZSkgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWUubGVuZ3RoLCBjLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG59O1xuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gKiBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4gKiBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcbiAqIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuIFRoZSBmdW5jdGlvbiBhbHNvIGhhcyBhIHByb3BlcnR5ICdjbGVhcidcbiAqIHRoYXQgaXMgYSBmdW5jdGlvbiB3aGljaCB3aWxsIGNsZWFyIHRoZSB0aW1lciB0byBwcmV2ZW50IHByZXZpb3VzbHkgc2NoZWR1bGVkIGV4ZWN1dGlvbnMuXG4gKlxuICogQHNvdXJjZSB1bmRlcnNjb3JlLmpzXG4gKiBAc2VlIGh0dHA6Ly91bnNjcmlwdGFibGUuY29tLzIwMDkvMDMvMjAvZGVib3VuY2luZy1qYXZhc2NyaXB0LW1ldGhvZHMvXG4gKiBAcGFyYW0gZnVuYyB7RnVuY3Rpb259IGZ1bmN0aW9uIHRvIHdyYXBcbiAqIEBwYXJhbSB3YWl0IHtOdW1iZXJ9IHRpbWVvdXQgaW4gbXMgKGAxMDBgKVxuICogQHBhcmFtIGltbWVkaWF0ZSB7Qm9vbGVhbn0gd2hldGhlciB0byBleGVjdXRlIGF0IHRoZSBiZWdpbm5pbmcgKGBmYWxzZWApXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgZGVib3VuY2UgPSAoZnVuYywgd2FpdCA9IDEwMCwgaW1tZWRpYXRlID0gZmFsc2UpID0+IHtcbiAgICB2YXIgdGltZW91dCwgYXJncywgY29udGV4dCwgdGltZXN0YW1wLCByZXN1bHQ7XG4gICAgZnVuY3Rpb24gbGF0ZXIoKSB7XG4gICAgICAgIHZhciBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcbiAgICAgICAgaWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPj0gMCkge1xuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBkZWJvdW5jZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgICAgaWYgKCF0aW1lb3V0KVxuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgZGVib3VuY2VkLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGRlYm91bmNlZC5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGRlYm91bmNlZDtcbn07XG4iLCJleHBvcnQgKiBmcm9tIFwiLi9Db250ZXh0XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9MaXN0ZW5lclR5cGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0xvY2FsU3RvcmFnZVF1ZXVlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9TZW50aW5lbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vVXRpbFwiO1xuIiwiaW1wb3J0IHsgYmFzZTY0RW5jb2RlIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5leHBvcnQgY2xhc3MgQmFzZTY0RW5jb2RlV3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSkge1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgfVxuICAgIHdyaXRlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgZCA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLndyaXRlKGJhc2U2NEVuY29kZShlbmNvZGVVUklDb21wb25lbnQoZCkpKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQnJvd3NlclRyYWNraW5nV3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIHdyaXRlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgeyByZWNvcmRVcmwsIHJlY29yZFJlZmVycmVyLCByZWNvcmRMYW5ndWFnZSB9ID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBpZiAocmVjb3JkVXJsICYmICFkYXRhLnVybClcbiAgICAgICAgICAgIGRhdGEudXJsID0gdGhpcy5nZXRXaW5kb3coKS5sb2NhdGlvbi5ocmVmO1xuICAgICAgICBpZiAocmVjb3JkUmVmZXJyZXIgJiYgIWRhdGEucmVmKVxuICAgICAgICAgICAgZGF0YS5yZWYgPSB0aGlzLmdldERvY3VtZW50KCkucmVmZXJyZXI7XG4gICAgICAgIGlmIChyZWNvcmRMYW5ndWFnZSAmJiAhZGF0YS5sYW5nKVxuICAgICAgICAgICAgZGF0YS5sYW5nID0gdGhpcy5nZXRXaW5kb3coKS5uYXZpZ2F0b3IubGFuZ3VhZ2U7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUud3JpdGUoZGF0YSk7XG4gICAgfVxuICAgIGdldERvY3VtZW50KCkge1xuICAgICAgICBjb25zdCB7IGNvbnRleHQgfSA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgcmV0dXJuIGNvbnRleHQgPyBjb250ZXh0LmdldERvY3VtZW50KCkgOiBkb2N1bWVudDtcbiAgICB9XG4gICAgZ2V0V2luZG93KCkge1xuICAgICAgICBjb25zdCB7IGNvbnRleHQgfSA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgcmV0dXJuIGNvbnRleHQgPyBjb250ZXh0LmdldFdpbmRvdygpIDogd2luZG93O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IExvY2FsU3RvcmFnZVF1ZXVlIH0gZnJvbSBcIi4uL3V0aWxzL0xvY2FsU3RvcmFnZVF1ZXVlXCI7XG4vKipcbiAqIEEgd3JpdGVyIHRoYXQgYnVmZmVycyB0aGUgaW5jb21pbmcgZXZlbnRzIGluIGEgbG9jYWwgc3RvcmFnZSBxdWV1ZSBhbmQgd3JpdGVzXG4gKiB0aGVtIG91dCBpbiBiYXRjaGVzIGV2ZXJ5IHNlY29uZC4gSWYgdGhlIHF1ZXVlIGlzIG5vdCBlbXB0eSwgd2hlbiB0aGUgdGltZXIgdGlja3NcbiAqIHRoZSB3cml0ZXIgd2lsbCBzZW5kIHRoZSBhdmFpbGFibGUgZGF0YSByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhlcmUgYXJlIGNvbGxlY3RvciBldmVudHMgaS5lLlxuICogZXZlbiBpbiB0aW1lcyBvZiBpbmFjdGl2aXR5IG9yIHdoZW4gbG9hZGluZyB0aGUgcGFnZSBhbmQgcHJldmlvdXMgc3RhdGUgaXMgYXZhaWxhYmxlLlxuICpcbiAqIFRoZSB3cml0ZXIgd2lsbCBhbHNvIHRyeSB0byBzZW5kIHRoZSBhdmFpbGFibGUgZGF0YSBvbiBicm93c2VyIHVubG9hZCBldmVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEJ1ZmZlcmluZ1dyaXRlciB7XG4gICAgY29uc3RydWN0b3IoZGVsZWdhdGUsIGlkLCB0aW1lck1zID0gMTAwMCkge1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMucXVldWUgPSBuZXcgTG9jYWxTdG9yYWdlUXVldWUoaWQpO1xuICAgICAgICB0aGlzLnRpbWVyTXMgPSB0aW1lck1zO1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCh0aGlzLmZsdXNoLmJpbmQodGhpcyksIHRpbWVyTXMpO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgfVxuICAgIHdyaXRlKGRhdGEpIHtcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKGRhdGEpO1xuICAgIH1cbiAgICBmbHVzaChjYW5jZWxUaW1lcikge1xuICAgICAgICBpZiAodGhpcy5xdWV1ZS5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgYnJvd3NlciBzaHV0c2Rvd24gYmVmb3JlIHRoZSB3cml0ZSBpcyBjb21wbGV0ZVxuICAgICAgICAgICAgdGhpcy5xdWV1ZS50cmFuc2FjdGlvbmFsRHJhaW4ocXVldWUgPT4gbmV3IFByb21pc2UocmVzID0+IHJlcyh0aGlzLmRlbGVnYXRlLndyaXRlKHF1ZXVlKSkpKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihcImNvdWxkIG5vdCBkcmFpbiBxdWV1ZTogXCIsIGVycikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FuY2VsVGltZXIpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMuZmx1c2guYmluZCh0aGlzKSwgdGhpcy50aW1lck1zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDb25zb2xlV3JpdGVyIHtcbiAgICB3cml0ZShkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJDb25zb2xlV3JpdGVyIHJlY2VpdmluZyBuZXcgZGF0YTogXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIExvZ3MgdGhlIGRhdGEgdG8gdGhlIGJyb3dzZXIgY29uc29sZSB1c2luZyBjb25zb2xlLmRlYnVnXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWJ1Z1dyaXRlciB7XG4gICAgY29uc3RydWN0b3IoZGVsZWdhdGUsIGRlYnVnKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IGRlYnVnO1xuICAgIH1cbiAgICB3cml0ZShkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnKVxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUud3JpdGUoZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU1FTRXZlbnRXcml0ZXIgfSBmcm9tIFwiLi9TUVNFdmVudFdyaXRlclwiO1xuaW1wb3J0IHsgUmVzdEV2ZW50V3JpdGVyIH0gZnJvbSBcIi4vUmVzdEV2ZW50V3JpdGVyXCI7XG5pbXBvcnQgeyBCdWZmZXJpbmdXcml0ZXIgfSBmcm9tIFwiLi9CdWZmZXJpbmdXcml0ZXJcIjtcbmltcG9ydCB7IEJhc2U2NEVuY29kZVdyaXRlciB9IGZyb20gXCIuL0Jhc2U2NEVuY29kZVdyaXRlclwiO1xuaW1wb3J0IHsgSlNPTkVudmVsb3BlV3JpdGVyIH0gZnJvbSBcIi4vSlNPTkVudmVsb3BlV3JpdGVyXCI7XG5pbXBvcnQgeyBUcmFpbFdyaXRlciB9IGZyb20gXCIuL1RyYWlsV3JpdGVyXCI7XG5pbXBvcnQgeyBCcm93c2VyVHJhY2tpbmdXcml0ZXIgfSBmcm9tIFwiLi9Ccm93c2VyVHJhY2tpbmdXcml0ZXJcIjtcbmltcG9ydCB7IERlYnVnV3JpdGVyIH0gZnJvbSBcIi4vRGVidWdXcml0ZXJcIjtcbmltcG9ydCB7IFF1ZXJ5V3JpdGVyIH0gZnJvbSBcIi4vUXVlcnlXcml0ZXJcIjtcbmltcG9ydCB7IFRyYWlsIH0gZnJvbSBcIi4uL3F1ZXJ5L1RyYWlsXCI7XG5leHBvcnQgY2xhc3MgRGVmYXVsdFdyaXRlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBjb25zdCB7IGVuZHBvaW50LCBzcXMgfSA9IG9wdGlvbnM7XG4gICAgICAgIC8vIFdyaXRlciBwaXBlbGluZSwgYWRkL3JlbW92ZSBwaWVjZXMgYWNjb3JkaW5nIHRvIHVzZSBjYXNlXG4gICAgICAgIC8vIFRoaXMgd3JpdGVyIHBpcGVsaW5lIHdpbGwgc2VuZCBCYXNlNjQgZW5jb2RlZCBhcnJheSBvZiBqc29uIGV2ZW50c1xuICAgICAgICBsZXQgd3JpdGVyID0gaXNTUVMoZW5kcG9pbnQsIHNxcykgPyBuZXcgU1FTRXZlbnRXcml0ZXIoZW5kcG9pbnQpIDogbmV3IFJlc3RFdmVudFdyaXRlcihlbmRwb2ludCk7XG4gICAgICAgIHdyaXRlciA9IG5ldyBCYXNlNjRFbmNvZGVXcml0ZXIod3JpdGVyKTtcbiAgICAgICAgd3JpdGVyID0gbmV3IEJ1ZmZlcmluZ1dyaXRlcih3cml0ZXIsIFwiYnVmZmVyOlwiICsgb3B0aW9ucy5lbmRwb2ludCk7XG4gICAgICAgIHdyaXRlciA9IG5ldyBEZWJ1Z1dyaXRlcih3cml0ZXIsIG9wdGlvbnMuZGVidWcpO1xuICAgICAgICB3cml0ZXIgPSBuZXcgUXVlcnlXcml0ZXIod3JpdGVyLCBvcHRpb25zLnJlc29sdmVyLnF1ZXJ5UmVzb2x2ZXIpO1xuICAgICAgICB3cml0ZXIgPSBuZXcgVHJhaWxXcml0ZXIod3JpdGVyLCBvcHRpb25zLnRyYWlsIHx8IG5ldyBUcmFpbChvcHRpb25zLnJlc29sdmVyLnF1ZXJ5UmVzb2x2ZXIsIG9wdGlvbnMucmVzb2x2ZXIuc2Vzc2lvblJlc29sdmVyKSwgb3B0aW9ucy5yZXNvbHZlci5xdWVyeVJlc29sdmVyKTtcbiAgICAgICAgd3JpdGVyID0gbmV3IEpTT05FbnZlbG9wZVdyaXRlcih3cml0ZXIsIG9wdGlvbnMucmVzb2x2ZXIuc2Vzc2lvblJlc29sdmVyLCBvcHRpb25zLmNoYW5uZWwpO1xuICAgICAgICB3cml0ZXIgPSBuZXcgQnJvd3NlclRyYWNraW5nV3JpdGVyKHdyaXRlciwge1xuICAgICAgICAgICAgcmVjb3JkUmVmZXJyZXI6IG9wdGlvbnMucmVjb3JkUmVmZXJyZXIsXG4gICAgICAgICAgICByZWNvcmRVcmw6IG9wdGlvbnMucmVjb3JkVXJsLFxuICAgICAgICAgICAgcmVjb3JkTGFuZ3VhZ2U6IG9wdGlvbnMucmVjb3JkTGFuZ3VhZ2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMud3JpdGVyID0gd3JpdGVyO1xuICAgIH1cbiAgICB3cml0ZShkYXRhKSB7XG4gICAgICAgIHRoaXMud3JpdGVyLndyaXRlKGRhdGEpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGlzU1FTKGVuZHBvaW50LCBmb3JjZVNRUykge1xuICAgIHJldHVybiBmb3JjZVNRUyB8fCAoZW5kcG9pbnQuaW5kZXhPZihcInNxc1wiKSAhPSAtMSAmJiBlbmRwb2ludC5pbmRleE9mKFwiYW1hem9uYXdzLmNvbVwiKSAhPSAtMSk7XG59XG4iLCIvKipcbiAqIFdyYXAgdGhlIGV2ZW50cyBpbiBhIEpTT04gZW52ZWxvcGUsIGVucmljaCBlYWNoIHJlY29yZCB3aXRoIHRpbWVzdGFtcCwgc2Vzc2lvbiBhbmQgY2hhbm5lbCBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEpTT05FbnZlbG9wZVdyaXRlciB7XG4gICAgY29uc3RydWN0b3IoZGVsZWdhdGUsIHNlc3Npb25SZXNvbHZlciwgY2hhbm5lbCkge1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMuc2Vzc2lvblJlc29sdmVyID0gc2Vzc2lvblJlc29sdmVyO1xuICAgICAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsO1xuICAgIH1cbiAgICB3cml0ZShkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YS50aW1lc3RhbXApXG4gICAgICAgICAgICBkYXRhLnRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBkYXRhLnNlc3Npb24gPSB0aGlzLnNlc3Npb25SZXNvbHZlcigpO1xuICAgICAgICBkYXRhLmNoYW5uZWwgPSB0aGlzLmNoYW5uZWw7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUud3JpdGUoZGF0YSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBcHBlbmRzIHRoZSBxdWVyeSB0byB0aGUgZGF0YSBpZiBubyBxdWVyeSBwcm9wZXJ0eSBleGlzdHNcbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXJ5V3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgcXVlcnlSZXNvbHZlcikge1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMucXVlcnlSZXNvbHZlciA9IHF1ZXJ5UmVzb2x2ZXI7XG4gICAgfVxuICAgIHdyaXRlKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhLnF1ZXJ5KVxuICAgICAgICAgICAgZGF0YS5xdWVyeSA9IHRoaXMucXVlcnlSZXNvbHZlcigpLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUud3JpdGUoZGF0YSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBTdHJhaWdodC1mb3J3YXJkIFJFU1Qgd3JpdGUgdmlhIEdFVCByZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBSZXN0RXZlbnRXcml0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGVuZHBvaW50KSB7XG4gICAgICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcbiAgICB9XG4gICAgd3JpdGUoZGF0YSkge1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IHRoaXMuZW5kcG9pbnQgKyBcIj9kYXRhPVwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFNRU0V2ZW50V3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihxdWV1ZSwgZmlmbyA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucXVldWUgPSBxdWV1ZTtcbiAgICAgICAgdGhpcy5maWZvID0gZmlmbztcbiAgICB9XG4gICAgd3JpdGUoZGF0YSkge1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgbGV0IHNyYyA9IHRoaXMucXVldWUgKyBcIj9WZXJzaW9uPTIwMTItMTEtMDUmQWN0aW9uPVNlbmRNZXNzYWdlXCI7XG4gICAgICAgIC8vIFNRUyBzdXBwb3J0cyBGSUZPIHF1ZXVlcyBpbiBzb21lIHJlZ2lvbnMgdGhhdCBjYW4gYWxzbyBndWFyYW50ZWUgdGhlIG9yZGVyXG4gICAgICAgIC8vIG9mIHRoZSBtZXNzYWdlcy5cbiAgICAgICAgaWYgKHRoaXMuZmlmbykge1xuICAgICAgICAgICAgLy8gVE9ETyB3aGVuIGVub3VnaCBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IHRvIHVuaXF1ZWx5IGlkZW50aWZ5IGEgbWVzc2FnZSwgc3dpdGNoIHRoZSBkZWR1cGxpY2F0aW9uIGlkIHRvIGEgbWVzc2FnZSBoYXNoXG4gICAgICAgICAgICBzcmMgKz0gXCImTWVzc2FnZUdyb3VwSWQ9MSZNZXNzYWdlRGVkdXBsaWNhdGlvbklkPVwiICsgTWF0aC5yYW5kb20oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBzcmMgKz0gXCImTWVzc2FnZUJvZHk9XCIgKyBkYXRhO1xuICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQ2FsbHMgYWxsIHdyaXRlcnMgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBlcnJvciBzYWZlXG4gKi9cbmV4cG9ydCBjbGFzcyBTcGxpdFN0cmVhbVdyaXRlciB7XG4gICAgY29uc3RydWN0b3Iod3JpdGVycykge1xuICAgICAgICB0aGlzLndyaXRlcnMgPSB3cml0ZXJzO1xuICAgIH1cbiAgICB3cml0ZShkYXRhKSB7XG4gICAgICAgIGZvciAobGV0IHdyaXRlciBvZiB0aGlzLndyaXRlcnMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgd3JpdGVyLndyaXRlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ291bGQgbm90IHdyaXRlIGRhdGE6IFwiLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBUcmFpbFdyaXRlciB7XG4gICAgY29uc3RydWN0b3IoZGVsZWdhdGUsIHRyYWlsLCBxdWVyeVJlc29sdmVyKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy50cmFpbCA9IHRyYWlsO1xuICAgICAgICB0aGlzLnF1ZXJ5UmVzb2x2ZXIgPSBxdWVyeVJlc29sdmVyO1xuICAgIH1cbiAgICB3cml0ZShkYXRhKSB7XG4gICAgICAgIGNvbnN0IHEgPSB0aGlzLnF1ZXJ5UmVzb2x2ZXIoKTtcbiAgICAgICAgaWYgKCghcSB8fCAhcS5pc1ZhbGlkKCkpICYmICFkYXRhLnF1ZXJ5ICYmIHRoaXMuaXNBcHBlbmRUcmFpbChkYXRhKSkge1xuICAgICAgICAgICAgLy8gU2VlIGlmIHdlIGhhdmUgYSBwYXlsb2FkIGlkIGFuZCBhIHRyYWlsIGZvciBpdC4gVGhpcyBtZWFucyB3ZVxuICAgICAgICAgICAgLy8gYXJlIGNvbGxlY3RpbmcgZGF0YSBmb3IgYW4gZXZlbnQgdGhhdCBkb2VzIG5vdCBoYXZlIGEgcXVlcnkgY29udGV4dFxuICAgICAgICAgICAgLy8gb24gdGhlIHBhZ2UgYW55bW9yZSBidXQgd2Ugd2FudCB0byBhc3NvY2lhdGUgdGhlIGV2ZW50IHdpdGggdGhlIHF1ZXJ5XG4gICAgICAgICAgICAvLyBjb250ZXh0IG9mIHRoZSBvcmlnaW5hbCBzZWFyY2ggcmVzdWx0XG4gICAgICAgICAgICB0aGlzLmFwcGVuZFRyYWlsKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVsZWdhdGUud3JpdGUoZGF0YSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGVuZCB0aGUgVHJhaWwgaWYgYW55XG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFwcGVuZFRyYWlsKGRhdGEpIHtcbiAgICAgICAgY29uc3QgdHJhaWwgPSB0aGlzLnRyYWlsLmZldGNoKHRoaXMuZ2V0SWQoZGF0YSkpO1xuICAgICAgICBpZiAodHJhaWwgJiYgdHJhaWwucXVlcnkpIHtcbiAgICAgICAgICAgIGRhdGEucXVlcnkgPSB0cmFpbC5xdWVyeTtcbiAgICAgICAgICAgIGRhdGEucXVlcnlUaW1lID0gdHJhaWwudGltZXN0YW1wO1xuICAgICAgICAgICAgZGF0YS50cmFpbFR5cGUgPSB0cmFpbC50eXBlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGZvciBsZWdhY3kgc3VwcG9ydDogc29tZXRpbWVzIGRhdGEgd2FzIHdyYXBwZWQgaW4gcHJvcGVydHkgY2FsbGVkIFwiZGF0YVwiXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldElkKGRhdGEpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoZGF0YSlcbiAgICAgICAgICAgIHJldHVybiBkYXRhLmlkIHx8ICgoX2EgPSBkYXRhLmRhdGEpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV2YWx1YXRlcyBpZiB0aGUgVHJhaWwgc2hvdWxkIGJlIGFwcGVuZGVkIHRvIHRoaXMgZXZlbnRcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgaXNBcHBlbmRUcmFpbChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhICYmIFtcImNoZWNrb3V0XCIsIFwiYmFza2V0XCIsIFwiZmlsdGVyXCJdLmluZGV4T2YoZGF0YS50eXBlKSA+IC0xO1xuICAgICAgICAvLyBUQTogVGhpcyB3YXMgcHJldmlvdXNseSBcImRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuaWQgJiYgdGhpcy50cmFpbFwiXG4gICAgICAgIC8vIHRoZSBvbmx5IENvbGxlY3RvcnMgYXBwZW5kaW5nIGEgcHJvcGVydHkgY2FsbGVkIFwiZGF0YVwiIHRvIGl0cyBldmVudCBhcmUgQ2xpY2tDb2xsZWN0b3IgaS5lLlxuICAgICAgICAvLyBDaGVja291dENsaWNrQ29sbGVjdG9yLCBCYXNrZXRDbGlja0NvbGxlY3RvciwgRmlsdGVyQ2xpY2tDb2xsZWN0b3JcbiAgICAgICAgLy8gSSd2ZSByZWZhY3RvcmVkIHRoaXMgaW1wbGljaXQgY29uZGl0aW9uIHRvIHRoaXMgZnVuY3Rpb25cbiAgICAgICAgLy8gVE9ETyB2YWxpZGF0ZSBpZiB0aGluZ3Mgd2lsbCBicmVhayB3aXRoIG5ldyBpbXBsXG4gICAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSBcIi4vQmFzZTY0RW5jb2RlV3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9CdWZmZXJpbmdXcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0RlZmF1bHRXcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0pTT05FbnZlbG9wZVdyaXRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vUmVzdEV2ZW50V3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9TcGxpdFN0cmVhbVdyaXRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vU1FTRXZlbnRXcml0ZXJcIjtcbiIsImV4cG9ydCAqIGZyb20gXCIuL0Jhc2U2NEVuY29kZVdyaXRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQnJvd3NlclRyYWNraW5nV3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9CdWZmZXJpbmdXcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NvbnNvbGVXcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0RlYnVnV3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9EZWZhdWx0V3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9KU09ORW52ZWxvcGVXcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1F1ZXJ5V3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9SZXN0RXZlbnRXcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1NwbGl0U3RyZWFtV3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9TUVNFdmVudFdyaXRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vVHJhaWxXcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1dyaXRlclwiO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgKiBmcm9tIFwiLi9Db2xsZWN0b3JNb2R1bGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2NvbGxlY3RvcnMvXCI7XG5leHBvcnQgKiBmcm9tIFwiLi93cml0ZXJzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9xdWVyeVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vbG9nZ2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9yZXNvbHZlcnNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3V0aWxzXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=