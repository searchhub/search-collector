/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/scrollmonitor/scrollMonitor.js":
/*!*****************************************************!*\
  !*** ./node_modules/scrollmonitor/scrollMonitor.js ***!
  \*****************************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,function(){return function(t){function e(o){if(i[o])return i[o].exports;var s=i[o]={exports:{},id:o,loaded:!1};return t[o].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";var o=i(1),s=o.isInBrowser,n=i(2),r=new n(s?document.body:null);r.setStateFromDOM(null),r.listenToDOM(),s&&(window.scrollMonitor=r),t.exports=r},function(t,e){"use strict";e.VISIBILITYCHANGE="visibilityChange",e.ENTERVIEWPORT="enterViewport",e.FULLYENTERVIEWPORT="fullyEnterViewport",e.EXITVIEWPORT="exitViewport",e.PARTIALLYEXITVIEWPORT="partiallyExitViewport",e.LOCATIONCHANGE="locationChange",e.STATECHANGE="stateChange",e.eventTypes=[e.VISIBILITYCHANGE,e.ENTERVIEWPORT,e.FULLYENTERVIEWPORT,e.EXITVIEWPORT,e.PARTIALLYEXITVIEWPORT,e.LOCATIONCHANGE,e.STATECHANGE],e.isOnServer="undefined"==typeof window,e.isInBrowser=!e.isOnServer,e.defaultOffsets={top:0,bottom:0}},function(t,e,i){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t){return c?0:t===document.body?window.innerHeight||document.documentElement.clientHeight:t.clientHeight}function n(t){return c?0:t===document.body?Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.documentElement.clientHeight):t.scrollHeight}function r(t){return c?0:t===document.body?window.pageYOffset||document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop}var h=i(1),c=h.isOnServer,a=h.isInBrowser,l=h.eventTypes,p=i(3),u=!1;if(a)try{var w=Object.defineProperty({},"passive",{get:function(){u=!0}});window.addEventListener("test",null,w)}catch(t){}var d=!!u&&{capture:!1,passive:!0},f=function(){function t(e,i){function h(){if(a.viewportTop=r(e),a.viewportBottom=a.viewportTop+a.viewportHeight,a.documentHeight=n(e),a.documentHeight!==p){for(u=a.watchers.length;u--;)a.watchers[u].recalculateLocation();p=a.documentHeight}}function c(){for(w=a.watchers.length;w--;)a.watchers[w].update();for(w=a.watchers.length;w--;)a.watchers[w].triggerCallbacks()}o(this,t);var a=this;this.item=e,this.watchers=[],this.viewportTop=null,this.viewportBottom=null,this.documentHeight=n(e),this.viewportHeight=s(e),this.DOMListener=function(){t.prototype.DOMListener.apply(a,arguments)},this.eventTypes=l,i&&(this.containerWatcher=i.create(e));var p,u,w;this.update=function(){h(),c()},this.recalculateLocations=function(){this.documentHeight=0,this.update()}}return t.prototype.listenToDOM=function(){a&&(window.addEventListener?(this.item===document.body?window.addEventListener("scroll",this.DOMListener,d):this.item.addEventListener("scroll",this.DOMListener,d),window.addEventListener("resize",this.DOMListener)):(this.item===document.body?window.attachEvent("onscroll",this.DOMListener):this.item.attachEvent("onscroll",this.DOMListener),window.attachEvent("onresize",this.DOMListener)),this.destroy=function(){window.addEventListener?(this.item===document.body?(window.removeEventListener("scroll",this.DOMListener,d),this.containerWatcher.destroy()):this.item.removeEventListener("scroll",this.DOMListener,d),window.removeEventListener("resize",this.DOMListener)):(this.item===document.body?(window.detachEvent("onscroll",this.DOMListener),this.containerWatcher.destroy()):this.item.detachEvent("onscroll",this.DOMListener),window.detachEvent("onresize",this.DOMListener))})},t.prototype.destroy=function(){},t.prototype.DOMListener=function(t){this.setStateFromDOM(t)},t.prototype.setStateFromDOM=function(t){var e=r(this.item),i=s(this.item),o=n(this.item);this.setState(e,i,o,t)},t.prototype.setState=function(t,e,i,o){var s=e!==this.viewportHeight||i!==this.contentHeight;if(this.latestEvent=o,this.viewportTop=t,this.viewportHeight=e,this.viewportBottom=t+e,this.contentHeight=i,s)for(var n=this.watchers.length;n--;)this.watchers[n].recalculateLocation();this.updateAndTriggerWatchers(o)},t.prototype.updateAndTriggerWatchers=function(t){for(var e=this.watchers.length;e--;)this.watchers[e].update();for(e=this.watchers.length;e--;)this.watchers[e].triggerCallbacks(t)},t.prototype.createCustomContainer=function(){return new t},t.prototype.createContainer=function(e){"string"==typeof e?e=document.querySelector(e):e&&e.length>0&&(e=e[0]);var i=new t(e,this);return i.setStateFromDOM(),i.listenToDOM(),i},t.prototype.create=function(t,e){"string"==typeof t?t=document.querySelector(t):t&&t.length>0&&(t=t[0]);var i=new p(this,t,e);return this.watchers.push(i),i},t.prototype.beget=function(t,e){return this.create(t,e)},t}();t.exports=f},function(t,e,i){"use strict";function o(t,e,i){function o(t,e){if(0!==t.length)for(E=t.length;E--;)y=t[E],y.callback.call(s,e,s),y.isOne&&t.splice(E,1)}var s=this;this.watchItem=e,this.container=t,i?i===+i?this.offsets={top:i,bottom:i}:this.offsets={top:i.top||w.top,bottom:i.bottom||w.bottom}:this.offsets=w,this.callbacks={};for(var d=0,f=u.length;d<f;d++)s.callbacks[u[d]]=[];this.locked=!1;var m,v,b,I,E,y;this.triggerCallbacks=function(t){switch(this.isInViewport&&!m&&o(this.callbacks[r],t),this.isFullyInViewport&&!v&&o(this.callbacks[h],t),this.isAboveViewport!==b&&this.isBelowViewport!==I&&(o(this.callbacks[n],t),v||this.isFullyInViewport||(o(this.callbacks[h],t),o(this.callbacks[a],t)),m||this.isInViewport||(o(this.callbacks[r],t),o(this.callbacks[c],t))),!this.isFullyInViewport&&v&&o(this.callbacks[a],t),!this.isInViewport&&m&&o(this.callbacks[c],t),this.isInViewport!==m&&o(this.callbacks[n],t),!0){case m!==this.isInViewport:case v!==this.isFullyInViewport:case b!==this.isAboveViewport:case I!==this.isBelowViewport:o(this.callbacks[p],t)}m=this.isInViewport,v=this.isFullyInViewport,b=this.isAboveViewport,I=this.isBelowViewport},this.recalculateLocation=function(){if(!this.locked){var t=this.top,e=this.bottom;if(this.watchItem.nodeName){var i=this.watchItem.style.display;"none"===i&&(this.watchItem.style.display="");for(var s=0,n=this.container;n.containerWatcher;)s+=n.containerWatcher.top-n.containerWatcher.container.viewportTop,n=n.containerWatcher.container;var r=this.watchItem.getBoundingClientRect();this.top=r.top+this.container.viewportTop-s,this.bottom=r.bottom+this.container.viewportTop-s,"none"===i&&(this.watchItem.style.display=i)}else this.watchItem===+this.watchItem?this.watchItem>0?this.top=this.bottom=this.watchItem:this.top=this.bottom=this.container.documentHeight-this.watchItem:(this.top=this.watchItem.top,this.bottom=this.watchItem.bottom);this.top-=this.offsets.top,this.bottom+=this.offsets.bottom,this.height=this.bottom-this.top,void 0===t&&void 0===e||this.top===t&&this.bottom===e||o(this.callbacks[l],null)}},this.recalculateLocation(),this.update(),m=this.isInViewport,v=this.isFullyInViewport,b=this.isAboveViewport,I=this.isBelowViewport}var s=i(1),n=s.VISIBILITYCHANGE,r=s.ENTERVIEWPORT,h=s.FULLYENTERVIEWPORT,c=s.EXITVIEWPORT,a=s.PARTIALLYEXITVIEWPORT,l=s.LOCATIONCHANGE,p=s.STATECHANGE,u=s.eventTypes,w=s.defaultOffsets;o.prototype={on:function(t,e,i){switch(!0){case t===n&&!this.isInViewport&&this.isAboveViewport:case t===r&&this.isInViewport:case t===h&&this.isFullyInViewport:case t===c&&this.isAboveViewport&&!this.isInViewport:case t===a&&this.isInViewport&&this.isAboveViewport:if(e.call(this,this.container.latestEvent,this),i)return}if(!this.callbacks[t])throw new Error("Tried to add a scroll monitor listener of type "+t+". Your options are: "+u.join(", "));this.callbacks[t].push({callback:e,isOne:i||!1})},off:function(t,e){if(!this.callbacks[t])throw new Error("Tried to remove a scroll monitor listener of type "+t+". Your options are: "+u.join(", "));for(var i,o=0;i=this.callbacks[t][o];o++)if(i.callback===e){this.callbacks[t].splice(o,1);break}},one:function(t,e){this.on(t,e,!0)},recalculateSize:function(){this.height=this.watchItem.offsetHeight+this.offsets.top+this.offsets.bottom,this.bottom=this.top+this.height},update:function(){this.isAboveViewport=this.top<this.container.viewportTop,this.isBelowViewport=this.bottom>this.container.viewportBottom,this.isInViewport=this.top<this.container.viewportBottom&&this.bottom>this.container.viewportTop,this.isFullyInViewport=this.top>=this.container.viewportTop&&this.bottom<=this.container.viewportBottom||this.isAboveViewport&&this.isBelowViewport},destroy:function(){var t=this.container.watchers.indexOf(this),e=this;this.container.watchers.splice(t,1);for(var i=0,o=u.length;i<o;i++)e.callbacks[u[i]].length=0},lock:function(){this.locked=!0},unlock:function(){this.locked=!1}};for(var d=function(t){return function(e,i){this.on.call(this,t,e,i)}},f=0,m=u.length;f<m;f++){var v=u[f];o.prototype[v]=d(v)}t.exports=o}])});
//# sourceMappingURL=scrollMonitor.js.map

/***/ }),

/***/ "./src/main/CollectorModule.ts":
/*!*************************************!*\
  !*** ./src/main/CollectorModule.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectorModule": () => (/* binding */ CollectorModule)
/* harmony export */ });
/* harmony import */ var _writers_SplitStreamWriter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./writers/SplitStreamWriter */ "./src/main/writers/SplitStreamWriter.ts");
/* harmony import */ var _logger_TransportLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger/TransportLogger */ "./src/main/logger/TransportLogger.ts");
/* harmony import */ var _writers_ConsoleWriter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./writers/ConsoleWriter */ "./src/main/writers/ConsoleWriter.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logger */ "./src/main/logger/index.ts");




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
        if (this.options.context && !collector.getContext())
            collector.setContext(this.options.context);
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
            console.warn("ATTENTION-SEARCH-COLLECTOR-WARNING");
            console.warn("search-collector: no LoggerTransport configured while using the default TransportLogger. Please add a transport CollectorModule#addLogTransport or CollectorModule#setTransports");
            console.warn("search-collector: will FALLBACK to ConsoleTransport");
            return new _logger_TransportLogger__WEBPACK_IMPORTED_MODULE_1__.TransportLogger([new _logger__WEBPACK_IMPORTED_MODULE_3__.ConsoleTransport()]);
        }
        return new _logger_TransportLogger__WEBPACK_IMPORTED_MODULE_1__.TransportLogger(this.transports);
    }
    getWriter() {
        return this.writers.length == 0
            ? this.options.writer || new _writers_ConsoleWriter__WEBPACK_IMPORTED_MODULE_2__.ConsoleWriter()
            : new _writers_SplitStreamWriter__WEBPACK_IMPORTED_MODULE_0__.SplitStreamWriter(this.writers);
    }
}


/***/ }),

/***/ "./src/main/collectors/AbstractCollector.ts":
/*!**************************************************!*\
  !*** ./src/main/collectors/AbstractCollector.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractCollector": () => (/* binding */ AbstractCollector)
/* harmony export */ });
/* harmony import */ var _utils_Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Context */ "./src/main/utils/Context.ts");

class AbstractCollector {
    constructor(type, context = new _utils_Context__WEBPACK_IMPORTED_MODULE_0__.Context(window, document)) {
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
            log.error(`[${this.constructor.name}] Unexpected error during resolver execution: `, e);
        }
    }
}


/***/ }),

/***/ "./src/main/collectors/AssociatedProductCollector.ts":
/*!***********************************************************!*\
  !*** ./src/main/collectors/AssociatedProductCollector.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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
    constructor(options = { recordUrl: true, recordReferrer: true, recordLanguage: false }) {
        super("browser");
        this.recordUrl = options.recordUrl || false;
        this.recordReferrer = options.recordReferrer || false;
        this.recordLanguage = options.recordLanguage || false;
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
        writer.write(data);
    }
}


/***/ }),

/***/ "./src/main/collectors/CheckoutClickCollector.ts":
/*!*******************************************************!*\
  !*** ./src/main/collectors/CheckoutClickCollector.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
            nodeList.forEach((el) => el.addEventListener("click", this.logWrapHandler(handler, log)));
        }
        else {
            const sentinel = new _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__.Sentinel(this.getDocument());
            sentinel.on(this.clickSelector, el => el.addEventListener("click", this.logWrapHandler(handler, log)));
        }
    }
}


/***/ }),

/***/ "./src/main/collectors/ClickCollector.ts":
/*!***********************************************!*\
  !*** ./src/main/collectors/ClickCollector.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
     */
    constructor(selectorExpression, type = "click", listenerType = _utils_ListenerType__WEBPACK_IMPORTED_MODULE_2__.ListenerType.Sentinel) {
        super(type);
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
            nodeList.forEach((el) => el.addEventListener("click", this.logWrapHandler(handler, log, el)));
        }
        else {
            const sentinel = new _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__.Sentinel(this.getDocument());
            sentinel.on(this.selectorExpression, el => el.addEventListener("click", this.logWrapHandler(handler, log, el)));
        }
    }
}


/***/ }),

/***/ "./src/main/collectors/ClickWriterResolverCollector.ts":
/*!*************************************************************!*\
  !*** ./src/main/collectors/ClickWriterResolverCollector.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
            nodeList.forEach(el => el.addEventListener("click", ev => this.logWrapHandler(handler, log, el, ev)()));
        }
        else {
            const sentinel = new _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__.Sentinel(this.getDocument());
            sentinel.on(this.selectorExpression, el => el.addEventListener("click", ev => this.logWrapHandler(handler, log, el, ev)()));
        }
    }
}


/***/ }),

/***/ "./src/main/collectors/FilterClickCollector.ts":
/*!*****************************************************!*\
  !*** ./src/main/collectors/FilterClickCollector.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImpressionCollector": () => (/* binding */ ImpressionCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");
/* harmony import */ var _utils_Sentinel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Sentinel */ "./src/main/utils/Sentinel.ts");
/* harmony import */ var scrollmonitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scrollmonitor */ "./node_modules/scrollmonitor/scrollMonitor.js");
/* harmony import */ var scrollmonitor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(scrollmonitor__WEBPACK_IMPORTED_MODULE_2__);
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
     */
    constructor(selectorExpression, idResolver, positionResolver) {
        super("impression");
        this.selectorExpression = selectorExpression;
        this.idResolver = idResolver;
        this.positionResolver = positionResolver;
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
            scrollmonitor__WEBPACK_IMPORTED_MODULE_2___default().create(element).enterViewport(() => {
                this.queue.push({
                    id: this.resolve(this.idResolver, log, element),
                    position: this.resolve(this.positionResolver, log, element)
                });
                flush();
            });
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

"use strict";
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
            delay(() => {
                const keywords = searchBox.value;
                if (keywords && keywords.length >= this.minLength) {
                    writer.write({
                        "type": type,
                        "keywords": keywords
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
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();


/***/ }),

/***/ "./src/main/collectors/ProductClickCollector.ts":
/*!******************************************************!*\
  !*** ./src/main/collectors/ProductClickCollector.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductClickCollector": () => (/* binding */ ProductClickCollector)
/* harmony export */ });
/* harmony import */ var _ClickCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClickCollector */ "./src/main/collectors/ClickCollector.ts");
/* harmony import */ var _utils_ListenerType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ListenerType */ "./src/main/utils/ListenerType.ts");


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
            if (this.trail) {
                // Register that this product journey into potential purchase started
                // with this query
                this.trail.register(id);
            }
            return {
                id,
                position: this.resolve(this.positionResolver, log, element, event),
                price: this.resolve(this.priceResolver, log, element, event),
                image: this.resolve(this.imageResolver, log, element, event),
                metadata: this.resolve(this.metadataResolver, log, element, event)
            };
        }
    }
}


/***/ }),

/***/ "./src/main/collectors/RedirectCollector.ts":
/*!**************************************************!*\
  !*** ./src/main/collectors/RedirectCollector.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RedirectCollector": () => (/* binding */ RedirectCollector)
/* harmony export */ });
/* harmony import */ var _AbstractCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollector */ "./src/main/collectors/AbstractCollector.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/main/utils/index.ts");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../query */ "./src/main/query/index.ts");



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
     * @param context
     */
    constructor(triggerResolver, expectedPageResolver, context) {
        super("redirect", context);
        this.triggerResolver = triggerResolver;
        this.expectedPageResolver = expectedPageResolver;
    }
    /**
     * Check whether we should be recording a redirect event
     *
     * @param {object} writer - The writer to send the data to
     * @param log
     */
    attach(writer, log) {
        this.resolve(this.triggerResolver, log, keyword => {
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getSessionStorage)().setItem(RedirectCollector.STORAGE_KEY, keyword);
        });
        // Fetch the latest search if any
        const lastSearch = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getSessionStorage)().getItem(RedirectCollector.STORAGE_KEY);
        if (lastSearch) {
            // Remove the search action, as we're either on a search result page or we've redirected
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getSessionStorage)().removeItem(RedirectCollector.STORAGE_KEY);
            // If we have not landed on the expected search page, it must have been (looove) a redirect
            if (!this.resolve(this.expectedPageResolver, log)) {
                // Thus record the redirect
                const query = new _query__WEBPACK_IMPORTED_MODULE_2__.Query();
                query.setSearch(lastSearch);
                writer.write({
                    type: "redirect",
                    keywords: lastSearch,
                    query: query.toString(),
                    url: window.location.href
                });
            }
        }
    }
}
RedirectCollector.STORAGE_KEY = "__lastSearch";


/***/ }),

/***/ "./src/main/collectors/SearchResultCollector.ts":
/*!******************************************************!*\
  !*** ./src/main/collectors/SearchResultCollector.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/main/logger/LoggerTransport.ts":
/*!********************************************!*\
  !*** ./src/main/logger/LoggerTransport.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/main/logger/TransportLogger.ts":
/*!********************************************!*\
  !*** ./src/main/logger/TransportLogger.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransportLogger": () => (/* reexport safe */ _TransportLogger__WEBPACK_IMPORTED_MODULE_2__.TransportLogger),
/* harmony export */   "ConsoleTransport": () => (/* reexport safe */ _transport__WEBPACK_IMPORTED_MODULE_3__.ConsoleTransport),
/* harmony export */   "SQSErrorTransport": () => (/* reexport safe */ _transport__WEBPACK_IMPORTED_MODULE_3__.SQSErrorTransport),
/* harmony export */   "SQSTransport": () => (/* reexport safe */ _transport__WEBPACK_IMPORTED_MODULE_3__.SQSTransport)
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cookieResolver": () => (/* binding */ cookieResolver),
/* harmony export */   "cookieSessionResolver": () => (/* binding */ cookieSessionResolver),
/* harmony export */   "positionResolver": () => (/* binding */ positionResolver),
/* harmony export */   "debugResolver": () => (/* binding */ debugResolver)
/* harmony export */ });
/* harmony import */ var _utils_Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Util */ "./src/main/utils/Util.ts");

const MINUTES_ONE_DAY = 60 * 24;
const MINUTES_HALF_HOUR = 30;
/**
 * Read the cookie with the provided name
 * @param name the name of the cookie
 */
const cookieResolver = (name = "") => (0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.getCookie)(name);
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
const cookieSessionResolver = (name = "SearchCollectorSession") => (0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.setCookie)(name, cookieResolver(name) || (0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.generateId)(), MINUTES_HALF_HOUR);
/**
 * Find the position of a DOM element relative to other DOM elements of the same type.
 * To be used to find the position of an item in a search result.
 *
 * @param selectorExpression the css expression to query for other elements
 * @param element the element for which we want to know the position relative to the elements selected by selectorExpression
 */
const positionResolver = (selectorExpression, element) => {
    return Array.from(document.querySelectorAll(selectorExpression))
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
        (0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)().setItem(DEBUG_KEY, String(debug));
    }
    return (0,_utils_Util__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)().getItem(DEBUG_KEY) === "true";
};


/***/ }),

/***/ "./src/main/resolvers/index.ts":
/*!*************************************!*\
  !*** ./src/main/resolvers/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseQueryString": () => (/* binding */ parseQueryString),
/* harmony export */   "getLocalStorage": () => (/* binding */ getLocalStorage),
/* harmony export */   "base64Encode": () => (/* binding */ base64Encode),
/* harmony export */   "generateId": () => (/* binding */ generateId),
/* harmony export */   "getSessionStorage": () => (/* binding */ getSessionStorage),
/* harmony export */   "setCookie": () => (/* binding */ setCookie),
/* harmony export */   "getCookie": () => (/* binding */ getCookie),
/* harmony export */   "debounce": () => (/* binding */ debounce)
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Base64EncodeWriter": () => (/* reexport safe */ _Base64EncodeWriter__WEBPACK_IMPORTED_MODULE_0__.Base64EncodeWriter),
/* harmony export */   "BufferingWriter": () => (/* reexport safe */ _BufferingWriter__WEBPACK_IMPORTED_MODULE_1__.BufferingWriter),
/* harmony export */   "DefaultWriter": () => (/* reexport safe */ _DefaultWriter__WEBPACK_IMPORTED_MODULE_2__.DefaultWriter),
/* harmony export */   "JSONEnvelopeWriter": () => (/* reexport safe */ _JSONEnvelopeWriter__WEBPACK_IMPORTED_MODULE_3__.JSONEnvelopeWriter),
/* harmony export */   "RestEventWriter": () => (/* reexport safe */ _RestEventWriter__WEBPACK_IMPORTED_MODULE_4__.RestEventWriter),
/* harmony export */   "SplitStreamWriter": () => (/* reexport safe */ _SplitStreamWriter__WEBPACK_IMPORTED_MODULE_5__.SplitStreamWriter),
/* harmony export */   "SQSEventWriter": () => (/* reexport safe */ _SQSEventWriter__WEBPACK_IMPORTED_MODULE_6__.SQSEventWriter)
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

"use strict";
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
/* harmony export */   "SplitStreamWriter": () => (/* reexport safe */ _SplitStreamWriter__WEBPACK_IMPORTED_MODULE_9__.SplitStreamWriter),
/* harmony export */   "SQSEventWriter": () => (/* reexport safe */ _SQSEventWriter__WEBPACK_IMPORTED_MODULE_10__.SQSEventWriter),
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************!*\
  !*** ./src/main/index.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectorModule": () => (/* reexport safe */ _CollectorModule__WEBPACK_IMPORTED_MODULE_0__.CollectorModule),
/* harmony export */   "AbstractCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.AbstractCollector),
/* harmony export */   "AssociatedProductCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.AssociatedProductCollector),
/* harmony export */   "BasketClickCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.BasketClickCollector),
/* harmony export */   "BrowserCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.BrowserCollector),
/* harmony export */   "CheckoutClickCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.CheckoutClickCollector),
/* harmony export */   "ClickCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.ClickCollector),
/* harmony export */   "ClickWriterResolverCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.ClickWriterResolverCollector),
/* harmony export */   "FilterClickCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.FilterClickCollector),
/* harmony export */   "FiredSearchCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.FiredSearchCollector),
/* harmony export */   "GenericEventCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.GenericEventCollector),
/* harmony export */   "ImpressionCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.ImpressionCollector),
/* harmony export */   "InstantSearchQueryCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.InstantSearchQueryCollector),
/* harmony export */   "ProductClickCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.ProductClickCollector),
/* harmony export */   "RedirectCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.RedirectCollector),
/* harmony export */   "SearchResultCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.SearchResultCollector),
/* harmony export */   "SuggestSearchCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.SuggestSearchCollector),
/* harmony export */   "WriterResolverCollector": () => (/* reexport safe */ _collectors___WEBPACK_IMPORTED_MODULE_1__.WriterResolverCollector),
/* harmony export */   "Base64EncodeWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.Base64EncodeWriter),
/* harmony export */   "BrowserTrackingWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.BrowserTrackingWriter),
/* harmony export */   "BufferingWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.BufferingWriter),
/* harmony export */   "ConsoleWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.ConsoleWriter),
/* harmony export */   "DebugWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.DebugWriter),
/* harmony export */   "DefaultWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.DefaultWriter),
/* harmony export */   "JSONEnvelopeWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.JSONEnvelopeWriter),
/* harmony export */   "QueryWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.QueryWriter),
/* harmony export */   "RestEventWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.RestEventWriter),
/* harmony export */   "SQSEventWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.SQSEventWriter),
/* harmony export */   "SplitStreamWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.SplitStreamWriter),
/* harmony export */   "TrailWriter": () => (/* reexport safe */ _writers__WEBPACK_IMPORTED_MODULE_2__.TrailWriter),
/* harmony export */   "Query": () => (/* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_3__.Query),
/* harmony export */   "Trail": () => (/* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_3__.Trail),
/* harmony export */   "TrailType": () => (/* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_3__.TrailType),
/* harmony export */   "ConsoleTransport": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_4__.ConsoleTransport),
/* harmony export */   "SQSErrorTransport": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_4__.SQSErrorTransport),
/* harmony export */   "SQSTransport": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_4__.SQSTransport),
/* harmony export */   "TransportLogger": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_4__.TransportLogger),
/* harmony export */   "cookieResolver": () => (/* reexport safe */ _resolvers__WEBPACK_IMPORTED_MODULE_5__.cookieResolver),
/* harmony export */   "cookieSessionResolver": () => (/* reexport safe */ _resolvers__WEBPACK_IMPORTED_MODULE_5__.cookieSessionResolver),
/* harmony export */   "debugResolver": () => (/* reexport safe */ _resolvers__WEBPACK_IMPORTED_MODULE_5__.debugResolver),
/* harmony export */   "positionResolver": () => (/* reexport safe */ _resolvers__WEBPACK_IMPORTED_MODULE_5__.positionResolver),
/* harmony export */   "Context": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.Context),
/* harmony export */   "ListenerType": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.ListenerType),
/* harmony export */   "LocalStorageQueue": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.LocalStorageQueue),
/* harmony export */   "Sentinel": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.Sentinel),
/* harmony export */   "base64Encode": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.base64Encode),
/* harmony export */   "debounce": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.debounce),
/* harmony export */   "generateId": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.generateId),
/* harmony export */   "getCookie": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.getCookie),
/* harmony export */   "getLocalStorage": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.getLocalStorage),
/* harmony export */   "getSessionStorage": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.getSessionStorage),
/* harmony export */   "parseQueryString": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.parseQueryString),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6T21FO0FBQzNCO0FBQ3hDO0FBQ087QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakJPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRHFDO0FBQ0g7QUFDRjtBQUNLO0FBQ0g7QUFDRTtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkk7QUFDRztBQUNOO0FBQ0Y7QUFDRjtBQUNFO0FBQ0s7QUFDUDtBQUNJO0FBQ0U7QUFDSDtBQUNIO0FBQ0w7Ozs7Ozs7VUNaekI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTmtDO0FBQ0o7QUFDSjtBQUNGO0FBQ0M7QUFDRztBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vbm9kZV9tb2R1bGVzL3Njcm9sbG1vbml0b3Ivc2Nyb2xsTW9uaXRvci5qcyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9Db2xsZWN0b3JNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9BYnN0cmFjdENvbGxlY3Rvci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9jb2xsZWN0b3JzL0Fzc29jaWF0ZWRQcm9kdWN0Q29sbGVjdG9yLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2NvbGxlY3RvcnMvQmFza2V0Q2xpY2tDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9Ccm93c2VyQ29sbGVjdG9yLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2NvbGxlY3RvcnMvQ2hlY2tvdXRDbGlja0NvbGxlY3Rvci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9jb2xsZWN0b3JzL0NsaWNrQ29sbGVjdG9yLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2NvbGxlY3RvcnMvQ2xpY2tXcml0ZXJSZXNvbHZlckNvbGxlY3Rvci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9jb2xsZWN0b3JzL0ZpbHRlckNsaWNrQ29sbGVjdG9yLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2NvbGxlY3RvcnMvRmlyZWRTZWFyY2hDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9HZW5lcmljRXZlbnRDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9JbXByZXNzaW9uQ29sbGVjdG9yLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2NvbGxlY3RvcnMvSW5zdGFudFNlYXJjaFF1ZXJ5Q29sbGVjdG9yLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2NvbGxlY3RvcnMvUHJvZHVjdENsaWNrQ29sbGVjdG9yLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2NvbGxlY3RvcnMvUmVkaXJlY3RDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9TZWFyY2hSZXN1bHRDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9TdWdnZXN0U2VhcmNoQ29sbGVjdG9yLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2NvbGxlY3RvcnMvV3JpdGVyUmVzb2x2ZXJDb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vY29sbGVjdG9ycy9pbmRleC50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9sb2dnZXIvTG9nZ2VyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2xvZ2dlci9Mb2dnZXJUcmFuc3BvcnQudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vbG9nZ2VyL1RyYW5zcG9ydExvZ2dlci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9sb2dnZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vbG9nZ2VyL3RyYW5zcG9ydC9Db25zb2xlVHJhbnNwb3J0LnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2xvZ2dlci90cmFuc3BvcnQvU1FTRXJyb3JUcmFuc3BvcnQudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vbG9nZ2VyL3RyYW5zcG9ydC9TUVNUcmFuc3BvcnQudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vbG9nZ2VyL3RyYW5zcG9ydC9pbmRleC50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9xdWVyeS9RdWVyeS50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9xdWVyeS9UcmFpbC50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi9xdWVyeS9UcmFpbFR5cGUudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vcXVlcnkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vcmVzb2x2ZXJzL1Jlc29sdmVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3Jlc29sdmVycy9pbmRleC50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi91dGlscy9Db250ZXh0LnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3V0aWxzL0xpc3RlbmVyVHlwZS50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi91dGlscy9Mb2NhbFN0b3JhZ2VRdWV1ZS50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi91dGlscy9TZW50aW5lbC50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi91dGlscy9VdGlsLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvQmFzZTY0RW5jb2RlV3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvQnJvd3NlclRyYWNraW5nV3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvQnVmZmVyaW5nV3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvQ29uc29sZVdyaXRlci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi93cml0ZXJzL0RlYnVnV3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvRGVmYXVsdFdyaXRlci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi93cml0ZXJzL0pTT05FbnZlbG9wZVdyaXRlci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi93cml0ZXJzL1F1ZXJ5V3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvUmVzdEV2ZW50V3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvU1FTRXZlbnRXcml0ZXIudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yLy4vc3JjL21haW4vd3JpdGVycy9TcGxpdFN0cmVhbVdyaXRlci50cyIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3IvLi9zcmMvbWFpbi93cml0ZXJzL1RyYWlsV3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvV3JpdGVyLnRzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL3dyaXRlcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vU2VhcmNoQ29sbGVjdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9TZWFyY2hDb2xsZWN0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1NlYXJjaENvbGxlY3Rvci8uL3NyYy9tYWluL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwic2Nyb2xsTW9uaXRvclwiLFtdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMuc2Nyb2xsTW9uaXRvcj1lKCk6dC5zY3JvbGxNb25pdG9yPWUoKX0odGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbih0KXtmdW5jdGlvbiBlKG8pe2lmKGlbb10pcmV0dXJuIGlbb10uZXhwb3J0czt2YXIgcz1pW29dPXtleHBvcnRzOnt9LGlkOm8sbG9hZGVkOiExfTtyZXR1cm4gdFtvXS5jYWxsKHMuZXhwb3J0cyxzLHMuZXhwb3J0cyxlKSxzLmxvYWRlZD0hMCxzLmV4cG9ydHN9dmFyIGk9e307cmV0dXJuIGUubT10LGUuYz1pLGUucD1cIlwiLGUoMCl9KFtmdW5jdGlvbih0LGUsaSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIG89aSgxKSxzPW8uaXNJbkJyb3dzZXIsbj1pKDIpLHI9bmV3IG4ocz9kb2N1bWVudC5ib2R5Om51bGwpO3Iuc2V0U3RhdGVGcm9tRE9NKG51bGwpLHIubGlzdGVuVG9ET00oKSxzJiYod2luZG93LnNjcm9sbE1vbml0b3I9ciksdC5leHBvcnRzPXJ9LGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7ZS5WSVNJQklMSVRZQ0hBTkdFPVwidmlzaWJpbGl0eUNoYW5nZVwiLGUuRU5URVJWSUVXUE9SVD1cImVudGVyVmlld3BvcnRcIixlLkZVTExZRU5URVJWSUVXUE9SVD1cImZ1bGx5RW50ZXJWaWV3cG9ydFwiLGUuRVhJVFZJRVdQT1JUPVwiZXhpdFZpZXdwb3J0XCIsZS5QQVJUSUFMTFlFWElUVklFV1BPUlQ9XCJwYXJ0aWFsbHlFeGl0Vmlld3BvcnRcIixlLkxPQ0FUSU9OQ0hBTkdFPVwibG9jYXRpb25DaGFuZ2VcIixlLlNUQVRFQ0hBTkdFPVwic3RhdGVDaGFuZ2VcIixlLmV2ZW50VHlwZXM9W2UuVklTSUJJTElUWUNIQU5HRSxlLkVOVEVSVklFV1BPUlQsZS5GVUxMWUVOVEVSVklFV1BPUlQsZS5FWElUVklFV1BPUlQsZS5QQVJUSUFMTFlFWElUVklFV1BPUlQsZS5MT0NBVElPTkNIQU5HRSxlLlNUQVRFQ0hBTkdFXSxlLmlzT25TZXJ2ZXI9XCJ1bmRlZmluZWRcIj09dHlwZW9mIHdpbmRvdyxlLmlzSW5Ccm93c2VyPSFlLmlzT25TZXJ2ZXIsZS5kZWZhdWx0T2Zmc2V0cz17dG9wOjAsYm90dG9tOjB9fSxmdW5jdGlvbih0LGUsaSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbyh0LGUpe2lmKCEodCBpbnN0YW5jZW9mIGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9ZnVuY3Rpb24gcyh0KXtyZXR1cm4gYz8wOnQ9PT1kb2N1bWVudC5ib2R5P3dpbmRvdy5pbm5lckhlaWdodHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDp0LmNsaWVudEhlaWdodH1mdW5jdGlvbiBuKHQpe3JldHVybiBjPzA6dD09PWRvY3VtZW50LmJvZHk/TWF0aC5tYXgoZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCxkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0LGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpOnQuc2Nyb2xsSGVpZ2h0fWZ1bmN0aW9uIHIodCl7cmV0dXJuIGM/MDp0PT09ZG9jdW1lbnQuYm9keT93aW5kb3cucGFnZVlPZmZzZXR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCYmZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcHx8ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A6dC5zY3JvbGxUb3B9dmFyIGg9aSgxKSxjPWguaXNPblNlcnZlcixhPWguaXNJbkJyb3dzZXIsbD1oLmV2ZW50VHlwZXMscD1pKDMpLHU9ITE7aWYoYSl0cnl7dmFyIHc9T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LFwicGFzc2l2ZVwiLHtnZXQ6ZnVuY3Rpb24oKXt1PSEwfX0pO3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidGVzdFwiLG51bGwsdyl9Y2F0Y2godCl7fXZhciBkPSEhdSYme2NhcHR1cmU6ITEscGFzc2l2ZTohMH0sZj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoZSxpKXtmdW5jdGlvbiBoKCl7aWYoYS52aWV3cG9ydFRvcD1yKGUpLGEudmlld3BvcnRCb3R0b209YS52aWV3cG9ydFRvcCthLnZpZXdwb3J0SGVpZ2h0LGEuZG9jdW1lbnRIZWlnaHQ9bihlKSxhLmRvY3VtZW50SGVpZ2h0IT09cCl7Zm9yKHU9YS53YXRjaGVycy5sZW5ndGg7dS0tOylhLndhdGNoZXJzW3VdLnJlY2FsY3VsYXRlTG9jYXRpb24oKTtwPWEuZG9jdW1lbnRIZWlnaHR9fWZ1bmN0aW9uIGMoKXtmb3Iodz1hLndhdGNoZXJzLmxlbmd0aDt3LS07KWEud2F0Y2hlcnNbd10udXBkYXRlKCk7Zm9yKHc9YS53YXRjaGVycy5sZW5ndGg7dy0tOylhLndhdGNoZXJzW3ddLnRyaWdnZXJDYWxsYmFja3MoKX1vKHRoaXMsdCk7dmFyIGE9dGhpczt0aGlzLml0ZW09ZSx0aGlzLndhdGNoZXJzPVtdLHRoaXMudmlld3BvcnRUb3A9bnVsbCx0aGlzLnZpZXdwb3J0Qm90dG9tPW51bGwsdGhpcy5kb2N1bWVudEhlaWdodD1uKGUpLHRoaXMudmlld3BvcnRIZWlnaHQ9cyhlKSx0aGlzLkRPTUxpc3RlbmVyPWZ1bmN0aW9uKCl7dC5wcm90b3R5cGUuRE9NTGlzdGVuZXIuYXBwbHkoYSxhcmd1bWVudHMpfSx0aGlzLmV2ZW50VHlwZXM9bCxpJiYodGhpcy5jb250YWluZXJXYXRjaGVyPWkuY3JlYXRlKGUpKTt2YXIgcCx1LHc7dGhpcy51cGRhdGU9ZnVuY3Rpb24oKXtoKCksYygpfSx0aGlzLnJlY2FsY3VsYXRlTG9jYXRpb25zPWZ1bmN0aW9uKCl7dGhpcy5kb2N1bWVudEhlaWdodD0wLHRoaXMudXBkYXRlKCl9fXJldHVybiB0LnByb3RvdHlwZS5saXN0ZW5Ub0RPTT1mdW5jdGlvbigpe2EmJih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcj8odGhpcy5pdGVtPT09ZG9jdW1lbnQuYm9keT93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMuRE9NTGlzdGVuZXIsZCk6dGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLkRPTUxpc3RlbmVyLGQpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsdGhpcy5ET01MaXN0ZW5lcikpOih0aGlzLml0ZW09PT1kb2N1bWVudC5ib2R5P3dpbmRvdy5hdHRhY2hFdmVudChcIm9uc2Nyb2xsXCIsdGhpcy5ET01MaXN0ZW5lcik6dGhpcy5pdGVtLmF0dGFjaEV2ZW50KFwib25zY3JvbGxcIix0aGlzLkRPTUxpc3RlbmVyKSx3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbnJlc2l6ZVwiLHRoaXMuRE9NTGlzdGVuZXIpKSx0aGlzLmRlc3Ryb3k9ZnVuY3Rpb24oKXt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcj8odGhpcy5pdGVtPT09ZG9jdW1lbnQuYm9keT8od2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLkRPTUxpc3RlbmVyLGQpLHRoaXMuY29udGFpbmVyV2F0Y2hlci5kZXN0cm95KCkpOnRoaXMuaXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5ET01MaXN0ZW5lcixkKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuRE9NTGlzdGVuZXIpKToodGhpcy5pdGVtPT09ZG9jdW1lbnQuYm9keT8od2luZG93LmRldGFjaEV2ZW50KFwib25zY3JvbGxcIix0aGlzLkRPTUxpc3RlbmVyKSx0aGlzLmNvbnRhaW5lcldhdGNoZXIuZGVzdHJveSgpKTp0aGlzLml0ZW0uZGV0YWNoRXZlbnQoXCJvbnNjcm9sbFwiLHRoaXMuRE9NTGlzdGVuZXIpLHdpbmRvdy5kZXRhY2hFdmVudChcIm9ucmVzaXplXCIsdGhpcy5ET01MaXN0ZW5lcikpfSl9LHQucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt9LHQucHJvdG90eXBlLkRPTUxpc3RlbmVyPWZ1bmN0aW9uKHQpe3RoaXMuc2V0U3RhdGVGcm9tRE9NKHQpfSx0LnByb3RvdHlwZS5zZXRTdGF0ZUZyb21ET009ZnVuY3Rpb24odCl7dmFyIGU9cih0aGlzLml0ZW0pLGk9cyh0aGlzLml0ZW0pLG89bih0aGlzLml0ZW0pO3RoaXMuc2V0U3RhdGUoZSxpLG8sdCl9LHQucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKHQsZSxpLG8pe3ZhciBzPWUhPT10aGlzLnZpZXdwb3J0SGVpZ2h0fHxpIT09dGhpcy5jb250ZW50SGVpZ2h0O2lmKHRoaXMubGF0ZXN0RXZlbnQ9byx0aGlzLnZpZXdwb3J0VG9wPXQsdGhpcy52aWV3cG9ydEhlaWdodD1lLHRoaXMudmlld3BvcnRCb3R0b209dCtlLHRoaXMuY29udGVudEhlaWdodD1pLHMpZm9yKHZhciBuPXRoaXMud2F0Y2hlcnMubGVuZ3RoO24tLTspdGhpcy53YXRjaGVyc1tuXS5yZWNhbGN1bGF0ZUxvY2F0aW9uKCk7dGhpcy51cGRhdGVBbmRUcmlnZ2VyV2F0Y2hlcnMobyl9LHQucHJvdG90eXBlLnVwZGF0ZUFuZFRyaWdnZXJXYXRjaGVycz1mdW5jdGlvbih0KXtmb3IodmFyIGU9dGhpcy53YXRjaGVycy5sZW5ndGg7ZS0tOyl0aGlzLndhdGNoZXJzW2VdLnVwZGF0ZSgpO2ZvcihlPXRoaXMud2F0Y2hlcnMubGVuZ3RoO2UtLTspdGhpcy53YXRjaGVyc1tlXS50cmlnZ2VyQ2FsbGJhY2tzKHQpfSx0LnByb3RvdHlwZS5jcmVhdGVDdXN0b21Db250YWluZXI9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IHR9LHQucHJvdG90eXBlLmNyZWF0ZUNvbnRhaW5lcj1mdW5jdGlvbihlKXtcInN0cmluZ1wiPT10eXBlb2YgZT9lPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSk6ZSYmZS5sZW5ndGg+MCYmKGU9ZVswXSk7dmFyIGk9bmV3IHQoZSx0aGlzKTtyZXR1cm4gaS5zZXRTdGF0ZUZyb21ET00oKSxpLmxpc3RlblRvRE9NKCksaX0sdC5wcm90b3R5cGUuY3JlYXRlPWZ1bmN0aW9uKHQsZSl7XCJzdHJpbmdcIj09dHlwZW9mIHQ/dD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQpOnQmJnQubGVuZ3RoPjAmJih0PXRbMF0pO3ZhciBpPW5ldyBwKHRoaXMsdCxlKTtyZXR1cm4gdGhpcy53YXRjaGVycy5wdXNoKGkpLGl9LHQucHJvdG90eXBlLmJlZ2V0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuY3JlYXRlKHQsZSl9LHR9KCk7dC5leHBvcnRzPWZ9LGZ1bmN0aW9uKHQsZSxpKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBvKHQsZSxpKXtmdW5jdGlvbiBvKHQsZSl7aWYoMCE9PXQubGVuZ3RoKWZvcihFPXQubGVuZ3RoO0UtLTspeT10W0VdLHkuY2FsbGJhY2suY2FsbChzLGUscykseS5pc09uZSYmdC5zcGxpY2UoRSwxKX12YXIgcz10aGlzO3RoaXMud2F0Y2hJdGVtPWUsdGhpcy5jb250YWluZXI9dCxpP2k9PT0raT90aGlzLm9mZnNldHM9e3RvcDppLGJvdHRvbTppfTp0aGlzLm9mZnNldHM9e3RvcDppLnRvcHx8dy50b3AsYm90dG9tOmkuYm90dG9tfHx3LmJvdHRvbX06dGhpcy5vZmZzZXRzPXcsdGhpcy5jYWxsYmFja3M9e307Zm9yKHZhciBkPTAsZj11Lmxlbmd0aDtkPGY7ZCsrKXMuY2FsbGJhY2tzW3VbZF1dPVtdO3RoaXMubG9ja2VkPSExO3ZhciBtLHYsYixJLEUseTt0aGlzLnRyaWdnZXJDYWxsYmFja3M9ZnVuY3Rpb24odCl7c3dpdGNoKHRoaXMuaXNJblZpZXdwb3J0JiYhbSYmbyh0aGlzLmNhbGxiYWNrc1tyXSx0KSx0aGlzLmlzRnVsbHlJblZpZXdwb3J0JiYhdiYmbyh0aGlzLmNhbGxiYWNrc1toXSx0KSx0aGlzLmlzQWJvdmVWaWV3cG9ydCE9PWImJnRoaXMuaXNCZWxvd1ZpZXdwb3J0IT09SSYmKG8odGhpcy5jYWxsYmFja3Nbbl0sdCksdnx8dGhpcy5pc0Z1bGx5SW5WaWV3cG9ydHx8KG8odGhpcy5jYWxsYmFja3NbaF0sdCksbyh0aGlzLmNhbGxiYWNrc1thXSx0KSksbXx8dGhpcy5pc0luVmlld3BvcnR8fChvKHRoaXMuY2FsbGJhY2tzW3JdLHQpLG8odGhpcy5jYWxsYmFja3NbY10sdCkpKSwhdGhpcy5pc0Z1bGx5SW5WaWV3cG9ydCYmdiYmbyh0aGlzLmNhbGxiYWNrc1thXSx0KSwhdGhpcy5pc0luVmlld3BvcnQmJm0mJm8odGhpcy5jYWxsYmFja3NbY10sdCksdGhpcy5pc0luVmlld3BvcnQhPT1tJiZvKHRoaXMuY2FsbGJhY2tzW25dLHQpLCEwKXtjYXNlIG0hPT10aGlzLmlzSW5WaWV3cG9ydDpjYXNlIHYhPT10aGlzLmlzRnVsbHlJblZpZXdwb3J0OmNhc2UgYiE9PXRoaXMuaXNBYm92ZVZpZXdwb3J0OmNhc2UgSSE9PXRoaXMuaXNCZWxvd1ZpZXdwb3J0Om8odGhpcy5jYWxsYmFja3NbcF0sdCl9bT10aGlzLmlzSW5WaWV3cG9ydCx2PXRoaXMuaXNGdWxseUluVmlld3BvcnQsYj10aGlzLmlzQWJvdmVWaWV3cG9ydCxJPXRoaXMuaXNCZWxvd1ZpZXdwb3J0fSx0aGlzLnJlY2FsY3VsYXRlTG9jYXRpb249ZnVuY3Rpb24oKXtpZighdGhpcy5sb2NrZWQpe3ZhciB0PXRoaXMudG9wLGU9dGhpcy5ib3R0b207aWYodGhpcy53YXRjaEl0ZW0ubm9kZU5hbWUpe3ZhciBpPXRoaXMud2F0Y2hJdGVtLnN0eWxlLmRpc3BsYXk7XCJub25lXCI9PT1pJiYodGhpcy53YXRjaEl0ZW0uc3R5bGUuZGlzcGxheT1cIlwiKTtmb3IodmFyIHM9MCxuPXRoaXMuY29udGFpbmVyO24uY29udGFpbmVyV2F0Y2hlcjspcys9bi5jb250YWluZXJXYXRjaGVyLnRvcC1uLmNvbnRhaW5lcldhdGNoZXIuY29udGFpbmVyLnZpZXdwb3J0VG9wLG49bi5jb250YWluZXJXYXRjaGVyLmNvbnRhaW5lcjt2YXIgcj10aGlzLndhdGNoSXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTt0aGlzLnRvcD1yLnRvcCt0aGlzLmNvbnRhaW5lci52aWV3cG9ydFRvcC1zLHRoaXMuYm90dG9tPXIuYm90dG9tK3RoaXMuY29udGFpbmVyLnZpZXdwb3J0VG9wLXMsXCJub25lXCI9PT1pJiYodGhpcy53YXRjaEl0ZW0uc3R5bGUuZGlzcGxheT1pKX1lbHNlIHRoaXMud2F0Y2hJdGVtPT09K3RoaXMud2F0Y2hJdGVtP3RoaXMud2F0Y2hJdGVtPjA/dGhpcy50b3A9dGhpcy5ib3R0b209dGhpcy53YXRjaEl0ZW06dGhpcy50b3A9dGhpcy5ib3R0b209dGhpcy5jb250YWluZXIuZG9jdW1lbnRIZWlnaHQtdGhpcy53YXRjaEl0ZW06KHRoaXMudG9wPXRoaXMud2F0Y2hJdGVtLnRvcCx0aGlzLmJvdHRvbT10aGlzLndhdGNoSXRlbS5ib3R0b20pO3RoaXMudG9wLT10aGlzLm9mZnNldHMudG9wLHRoaXMuYm90dG9tKz10aGlzLm9mZnNldHMuYm90dG9tLHRoaXMuaGVpZ2h0PXRoaXMuYm90dG9tLXRoaXMudG9wLHZvaWQgMD09PXQmJnZvaWQgMD09PWV8fHRoaXMudG9wPT09dCYmdGhpcy5ib3R0b209PT1lfHxvKHRoaXMuY2FsbGJhY2tzW2xdLG51bGwpfX0sdGhpcy5yZWNhbGN1bGF0ZUxvY2F0aW9uKCksdGhpcy51cGRhdGUoKSxtPXRoaXMuaXNJblZpZXdwb3J0LHY9dGhpcy5pc0Z1bGx5SW5WaWV3cG9ydCxiPXRoaXMuaXNBYm92ZVZpZXdwb3J0LEk9dGhpcy5pc0JlbG93Vmlld3BvcnR9dmFyIHM9aSgxKSxuPXMuVklTSUJJTElUWUNIQU5HRSxyPXMuRU5URVJWSUVXUE9SVCxoPXMuRlVMTFlFTlRFUlZJRVdQT1JULGM9cy5FWElUVklFV1BPUlQsYT1zLlBBUlRJQUxMWUVYSVRWSUVXUE9SVCxsPXMuTE9DQVRJT05DSEFOR0UscD1zLlNUQVRFQ0hBTkdFLHU9cy5ldmVudFR5cGVzLHc9cy5kZWZhdWx0T2Zmc2V0cztvLnByb3RvdHlwZT17b246ZnVuY3Rpb24odCxlLGkpe3N3aXRjaCghMCl7Y2FzZSB0PT09biYmIXRoaXMuaXNJblZpZXdwb3J0JiZ0aGlzLmlzQWJvdmVWaWV3cG9ydDpjYXNlIHQ9PT1yJiZ0aGlzLmlzSW5WaWV3cG9ydDpjYXNlIHQ9PT1oJiZ0aGlzLmlzRnVsbHlJblZpZXdwb3J0OmNhc2UgdD09PWMmJnRoaXMuaXNBYm92ZVZpZXdwb3J0JiYhdGhpcy5pc0luVmlld3BvcnQ6Y2FzZSB0PT09YSYmdGhpcy5pc0luVmlld3BvcnQmJnRoaXMuaXNBYm92ZVZpZXdwb3J0OmlmKGUuY2FsbCh0aGlzLHRoaXMuY29udGFpbmVyLmxhdGVzdEV2ZW50LHRoaXMpLGkpcmV0dXJufWlmKCF0aGlzLmNhbGxiYWNrc1t0XSl0aHJvdyBuZXcgRXJyb3IoXCJUcmllZCB0byBhZGQgYSBzY3JvbGwgbW9uaXRvciBsaXN0ZW5lciBvZiB0eXBlIFwiK3QrXCIuIFlvdXIgb3B0aW9ucyBhcmU6IFwiK3Uuam9pbihcIiwgXCIpKTt0aGlzLmNhbGxiYWNrc1t0XS5wdXNoKHtjYWxsYmFjazplLGlzT25lOml8fCExfSl9LG9mZjpmdW5jdGlvbih0LGUpe2lmKCF0aGlzLmNhbGxiYWNrc1t0XSl0aHJvdyBuZXcgRXJyb3IoXCJUcmllZCB0byByZW1vdmUgYSBzY3JvbGwgbW9uaXRvciBsaXN0ZW5lciBvZiB0eXBlIFwiK3QrXCIuIFlvdXIgb3B0aW9ucyBhcmU6IFwiK3Uuam9pbihcIiwgXCIpKTtmb3IodmFyIGksbz0wO2k9dGhpcy5jYWxsYmFja3NbdF1bb107bysrKWlmKGkuY2FsbGJhY2s9PT1lKXt0aGlzLmNhbGxiYWNrc1t0XS5zcGxpY2UobywxKTticmVha319LG9uZTpmdW5jdGlvbih0LGUpe3RoaXMub24odCxlLCEwKX0scmVjYWxjdWxhdGVTaXplOmZ1bmN0aW9uKCl7dGhpcy5oZWlnaHQ9dGhpcy53YXRjaEl0ZW0ub2Zmc2V0SGVpZ2h0K3RoaXMub2Zmc2V0cy50b3ArdGhpcy5vZmZzZXRzLmJvdHRvbSx0aGlzLmJvdHRvbT10aGlzLnRvcCt0aGlzLmhlaWdodH0sdXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5pc0Fib3ZlVmlld3BvcnQ9dGhpcy50b3A8dGhpcy5jb250YWluZXIudmlld3BvcnRUb3AsdGhpcy5pc0JlbG93Vmlld3BvcnQ9dGhpcy5ib3R0b20+dGhpcy5jb250YWluZXIudmlld3BvcnRCb3R0b20sdGhpcy5pc0luVmlld3BvcnQ9dGhpcy50b3A8dGhpcy5jb250YWluZXIudmlld3BvcnRCb3R0b20mJnRoaXMuYm90dG9tPnRoaXMuY29udGFpbmVyLnZpZXdwb3J0VG9wLHRoaXMuaXNGdWxseUluVmlld3BvcnQ9dGhpcy50b3A+PXRoaXMuY29udGFpbmVyLnZpZXdwb3J0VG9wJiZ0aGlzLmJvdHRvbTw9dGhpcy5jb250YWluZXIudmlld3BvcnRCb3R0b218fHRoaXMuaXNBYm92ZVZpZXdwb3J0JiZ0aGlzLmlzQmVsb3dWaWV3cG9ydH0sZGVzdHJveTpmdW5jdGlvbigpe3ZhciB0PXRoaXMuY29udGFpbmVyLndhdGNoZXJzLmluZGV4T2YodGhpcyksZT10aGlzO3RoaXMuY29udGFpbmVyLndhdGNoZXJzLnNwbGljZSh0LDEpO2Zvcih2YXIgaT0wLG89dS5sZW5ndGg7aTxvO2krKyllLmNhbGxiYWNrc1t1W2ldXS5sZW5ndGg9MH0sbG9jazpmdW5jdGlvbigpe3RoaXMubG9ja2VkPSEwfSx1bmxvY2s6ZnVuY3Rpb24oKXt0aGlzLmxvY2tlZD0hMX19O2Zvcih2YXIgZD1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxpKXt0aGlzLm9uLmNhbGwodGhpcyx0LGUsaSl9fSxmPTAsbT11Lmxlbmd0aDtmPG07ZisrKXt2YXIgdj11W2ZdO28ucHJvdG90eXBlW3ZdPWQodil9dC5leHBvcnRzPW99XSl9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjcm9sbE1vbml0b3IuanMubWFwIiwiaW1wb3J0IHsgU3BsaXRTdHJlYW1Xcml0ZXIgfSBmcm9tIFwiLi93cml0ZXJzL1NwbGl0U3RyZWFtV3JpdGVyXCI7XG5pbXBvcnQgeyBUcmFuc3BvcnRMb2dnZXIgfSBmcm9tIFwiLi9sb2dnZXIvVHJhbnNwb3J0TG9nZ2VyXCI7XG5pbXBvcnQgeyBDb25zb2xlV3JpdGVyIH0gZnJvbSBcIi4vd3JpdGVycy9Db25zb2xlV3JpdGVyXCI7XG5pbXBvcnQgeyBDb25zb2xlVHJhbnNwb3J0IH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG4vKipcbiAqIERlZmF1bHQgYXNzZW1ibHkgcG9pbnQgb2YgY29sbGVjdG9ycyBhbmQgd3JpdGVycy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbGxlY3Rvck1vZHVsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLmNvbGxlY3RvcnMgPSBbXTtcbiAgICAgICAgdGhpcy53cml0ZXJzID0gW107XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IFtdO1xuICAgICAgICB0aGlzLmhhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB9XG4gICAgYWRkKGNvbGxlY3Rvcikge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRleHQgJiYgIWNvbGxlY3Rvci5nZXRDb250ZXh0KCkpXG4gICAgICAgICAgICBjb2xsZWN0b3Iuc2V0Q29udGV4dCh0aGlzLm9wdGlvbnMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuY29sbGVjdG9ycy5wdXNoKGNvbGxlY3Rvcik7XG4gICAgICAgIGlmICh0aGlzLmhhc1N0YXJ0ZWQgPT09IHRydWUpXG4gICAgICAgICAgICB0aGlzLmludm9rZWRDb2xsZWN0b3IoY29sbGVjdG9yKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnQgY29sbGVjdGluZyBkYXRhIGJ5IGF0dGFjaGluZyBhbGwgY29sbGVjdG9yc1xuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmNvbGxlY3RvcnMuZm9yRWFjaChjb2xsZWN0b3IgPT4gdGhpcy5pbnZva2VkQ29sbGVjdG9yKGNvbGxlY3RvcikpO1xuICAgICAgICB0aGlzLmhhc1N0YXJ0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICBhZGRMb2dUcmFuc3BvcnQodHJhbnNwb3J0KSB7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cy5wdXNoKHRyYW5zcG9ydCk7XG4gICAgfVxuICAgIHNldFRyYW5zcG9ydHModHJhbnNwb3J0cykge1xuICAgICAgICB0aGlzLnRyYW5zcG9ydHMgPSB0cmFuc3BvcnRzIHx8IFtdO1xuICAgIH1cbiAgICBzZXRXcml0ZXJzKHJlcGxhY2VtZW50V3JpdGVycykge1xuICAgICAgICB0aGlzLndyaXRlcnMgPSBBcnJheS5pc0FycmF5KHJlcGxhY2VtZW50V3JpdGVycykgPyBbLi4ucmVwbGFjZW1lbnRXcml0ZXJzXSA6IFtyZXBsYWNlbWVudFdyaXRlcnNdO1xuICAgIH1cbiAgICBzZXRMb2dnZXIobG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cbiAgICBpbnZva2VkQ29sbGVjdG9yKGNvbGxlY3Rvcikge1xuICAgICAgICBjb25zdCB3cml0ZXIgPSB0aGlzLmdldFdyaXRlcigpO1xuICAgICAgICBjb25zdCBsb2cgPSB0aGlzLmdldExvZ2dlcigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29sbGVjdG9yLmF0dGFjaCh3cml0ZXIsIGxvZyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihgWyR7Y29sbGVjdG9yLmNvbnN0cnVjdG9yLm5hbWV9XSBVbmV4cGVjdGVkIEV4Y2VwdGlvbiBkdXJpbmcgY29sbGVjdG9yIGF0dGFjaDogYCwgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0TG9nZ2VyKCkge1xuICAgICAgICBjb25zdCBoYXNMb2dnZXIgPSAhIXRoaXMubG9nZ2VyO1xuICAgICAgICBpZiAoaGFzTG9nZ2VyKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9nZ2VyO1xuICAgICAgICBpZiAoIXRoaXMudHJhbnNwb3J0cyB8fCB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJBVFRFTlRJT04tU0VBUkNILUNPTExFQ1RPUi1XQVJOSU5HXCIpO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwic2VhcmNoLWNvbGxlY3Rvcjogbm8gTG9nZ2VyVHJhbnNwb3J0IGNvbmZpZ3VyZWQgd2hpbGUgdXNpbmcgdGhlIGRlZmF1bHQgVHJhbnNwb3J0TG9nZ2VyLiBQbGVhc2UgYWRkIGEgdHJhbnNwb3J0IENvbGxlY3Rvck1vZHVsZSNhZGRMb2dUcmFuc3BvcnQgb3IgQ29sbGVjdG9yTW9kdWxlI3NldFRyYW5zcG9ydHNcIik7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJzZWFyY2gtY29sbGVjdG9yOiB3aWxsIEZBTExCQUNLIHRvIENvbnNvbGVUcmFuc3BvcnRcIik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRyYW5zcG9ydExvZ2dlcihbbmV3IENvbnNvbGVUcmFuc3BvcnQoKV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgVHJhbnNwb3J0TG9nZ2VyKHRoaXMudHJhbnNwb3J0cyk7XG4gICAgfVxuICAgIGdldFdyaXRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JpdGVycy5sZW5ndGggPT0gMFxuICAgICAgICAgICAgPyB0aGlzLm9wdGlvbnMud3JpdGVyIHx8IG5ldyBDb25zb2xlV3JpdGVyKClcbiAgICAgICAgICAgIDogbmV3IFNwbGl0U3RyZWFtV3JpdGVyKHRoaXMud3JpdGVycyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCIuLi91dGlscy9Db250ZXh0XCI7XG5leHBvcnQgY2xhc3MgQWJzdHJhY3RDb2xsZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGNvbnRleHQgPSBuZXcgQ29udGV4dCh3aW5kb3csIGRvY3VtZW50KSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cbiAgICBnZXRUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cbiAgICBzZXRDb250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG4gICAgZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dDtcbiAgICB9XG4gICAgZ2V0V2luZG93KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmdldFdpbmRvdygpO1xuICAgIH1cbiAgICBnZXREb2N1bWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXREb2N1bWVudCgpO1xuICAgIH1cbiAgICBhdHRhY2god3JpdGVyLCBsb2cpIHtcbiAgICAgICAgLy8gb3ZlcnJpZGUgaW4gc3ViY2xhc3NcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBsb2cgaWYgYSBoYW5kbGVyIGZhaWxzIGl0cyBleGVjdXRpb25cbiAgICAgKiBVc2FnZTogZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMubG9nV3JhcEhhbmRsZXIoeW91cmhhbmRsZXIsIGxvZ2dlcikpXG4gICAgICogQHBhcmFtIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0gbG9nXG4gICAgICogQHBhcmFtIGhhbmRsZXJBcmdzXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGxvZ1dyYXBIYW5kbGVyKGhhbmRsZXIsIGxvZywgLi4uaGFuZGxlckFyZ3MpIHtcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVyKC4uLmFyZ3MsIC4uLmhhbmRsZXJBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgbG9nLmVycm9yKGBbJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9XSBVbmV4cGVjdGVkIGVycm9yIGR1cmluZyByZXNvbHZlciBleGVjdXRpb246IGAsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGV4ZWN1dGUgcmVzb2x2ZXIgZnVuY3Rpb25zLlxuICAgICAqIExvZ3MgYSBkZWJ1ZyBtZXNzYWdlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQgb3IgbG9ncyBhbiBlcnJvciBpZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGJ5IHRoZSByZXNvbHZlclxuICAgICAqIEBwYXJhbSByZXNvbHZlciBBIHJlc29sdmVyIGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIGxvZyB0aGUgbG9nZ2VyXG4gICAgICogQHBhcmFtIHJlc29sdmVyQXJncyBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIHRoZSByZXNvbHZlciBmdW5jdGlvblxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICByZXNvbHZlKHJlc29sdmVyLCBsb2csIC4uLnJlc29sdmVyQXJncykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHJlc29sdmVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsID0gcmVzb2x2ZXIoLi4ucmVzb2x2ZXJBcmdzKTtcbiAgICAgICAgICAgICAgICBpZiAodmFsID09IHZvaWQgMClcbiAgICAgICAgICAgICAgICAgICAgbG9nLmRlYnVnKFwiUmVzb2x2ZXIgcmV0dXJuZWQgbm8gdmFsdWUuXCIsIHJlc29sdmVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoYFske3RoaXMuY29uc3RydWN0b3IubmFtZX1dIFVuZXhwZWN0ZWQgZXJyb3IgZHVyaW5nIHJlc29sdmVyIGV4ZWN1dGlvbjogYCwgZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTZW50aW5lbCB9IGZyb20gXCIuLi91dGlscy9TZW50aW5lbFwiO1xuaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuaW1wb3J0IHsgVHJhaWxUeXBlIH0gZnJvbSBcIi4uL3F1ZXJ5L1RyYWlsVHlwZVwiO1xuLyoqXG4gKiBDb2xsZWN0IGNsaWNrcyBvbiBlbGVtZW50cyBtYXRjaGluZyBhIHF1ZXJ5IHNlbGVjdG9yLiBIYW5kbGVzIGJvdGggRE9NIGVsZW1lbnRzXG4gKiBwcmVzZW50IGluIHRoZSBET00gYW5kIGVsZW1lbnRzIGluc2VydGVkIGFmdGVyIHRoZSBwYWdlIGxvYWQgLyBjb2xsZWN0b3IgY29uc3RydWN0aW9uLlxuICpcbiAqIFdoZW4gYSBjbGljayBvY2N1cnMsIGEgZnVuY3Rpb24gcHJvdmlkZWQgYXQgY29uc3RydWN0aW9uIHRpbWUgZ2V0IGludm9rZWQgdG8gY29sbGVjdCBkYXRhIHBvaW50c1xuICogZnJvbSB0aGUgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEFzc29jaWF0ZWRQcm9kdWN0Q29sbGVjdG9yIGV4dGVuZHMgQWJzdHJhY3RDb2xsZWN0b3Ige1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGNsaWNrIGNvbGxlY3RvclxuICAgICAqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yRXhwcmVzc2lvbiAtIERvY3VtZW50IHF1ZXJ5IHNlbGVjdG9yIGlkZW50aWZ5aW5nIHRoZSBlbGVtZW50cyB0byBhdHRhY2ggdG9cbiAgICAgKiBAcGFyYW0gbWFpblByb2R1Y3RJZFxuICAgICAqIEBwYXJhbSByZXNvbHZlcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvckV4cHJlc3Npb24sIG1haW5Qcm9kdWN0SWQsIHJlc29sdmVycykge1xuICAgICAgICBzdXBlcihcImFzc29jaWF0ZWQtcHJvZHVjdFwiKTtcbiAgICAgICAgdGhpcy5tYWluUHJvZHVjdElkID0gbWFpblByb2R1Y3RJZDtcbiAgICAgICAgdGhpcy5zZWxlY3RvckV4cHJlc3Npb24gPSBzZWxlY3RvckV4cHJlc3Npb247XG4gICAgICAgIHRoaXMuaWRSZXNvbHZlciA9IHJlc29sdmVycy5pZFJlc29sdmVyO1xuICAgICAgICB0aGlzLnBvc2l0aW9uUmVzb2x2ZXIgPSByZXNvbHZlcnMucG9zaXRpb25SZXNvbHZlcjtcbiAgICAgICAgdGhpcy5wcmljZVJlc29sdmVyID0gcmVzb2x2ZXJzLnByaWNlUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMudHJhaWwgPSByZXNvbHZlcnMudHJhaWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBjbGljayBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGlkZW50aWZpZWQgZWxlbWVudHMsIHdyaXRlIHRoZSBkYXRhXG4gICAgICogd2hlbiB0aGUgZXZlbnQgb2NjdXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gd3JpdGVyIC0gVGhlIHdyaXRlciB0byBzZW5kIHRoZSBkYXRhIHRvXG4gICAgICogQHBhcmFtIGxvZ1xuICAgICAqL1xuICAgIGF0dGFjaCh3cml0ZXIsIGxvZykge1xuICAgICAgICBjb25zdCBjb2xsZWN0ID0gZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHRoaXMucmVzb2x2ZSh0aGlzLmlkUmVzb2x2ZXIsIGxvZywgZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIG91dCB0aGUgcXVlcnkgc291cmNlIG9mIHRoZSBtYWluIHByb2R1Y3QuIE5vdGUgdGhhdCBkZXNwaXRlIGJlaW5nIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gXCJtYWluXCIgcHJvZHVjdCwgaXQgY291bGQgYmUgYSAybmQgb3IgM3JkLCA0dGggbGV2ZWwgb2YgYXNzb2NpYXRlZCBwcm9kdWN0IGJyb3dzaW5nXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVHJhaWwgPSB0aGlzLnRyYWlsLmZldGNoKHRoaXMubWFpblByb2R1Y3RJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1RyYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVcG9uIGEgZm9sbG93LXVwIGV2ZW50IGZvciB0aGlzIHByb2R1Y3QgKGV4LiBiYXNrZXQpLCB3ZSB3b3VsZCBwaWNrIHRoaXMgdHJhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhaWwucmVnaXN0ZXIoaWQsIFRyYWlsVHlwZS5Bc3NvY2lhdGVkLCBwcmV2aW91c1RyYWlsLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMucmVzb2x2ZSh0aGlzLnBvc2l0aW9uUmVzb2x2ZXIsIGxvZywgZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIHByaWNlOiB0aGlzLnJlc29sdmUodGhpcy5wcmljZVJlc29sdmVyLCBsb2csIGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGVsID0+IHtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmxvZ1dyYXBIYW5kbGVyKGV2ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gY29sbGVjdChlbCk7XG4gICAgICAgICAgICAgICAgaWYgKHBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVyLndyaXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiB0aGlzLmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnBheWxvYWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgbG9nKSk7XG4gICAgICAgIH07XG4gICAgICAgIG5ldyBTZW50aW5lbCh0aGlzLmdldERvY3VtZW50KCkpLm9uKHRoaXMuc2VsZWN0b3JFeHByZXNzaW9uLCBoYW5kbGVyKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDbGlja0NvbGxlY3RvciB9IGZyb20gXCIuL0NsaWNrQ29sbGVjdG9yXCI7XG5pbXBvcnQgeyBMaXN0ZW5lclR5cGUgfSBmcm9tIFwiLi4vdXRpbHMvTGlzdGVuZXJUeXBlXCI7XG4vKipcbiAqIENvbGxlY3QgaWQgYW5kIHByaWNlIGlmIGFuIGl0ZW0gd2FzIGFkZCBpbnRvIHRoZSBiYXNrZXRcbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2tldENsaWNrQ29sbGVjdG9yIGV4dGVuZHMgQ2xpY2tDb2xsZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBpZFJlc29sdmVyLCBwcmljZVJlc29sdmVyLCBsaXN0ZW5lclR5cGUgPSBMaXN0ZW5lclR5cGUuU2VudGluZWwpIHtcbiAgICAgICAgc3VwZXIoc2VsZWN0b3IsIFwiYmFza2V0XCIsIGxpc3RlbmVyVHlwZSk7XG4gICAgICAgIHRoaXMuaWRSZXNvbHZlciA9IGlkUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMucHJpY2VSZXNvbHZlciA9IHByaWNlUmVzb2x2ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbGxlY3QgdGhlIHByb2R1Y3QgY2xpY2sgaW5mb3JtYXRpb24gZnJvbSB0aGUgZWxlbWVudFxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIGNvbGxlY3QoZWxlbWVudCwgZXZlbnQsIGxvZykge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMucmVzb2x2ZSh0aGlzLmlkUmVzb2x2ZXIsIGxvZywgZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgcHJpY2U6IHRoaXMucmVzb2x2ZSh0aGlzLnByaWNlUmVzb2x2ZXIsIGxvZywgZWxlbWVudCwgZXZlbnQpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuLyoqXG4gKiBDb2xsZWN0IGJhc2ljIGJyb3dzZXIgaW5mb3JtYXRpb24uIE5vdGUgdGhhdCBkZXBlbmRpbmcgb24gaG93IHlvdSB1c2UgdGhpcyB5b3UgbWF5XG4gKiBuZWVkIHRvIGNvbnN1bHQgdGhlIEdEUFIgZ3VpZGVsaW5lc1xuICovXG5leHBvcnQgY2xhc3MgQnJvd3NlckNvbGxlY3RvciBleHRlbmRzIEFic3RyYWN0Q29sbGVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0geyByZWNvcmRVcmw6IHRydWUsIHJlY29yZFJlZmVycmVyOiB0cnVlLCByZWNvcmRMYW5ndWFnZTogZmFsc2UgfSkge1xuICAgICAgICBzdXBlcihcImJyb3dzZXJcIik7XG4gICAgICAgIHRoaXMucmVjb3JkVXJsID0gb3B0aW9ucy5yZWNvcmRVcmwgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMucmVjb3JkUmVmZXJyZXIgPSBvcHRpb25zLnJlY29yZFJlZmVycmVyIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLnJlY29yZExhbmd1YWdlID0gb3B0aW9ucy5yZWNvcmRMYW5ndWFnZSB8fCBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0YWNoIGEgd3JpdGVyLCBub3RlIHRoYXQgdGhpcyBjb2xsZWN0b3IgaXMgbm90IGFzeW5jaHJvbm91cyBhbmQgd2lsbCB3cml0ZVxuICAgICAqIHRoZSBkYXRhIGltbWVkaWF0ZWxseVxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHdyaXRlciAtIFRoZSB3cml0ZXIgdG8gc2VuZCB0aGUgZGF0YSB0b1xuICAgICAqL1xuICAgIGF0dGFjaCh3cml0ZXIpIHtcbiAgICAgICAgY29uc3Qgd2luID0gdGhpcy5nZXRXaW5kb3coKTtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5nZXREb2N1bWVudCgpO1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgdHlwZTogdGhpcy5nZXRUeXBlKCksXG4gICAgICAgICAgICB0b3VjaDogKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgKG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDApXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnJlY29yZExhbmd1YWdlKVxuICAgICAgICAgICAgZGF0YS5sYW5nID0gd2luLm5hdmlnYXRvci5sYW5ndWFnZTtcbiAgICAgICAgaWYgKHRoaXMucmVjb3JkVXJsKVxuICAgICAgICAgICAgZGF0YS51cmwgPSB3aW4ubG9jYXRpb24uaHJlZjtcbiAgICAgICAgaWYgKHRoaXMucmVjb3JkUmVmZXJyZXIpXG4gICAgICAgICAgICBkYXRhLnJlZiA9IGRvYy5yZWZlcnJlcjtcbiAgICAgICAgd3JpdGVyLndyaXRlKGRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEFic3RyYWN0Q29sbGVjdG9yIH0gZnJvbSBcIi4vQWJzdHJhY3RDb2xsZWN0b3JcIjtcbmltcG9ydCB7IFNlbnRpbmVsIH0gZnJvbSBcIi4uL3V0aWxzL1NlbnRpbmVsXCI7XG5pbXBvcnQgeyBMaXN0ZW5lclR5cGUgfSBmcm9tIFwiLi4vdXRpbHMvTGlzdGVuZXJUeXBlXCI7XG4vKipcbiAqIFRyaWdnZXJlZCBieSBhIGNsaWNrU2VsZWN0b3IsIHRoZSBjb2xsZWN0b3Igd2lsbCBmaXJlIHRoZSBjb250ZW50U2VsZWN0b3IgdG8gc2VsZWN0IGVsZW1lbnRzIHRvIGNvbGxlY3RcbiAqIGluZm9ybWF0aW9uIGZyb20gYW5kIHdyaXRlIHRvIHRoZSBjb2xsZWN0b3Igd3JpdGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGVja291dENsaWNrQ29sbGVjdG9yIGV4dGVuZHMgQWJzdHJhY3RDb2xsZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGNsaWNrU2VsZWN0b3IsIGNvbnRlbnRTZWxlY3RvciwgaWRSZXNvbHZlciwgcHJpY2VSZXNvbHZlciwgYW1vdW50UmVzb2x2ZXIsIGxpc3RlbmVyVHlwZSA9IExpc3RlbmVyVHlwZS5TZW50aW5lbCkge1xuICAgICAgICBzdXBlcihcImNoZWNrb3V0XCIpO1xuICAgICAgICB0aGlzLmNsaWNrU2VsZWN0b3IgPSBjbGlja1NlbGVjdG9yO1xuICAgICAgICB0aGlzLmNvbnRlbnRTZWxlY3RvciA9IGNvbnRlbnRTZWxlY3RvcjtcbiAgICAgICAgdGhpcy5pZFJlc29sdmVyID0gaWRSZXNvbHZlcjtcbiAgICAgICAgdGhpcy5wcmljZVJlc29sdmVyID0gcHJpY2VSZXNvbHZlcjtcbiAgICAgICAgdGhpcy5hbW91bnRSZXNvbHZlciA9IGFtb3VudFJlc29sdmVyO1xuICAgICAgICB0aGlzLmxpc3RlbmVyVHlwZSA9IGxpc3RlbmVyVHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgaWRlbnRpZmllZCBlbGVtZW50cywgd3JpdGUgdGhlIGRhdGFcbiAgICAgKiB3aGVuIHRoZSBldmVudCBvY2N1cnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB3cml0ZXIgLSBUaGUgd3JpdGVyIHRvIHNlbmQgdGhlIGRhdGEgdG9cbiAgICAgKiBAcGFyYW0gbG9nXG4gICAgICovXG4gICAgYXR0YWNoKHdyaXRlciwgbG9nKSB7XG4gICAgICAgIGNvbnN0IGRvYyA9IHRoaXMuZ2V0RG9jdW1lbnQoKTtcbiAgICAgICAgLy8gQWN0aXZhdGVzIG9uIGNsaWNrIG9mIHRoZSBlbGVtZW50IHNlbGVjdGVkIHVzaW5nIHRoZSBjbGlja1NlbGVjdG9yXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5jb250ZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IHRoaXMucmVzb2x2ZSh0aGlzLmlkUmVzb2x2ZXIsIGxvZywgZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogdGhpcy5yZXNvbHZlKHRoaXMucHJpY2VSZXNvbHZlciwgbG9nLCBlbGVtZW50LCBldmVudCksXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IHRoaXMucmVzb2x2ZSh0aGlzLmFtb3VudFJlc29sdmVyLCBsb2csIGVsZW1lbnQsIGV2ZW50KVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSB3cml0ZSBlYWNoIGl0ZW0gc2VwYXJhdGVseSAtIHRoZXkgbWF5IGJlIGNvbWluZyBmcm9tIGRpZmZlcmVudCBxdWVyaWVzXG4gICAgICAgICAgICAgICAgICAgIC8vIHRodXMgd2hlbiB3ZSB0cnkgdG8gcmVzb2x2ZSB0aGUgdHJhaWwgZm9yIGVhY2ggb2YgdGhlbSB3ZSBuZWVkIHRvIGhhdmUgdGhlbVxuICAgICAgICAgICAgICAgICAgICAvLyBhcyBzZXBhcmF0ZSByZWNvcmRzXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlci53cml0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFRoZSBTZW50aWVsIGxpYnJhcnkgdXNlcyBhbmltYXRpb25zdGFydCBldmVudCBsaXN0ZW5lcnMgd2hpY2ggbWF5IGludGVyZmVyZSB3aXRoXG4gICAgICAgIC8vIGFuaW1hdGlvbnMgYXR0YWNoZWQgb24gZWxlbWVuZXRzLiBUaGUgaW4tbGlicmFyeSBwcm92aWRlZCB3b3JrYXJvdW5kIG1lY2hhbmlzbSBkb2VzIG5vdCB3b3JrXG4gICAgICAgIC8vIDEwMCUsIHRodXMgd2UgcHJvdmlkZSB0aGUgbGlzdGVuZXJUeXBlIGNob2ljZSBiZWxvdy4gVGhlIHRyYWRlb2Zmc1xuICAgICAgICAvLyBcImRvbVwiIC0gbm8gYW5pbWF0aW9uIGludGVyZmVyZW5jZSwgb25seSBvbmNsaWNrIGF0dGFjaGVkLCBidXQgZG9lcyBub3QgaGFuZGxlIGVsZW1lbnRzIGluc2VydGVkIGluIHRoZSBET00gbGF0ZXJcbiAgICAgICAgLy8gXCJzZW50aW5lbCAoZGVmYXVsdClcIiAtIHdvcmtzIG9uIGVsZW1lbnRzIGluc2VydGVkIGluIHRoZSBET00gYW55dGltZSwgYnV0IGludGVyZmVyZXMgd2l0aCBDU1MgYW5pbWF0aW9ucyBvbiB0aGVzZSBlbGVtZW50c1xuICAgICAgICBpZiAodGhpcy5saXN0ZW5lclR5cGUgPT09IExpc3RlbmVyVHlwZS5Eb20pIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVMaXN0ID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5jbGlja1NlbGVjdG9yKTtcbiAgICAgICAgICAgIG5vZGVMaXN0LmZvckVhY2goKGVsKSA9PiBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5sb2dXcmFwSGFuZGxlcihoYW5kbGVyLCBsb2cpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzZW50aW5lbCA9IG5ldyBTZW50aW5lbCh0aGlzLmdldERvY3VtZW50KCkpO1xuICAgICAgICAgICAgc2VudGluZWwub24odGhpcy5jbGlja1NlbGVjdG9yLCBlbCA9PiBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5sb2dXcmFwSGFuZGxlcihoYW5kbGVyLCBsb2cpKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBYnN0cmFjdENvbGxlY3RvciB9IGZyb20gXCIuL0Fic3RyYWN0Q29sbGVjdG9yXCI7XG5pbXBvcnQgeyBTZW50aW5lbCB9IGZyb20gXCIuLi91dGlscy9TZW50aW5lbFwiO1xuaW1wb3J0IHsgTGlzdGVuZXJUeXBlIH0gZnJvbSBcIi4uL3V0aWxzL0xpc3RlbmVyVHlwZVwiO1xuLyoqXG4gKiBDb2xsZWN0IGNsaWNrcyBvbiBlbGVtZW50cyBtYXRjaGluZyBhIHF1ZXJ5IHNlbGVjdG9yLiBIYW5kbGVzIGJvdGggRE9NIGVsZW1lbnRzXG4gKiBwcmVzZW50IGluIHRoZSBET00gYW5kIGVsZW1lbnRzIGluc2VydGVkIGFmdGVyIHRoZSBwYWdlIGxvYWQgLyBjb2xsZWN0b3IgY29uc3RydWN0aW9uLlxuICpcbiAqIFdoZW4gYSBjbGljayBvY2N1cnMsIGEgZnVuY3Rpb24gcHJvdmlkZWQgYXQgY29uc3RydWN0aW9uIHRpbWUgZ2V0IGludm9rZWQgdG8gY29sbGVjdCBkYXRhIHBvaW50c1xuICogZnJvbSB0aGUgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIENsaWNrQ29sbGVjdG9yIGV4dGVuZHMgQWJzdHJhY3RDb2xsZWN0b3Ige1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGNsaWNrIGNvbGxlY3RvclxuICAgICAqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yRXhwcmVzc2lvbiAtIERvY3VtZW50IHF1ZXJ5IHNlbGVjdG9yIGlkZW50aWZ5aW5nIHRoZSBlbGVtZW50cyB0byBhdHRhY2ggdG9cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSB0eXBlIE9GIGVsZW1lbnQgY2xpY2sgdG8gcmVwb3J0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3RlbmVyVHlwZSAtIFdoZXRoZXIgdGhlIGxpc3RlbmVyIHNob3VsZCBiZSBhIGRvbSBvciBzZW50aW5lbCBsaXN0ZW5lclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yRXhwcmVzc2lvbiwgdHlwZSA9IFwiY2xpY2tcIiwgbGlzdGVuZXJUeXBlID0gTGlzdGVuZXJUeXBlLlNlbnRpbmVsKSB7XG4gICAgICAgIHN1cGVyKHR5cGUpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yRXhwcmVzc2lvbiA9IHNlbGVjdG9yRXhwcmVzc2lvbjtcbiAgICAgICAgdGhpcy5saXN0ZW5lclR5cGUgPSBsaXN0ZW5lclR5cGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFic3RyYWN0IGNvbGxlY3Rpb24gbWV0aG9kLCBtdXN0IGJlIG92ZXJyaWRkZW4gaW4gdGhlIHN1YmNsYXNzZXNcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBjb2xsZWN0KGVsZW1lbnQsIGV2ZW50LCBsb2cpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgaWRlbnRpZmllZCBlbGVtZW50cywgd3JpdGUgdGhlIGRhdGFcbiAgICAgKiB3aGVuIHRoZSBldmVudCBvY2N1cnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB3cml0ZXIgLSBUaGUgd3JpdGVyIHRvIHNlbmQgdGhlIGRhdGEgdG9cbiAgICAgKiBAcGFyYW0gbG9nXG4gICAgICovXG4gICAgYXR0YWNoKHdyaXRlciwgbG9nKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmNvbGxlY3QoZWxlbWVudCwgZXZlbnQsIGxvZyk7XG4gICAgICAgICAgICBpZiAocGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIHdyaXRlci53cml0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgLi4ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBUaGUgU2VudGllbCBsaWJyYXJ5IHVzZXMgYW5pbWF0aW9uc3RhcnQgZXZlbnQgbGlzdGVuZXJzIHdoaWNoIG1heSBpbnRlcmZlcmUgd2l0aFxuICAgICAgICAvLyBhbmltYXRpb25zIGF0dGFjaGVkIG9uIGVsZW1lbmV0cy4gVGhlIGluLWxpYnJhcnkgcHJvdmlkZWQgd29ya2Fyb3VuZCBtZWNoYW5pc20gZG9lcyBub3Qgd29ya1xuICAgICAgICAvLyAxMDAlLCB0aHVzIHdlIHByb3ZpZGUgdGhlIGxpc3RlbmVyVHlwZSBjaG9pY2UgYmVsb3cuIFRoZSB0cmFkZW9mZnNcbiAgICAgICAgLy8gXCJkb21cIiAtIG5vIGFuaW1hdGlvbiBpbnRlcmZlcmVuY2UsIG9ubHkgb25jbGljayBhdHRhY2hlZCwgYnV0IGRvZXMgbm90IGhhbmRsZSBlbGVtZW50cyBpbnNlcnRlZCBpbiB0aGUgRE9NIGxhdGVyXG4gICAgICAgIC8vIFwic2VudGluZWwgKGRlZmF1bHQpXCIgLSB3b3JrcyBvbiBlbGVtZW50cyBpbnNlcnRlZCBpbiB0aGUgRE9NIGFueXRpbWUsIGJ1dCBpbnRlcmZlcmVzIHdpdGggQ1NTIGFuaW1hdGlvbnMgb24gdGhlc2UgZWxlbWVudHNcbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJUeXBlID09PSBMaXN0ZW5lclR5cGUuRG9tKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlTGlzdCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZWN0b3JFeHByZXNzaW9uKTtcbiAgICAgICAgICAgIG5vZGVMaXN0LmZvckVhY2goKGVsKSA9PiBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5sb2dXcmFwSGFuZGxlcihoYW5kbGVyLCBsb2csIGVsKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2VudGluZWwgPSBuZXcgU2VudGluZWwodGhpcy5nZXREb2N1bWVudCgpKTtcbiAgICAgICAgICAgIHNlbnRpbmVsLm9uKHRoaXMuc2VsZWN0b3JFeHByZXNzaW9uLCBlbCA9PiBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5sb2dXcmFwSGFuZGxlcihoYW5kbGVyLCBsb2csIGVsKSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTGlzdGVuZXJUeXBlIH0gZnJvbSBcIi4uL3V0aWxzL0xpc3RlbmVyVHlwZVwiO1xuaW1wb3J0IHsgU2VudGluZWwgfSBmcm9tIFwiLi4vdXRpbHMvU2VudGluZWxcIjtcbmltcG9ydCB7IFdyaXRlclJlc29sdmVyQ29sbGVjdG9yIH0gZnJvbSBcIi4vV3JpdGVyUmVzb2x2ZXJDb2xsZWN0b3JcIjtcbi8qKlxuICogRXh0ZW5kcyBXcml0ZXJSZXNvbHZlckNvbGxlY3RvciBhbmQgaW52b2tlcyB0aGUgV3JpdGVyUmVzb2x2ZXJDb2xsZWN0b3IjYXR0YWNoKHdyaXRlciwgbG9nKVxuICogd2hlbiBhIGNsaWNrIG9uIGFuIGVsZW1lbnQgZm9yIHRoZSBwcm92aWRlZCBcInNlbGVjdG9yRXhwcmVzc2lvblwiIG9jY3Vyc1xuICovXG5leHBvcnQgY2xhc3MgQ2xpY2tXcml0ZXJSZXNvbHZlckNvbGxlY3RvciBleHRlbmRzIFdyaXRlclJlc29sdmVyQ29sbGVjdG9yIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzZWxlY3RvckV4cHJlc3Npb24gdGhlIGNzcyBleHByZXNzaW9uIHRvIHF1ZXJ5IGZvciBvdGhlciBlbGVtZW50c1xuICAgICAqIEBwYXJhbSB0eXBlIHRoZSB0eXBlIG9mIHRoZSBldmVudFxuICAgICAqIEBwYXJhbSByZXNvbHZlciBhIHtXcml0ZXJSZXNvbHZlcn0gd2hpY2ggd2lsbCBiZSBleGVjdXRlZCBhcyBzb29uIGFzIGFuIGVsZW1lbnQgbWF0Y2hpbmcgdGhlIHNlbGVjdG9yRXhwcmVzc2lvbiBpcyBjbGlja2VkXG4gICAgICogQHBhcmFtIGxpc3RlbmVyVHlwZSB7TGlzdGVuZXJUeXBlfVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yRXhwcmVzc2lvbiwgdHlwZSwgcmVzb2x2ZXIsIGxpc3RlbmVyVHlwZSA9IExpc3RlbmVyVHlwZS5TZW50aW5lbCkge1xuICAgICAgICBzdXBlcih0eXBlLCByZXNvbHZlcik7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JFeHByZXNzaW9uID0gc2VsZWN0b3JFeHByZXNzaW9uO1xuICAgICAgICB0aGlzLmxpc3RlbmVyVHlwZSA9IGxpc3RlbmVyVHlwZTtcbiAgICB9XG4gICAgYXR0YWNoKHdyaXRlciwgbG9nKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZWwsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBzdXBlci5hdHRhY2god3JpdGVyLCBsb2cpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5saXN0ZW5lclR5cGUgPT09IExpc3RlbmVyVHlwZS5Eb20pIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVMaXN0ID0gdGhpcy5nZXREb2N1bWVudCgpLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxlY3RvckV4cHJlc3Npb24pO1xuICAgICAgICAgICAgbm9kZUxpc3QuZm9yRWFjaChlbCA9PiBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXYgPT4gdGhpcy5sb2dXcmFwSGFuZGxlcihoYW5kbGVyLCBsb2csIGVsLCBldikoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2VudGluZWwgPSBuZXcgU2VudGluZWwodGhpcy5nZXREb2N1bWVudCgpKTtcbiAgICAgICAgICAgIHNlbnRpbmVsLm9uKHRoaXMuc2VsZWN0b3JFeHByZXNzaW9uLCBlbCA9PiBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXYgPT4gdGhpcy5sb2dXcmFwSGFuZGxlcihoYW5kbGVyLCBsb2csIGVsLCBldikoKSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ2xpY2tDb2xsZWN0b3IgfSBmcm9tIFwiLi9DbGlja0NvbGxlY3RvclwiO1xuLyoqXG4gKiBDbGlja0NvbGxlY3RvciBlbWl0dGluZyBcImZpbHRlclwiIGV2ZW50cywgYXR0YWNoIHRvIGZhY2V0IGxpbmtzXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWx0ZXJDbGlja0NvbGxlY3RvciBleHRlbmRzIENsaWNrQ29sbGVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY29sbGVjdG9yKSB7XG4gICAgICAgIHN1cGVyKHNlbGVjdG9yLCBcImZpbHRlclwiKTtcbiAgICAgICAgdGhpcy5yZXNvbHZlciA9IGNvbGxlY3RvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29sbGVjdCB0aGUgcHJvZHVjdCBjbGljayBpbmZvcm1hdGlvbiBmcm9tIHRoZSBlbGVtZW50XG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgY29sbGVjdChlbGVtZW50LCBldmVudCwgbG9nKSB7XG4gICAgICAgIHJldHVybiB7IHF1ZXJ5OiB0aGlzLnJlc29sdmUodGhpcy5yZXNvbHZlciwgbG9nLCBlbGVtZW50LCBldmVudCkgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBXcml0ZXJSZXNvbHZlckNvbGxlY3RvciB9IGZyb20gXCIuL1dyaXRlclJlc29sdmVyQ29sbGVjdG9yXCI7XG4vKipcbiAqIFRyaWdnZXJlZCB3aGVuIHRoZSBjbGllbnQgaGFzIHRyaWdnZXJlZC9maXJlZCBhIHNlYXJjaFxuICovXG5leHBvcnQgY2xhc3MgRmlyZWRTZWFyY2hDb2xsZWN0b3IgZXh0ZW5kcyBXcml0ZXJSZXNvbHZlckNvbGxlY3RvciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGZpcmVkIHNlYXJjaCBjb2xsZWN0b3JcbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmVyIC0gRnVuY3Rpb24gdGhhdCB0cmlnZ2VycyB0aGUgd3JpdGluZy4gV2UgY2FuJ3QgYWx3YXlzIGRldGVybWluZSB3aGVuIHNlYXJjaCB0cmlnZ2VycywgbGVhdmUgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRvIGRldGVybWluZSB3aGVuL2hvd1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlc29sdmVyKSB7XG4gICAgICAgIHN1cGVyKFwiZmlyZWQtc2VhcmNoXCIsIHJlc29sdmVyKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBYnN0cmFjdENvbGxlY3RvciB9IGZyb20gXCIuL0Fic3RyYWN0Q29sbGVjdG9yXCI7XG4vKipcbiAqIENvbGxlY3QgZGlmZmVyZW50IHR5cGUgb2YgZXZlbnRzIHZpYSBhIGN1c3RvbSBldmVudC4gVGhlIGN1c3RvbSBldmVudCBzaG91bGQgaG9sZCB0aGUgcHJvcGVydGllc1xuICogXCJ0eXBlXCIgYW5kIFwiZGF0YVwiIGluIHRoZSBjdXN0b20gcGF5bG9hZC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvR3VpZGUvRXZlbnRzL0NyZWF0aW5nX2FuZF90cmlnZ2VyaW5nX2V2ZW50cyBmb3IgZ3VpZGFuY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEdlbmVyaWNFdmVudENvbGxlY3RvciBleHRlbmRzIEFic3RyYWN0Q29sbGVjdG9yIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgZXZlbnQgYmFzZWQgY29sbGVjdG9yXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlYWN0IG9uXG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihldmVudE5hbWUsIHR5cGUgPSBcIkdlbmVyaWNFdmVudFwiKSB7XG4gICAgICAgIHN1cGVyKHR5cGUpO1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0YWNoIGEgd3JpdGVyLCBub3RlIHRoYXQgdGhpcyBjb2xsZWN0b3IgaXMgYXN5bmNocm9ub3VzIGFuZCB3aWxsIHdyaXRlXG4gICAgICogdGhlIGRhdGEgd2hlbiB0aGUgZXZlbnQgdHJpZ2dlcnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB3cml0ZXIgLSBUaGUgd3JpdGVyIHRvIHNlbmQgdGhlIGRhdGEgdG9cbiAgICAgKiBAcGFyYW0gbG9nXG4gICAgICovXG4gICAgYXR0YWNoKHdyaXRlciwgbG9nKSB7XG4gICAgICAgIHRoaXMuZ2V0V2luZG93KCkuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50TmFtZSwgdGhpcy5sb2dXcmFwSGFuZGxlcigoZSkgPT4ge1xuICAgICAgICAgICAgd3JpdGVyLndyaXRlKHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogZS5kZXRhaWwudHlwZSxcbiAgICAgICAgICAgICAgICAuLi5lLmRldGFpbC5kYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgbG9nKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuaW1wb3J0IHsgU2VudGluZWwgfSBmcm9tIFwiLi4vdXRpbHMvU2VudGluZWxcIjtcbmltcG9ydCBTY3JvbGxNb25pdG9yIGZyb20gXCJzY3JvbGxtb25pdG9yXCI7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VRdWV1ZSB9IGZyb20gXCIuLi91dGlscy9Mb2NhbFN0b3JhZ2VRdWV1ZVwiO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuLyoqXG4gKiBDb2xsZWN0IGltcHJlc3Npb25zIC0gYSBkaXNwbGF5IG9mIGEgcHJvZHVjdCBpbiB0aGUgYnJvd3NlciB2aWV3cG9ydC4gSWYgdGhlIHByb2R1Y3QgaXMgc2hvd24gbXVsdGlwbGVcbiAqIHRpbWVzLCB0aGUgY29sbGVjdG9yIHdpbGwgcmVjb3JkIG11bHRpcGxlIGV2ZW50cyBpLmUuIHdlIGRvbid0IGFwcGx5IGZpbHRlciBsb2dpYyBoZXJlLlxuICpcbiAqIEhhbmRsZXMgYm90aCBET00gZWxlbWVudHMgcHJlc2VudCBpbiB0aGUgRE9NIGFuZCBlbGVtZW50cyBpbnNlcnRlZCBhZnRlciB0aGUgcGFnZSBsb2FkIC8gY29sbGVjdG9yIGNvbnN0cnVjdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEltcHJlc3Npb25Db2xsZWN0b3IgZXh0ZW5kcyBBYnN0cmFjdENvbGxlY3RvciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGltcHJlc3Npb24gY29sbGVjdG9yXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JFeHByZXNzaW9uIC0gRG9jdW1lbnQgcXVlcnkgc2VsZWN0b3IgaWRlbnRpZnlpbmcgdGhlIGVsZW1lbnRzIHRvIGF0dGFjaCB0b1xuICAgICAqIEBwYXJhbSBpZFJlc29sdmVyIC0gUmVzb2x2ZSB0aGUgaWQgb2YgdGhlIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25SZXNvbHZlciAtIFJlc29sdmUgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50IGluIGRvbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yRXhwcmVzc2lvbiwgaWRSZXNvbHZlciwgcG9zaXRpb25SZXNvbHZlcikge1xuICAgICAgICBzdXBlcihcImltcHJlc3Npb25cIik7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JFeHByZXNzaW9uID0gc2VsZWN0b3JFeHByZXNzaW9uO1xuICAgICAgICB0aGlzLmlkUmVzb2x2ZXIgPSBpZFJlc29sdmVyO1xuICAgICAgICB0aGlzLnBvc2l0aW9uUmVzb2x2ZXIgPSBwb3NpdGlvblJlc29sdmVyO1xuICAgICAgICB0aGlzLnF1ZXVlID0gbmV3IExvY2FsU3RvcmFnZVF1ZXVlKFwiaW1wcmVzc2lvbnNcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBpbXByZXNzaW9uIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgaWRlbnRpZmllZCBlbGVtZW50cywgd3JpdGUgdGhlIGRhdGFcbiAgICAgKiB3aGVuIHRoZSBldmVudCBvY2N1cnMsIHdpdGggYSBkZWxheSBvZiAxcyAtIHdlIGNvdWxkIGdhdGhlciBtYW55IGV2ZW50cyB3aXRoaW4gdGhpcyB0aW1lZnJhbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB3cml0ZXIgLSBUaGUgd3JpdGVyIHRvIHNlbmQgdGhlIGRhdGEgdG9cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nIC0gVGhlIGxvZ2dlclxuICAgICAqL1xuICAgIGF0dGFjaCh3cml0ZXIsIGxvZykge1xuICAgICAgICBjb25zdCBmbHVzaCA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucXVldWUudHJhbnNhY3Rpb25hbERyYWluKHF1ZXVlID0+IG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgcmVzKHdyaXRlci53cml0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcXVldWVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGxvZy5lcnJvcihcIkNvdWxkIG5vdCBkcmFpbiBxdWV1ZTogXCIsIGVycikpO1xuICAgICAgICB9LCAyNTApO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBTY3JvbGxNb25pdG9yLmNyZWF0ZShlbGVtZW50KS5lbnRlclZpZXdwb3J0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5yZXNvbHZlKHRoaXMuaWRSZXNvbHZlciwgbG9nLCBlbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMucmVzb2x2ZSh0aGlzLnBvc2l0aW9uUmVzb2x2ZXIsIGxvZywgZWxlbWVudClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmbHVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIG5ldyBTZW50aW5lbCh0aGlzLmdldERvY3VtZW50KCkpLm9uKHRoaXMuc2VsZWN0b3JFeHByZXNzaW9uLCB0aGlzLmxvZ1dyYXBIYW5kbGVyKGhhbmRsZXIsIGxvZykpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEFic3RyYWN0Q29sbGVjdG9yIH0gZnJvbSBcIi4vQWJzdHJhY3RDb2xsZWN0b3JcIjtcbmltcG9ydCB7IFNlbnRpbmVsIH0gZnJvbSBcIi4uL3V0aWxzL1NlbnRpbmVsXCI7XG5pbXBvcnQgeyBMaXN0ZW5lclR5cGUgfSBmcm9tIFwiLi4vdXRpbHMvTGlzdGVuZXJUeXBlXCI7XG4vKipcbiAqIENvbGxlY3Qgc2VhcmNoIGluZm9ybWF0aW9uIGZyb20gYSBmaWVsZCB0aGF0IGhhcyBhIFwiYXMteW91LXR5cGVcIiB0cmlnZ2VyIGFuZFxuICogcmVuZGVycyBzZWFyY2ggcmVzdWx0cyBpbW1lZGlhdGVseS4gTWF5IHRyaWdnZXIgbXVsdGlwbGUgdGltZXMgZGVwZW5kaW5nIG9uXG4gKiB0eXBlIHNwZWVkIHBhdHRlcm5zIC0gd2UgZXhwZWN0IHRoYXQgdGhlIGludGVydmFsIGJldHdlZW4ga2V5IHN0cm9rZXMgd291bGQgYmVcbiAqIGxlc3MgdGhhbiA1MDBtc1xuICovXG5leHBvcnQgY2xhc3MgSW5zdGFudFNlYXJjaFF1ZXJ5Q29sbGVjdG9yIGV4dGVuZHMgQWJzdHJhY3RDb2xsZWN0b3Ige1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBpbnN0YW50IHNlYXJjaCBjb2xsZWN0b3JcbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvckV4cHJlc3Npb24gLSBEb2N1bWVudCBxdWVyeSBzZWxlY3RvciBpZGVudGlmeWluZyB0aGUgZWxlbWVudHMgdG8gYXR0YWNoIHRvXG4gICAgICogQHBhcmFtIGRlbGF5TXNcbiAgICAgKiBAcGFyYW0gbWluTGVuZ3RoXG4gICAgICogQHBhcmFtIGxpc3RlbmVyVHlwZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yRXhwcmVzc2lvbiwgZGVsYXlNcyA9IDUwMCwgbWluTGVuZ3RoID0gMiwgbGlzdGVuZXJUeXBlID0gTGlzdGVuZXJUeXBlLlNlbnRpbmVsKSB7XG4gICAgICAgIHN1cGVyKFwiaW5zdGFudC1zZWFyY2hcIik7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JFeHByZXNzaW9uID0gc2VsZWN0b3JFeHByZXNzaW9uO1xuICAgICAgICB0aGlzLmRlbGF5TXMgPSBkZWxheU1zO1xuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IG1pbkxlbmd0aDtcbiAgICAgICAgdGhpcy5saXN0ZW5lclR5cGUgPSBsaXN0ZW5lclR5cGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBpbXByZXNzaW9uIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgaWRlbnRpZmllZCBlbGVtZW50cywgd3JpdGUgdGhlIGRhdGFcbiAgICAgKiB3aGVuIHRoZSBldmVudCBvY2N1cnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB3cml0ZXIgLSBUaGUgd3JpdGVyIHRvIHNlbmQgdGhlIGRhdGEgdG9cbiAgICAgKiBAcGFyYW0gbG9nXG4gICAgICovXG4gICAgYXR0YWNoKHdyaXRlciwgbG9nKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmdldFR5cGUoKTtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IChlLCBzZWFyY2hCb3gpID0+IHtcbiAgICAgICAgICAgIC8vIElnbm9yZSBzaGlmdCwgY3RybCwgZXRjLiBwcmVzc2VzLCByZWFjdCBvbmx5IG9uIGNoYXJhY3RlcnNcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGVsYXkgdGhlIHJlYWN0aW9uIG9mIHRoZSBldmVudCwgY2xlYW4gdGhlIHRpbWVvdXQgaWYgdGhlIGV2ZW50IGZpcmVzXG4gICAgICAgICAgICAvLyBhZ2FpbiBhbmQgc3RhcnQgY291bnRpbmcgZnJvbSAwXG4gICAgICAgICAgICBkZWxheSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5d29yZHMgPSBzZWFyY2hCb3gudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGtleXdvcmRzICYmIGtleXdvcmRzLmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB3cml0ZXIud3JpdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImtleXdvcmRzXCI6IGtleXdvcmRzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMuZGVsYXlNcyk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFRoZSBTZW50aWVsIGxpYnJhcnkgdXNlcyBhbmltYXRpb25zdGFydCBldmVudCBsaXN0ZW5lcnMgd2hpY2ggbWF5IGludGVyZmVyZSB3aXRoXG4gICAgICAgIC8vIGFuaW1hdGlvbnMgYXR0YWNoZWQgb24gZWxlbWVuZXRzLiBUaGUgaW4tbGlicmFyeSBwcm92aWRlZCB3b3JrYXJvdW5kIG1lY2hhbmlzbSBkb2VzIG5vdCB3b3JrXG4gICAgICAgIC8vIDEwMCUsIHRodXMgd2UgcHJvdmlkZSB0aGUgbGlzdGVuZXJUeXBlIGNob2ljZSBiZWxvdy4gVGhlIHRyYWRlb2Zmc1xuICAgICAgICAvLyBcImRvbVwiIC0gbm8gYW5pbWF0aW9uIGludGVyZmVyZW5jZSwgb25seSBvbmNsaWNrIGF0dGFjaGVkLCBidXQgZG9lcyBub3QgaGFuZGxlIGVsZW1lbnRzIGluc2VydGVkIGluIHRoZSBET00gbGF0ZXJcbiAgICAgICAgLy8gXCJzZW50aW5lbCAoZGVmYXVsdClcIiAtIHdvcmtzIG9uIGVsZW1lbnRzIGluc2VydGVkIGluIHRoZSBET00gYW55dGltZSwgYnV0IGludGVyZmVyZXMgd2l0aCBDU1MgYW5pbWF0aW9ucyBvbiB0aGVzZSBlbGVtZW50c1xuICAgICAgICBpZiAodGhpcy5saXN0ZW5lclR5cGUgPT09IExpc3RlbmVyVHlwZS5Eb20pIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVMaXN0ID0gdGhpcy5nZXREb2N1bWVudCgpLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxlY3RvckV4cHJlc3Npb24pO1xuICAgICAgICAgICAgbm9kZUxpc3QuZm9yRWFjaChlbCA9PiBlbC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5sb2dXcmFwSGFuZGxlcihoYW5kbGVyLCBsb2csIGVsKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV3IFNlbnRpbmVsKHRoaXMuZ2V0RG9jdW1lbnQoKSkub24odGhpcy5zZWxlY3RvckV4cHJlc3Npb24sIChlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLmxvZ1dyYXBIYW5kbGVyKGhhbmRsZXIsIGxvZywgZWwpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuY29uc3QgZGVsYXkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aW1lcjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrLCBtcykge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIG1zKTtcbiAgICB9O1xufSkoKTtcbiIsImltcG9ydCB7IENsaWNrQ29sbGVjdG9yIH0gZnJvbSBcIi4vQ2xpY2tDb2xsZWN0b3JcIjtcbmltcG9ydCB7IExpc3RlbmVyVHlwZSB9IGZyb20gXCIuLi91dGlscy9MaXN0ZW5lclR5cGVcIjtcbi8qKlxuICogQ2xpY2tDb2xsZWN0b3IgZW1pdHRpbmcgXCJwcm9kdWN0XCIgZXZlbnRzLCBhdHRhY2ggdG8gcHJvZHVjdCBsaW5rc1xuICovXG5leHBvcnQgY2xhc3MgUHJvZHVjdENsaWNrQ29sbGVjdG9yIGV4dGVuZHMgQ2xpY2tDb2xsZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZXNvbHZlcnMsIGxpc3RlbmVyVHlwZSA9IExpc3RlbmVyVHlwZS5TZW50aW5lbCkge1xuICAgICAgICBzdXBlcihzZWxlY3RvciwgXCJwcm9kdWN0XCIsIGxpc3RlbmVyVHlwZSk7XG4gICAgICAgIHRoaXMuaWRSZXNvbHZlciA9IHJlc29sdmVycy5pZFJlc29sdmVyO1xuICAgICAgICB0aGlzLnBvc2l0aW9uUmVzb2x2ZXIgPSByZXNvbHZlcnMucG9zaXRpb25SZXNvbHZlcjtcbiAgICAgICAgdGhpcy5wcmljZVJlc29sdmVyID0gcmVzb2x2ZXJzLnByaWNlUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMuaW1hZ2VSZXNvbHZlciA9IHJlc29sdmVycy5pbWFnZVJlc29sdmVyO1xuICAgICAgICB0aGlzLm1ldGFkYXRhUmVzb2x2ZXIgPSByZXNvbHZlcnMubWV0YWRhdGFSZXNvbHZlcjtcbiAgICAgICAgdGhpcy50cmFpbCA9IHJlc29sdmVycy50cmFpbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29sbGVjdCB0aGUgcHJvZHVjdCBjbGljayBpbmZvcm1hdGlvbiBmcm9tIHRoZSBlbGVtZW50XG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgY29sbGVjdChlbGVtZW50LCBldmVudCwgbG9nKSB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5yZXNvbHZlKHRoaXMuaWRSZXNvbHZlciwgbG9nLCBlbGVtZW50LCBldmVudCk7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJhaWwpIHtcbiAgICAgICAgICAgICAgICAvLyBSZWdpc3RlciB0aGF0IHRoaXMgcHJvZHVjdCBqb3VybmV5IGludG8gcG90ZW50aWFsIHB1cmNoYXNlIHN0YXJ0ZWRcbiAgICAgICAgICAgICAgICAvLyB3aXRoIHRoaXMgcXVlcnlcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWlsLnJlZ2lzdGVyKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMucmVzb2x2ZSh0aGlzLnBvc2l0aW9uUmVzb2x2ZXIsIGxvZywgZWxlbWVudCwgZXZlbnQpLFxuICAgICAgICAgICAgICAgIHByaWNlOiB0aGlzLnJlc29sdmUodGhpcy5wcmljZVJlc29sdmVyLCBsb2csIGVsZW1lbnQsIGV2ZW50KSxcbiAgICAgICAgICAgICAgICBpbWFnZTogdGhpcy5yZXNvbHZlKHRoaXMuaW1hZ2VSZXNvbHZlciwgbG9nLCBlbGVtZW50LCBldmVudCksXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IHRoaXMucmVzb2x2ZSh0aGlzLm1ldGFkYXRhUmVzb2x2ZXIsIGxvZywgZWxlbWVudCwgZXZlbnQpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuaW1wb3J0IHsgZ2V0U2Vzc2lvblN0b3JhZ2UgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL3F1ZXJ5XCI7XG4vKipcbiAqIEtlZXAgdHJhY2sgb2YgaHVtYW4gdHJpZ2dlcmVkIHNlYXJjaGVzIGZvbGxvd2VkIGJ5IGEgcmVkaXJlY3QgdG8gYSBwYWdlIGRpZmZlcmVudCB0aGFuIHRoZSBzZWFyY2ggcmVzdWx0IHBhZ2VcbiAqL1xuZXhwb3J0IGNsYXNzIFJlZGlyZWN0Q29sbGVjdG9yIGV4dGVuZHMgQWJzdHJhY3RDb2xsZWN0b3Ige1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCByZWRpcmVjdCBjb2xsZWN0b3JcbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHRyaWdnZXJSZXNvbHZlciAtIEZ1bmN0aW9uIHRoYXQgZmlyZXMgd2hlbiBhIHNlYXJjaCBoYXBwZW5zLCBzaG91bGQgcmV0dXJuIHRoZSBrZXl3b3JkXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZXhwZWN0ZWRQYWdlUmVzb2x2ZXIgLSBGdW5jdGlvbiB0aGF0IHNob3VsZCByZXR1cm4gd2hldGhlciB0aGUgcGFnZSB3ZSBsb2FkIGlzIHRoZSBleHBlY3RlZCBvbmVcbiAgICAgKiBAcGFyYW0gY29udGV4dFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRyaWdnZXJSZXNvbHZlciwgZXhwZWN0ZWRQYWdlUmVzb2x2ZXIsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoXCJyZWRpcmVjdFwiLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy50cmlnZ2VyUmVzb2x2ZXIgPSB0cmlnZ2VyUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMuZXhwZWN0ZWRQYWdlUmVzb2x2ZXIgPSBleHBlY3RlZFBhZ2VSZXNvbHZlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgd2hldGhlciB3ZSBzaG91bGQgYmUgcmVjb3JkaW5nIGEgcmVkaXJlY3QgZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB3cml0ZXIgLSBUaGUgd3JpdGVyIHRvIHNlbmQgdGhlIGRhdGEgdG9cbiAgICAgKiBAcGFyYW0gbG9nXG4gICAgICovXG4gICAgYXR0YWNoKHdyaXRlciwgbG9nKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZSh0aGlzLnRyaWdnZXJSZXNvbHZlciwgbG9nLCBrZXl3b3JkID0+IHtcbiAgICAgICAgICAgIGdldFNlc3Npb25TdG9yYWdlKCkuc2V0SXRlbShSZWRpcmVjdENvbGxlY3Rvci5TVE9SQUdFX0tFWSwga2V5d29yZCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBGZXRjaCB0aGUgbGF0ZXN0IHNlYXJjaCBpZiBhbnlcbiAgICAgICAgY29uc3QgbGFzdFNlYXJjaCA9IGdldFNlc3Npb25TdG9yYWdlKCkuZ2V0SXRlbShSZWRpcmVjdENvbGxlY3Rvci5TVE9SQUdFX0tFWSk7XG4gICAgICAgIGlmIChsYXN0U2VhcmNoKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHNlYXJjaCBhY3Rpb24sIGFzIHdlJ3JlIGVpdGhlciBvbiBhIHNlYXJjaCByZXN1bHQgcGFnZSBvciB3ZSd2ZSByZWRpcmVjdGVkXG4gICAgICAgICAgICBnZXRTZXNzaW9uU3RvcmFnZSgpLnJlbW92ZUl0ZW0oUmVkaXJlY3RDb2xsZWN0b3IuU1RPUkFHRV9LRVkpO1xuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBub3QgbGFuZGVkIG9uIHRoZSBleHBlY3RlZCBzZWFyY2ggcGFnZSwgaXQgbXVzdCBoYXZlIGJlZW4gKGxvb292ZSkgYSByZWRpcmVjdFxuICAgICAgICAgICAgaWYgKCF0aGlzLnJlc29sdmUodGhpcy5leHBlY3RlZFBhZ2VSZXNvbHZlciwgbG9nKSkge1xuICAgICAgICAgICAgICAgIC8vIFRodXMgcmVjb3JkIHRoZSByZWRpcmVjdFxuICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgcXVlcnkuc2V0U2VhcmNoKGxhc3RTZWFyY2gpO1xuICAgICAgICAgICAgICAgIHdyaXRlci53cml0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVkaXJlY3RcIixcbiAgICAgICAgICAgICAgICAgICAga2V5d29yZHM6IGxhc3RTZWFyY2gsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5SZWRpcmVjdENvbGxlY3Rvci5TVE9SQUdFX0tFWSA9IFwiX19sYXN0U2VhcmNoXCI7XG4iLCJpbXBvcnQgeyBBYnN0cmFjdENvbGxlY3RvciB9IGZyb20gXCIuL0Fic3RyYWN0Q29sbGVjdG9yXCI7XG4vKipcbiAqIENvbGxlY3QgdGhlIGJhc2ljIHNlYXJjaCBpbmZvcm1hdGlvbiAtIHRoZSBrZXl3b3JkcyB1c2VkIGZvciB0aGUgc2VhcmNoIGFuZFxuICogdGhlIG51bWJlciBvZiByZXN1bHRzLiBTeW5jaHJvbm91cyBpLmUuIHRoZSB3cml0aW5nIGhhcHBlbnMgZGlyZWN0bHkgd2hlbiBhIHdyaXRlciBpcyBhdHRhY2hlZC5cbiAqIFNlZSB0aGUgb3RoZXIgc2VhcmNoIGNvbGxlY3RvcnMgZm9yIGR5bmFtaWMgb25lcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlYXJjaFJlc3VsdENvbGxlY3RvciBleHRlbmRzIEFic3RyYWN0Q29sbGVjdG9yIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Qgc2VhcmNoIHJlc3VsdCBjb2xsZWN0b3JcbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHBocmFzZVJlc29sdmVyIC0gRnVuY3Rpb24gdGhhdCBzaG91bGQgcmV0dXJuIHRoZSBzZWFyY2ggcGhyYXNlIHVzZWQgZm9yIHRoZSBzZWFyY2hcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb3VudFJlc29sdmVyIC0gRnVuY3Rpb24gdGhhdCBzaG91bGQgcmV0dXJuIHRoZSBudW1uYmVyIG9mIHJlc3VsdHMgaW4gdGhlIHNlYXJjaFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvblJlc29sdmVyIC0gQSBzZWFyY2ggcmVzdWx0IG1heSBiZSByZWZpbmVkIG9yIGEgY2xpZW50IG1heSBicm93c2UgMiwzLDQgcGFnZS5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBwcm92aWRlIGEgdGV4dCByZXByZXNhbnRpb24gb2YgdGhlIGFjdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBocmFzZVJlc29sdmVyLCBjb3VudFJlc29sdmVyLCBhY3Rpb25SZXNvbHZlcikge1xuICAgICAgICBzdXBlcihcInNlYXJjaFwiKTtcbiAgICAgICAgdGhpcy5waHJhc2VSZXNvbHZlciA9IHBocmFzZVJlc29sdmVyO1xuICAgICAgICB0aGlzLmNvdW50UmVzb2x2ZXIgPSBjb3VudFJlc29sdmVyO1xuICAgICAgICB0aGlzLmFjdGlvblJlc29sdmVyID0gYWN0aW9uUmVzb2x2ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhIHdyaXRlciwgbm90ZSB0aGF0IHRoaXMgY29sbGVjdG9yIGlzIG5vdCBhc3luY2hyb25vdXMgYW5kIHdpbGwgd3JpdGVcbiAgICAgKiB0aGUgZGF0YSBpbW1lZGlhdGVsbHlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB3cml0ZXIgLSBUaGUgd3JpdGVyIHRvIHNlbmQgdGhlIGRhdGEgdG9cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbG9nIC0gVGhlIGxvZ2dlclxuICAgICAqL1xuICAgIGF0dGFjaCh3cml0ZXIsIGxvZykge1xuICAgICAgICB3cml0ZXIud3JpdGUoe1xuICAgICAgICAgICAgdHlwZTogXCJzZWFyY2hcIixcbiAgICAgICAgICAgIGtleXdvcmRzOiB0aGlzLnJlc29sdmUodGhpcy5waHJhc2VSZXNvbHZlciwgbG9nLCB7fSksXG4gICAgICAgICAgICBjb3VudDogdGhpcy5yZXNvbHZlKHRoaXMuY291bnRSZXNvbHZlciwgbG9nLCB7fSksXG4gICAgICAgICAgICBhY3Rpb246IHRoaXMucmVzb2x2ZSh0aGlzLmFjdGlvblJlc29sdmVyLCBsb2csIHt9KSB8fCBcInNlYXJjaFwiXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFdyaXRlclJlc29sdmVyQ29sbGVjdG9yIH0gZnJvbSBcIi4vV3JpdGVyUmVzb2x2ZXJDb2xsZWN0b3JcIjtcbi8qKlxuICogQ29sbGVjdCBzdWdnZXN0IHNlYXJjaCBpbmZvcm1hdGlvbiAtIGtleXdvcmQgc2VhcmNoZXMgY29taW5nIGZyb20gYSBzdWdnZXN0aW9uIHdpZGdldC9mdW5jdGlvbmFsaXR5XG4gKi9cbmV4cG9ydCBjbGFzcyBTdWdnZXN0U2VhcmNoQ29sbGVjdG9yIGV4dGVuZHMgV3JpdGVyUmVzb2x2ZXJDb2xsZWN0b3Ige1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBzdWdnZXN0IHNlYXJjaCBjb2xsZWN0b3JcbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmVyIC0gRnVuY3Rpb24gdGhhdCB0cmlnZ2VycyB0aGUgd3JpdGluZy4gU3VnZ2VzdCBtaWdodCBiZSBjb21wbGV4LCBsZWF2ZSB0byB0aGUgaW1wbGVtZW50YXRpb24gdG8gZGV0ZXJtaW5lIHdoZW4vaG93XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVzb2x2ZXIpIHtcbiAgICAgICAgc3VwZXIoXCJzdWdnZXN0LXNlYXJjaFwiLCByZXNvbHZlcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb2xsZWN0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdENvbGxlY3RvclwiO1xuLyoqXG4gKiBSZXNvbHZlcyBpbW1lZGlhdGVseSBhbmQgcGFzc2luZyB0aGUgd3JpdGVyLCB0aGUgdHlwZSBvZiB0aGUgZXZlbnQgKyBjb250ZXh0IHRvIHRoZSBwcm92aWRlZCByZXNvbHZlciBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFdyaXRlclJlc29sdmVyQ29sbGVjdG9yIGV4dGVuZHMgQWJzdHJhY3RDb2xsZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIHJlc29sdmVyKSB7XG4gICAgICAgIHN1cGVyKHR5cGUpO1xuICAgICAgICB0aGlzLnJlc29sdmVyID0gcmVzb2x2ZXI7XG4gICAgfVxuICAgIGF0dGFjaCh3cml0ZXIsIGxvZykge1xuICAgICAgICB0aGlzLnJlc29sdmUodGhpcy5yZXNvbHZlciwgbG9nLCB3cml0ZXIsIHRoaXMuZ2V0VHlwZSgpLCB0aGlzLmdldENvbnRleHQoKSk7XG4gICAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSBcIi4vQWJzdHJhY3RDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0Fzc29jaWF0ZWRQcm9kdWN0Q29sbGVjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9CYXNrZXRDbGlja0NvbGxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQnJvd3NlckNvbGxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ2hlY2tvdXRDbGlja0NvbGxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQ2xpY2tDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0NsaWNrV3JpdGVyUmVzb2x2ZXJDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0ZpbHRlckNsaWNrQ29sbGVjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9GaXJlZFNlYXJjaENvbGxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vR2VuZXJpY0V2ZW50Q29sbGVjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9JbXByZXNzaW9uQ29sbGVjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9JbnN0YW50U2VhcmNoUXVlcnlDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1Byb2R1Y3RDbGlja0NvbGxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vUmVkaXJlY3RDb2xsZWN0b3JcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1NlYXJjaFJlc3VsdENvbGxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vU3VnZ2VzdFNlYXJjaENvbGxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vV3JpdGVyUmVzb2x2ZXJDb2xsZWN0b3JcIjtcbiIsImV4cG9ydCB7fTtcbiIsImV4cG9ydCB7fTtcbiIsIi8qKlxuICogUGFzc2VzIGFsbCBsb2cgbWVzc2FnZXMgdG8gdGhlIHByb3ZpZGVkIHRyYW5zcG9ydHNcbiAqL1xuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydExvZ2dlciB7XG4gICAgY29uc3RydWN0b3IodHJhbnNwb3J0cywgaXNEZWJ1Z0VuYWJsZWQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnRyYW5zcG9ydHMgPSB0cmFuc3BvcnRzO1xuICAgICAgICB0aGlzLmlzRGVidWdFbmFibGVkID0gaXNEZWJ1Z0VuYWJsZWQ7XG4gICAgfVxuICAgIGRlYnVnKG1zZywgLi4uZGF0YUFyZ3MpIHtcbiAgICAgICAgdGhpcy50cmFuc3BvcnRzLmZvckVhY2godHJhbnNwb3J0ID0+IHRoaXMuY2FsbFRyYW5zcG9ydCh0cmFuc3BvcnQsIFwiZGVidWdcIiwgbXNnLCAuLi5kYXRhQXJncykpO1xuICAgIH1cbiAgICBlcnJvcihtc2csIC4uLmRhdGFBcmdzKSB7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cy5mb3JFYWNoKHRyYW5zcG9ydCA9PiB0aGlzLmNhbGxUcmFuc3BvcnQodHJhbnNwb3J0LCBcImVycm9yXCIsIG1zZywgLi4uZGF0YUFyZ3MpKTtcbiAgICB9XG4gICAgaW5mbyhtc2csIC4uLmRhdGFBcmdzKSB7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cy5mb3JFYWNoKHRyYW5zcG9ydCA9PiB0aGlzLmNhbGxUcmFuc3BvcnQodHJhbnNwb3J0LCBcImluZm9cIiwgbXNnLCAuLi5kYXRhQXJncykpO1xuICAgIH1cbiAgICB3YXJuKG1zZywgLi4uZGF0YUFyZ3MpIHtcbiAgICAgICAgdGhpcy50cmFuc3BvcnRzLmZvckVhY2godHJhbnNwb3J0ID0+IHRoaXMuY2FsbFRyYW5zcG9ydCh0cmFuc3BvcnQsIFwid2FyblwiLCBtc2csIC4uLmRhdGFBcmdzKSk7XG4gICAgfVxuICAgIGNhbGxUcmFuc3BvcnQodHJhbnNwb3J0LCBsZXZlbCwgbXNnLCAuLi5kYXRhQXJncykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHRyYW5zcG9ydFtsZXZlbF0gJiYgdHlwZW9mIHRyYW5zcG9ydFtsZXZlbF0gPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnRbbGV2ZWxdKG1zZywgLi4uZGF0YUFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0RlYnVnRW5hYmxlZClcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ291bGQgbm90IGNhbGwgdHJhbnNwb3J0OiBcIiwgZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgKiBmcm9tIFwiLi9Mb2dnZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0xvZ2dlclRyYW5zcG9ydFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vVHJhbnNwb3J0TG9nZ2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90cmFuc3BvcnRcIjtcbiIsImV4cG9ydCBjbGFzcyBDb25zb2xlVHJhbnNwb3J0IHtcbiAgICBkZWJ1Zyhtc2csIC4uLmRhdGFBcmdzKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcobXNnLCAuLi5kYXRhQXJncyk7XG4gICAgfVxuICAgIDtcbiAgICBpbmZvKG1zZywgLi4uZGF0YUFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKG1zZywgLi4uZGF0YUFyZ3MpO1xuICAgIH1cbiAgICA7XG4gICAgd2Fybihtc2csIC4uLmRhdGFBcmdzKSB7XG4gICAgICAgIGNvbnNvbGUud2Fybihtc2csIC4uLmRhdGFBcmdzKTtcbiAgICB9XG4gICAgO1xuICAgIGVycm9yKG1zZywgLi4uZGF0YUFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2csIC4uLmRhdGFBcmdzKTtcbiAgICB9XG4gICAgO1xufVxuIiwiaW1wb3J0IHsgYmFzZTY0RW5jb2RlIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG4vKipcbiAqIE9ubHkgYWRkcyBlcnJvciBtZXNzYWdlcyB0byBhbiBzcXMgcXVldWVcbiAqL1xuZXhwb3J0IGNsYXNzIFNRU0Vycm9yVHJhbnNwb3J0IHtcbiAgICBjb25zdHJ1Y3RvcihxdWV1ZSwgY2hhbm5lbCwgc2Vzc2lvblJlc29sdmVyLCBmaWZvID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5xdWV1ZSA9IHF1ZXVlO1xuICAgICAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsO1xuICAgICAgICB0aGlzLnNlc3Npb25SZXNvbHZlciA9IHNlc3Npb25SZXNvbHZlcjtcbiAgICAgICAgdGhpcy5maWZvID0gZmlmbztcbiAgICB9XG4gICAgc2VuZChkYXRhKSB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBsZXQgc3JjID0gdGhpcy5xdWV1ZSArIFwiP1ZlcnNpb249MjAxMi0xMS0wNSZBY3Rpb249U2VuZE1lc3NhZ2VcIjtcbiAgICAgICAgLy8gU1FTIHN1cHBvcnRzIEZJRk8gcXVldWVzIGluIHNvbWUgcmVnaW9ucyB0aGF0IGNhbiBhbHNvIGd1YXJhbnRlZSB0aGUgb3JkZXJcbiAgICAgICAgLy8gb2YgdGhlIG1lc3NhZ2VzLlxuICAgICAgICBpZiAodGhpcy5maWZvKSB7XG4gICAgICAgICAgICAvLyBUT0RPIHdoZW4gZW5vdWdoIGluZm9ybWF0aW9uIGlzIHByZXNlbnQgdG8gdW5pcXVlbHkgaWRlbnRpZnkgYSBtZXNzYWdlLCBzd2l0Y2ggdGhlIGRlZHVwbGljYXRpb24gaWQgdG8gYSBtZXNzYWdlIGhhc2hcbiAgICAgICAgICAgIHNyYyArPSBcIiZNZXNzYWdlR3JvdXBJZD0xJk1lc3NhZ2VEZWR1cGxpY2F0aW9uSWQ9XCIgKyBNYXRoLnJhbmRvbSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSAmJiB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgZGF0YSA9IFtkYXRhXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBzcmMgKz0gXCImTWVzc2FnZUJvZHk9XCIgKyBiYXNlNjRFbmNvZGUoZW5jb2RlVVJJQ29tcG9uZW50KGRhdGEpKTtcbiAgICAgICAgaW1nLnNyYyA9IHNyYztcbiAgICB9XG4gICAgZXJyb3IobXNnLCAuLi5kYXRhQXJncykge1xuICAgICAgICB0aGlzLnNlbmQoe1xuICAgICAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICAgICAgbXNnLFxuICAgICAgICAgICAgY2hhbm5lbDogdGhpcy5jaGFubmVsLFxuICAgICAgICAgICAgc2Vzc2lvbjogdGhpcy5zZXNzaW9uUmVzb2x2ZXIoKSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAuLi5kYXRhQXJnc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgO1xufVxuIiwiaW1wb3J0IHsgU1FTRXJyb3JUcmFuc3BvcnQgfSBmcm9tIFwiLi9TUVNFcnJvclRyYW5zcG9ydFwiO1xuLyoqXG4gKiBBZGRzIGFsbCBsb2cgbGV2ZWxzIHRvIGFuIFNRUyBxdWV1ZVxuICovXG5leHBvcnQgY2xhc3MgU1FTVHJhbnNwb3J0IGV4dGVuZHMgU1FTRXJyb3JUcmFuc3BvcnQge1xuICAgIGRlYnVnKG1zZywgLi4uZGF0YUFyZ3MpIHtcbiAgICAgICAgdGhpcy5zZW5kKHtcbiAgICAgICAgICAgIHR5cGU6IFwiZGVidWdcIixcbiAgICAgICAgICAgIG1zZyxcbiAgICAgICAgICAgIC4uLmRhdGFBcmdzXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICA7XG4gICAgaW5mbyhtc2csIC4uLmRhdGFBcmdzKSB7XG4gICAgICAgIHRoaXMuc2VuZCh7XG4gICAgICAgICAgICB0eXBlOiBcImluZm9cIixcbiAgICAgICAgICAgIG1zZyxcbiAgICAgICAgICAgIC4uLmRhdGFBcmdzXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICA7XG4gICAgd2Fybihtc2csIC4uLmRhdGFBcmdzKSB7XG4gICAgICAgIHRoaXMuc2VuZCh7XG4gICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbiAgICAgICAgICAgIG1zZyxcbiAgICAgICAgICAgIC4uLmRhdGFBcmdzXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICA7XG59XG4iLCJleHBvcnQgKiBmcm9tIFwiLi9Db25zb2xlVHJhbnNwb3J0XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9TUVNFcnJvclRyYW5zcG9ydFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vU1FTVHJhbnNwb3J0XCI7XG4iLCJleHBvcnQgY2xhc3MgUXVlcnkge1xuICAgIGNvbnN0cnVjdG9yKHF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgYWxsIHNlbGVjdGlvbnMgb24gdGhpcyBmaWVsZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb25BdCA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgICAgIGFycmF5UmVtb3ZlKHRoaXMuY3JpdGVyaWEsIHBvcywgcG9zKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcml0ZXJpYSA9IFtdO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChxdWVyeVN0cmluZykge1xuICAgICAgICAgICAgdmFyIGNyaXRlcmlhID0gW107XG4gICAgICAgICAgICB2YXIgYW5kcyA9IHF1ZXJ5U3RyaW5nLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgICAgIGFuZHMuZm9yRWFjaChmdW5jdGlvbiAoYW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZC5pbmRleE9mKFwifFwiKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3JzID0gYW5kLnNwbGl0KFwifFwiKTtcbiAgICAgICAgICAgICAgICAgICAgb3JzLmZvckVhY2goZnVuY3Rpb24gKG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcml0ZXJpYS5wdXNoKHsgXCJzZWxlY3Rpb25cIjogb3IsIFwidHlwZVwiOiBcIm9yXCIgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3JpdGVyaWEucHVzaCh7IFwic2VsZWN0aW9uXCI6IGFuZCwgXCJ0eXBlXCI6IFwiYW5kXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjcml0ZXJpYS5mb3JFYWNoKGZ1bmN0aW9uIChjcml0ZXJpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgYyA9IHVuZXNjYXBlKGNyaXRlcmlvbi5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGlmIChjLmluZGV4T2YoXCI9XCIpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVNwbGl0ID0gYy5zcGxpdChcIj1cIik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3JpdGVyaWEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImZpZWxkXCI6IHZhbHVlU3BsaXRbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9wZXJhdGlvblwiOiBcIj1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogdmFsdWVTcGxpdFsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdncmVnYXRpb25cIjogY3JpdGVyaW9uLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGMuaW5kZXhPZihcIjxcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlU3BsaXQgPSBjLnNwbGl0KFwiPFwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDIgPT0gdmFsdWVTcGxpdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3JpdGVyaWEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaWVsZFwiOiB2YWx1ZVNwbGl0WzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3BlcmF0aW9uXCI6IFwiPFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogdmFsdWVTcGxpdFsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFnZ3JlZ2F0aW9uXCI6IGNyaXRlcmlvbi50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgzID09IHZhbHVlU3BsaXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNyaXRlcmlhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmllbGRcIjogdmFsdWVTcGxpdFsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9wZXJhdGlvblwiOiBcIj48XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsb3dlclZhbHVlXCI6IHZhbHVlU3BsaXRbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cHBlclZhbHVlXCI6IHZhbHVlU3BsaXRbMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ2dyZWdhdGlvblwiOiBjcml0ZXJpb24udHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYy5pbmRleE9mKFwiPlwiKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVTcGxpdCA9IGMuc3BsaXQoXCI+XCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoMiA9PSB2YWx1ZVNwbGl0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jcml0ZXJpYS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpZWxkXCI6IHZhbHVlU3BsaXRbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvcGVyYXRpb25cIjogXCI+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiB2YWx1ZVNwbGl0WzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdncmVnYXRpb25cIjogY3JpdGVyaW9uLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKDMgPT0gdmFsdWVTcGxpdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3JpdGVyaWEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaWVsZFwiOiB2YWx1ZVNwbGl0WzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3BlcmF0aW9uXCI6IFwiPjxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxvd2VyVmFsdWVcIjogdmFsdWVTcGxpdFsyXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwcGVyVmFsdWVcIjogdmFsdWVTcGxpdFsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFnZ3JlZ2F0aW9uXCI6IGNyaXRlcmlvbi50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1dCBiYWNrIHRvIHN0cmluZyB0aGUgcXVlcnkgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhIHN0cmluZyBpbiB0aGUgZm9ybSBvZiAvYnJhbmQ9ZGVidXQvcHJpY2U+MTAwL1xuICAgICAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNyaXRlcmlhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY3JpdGVyaW9uID0gdGhpcy5jcml0ZXJpYVtpXTtcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3IgPSBcIi9cIjtcbiAgICAgICAgICAgIGlmIChcIm9yXCIgPT0gY3JpdGVyaW9uLmFnZ3JlZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSB0aGlzLmNyaXRlcmlhW2kgKyAxXTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCAmJiBcIm9yXCIgPT0gbmV4dC5hZ2dyZWdhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3IgPSBcInxcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3JpdGVyaW9uLm9wZXJhdGlvbiA9PSBcIj48XCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gY3JpdGVyaW9uLmxvd2VyVmFsdWUgKyBcIjxcIiArIGNyaXRlcmlvbi5maWVsZCArIFwiPFwiICsgY3JpdGVyaW9uLnVwcGVyVmFsdWUgKyBzZXBhcmF0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gY3JpdGVyaW9uLmZpZWxkICsgY3JpdGVyaW9uLm9wZXJhdGlvbiArIGNyaXRlcmlvbi52YWx1ZSArIHNlcGFyYXRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYSBzZWxlY3Rpb24gdG8gdGhpcyBxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmaWVsZCB0aGUgbmFtZSBvZiB0aGUgZmllbGQgd2UncmUgZHJpbGxpbmcgZG93biB3aXRoXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiB0aGUgb3BlcmF0aW9uLCBleCA9LD4sPFxuICAgICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgZm9yIHRoZSBvcGVyYXRpb25cbiAgICAgKiBAcGFyYW0gdmFsdWUxIG9wdGlvbmFsIHNlY29uZCB2YWx1ZSBmb3IgY29uc3RydWN0aW5nIHJhbmdlcyBsaWtlIDEwMDxwcmljZTwyMDBcbiAgICAgKi9cbiAgICBhZGRTZWxlY3Rpb24oZmllbGQsIG9wZXJhdGlvbiwgdmFsdWUsIHZhbHVlMSwgYWdncmVnYXRpb24pIHtcbiAgICAgICAgY29uc3QgYWdnID0gYWdncmVnYXRpb24gPyBhZ2dyZWdhdGlvbiA6IFwiYW5kXCI7XG4gICAgICAgIGlmICh2YWx1ZTEgJiYgXCI+PFwiID09IG9wZXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jcml0ZXJpYS5wdXNoKHtcbiAgICAgICAgICAgICAgICBcImZpZWxkXCI6IGZpZWxkLFxuICAgICAgICAgICAgICAgIFwib3BlcmF0aW9uXCI6IFwiPjxcIixcbiAgICAgICAgICAgICAgICBcImxvd2VyVmFsdWVcIjogdmFsdWUsXG4gICAgICAgICAgICAgICAgXCJ1cHBlclZhbHVlXCI6IHZhbHVlMSxcbiAgICAgICAgICAgICAgICBcImFnZ3JlZ2F0aW9uXCI6IGFnZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNyaXRlcmlhLnB1c2goe1xuICAgICAgICAgICAgICAgIFwiZmllbGRcIjogZmllbGQsXG4gICAgICAgICAgICAgICAgXCJvcGVyYXRpb25cIjogb3BlcmF0aW9uLFxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogdmFsdWUsXG4gICAgICAgICAgICAgICAgXCJhZ2dyZWdhdGlvblwiOiBhZ2dcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlIGFuZCBjb25zdHJ1Y3QgYSBuZXcgb2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBxdWVyeSBzdHJpbmcgZm9ybVxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXJ5U3RyaW5nIHRoZSBxdWVyeSBzdHJpbmcgaW4gdGhlIGZvcm0gb2YgXCIvXCIgam9pbmVkIGNyaXRlcmlhLiBleC4gL2JyYW5kPWRlYnV0L3ByaWNlPjEwMC9cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGdldFNlbGVjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyaXRlcmlhO1xuICAgIH1cbiAgICBnZXRTZWxlY3Rpb24oZmllbGQpIHtcbiAgICAgICAgZm9yICh2YXIgYyBpbiB0aGlzLmNyaXRlcmlhKSB7XG4gICAgICAgICAgICB2YXIgY3JpdCA9IHRoaXMuY3JpdGVyaWFbY107XG4gICAgICAgICAgICBpZiAoY3JpdC5maWVsZCA9PSBmaWVsZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjcml0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoaXMgcXVlcnkgYWxyZWFkeSBoYXMgYSBzZWxlY3Rpb24gZm9yIHRoZSBnaXZlbiBmaWVsZFxuICAgICAqXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiB3ZSBoYXZlIGEgc2VsZWN0aW9uIG9mIHRoaXMgZmllbGQsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIGhhc1NlbGVjdGlvbihmaWVsZCkge1xuICAgICAgICBmb3IgKHZhciBjIGluIHRoaXMuY3JpdGVyaWEpIHtcbiAgICAgICAgICAgIHZhciBjcml0ID0gdGhpcy5jcml0ZXJpYVtjXTtcbiAgICAgICAgICAgIGlmIChjcml0LmZpZWxkID09IGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGlzIHF1ZXJ5IGFscmVhZHkgaGFzIGEgc2VsZWN0aW9uIGZvciB0aGUgZ2l2ZW4gZmllbGRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgd2UgaGF2ZSBhIHNlbGVjdGlvbiBvZiB0aGlzIGZpZWxkLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBoYXNFeGFjdFNlbGVjdGlvbihmaWVsZCkge1xuICAgICAgICBmb3IgKHZhciBjIGluIHRoaXMuY3JpdGVyaWEpIHtcbiAgICAgICAgICAgIHZhciBjcml0ID0gdGhpcy5jcml0ZXJpYVtjXTtcbiAgICAgICAgICAgIGlmIChjcml0LmZpZWxkID09IGZpZWxkICYmIGNyaXQub3BlcmF0aW9uID09IFwiPVwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIHNlbGVjdGlvbnMgb24gdGhpcyBmaWVsZFxuICAgICAqL1xuICAgIHJlbW92ZVNlbGVjdGlvbihmaWVsZCkge1xuICAgICAgICB2YXIgY3JpdGVyaWEgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNyaXRlcmlhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY3JpdCA9IHRoaXMuY3JpdGVyaWFbaV07XG4gICAgICAgICAgICBpZiAoY3JpdC5maWVsZCA9PSBmaWVsZCkge1xuICAgICAgICAgICAgICAgIGNyaXRlcmlhLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGNyaXRlcmlhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBjID0gY3JpdGVyaWEucG9wKCk7XG4gICAgICAgICAgICBhcnJheVJlbW92ZSh0aGlzLmNyaXRlcmlhLCBjLCBjKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3JpdGVyaWEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5jcml0ZXJpYVtpXTtcbiAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMuY3JpdGVyaWFbaSAtIDFdO1xuICAgICAgICAgICAgdmFyIG5leHQgPSB0aGlzLmNyaXRlcmlhW2kgKyAxXTtcbiAgICAgICAgICAgIGlmIChcIm9yXCIgPT0gY3VycmVudC5hZ2dyZWdhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICgoIW5leHQgfHwgXCJhbmRcIiA9PSBuZXh0LmFnZ3JlZ2F0aW9uKSAmJiAoIXByZXZpb3VzIHx8IFwiYW5kXCIgPT0gcHJldmlvdXMuYWdncmVnYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuYWdncmVnYXRpb24gPSBcImFuZFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRTZWFyY2godGVybSkge1xuICAgICAgICBpZiAodGVybSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24oXCIkc1wiKTtcbiAgICAgICAgICAgIHRoaXMuY3JpdGVyaWEudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgXCJmaWVsZFwiOiBcIiRzXCIsXG4gICAgICAgICAgICAgICAgXCJvcGVyYXRpb25cIjogXCI9XCIsXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiB0ZXJtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRTZWFyY2goKSB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldFNlbGVjdGlvbihcIiRzXCIpO1xuICAgICAgICByZXR1cm4gcyA/IHMudmFsdWUgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlzVmFsaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyaXRlcmlhLmxlbmd0aCA+IDA7XG4gICAgfVxufVxuLyoqXG4gKiBXZSBoYXZlIHRoZSBzYW1lIGZ1bmN0aW9uIGluIHV0aWwgYnV0IHdlIHdhbnQgdG8gaGF2ZSBxdWVyeS5qcyB3aXRob3V0IGFueSBkZXBlbmRlbmNpZXNcbiAqXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBmcm9tXG4gKiBAcGFyYW0gdG9cbiAqIEByZXR1cm5zIHtOdW1iZXJ8Kn1cbiAqL1xuZnVuY3Rpb24gYXJyYXlSZW1vdmUoYXJyYXksIGZyb20sIHRvKSB7XG4gICAgdmFyIHJlc3QgPSBhcnJheS5zbGljZSgodG8gfHwgZnJvbSkgKyAxIHx8IGFycmF5Lmxlbmd0aCk7XG4gICAgYXJyYXkubGVuZ3RoID0gZnJvbSA8IDAgPyBhcnJheS5sZW5ndGggKyBmcm9tIDogZnJvbTtcbiAgICByZXR1cm4gYXJyYXkucHVzaC5hcHBseShhcnJheSwgcmVzdCk7XG59XG4iLCJpbXBvcnQgeyBnZXRMb2NhbFN0b3JhZ2UsIGdldFNlc3Npb25TdG9yYWdlIH0gZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCB7IFRyYWlsVHlwZSB9IGZyb20gXCIuL1RyYWlsVHlwZVwiO1xuY29uc3QgVFRMID0gMTAwMCAqIDYwICogNjAgKiAyNCAqIDI7XG5leHBvcnQgY2xhc3MgVHJhaWwge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXJ5UmVzb2x2ZXJcbiAgICAgKiBAcGFyYW0gc2Vzc2lvblJlc29sdmVyXG4gICAgICogQHBhcmFtIHVpZCB0aGUgdW5pcXVlIGlkIG9mIHRoaXMgdHJhaWwuIFVzZWQgYXMgcGFydCBvZiB0aGUga2V5IHRvIHNhdmUgYWxsIFRyYWlsIHN0ZXBzL3BhcnRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocXVlcnlSZXNvbHZlciwgc2Vzc2lvblJlc29sdmVyLCB1aWQpIHtcbiAgICAgICAgdGhpcy5xdWVyeVJlc29sdmVyID0gcXVlcnlSZXNvbHZlcjtcbiAgICAgICAgdGhpcy5zZXNzaW9uUmVzb2x2ZXIgPSBzZXNzaW9uUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMua2V5ID0gXCJzZWFyY2gtY29sbGVjdG9yLXRyYWlsXCIgKyAodWlkID8gXCItXCIgKyB1aWQgOiBcIlwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsVHJhaWxzID0gdGhpcy5fbG9hZChnZXRMb2NhbFN0b3JhZ2UoKSk7XG4gICAgICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIC8vIERyb3AgYWxsIGV4cGlyZWQgdHJhaWxzLCBUVEwgaW4gc3luYyB3aXRoIHNlc3Npb24gZHVyYXRpb24gb2YgMzAgbWluXG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBPYmplY3Qua2V5cyhsb2NhbFRyYWlscykpIHtcbiAgICAgICAgICAgICAgICBpZiAobm93ID4gbG9jYWxUcmFpbHNbaWRdLnRpbWVzdGFtcCArIFRUTCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgbG9jYWxUcmFpbHNbaWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NhdmUoZ2V0TG9jYWxTdG9yYWdlKCksIGxvY2FsVHJhaWxzKTtcbiAgICAgICAgICAgIC8vIExvYWQgZXhpc3Rpbmcgc2Vzc2lvbiB0cmFpbHMgYW5kIG1lcmdlIGl0IHdpdGggdGhlIGxvY2FsIHN0b3JhZ2UgdHJhaWxzLlxuICAgICAgICAgICAgLy8gVGhpcyBzaG91bGQgZ3VhcmFudGVlIHRoYXQgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSBwYWdlcyBmdXJ0aGVyIGRvd24gdGhlIHRyYWlsXG4gICAgICAgICAgICAvLyAoYmFza2V0LCBjaGVja291dCkgd2VyZSBvcGVuIGluIGEgbmV3IHRhYiBvciBub3QsIHdlIGhhdmUgYSBmdWxsIHJlcHJlc2VudGF0aW9uXG4gICAgICAgICAgICAvLyBvZiBhbGwgcHJvZHVjdCBjbGlja3Mgd2l0aGluIHRoZSBzZXNzaW9uLiBSZW1pbmRlciwgc2Vzc2lvblN0b3JhZ2UgaXMgbWFpbnRhaW5lZFxuICAgICAgICAgICAgLy8gcGVyIHRhYi93aW5kb3cgYW5kIGlzIGRlbGV0ZWQgdXBvbiBjbG9zaW5nLCBsb2NhbFN0b3JhZ2UgaXMgcGVyIHdlYnNpdGUgd2l0aCBub1xuICAgICAgICAgICAgLy8gZGVmYXVsdCBleHBpcnkuXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uVHJhaWxzID0gdGhpcy5fbG9hZChnZXRTZXNzaW9uU3RvcmFnZSgpKTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWlscyA9IE9iamVjdC5hc3NpZ24obG9jYWxUcmFpbHMsIHNlc3Npb25UcmFpbHMpO1xuICAgICAgICAgICAgdGhpcy5fc2F2ZShnZXRTZXNzaW9uU3RvcmFnZSgpLCB0cmFpbHMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHBhcnNpbmcgc3RvcmVkIGV2ZW50IHF1ZXVlIFwiICsgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgdGhpcyBwcm9kdWN0IGlkIGFzIHN0YXJ0aW5nIGEgcHVyY2hhc2Ugam91cm5leSBhdCB0aGlzIHNlc3Npb24vcXVlcnlcbiAgICAgKiBQb3NzaWJsZSB0cmFpbCB0eXBlcyBhcmUgXCJtYWluXCIgYW5kIFwiYXNzb2NpYXRlZFwiXG4gICAgICovXG4gICAgcmVnaXN0ZXIoaWQsIHRyYWlsVHlwZSA9IFRyYWlsVHlwZS5NYWluLCBxdWVyeVN0cmluZykge1xuICAgICAgICBjb25zdCB0cmFpbCA9IHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICBxdWVyeTogcXVlcnlTdHJpbmcgfHwgdGhpcy5xdWVyeVJlc29sdmVyKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIHR5cGU6IHRyYWlsVHlwZVxuICAgICAgICB9O1xuICAgICAgICBmb3IgKGxldCBzdG9yYWdlIG9mIFtnZXRMb2NhbFN0b3JhZ2UoKSwgZ2V0U2Vzc2lvblN0b3JhZ2UoKV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYWlscyA9IHRoaXMuX2xvYWQoc3RvcmFnZSk7XG4gICAgICAgICAgICB0cmFpbHNbaWRdID0gdHJhaWw7XG4gICAgICAgICAgICB0aGlzLl9zYXZlKHN0b3JhZ2UsIHRyYWlscyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmV0Y2goaWQpIHtcbiAgICAgICAgY29uc3QgdHJhaWxzID0gdGhpcy5fbG9hZChnZXRTZXNzaW9uU3RvcmFnZSgpKTtcbiAgICAgICAgcmV0dXJuIHRyYWlsc1tpZF07XG4gICAgfVxuICAgIF9sb2FkKHN0b3JhZ2UpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmtleSk7XG4gICAgICAgIHJldHVybiBkYXRhID8gSlNPTi5wYXJzZShkYXRhKSA6IHt9O1xuICAgIH1cbiAgICBfc2F2ZShzdG9yYWdlLCBkYXRhKSB7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cbn1cbiIsImV4cG9ydCB2YXIgVHJhaWxUeXBlO1xuKGZ1bmN0aW9uIChUcmFpbFR5cGUpIHtcbiAgICBUcmFpbFR5cGVbXCJNYWluXCJdID0gXCJtYWluXCI7XG4gICAgVHJhaWxUeXBlW1wiQXNzb2NpYXRlZFwiXSA9IFwiYXNzb2NpYXRlZFwiO1xufSkoVHJhaWxUeXBlIHx8IChUcmFpbFR5cGUgPSB7fSkpO1xuIiwiZXhwb3J0ICogZnJvbSBcIi4vUXVlcnlcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1RyYWlsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UcmFpbFR5cGVcIjtcbiIsImltcG9ydCB7IGdlbmVyYXRlSWQsIGdldENvb2tpZSwgZ2V0TG9jYWxTdG9yYWdlLCBzZXRDb29raWUgfSBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuY29uc3QgTUlOVVRFU19PTkVfREFZID0gNjAgKiAyNDtcbmNvbnN0IE1JTlVURVNfSEFMRl9IT1VSID0gMzA7XG4vKipcbiAqIFJlYWQgdGhlIGNvb2tpZSB3aXRoIHRoZSBwcm92aWRlZCBuYW1lXG4gKiBAcGFyYW0gbmFtZSB0aGUgbmFtZSBvZiB0aGUgY29va2llXG4gKi9cbmV4cG9ydCBjb25zdCBjb29raWVSZXNvbHZlciA9IChuYW1lID0gXCJcIikgPT4gZ2V0Q29va2llKG5hbWUpO1xuLyoqXG4gKiBSZXNvbHZlIHRoZSBpZCBvZiB0aGUgY3VycmVudCBzZWFyY2ggc2Vzc2lvbi4gQSBzZWFyY2ggc2Vzc2lvbiBpcyBkZWZpbmVkIGFzXG4gKiBsaW1pdGVkIHRpbWUgc2xpY2Ugb2Ygc2VhcmNoIGFjdGl2aXR5IGFjcm9zcyBtdWx0aXBsZSB0YWJzLiBCeSBkZWZhdWx0IGEgc2Vzc2lvblxuICogd291bGQgYmUgY29uc2lkZXJlZCBleHBpcmVkIGFmdGVyIDMwIG1pbiBvZiBpbmFjdGl2aXR5LlxuICpcbiAqIEluIGNhc2UgdGhlIHJlc29sdmVyIGlzIGNvbnN0cnVjdGVkIHdpdGggYSBjb29raWUgbmFtZSwgdGhlIHNlc3Npb24gbGlmZWN5Y2xlXG4gKiB3aWxsIGJlIGdvdmVybmVkIGJ5IHRoZSBsaWZlY3ljbGUgb2YgdGhhdCBjb29raWUuIE90aGVyd2lzZSB0aGUgcmVzb2x2ZXIgd2lsbFxuICogc2V0IGl0cyBvd24gY29va2llLlxuICpcbiAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBzZXNzaW9uIGNvb2tpZVxuICovXG5leHBvcnQgY29uc3QgY29va2llU2Vzc2lvblJlc29sdmVyID0gKG5hbWUgPSBcIlNlYXJjaENvbGxlY3RvclNlc3Npb25cIikgPT4gc2V0Q29va2llKG5hbWUsIGNvb2tpZVJlc29sdmVyKG5hbWUpIHx8IGdlbmVyYXRlSWQoKSwgTUlOVVRFU19IQUxGX0hPVVIpO1xuLyoqXG4gKiBGaW5kIHRoZSBwb3NpdGlvbiBvZiBhIERPTSBlbGVtZW50IHJlbGF0aXZlIHRvIG90aGVyIERPTSBlbGVtZW50cyBvZiB0aGUgc2FtZSB0eXBlLlxuICogVG8gYmUgdXNlZCB0byBmaW5kIHRoZSBwb3NpdGlvbiBvZiBhbiBpdGVtIGluIGEgc2VhcmNoIHJlc3VsdC5cbiAqXG4gKiBAcGFyYW0gc2VsZWN0b3JFeHByZXNzaW9uIHRoZSBjc3MgZXhwcmVzc2lvbiB0byBxdWVyeSBmb3Igb3RoZXIgZWxlbWVudHNcbiAqIEBwYXJhbSBlbGVtZW50IHRoZSBlbGVtZW50IGZvciB3aGljaCB3ZSB3YW50IHRvIGtub3cgdGhlIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBlbGVtZW50cyBzZWxlY3RlZCBieSBzZWxlY3RvckV4cHJlc3Npb25cbiAqL1xuZXhwb3J0IGNvbnN0IHBvc2l0aW9uUmVzb2x2ZXIgPSAoc2VsZWN0b3JFeHByZXNzaW9uLCBlbGVtZW50KSA9PiB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckV4cHJlc3Npb24pKVxuICAgICAgICAucmVkdWNlKChhY2MsIG5vZGUsIGluZGV4KSA9PiBub2RlID09PSBlbGVtZW50ID8gaW5kZXggOiBhY2MsIHVuZGVmaW5lZCk7XG59O1xuLyoqXG4gKiBUaGlzIGlzIGEgcGVyc2lzdGVudCBkZWJ1ZyByZXNvbHZlciB3aGljaCBzdG9yZXMgdGhlIGRlYnVnIHF1ZXJ5IHBhcmFtZXRlciBhY3Jvc3MgcmVxdWVzdHMuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWJ1Z1Jlc29sdmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IERFQlVHX0tFWSA9IFwiX19jb2xsZWN0b3JEZWJ1Z1wiO1xuICAgIGNvbnN0IGRlYnVnUGFyYW0gPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLmdldChcImRlYnVnXCIpO1xuICAgIGNvbnN0IGlzRGVidWdQYXJhbUV4aXN0cyA9IGRlYnVnUGFyYW0gIT0gbnVsbDtcbiAgICBpZiAoaXNEZWJ1Z1BhcmFtRXhpc3RzKSB7XG4gICAgICAgIGNvbnN0IGRlYnVnID0gZGVidWdQYXJhbSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIGdldExvY2FsU3RvcmFnZSgpLnNldEl0ZW0oREVCVUdfS0VZLCBTdHJpbmcoZGVidWcpKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldExvY2FsU3RvcmFnZSgpLmdldEl0ZW0oREVCVUdfS0VZKSA9PT0gXCJ0cnVlXCI7XG59O1xuIiwiZXhwb3J0ICogZnJvbSBcIi4vUmVzb2x2ZXJcIjtcbiIsImV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih3aW5kb3csIGRvY3VtZW50KSB7XG4gICAgICAgIHRoaXMud2luZG93ID0gd2luZG93O1xuICAgICAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgfVxuICAgIGdldFdpbmRvdygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2luZG93O1xuICAgIH1cbiAgICBnZXREb2N1bWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQ7XG4gICAgfVxufVxuIiwiZXhwb3J0IHZhciBMaXN0ZW5lclR5cGU7XG4oZnVuY3Rpb24gKExpc3RlbmVyVHlwZSkge1xuICAgIExpc3RlbmVyVHlwZVtcIkRvbVwiXSA9IFwiZG9tXCI7XG4gICAgTGlzdGVuZXJUeXBlW1wiU2VudGluZWxcIl0gPSBcInNlbnRpbmVsXCI7XG59KShMaXN0ZW5lclR5cGUgfHwgKExpc3RlbmVyVHlwZSA9IHt9KSk7XG4iLCJpbXBvcnQgeyBnZXRMb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi9VdGlsXCI7XG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlUXVldWUge1xuICAgIGNvbnN0cnVjdG9yKGlkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IFwic2VhcmNoLWNvbGxlY3Rvci1xdWV1ZVwiICsgKGlkID8gXCItXCIgKyBpZCA6IFwiXCIpO1xuICAgICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgICAgIGNvbnN0IHN0b3JlZFF1ZXVlID0gZ2V0TG9jYWxTdG9yYWdlKCkuZ2V0SXRlbSh0aGlzLm5hbWUpO1xuICAgICAgICBpZiAoc3RvcmVkUXVldWUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWV1ZSA9IEpTT04ucGFyc2Uoc3RvcmVkUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBzdG9yZWQgZXZlbnQgcXVldWUgXCIgKyBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwdXNoKGRhdGEpIHtcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKGRhdGEpO1xuICAgICAgICB0aGlzLl9zYXZlKCk7XG4gICAgfVxuICAgIGRyYWluKCkge1xuICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLnF1ZXVlO1xuICAgICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgICAgIHRoaXMuX3NhdmUoKTtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICB9XG4gICAgdHJhbnNhY3Rpb25hbERyYWluKGFzeW5jQ2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5xdWV1ZTtcbiAgICAgICAgcmV0dXJuIGFzeW5jQ2FsbGJhY2sodGhpcy5xdWV1ZSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgICAgICAgICB0aGlzLl9zYXZlKCk7XG4gICAgICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBfc2F2ZSgpIHtcbiAgICAgICAgZ2V0TG9jYWxTdG9yYWdlKCkuc2V0SXRlbSh0aGlzLm5hbWUsIEpTT04uc3RyaW5naWZ5KHRoaXMucXVldWUpKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIENsb25lZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWljc3Mvc2VudGluZWxqcyB1bnRpbCBhIHBhdGNoZWQgdmVyc2lvblxuICogc3VwcG9yaW5nIGlmcmFtZXMgZ2V0cyBhdmFpbGFibGVcbiAqIExpY2Vuc2UgdW5kZXIgTUlUXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSwgc2VsZWN0b3JUb0FuaW1hdGlvbk1hcCA9IHt9LCBhbmltYXRpb25DYWxsYmFja3MgPSB7fSwgc3R5bGVFbCwgc3R5bGVTaGVldCwgY3NzUnVsZXM7XG5leHBvcnQgY2xhc3MgU2VudGluZWwge1xuICAgIGNvbnN0cnVjdG9yKGRvYyA9IGRvY3VtZW50KSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQgPSBkb2M7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCB3YXRjaGVyLlxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGNzc1NlbGVjdG9ycyAtIExpc3Qgb2YgQ1NTIHNlbGVjdG9yIHN0cmluZ3NcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqL1xuICAgIG9uKGNzc1NlbGVjdG9ycywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCFjYWxsYmFjaylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBhbmltYXRpb25zdGFydCBldmVudCBsaXN0ZW5lclxuICAgICAgICBpZiAoIXN0eWxlRWwpIHtcbiAgICAgICAgICAgIHZhciBkb2MgPSB0aGlzLmRvY3VtZW50LCBoZWFkID0gZG9jLmhlYWQ7XG4gICAgICAgICAgICAvLyBhZGQgYW5pbWF0aW9uc3RhcnQgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbnN0YXJ0JywgZnVuY3Rpb24gKGV2LCBjYWxsYmFja3MsIGwsIGkpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3MgPSBhbmltYXRpb25DYWxsYmFja3NbZXYuYW5pbWF0aW9uTmFtZV07XG4gICAgICAgICAgICAgICAgLy8gZXhpdCBpZiBjYWxsYmFja3MgaGF2ZW4ndCBiZWVuIHJlZ2lzdGVyZWRcbiAgICAgICAgICAgICAgICBpZiAoIWNhbGxiYWNrcylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIHN0b3Agb3RoZXIgY2FsbGJhY2tzIGZyb20gZmlyaW5nXG4gICAgICAgICAgICAgICAgZXYuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGNhbGxiYWNrc1xuICAgICAgICAgICAgICAgIGwgPSBjYWxsYmFja3MubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXShldi50YXJnZXQpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAvLyBhZGQgc3R5bGVzaGVldCB0byBkb2N1bWVudFxuICAgICAgICAgICAgc3R5bGVFbCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbCwgaGVhZC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIHN0eWxlU2hlZXQgPSBzdHlsZUVsLnNoZWV0O1xuICAgICAgICAgICAgY3NzUnVsZXMgPSBzdHlsZVNoZWV0LmNzc1J1bGVzO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxpc3RpZnkgYXJndW1lbnQgYW5kIGFkZCBjc3MgcnVsZXMvIGNhY2hlIGNhbGxiYWNrc1xuICAgICAgICAoaXNBcnJheShjc3NTZWxlY3RvcnMpID8gY3NzU2VsZWN0b3JzIDogW2Nzc1NlbGVjdG9yc10pXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChzZWxlY3RvciwgYW5pbUlkLCBpc0N1c3RvbU5hbWUpIHtcbiAgICAgICAgICAgIGFuaW1JZCA9IHNlbGVjdG9yVG9BbmltYXRpb25NYXBbc2VsZWN0b3JdO1xuICAgICAgICAgICAgaWYgKCFhbmltSWQpIHtcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBpc0N1c3RvbU5hbWUgPSBzZWxlY3RvclswXSA9PSAnISc7XG4gICAgICAgICAgICAgICAgLy8gZGVmaW5lIGFuaW1hdGlvbiBuYW1lIGFuZCBhZGQgdG8gbWFwXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JUb0FuaW1hdGlvbk1hcFtzZWxlY3Rvcl0gPSBhbmltSWQgPVxuICAgICAgICAgICAgICAgICAgICBpc0N1c3RvbU5hbWUgPyBzZWxlY3Rvci5zbGljZSgxKSA6ICdzZW50aW5lbC0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnNsaWNlKDIpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCBrZXlmcmFtZSBydWxlXG4gICAgICAgICAgICAgICAgY3NzUnVsZXNbc3R5bGVTaGVldC5pbnNlcnRSdWxlKCdAa2V5ZnJhbWVzICcgKyBhbmltSWQgK1xuICAgICAgICAgICAgICAgICAgICAne2Zyb217dHJhbnNmb3JtOm5vbmU7fXRve3RyYW5zZm9ybTpub25lO319JywgY3NzUnVsZXMubGVuZ3RoKV1cbiAgICAgICAgICAgICAgICAgICAgLl9pZCA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIC8vIGFkZCBzZWxlY3RvciBhbmltYXRpb24gcnVsZVxuICAgICAgICAgICAgICAgIGlmICghaXNDdXN0b21OYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzc1J1bGVzW3N0eWxlU2hlZXQuaW5zZXJ0UnVsZShzZWxlY3RvciArICd7YW5pbWF0aW9uLWR1cmF0aW9uOjAuMDAwMXM7YW5pbWF0aW9uLW5hbWU6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltSWQgKyAnO30nLCBjc3NSdWxlcy5sZW5ndGgpXVxuICAgICAgICAgICAgICAgICAgICAgICAgLl9pZCA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBhZGQgdG8gbWFwXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JUb0FuaW1hdGlvbk1hcFtzZWxlY3Rvcl0gPSBhbmltSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhZGQgdG8gY2FsbGJhY2tzXG4gICAgICAgICAgICAoYW5pbWF0aW9uQ2FsbGJhY2tzW2FuaW1JZF0gPSBhbmltYXRpb25DYWxsYmFja3NbYW5pbUlkXSB8fCBbXSlcbiAgICAgICAgICAgICAgICAucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgd2F0Y2hlci5cbiAgICAgKiBAcGFyYW0ge2FycmF5fSBjc3NTZWxlY3RvcnMgLSBMaXN0IG9mIENTUyBzZWxlY3RvciBzdHJpbmdzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gKG9wdGlvbmFsKVxuICAgICAqL1xuICAgIG9mZihjc3NTZWxlY3RvcnMsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIGxpc3RpZnkgYXJndW1lbnQgYW5kIGl0ZXJhdGUgdGhyb3VnaCBydWxlc1xuICAgICAgICAoaXNBcnJheShjc3NTZWxlY3RvcnMpID8gY3NzU2VsZWN0b3JzIDogW2Nzc1NlbGVjdG9yc10pXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yLCBhbmltSWQsIGNhbGxiYWNrTGlzdCwgaSkge1xuICAgICAgICAgICAgLy8gZ2V0IGFuaW1JZFxuICAgICAgICAgICAgaWYgKCEoYW5pbUlkID0gc2VsZWN0b3JUb0FuaW1hdGlvbk1hcFtzZWxlY3Rvcl0pKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIGdldCBjYWxsYmFja3NcbiAgICAgICAgICAgIGNhbGxiYWNrTGlzdCA9IGFuaW1hdGlvbkNhbGxiYWNrc1thbmltSWRdO1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGNhbGxiYWNrIGZyb20gbGlzdFxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaSA9IGNhbGxiYWNrTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tMaXN0W2ldID09PSBjYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tMaXN0ID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBleGl0IGlmIGNhbGxiYWNrcyBzdGlsbCBleGlzdFxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrTGlzdC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gY2xlYXIgY2FjaGUgYW5kIHJlbW92ZSBjc3MgcnVsZXNcbiAgICAgICAgICAgIGkgPSBjc3NSdWxlcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNzc1J1bGVzW2ldLl9pZCA9PSBzZWxlY3RvcilcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVTaGVldC5kZWxldGVSdWxlKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHNlbGVjdG9yVG9BbmltYXRpb25NYXBbc2VsZWN0b3JdO1xuICAgICAgICAgICAgZGVsZXRlIGFuaW1hdGlvbkNhbGxiYWNrc1thbmltSWRdO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZXQgd2F0Y2hlcnMgYW5kIGNhY2hlXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHNlbGVjdG9yVG9BbmltYXRpb25NYXAgPSB7fTtcbiAgICAgICAgYW5pbWF0aW9uQ2FsbGJhY2tzID0ge307XG4gICAgICAgIGlmIChzdHlsZUVsKVxuICAgICAgICAgICAgc3R5bGVFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWwpO1xuICAgICAgICBzdHlsZUVsID0gMDtcbiAgICB9XG59XG4iLCIvKipcbiAqIFBhcnNlIHRoZSBicm93c2VyIHF1ZXJ5IHN0cmluZyBvciB0aGUgcGFzc2VkIHN0cmluZyBpbnRvIGEgamF2YXNjcmlwdCBvYmplY3RcbiAqIHdpdGgga2V5cyB0aGUgcXVlcnkgcGFyYW1ldGVyIG5hbWVzIGFuZCB2YWx1ZXMgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVN0cmluZyAtIHRoZSBxdWVyeSBzdHJpbmcgdG8gcGFyc2UsIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggaWYgbm90IGF2YWlsYWJsZVxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgcGFyc2VRdWVyeVN0cmluZyA9IChxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpID0+IHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeVN0cmluZyk7XG59O1xuLyoqXG4gKiBTb21lIGJyb3dzZXIgbGlrZSBTYWZhcmkgcHJldmVudCBhY2Nlc3NpbmcgbG9jYWxTdG9yYWdlIGluIHByaXZhdGUgbW9kZSBieSB0aHJvd2luZyBleGNlcHRpb25zLlxuICogVXNlIHRoaXMgbWV0aG9kIHRvIHJldHJpZXZlIGEgbW9jayBpbXBsIHdoaWNoIHdpbGwgYXQgbGVhc3QgcHJldmVudCBlcnJvcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRMb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgaWYgKFwibG9jYWxTdG9yYWdlXCIgaW4gd2luZG93KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFiY1wiKTsgLy8gYWNjZXNzIGxvY2FsU3RvcmFnZSB0byB0cmlnZ2VyIGluY29nbml0byBtb2RlIGV4Y2VwdGlvbnNcbiAgICAgICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvb2tpZVN0b3JhZ2UoNTI1NjAwLCBcIl9fbG9jYWxTdG9yYWdlTW9ja19fX1wiKTtcbn07XG4vKipcbiAqIFVSTCBzYWZlIGJhc2U2NCBlbmNvZGluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGJlIGVuY29kZWQsIG9ubHkgQVNDSUkvSVNPLTg4NTktMSBzdXBwb3J0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGJhc2U2NEVuY29kZSA9IChzdHIpID0+IHtcbiAgICAvLyBOb3RlLCArIHJlcGxhY2VkIHdpdGggLSwgLyByZXBsYWNlZCB3aXRoIF9cbiAgICBjb25zdCBiNjQgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LV89XCI7XG4gICAgbGV0IG8xLCBvMiwgbzMsIGJpdHMsIGgxLCBoMiwgaDMsIGg0LCBlID0gW10sIHBhZCA9ICcnLCBjO1xuICAgIGMgPSBzdHIubGVuZ3RoICUgMzsgLy8gcGFkIHN0cmluZyB0byBsZW5ndGggb2YgbXVsdGlwbGUgb2YgM1xuICAgIGlmIChjID4gMCkge1xuICAgICAgICB3aGlsZSAoYysrIDwgMykge1xuICAgICAgICAgICAgcGFkICs9ICc9JztcbiAgICAgICAgICAgIHN0ciArPSAnXFwwJztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBub3RlOiBkb2luZyBwYWRkaW5nIGhlcmUgc2F2ZXMgdXMgZG9pbmcgc3BlY2lhbC1jYXNlIHBhY2tpbmcgZm9yIHRyYWlsaW5nIDEgb3IgMiBjaGFyc1xuICAgIGZvciAoYyA9IDA7IGMgPCBzdHIubGVuZ3RoOyBjICs9IDMpIHsgLy8gcGFjayB0aHJlZSBvY3RldHMgaW50byBmb3VyIGhleGV0c1xuICAgICAgICBvMSA9IHN0ci5jaGFyQ29kZUF0KGMpO1xuICAgICAgICBvMiA9IHN0ci5jaGFyQ29kZUF0KGMgKyAxKTtcbiAgICAgICAgbzMgPSBzdHIuY2hhckNvZGVBdChjICsgMik7XG4gICAgICAgIGJpdHMgPSBvMSA8PCAxNiB8IG8yIDw8IDggfCBvMztcbiAgICAgICAgaDEgPSBiaXRzID4+IDE4ICYgMHgzZjtcbiAgICAgICAgaDIgPSBiaXRzID4+IDEyICYgMHgzZjtcbiAgICAgICAgaDMgPSBiaXRzID4+IDYgJiAweDNmO1xuICAgICAgICBoNCA9IGJpdHMgJiAweDNmO1xuICAgICAgICAvLyB1c2UgaGV4dGV0cyB0byBpbmRleCBpbnRvIGNvZGUgc3RyaW5nXG4gICAgICAgIGVbYyAvIDNdID0gYjY0LmNoYXJBdChoMSkgKyBiNjQuY2hhckF0KGgyKSArIGI2NC5jaGFyQXQoaDMpICsgYjY0LmNoYXJBdChoNCk7XG4gICAgfVxuICAgIHN0ciA9IGUuam9pbignJyk7IC8vIHVzZSBBcnJheS5qb2luKCkgZm9yIGJldHRlciBwZXJmb3JtYW5jZSB0aGFuIHJlcGVhdGVkIHN0cmluZyBhcHBlbmRzXG4gICAgLy8gcmVwbGFjZSAnQSdzIGZyb20gcGFkZGVkIG51bGxzIHdpdGggJz0nc1xuICAgIHN0ciA9IHN0ci5zbGljZSgwLCBzdHIubGVuZ3RoIC0gcGFkLmxlbmd0aCkgKyBwYWQ7XG4gICAgcmV0dXJuIHN0cjtcbn07XG5leHBvcnQgY29uc3QgZ2VuZXJhdGVJZCA9ICgpID0+IHtcbiAgICBjb25zdCBwb3NzaWJsZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgICBsZXQgdGV4dCA9IFwiXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xufTtcbmV4cG9ydCBjb25zdCBnZXRTZXNzaW9uU3RvcmFnZSA9ICgpID0+IHtcbiAgICBpZiAoXCJzZXNzaW9uU3RvcmFnZVwiIGluIHdpbmRvdykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImFiY1wiKTsgLy8gYWNjZXNzIHNlc3Npb25TdG9yYWdlIHRvIHRyaWdnZXIgaW5jb2duaXRvIG1vZGUgZXhjZXB0aW9uc1xuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb29raWVTdG9yYWdlKHZvaWQgMCwgXCJfX3Nlc3Npb25TdG9yYWdlTW9ja19fX1wiKTtcbn07XG5mdW5jdGlvbiBjb29raWVTdG9yYWdlKHR0bE1pbnV0ZXMsIHN0b3JhZ2VOYW1lKSB7XG4gICAgY29uc3QgTE9DQUxfU1RPUkFHRV9DT09LSUVfTkFNRSA9IHN0b3JhZ2VOYW1lO1xuICAgIGZ1bmN0aW9uIGdldFN0b3JhZ2VGcm9tQ29va2llKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShnZXRDb29raWUoTE9DQUxfU1RPUkFHRV9DT09LSUVfTkFNRSkgfHwgXCJ7fVwiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2F2ZVN0b3JhZ2VUb0Nvb2tpZShkYXRhKSB7XG4gICAgICAgIHNldENvb2tpZShMT0NBTF9TVE9SQUdFX0NPT0tJRV9OQU1FLCBkYXRhLCB0dGxNaW51dGVzKTsgLy8gb25lIHllYXJcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0SXRlbShrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRTdG9yYWdlRnJvbUNvb2tpZSgpW2tleV0gfHwgbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SXRlbShrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFN0b3JhZ2VTdGF0ZSA9IGdldFN0b3JhZ2VGcm9tQ29va2llKCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTdGF0ZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICBzYXZlU3RvcmFnZVRvQ29va2llKEpTT04uc3RyaW5naWZ5KGxvY2FsU3RvcmFnZVN0YXRlKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUl0ZW0oa2V5KSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFN0b3JhZ2VTdGF0ZSA9IGdldFN0b3JhZ2VGcm9tQ29va2llKCk7XG4gICAgICAgICAgICBkZWxldGUgbG9jYWxTdG9yYWdlU3RhdGVba2V5XTtcbiAgICAgICAgICAgIHNhdmVTdG9yYWdlVG9Db29raWUoSlNPTi5zdHJpbmdpZnkobG9jYWxTdG9yYWdlU3RhdGUpKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXIoKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFN0b3JhZ2VTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgc2F2ZVN0b3JhZ2VUb0Nvb2tpZShKU09OLnN0cmluZ2lmeShsb2NhbFN0b3JhZ2VTdGF0ZSkpO1xuICAgICAgICB9LFxuICAgICAgICBrZXkobikge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlU3RhdGUgPSBnZXRTdG9yYWdlRnJvbUNvb2tpZSgpO1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZVN0YXRlKTtcbiAgICAgICAgICAgIGlmIChuID4ga2V5cy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGtleXNbbl07XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFN0b3JhZ2VTdGF0ZSA9IGdldFN0b3JhZ2VGcm9tQ29va2llKCk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlU3RhdGUpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnQgY29uc3Qgc2V0Q29va2llID0gKG5hbWUsIHZhbHVlLCB0dGxNaW51dGVzKSA9PiB7XG4gICAgbGV0IGV4cGlyZXMgPSBcIlwiO1xuICAgIGlmICh0dGxNaW51dGVzKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAodHRsTWludXRlcyAqIDYwICogMTAwMCkpO1xuICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvVVRDU3RyaW5nKCk7XG4gICAgfVxuICAgIC8vIEhhbmRsZSB0aGUgdXBjb21pbmcgZm9yY2VkIHN3aXRjaCB0byBTYW1lU2l0ZSAmIFNlY3VyZSBwYXJhbXMgaHR0cHM6Ly93d3cuY2hyb21lc3RhdHVzLmNvbS9mZWF0dXJlLzU2MzM1MjE2MjIxODgwMzJcbiAgICAvLyBTaW5jZSB0aGlzIGlzIGEgZ2VuZXJpYyBsaWJyYXJ5LCB3ZSBjYW4ndCByZXN0cmljdCB0aGUgZG9tYWluIHVuZGVyIHdoaWNoIGl0J3MgYmVlaW5nIHNlcnZlZCwgdGh1cyBub3Qgc2V0dGluZyBkb21haW5cbiAgICAvLyBmb3IgdGhlIGNvb2tpZS4gSXQncyB1c3VhbGx5IGxvYWRlZCBhbmQgc3Vic2VxdWVudGx5IHJlcXVlc3RlZCBmcm9tIGEgdGhpcmQtcGFydHkgZG9tYWluLCB0aHVzIHdlIG5lZWQgdG8gc3BlY2lmeSBTYW1lU2l0ZT1Ob25lIHdoaWNoXG4gICAgLy8gcGVyIHRoZSBsYXRlc3Qgc3BlY2lmaWNhdGlvbnMgcmVxdWlyZXMgdGhlIFNlY3VyZSBhdHRyaWJ1dGUuXG4gICAgLy9cbiAgICAvLyBUbyBhbGxvdyBsb2NhbCBkZWJ1Z2dpbmcsIHdlIHdvbid0IHNldCB0aGVzZSB3aGVuIGxvYWRlZCBvbiBsb2NhbGhvc3QuIE5vdGUsIGFmdGVyIHRoaXMgY2hhbmdlLCB5b3Ugd29uJ3QgYmUgYWJsZSB0byBzZXJ2ZVxuICAgIC8vIHRoZSBjb2xsZWN0b3IgdG8gcmVhbCBjbGllbnRzIG92ZXIgbm9uLWh0dHBzIGNvbm5lY3Rpb25zIC0gdGhlIHNlc3Npb24gY29va2llcyB3b24ndCBtYXRjaFxuICAgIGNvbnN0IHNhbWVTaXRlID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiID8gXCJcIiA6IFwiOyBTYW1lU2l0ZT1Ob25lOyBTZWN1cmVcIjtcbiAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyAodmFsdWUgfHwgXCJcIikgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiICsgc2FtZVNpdGU7XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCBnZXRDb29raWUgPSAoY25hbWUpID0+IHtcbiAgICBjb25zdCBuYW1lID0gY25hbWUgKyBcIj1cIjtcbiAgICBjb25zdCBkZWNvZGVkQ29va2llID0gZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LmNvb2tpZSk7XG4gICAgY29uc3QgY2EgPSBkZWNvZGVkQ29va2llLnNwbGl0KCc7Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYyA9IGNhW2ldO1xuICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT0gJyAnKSB7XG4gICAgICAgICAgICBjID0gYy5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lKSA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbn07XG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3RcbiAqIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAqIE4gbWlsbGlzZWNvbmRzLiBJZiBgaW1tZWRpYXRlYCBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZVxuICogbGVhZGluZyBlZGdlLCBpbnN0ZWFkIG9mIHRoZSB0cmFpbGluZy4gVGhlIGZ1bmN0aW9uIGFsc28gaGFzIGEgcHJvcGVydHkgJ2NsZWFyJ1xuICogdGhhdCBpcyBhIGZ1bmN0aW9uIHdoaWNoIHdpbGwgY2xlYXIgdGhlIHRpbWVyIHRvIHByZXZlbnQgcHJldmlvdXNseSBzY2hlZHVsZWQgZXhlY3V0aW9ucy5cbiAqXG4gKiBAc291cmNlIHVuZGVyc2NvcmUuanNcbiAqIEBzZWUgaHR0cDovL3Vuc2NyaXB0YWJsZS5jb20vMjAwOS8wMy8yMC9kZWJvdW5jaW5nLWphdmFzY3JpcHQtbWV0aG9kcy9cbiAqIEBwYXJhbSBmdW5jIHtGdW5jdGlvbn0gZnVuY3Rpb24gdG8gd3JhcFxuICogQHBhcmFtIHdhaXQge051bWJlcn0gdGltZW91dCBpbiBtcyAoYDEwMGApXG4gKiBAcGFyYW0gaW1tZWRpYXRlIHtCb29sZWFufSB3aGV0aGVyIHRvIGV4ZWN1dGUgYXQgdGhlIGJlZ2lubmluZyAoYGZhbHNlYClcbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBkZWJvdW5jZSA9IChmdW5jLCB3YWl0ID0gMTAwLCBpbW1lZGlhdGUgPSBmYWxzZSkgPT4ge1xuICAgIHZhciB0aW1lb3V0LCBhcmdzLCBjb250ZXh0LCB0aW1lc3RhbXAsIHJlc3VsdDtcbiAgICBmdW5jdGlvbiBsYXRlcigpIHtcbiAgICAgICAgdmFyIGxhc3QgPSBEYXRlLm5vdygpIC0gdGltZXN0YW1wO1xuICAgICAgICBpZiAobGFzdCA8IHdhaXQgJiYgbGFzdCA+PSAwKSB7XG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGRlYm91bmNlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICBpZiAoIXRpbWVvdXQpXG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBkZWJvdW5jZWQuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZGVib3VuY2VkLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gZGVib3VuY2VkO1xufTtcbiIsImV4cG9ydCAqIGZyb20gXCIuL0NvbnRleHRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0xpc3RlbmVyVHlwZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vTG9jYWxTdG9yYWdlUXVldWVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1NlbnRpbmVsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9VdGlsXCI7XG4iLCJpbXBvcnQgeyBiYXNlNjRFbmNvZGUgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBCYXNlNjRFbmNvZGVXcml0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICB9XG4gICAgd3JpdGUoZGF0YSkge1xuICAgICAgICBjb25zdCBkID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUud3JpdGUoYmFzZTY0RW5jb2RlKGVuY29kZVVSSUNvbXBvbmVudChkKSkpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBCcm93c2VyVHJhY2tpbmdXcml0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlbGVnYXRlLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgd3JpdGUoZGF0YSkge1xuICAgICAgICBjb25zdCB7IHJlY29yZFVybCwgcmVjb3JkUmVmZXJyZXIsIHJlY29yZExhbmd1YWdlIH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGlmIChyZWNvcmRVcmwgJiYgIWRhdGEudXJsKVxuICAgICAgICAgICAgZGF0YS51cmwgPSB0aGlzLmdldFdpbmRvdygpLmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIGlmIChyZWNvcmRSZWZlcnJlciAmJiAhZGF0YS5yZWYpXG4gICAgICAgICAgICBkYXRhLnJlZiA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5yZWZlcnJlcjtcbiAgICAgICAgaWYgKHJlY29yZExhbmd1YWdlICYmICFkYXRhLmxhbmcpXG4gICAgICAgICAgICBkYXRhLmxhbmcgPSB0aGlzLmdldFdpbmRvdygpLm5hdmlnYXRvci5sYW5ndWFnZTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS53cml0ZShkYXRhKTtcbiAgICB9XG4gICAgZ2V0RG9jdW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGV4dCB9ID0gdGhpcy5vcHRpb25zO1xuICAgICAgICByZXR1cm4gY29udGV4dCA/IGNvbnRleHQuZ2V0RG9jdW1lbnQoKSA6IGRvY3VtZW50O1xuICAgIH1cbiAgICBnZXRXaW5kb3coKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGV4dCB9ID0gdGhpcy5vcHRpb25zO1xuICAgICAgICByZXR1cm4gY29udGV4dCA/IGNvbnRleHQuZ2V0V2luZG93KCkgOiB3aW5kb3c7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTG9jYWxTdG9yYWdlUXVldWUgfSBmcm9tIFwiLi4vdXRpbHMvTG9jYWxTdG9yYWdlUXVldWVcIjtcbi8qKlxuICogQSB3cml0ZXIgdGhhdCBidWZmZXJzIHRoZSBpbmNvbWluZyBldmVudHMgaW4gYSBsb2NhbCBzdG9yYWdlIHF1ZXVlIGFuZCB3cml0ZXNcbiAqIHRoZW0gb3V0IGluIGJhdGNoZXMgZXZlcnkgc2Vjb25kLiBJZiB0aGUgcXVldWUgaXMgbm90IGVtcHR5LCB3aGVuIHRoZSB0aW1lciB0aWNrc1xuICogdGhlIHdyaXRlciB3aWxsIHNlbmQgdGhlIGF2YWlsYWJsZSBkYXRhIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGVyZSBhcmUgY29sbGVjdG9yIGV2ZW50cyBpLmUuXG4gKiBldmVuIGluIHRpbWVzIG9mIGluYWN0aXZpdHkgb3Igd2hlbiBsb2FkaW5nIHRoZSBwYWdlIGFuZCBwcmV2aW91cyBzdGF0ZSBpcyBhdmFpbGFibGUuXG4gKlxuICogVGhlIHdyaXRlciB3aWxsIGFsc28gdHJ5IHRvIHNlbmQgdGhlIGF2YWlsYWJsZSBkYXRhIG9uIGJyb3dzZXIgdW5sb2FkIGV2ZW50LlxuICovXG5leHBvcnQgY2xhc3MgQnVmZmVyaW5nV3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgaWQsIHRpbWVyTXMgPSAxMDAwKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5xdWV1ZSA9IG5ldyBMb2NhbFN0b3JhZ2VRdWV1ZShpZCk7XG4gICAgICAgIHRoaXMudGltZXJNcyA9IHRpbWVyTXM7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMuZmx1c2guYmluZCh0aGlzKSwgdGltZXJNcyk7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICB9XG4gICAgd3JpdGUoZGF0YSkge1xuICAgICAgICB0aGlzLnF1ZXVlLnB1c2goZGF0YSk7XG4gICAgfVxuICAgIGZsdXNoKGNhbmNlbFRpbWVyKSB7XG4gICAgICAgIGlmICh0aGlzLnF1ZXVlLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBicm93c2VyIHNodXRzZG93biBiZWZvcmUgdGhlIHdyaXRlIGlzIGNvbXBsZXRlXG4gICAgICAgICAgICB0aGlzLnF1ZXVlLnRyYW5zYWN0aW9uYWxEcmFpbihxdWV1ZSA9PiBuZXcgUHJvbWlzZShyZXMgPT4gcmVzKHRoaXMuZGVsZWdhdGUud3JpdGUocXVldWUpKSkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKFwiY291bGQgbm90IGRyYWluIHF1ZXVlOiBcIiwgZXJyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYW5jZWxUaW1lcikge1xuICAgICAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQodGhpcy5mbHVzaC5iaW5kKHRoaXMpLCB0aGlzLnRpbWVyTXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENvbnNvbGVXcml0ZXIge1xuICAgIHdyaXRlKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkNvbnNvbGVXcml0ZXIgcmVjZWl2aW5nIG5ldyBkYXRhOiBcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogTG9ncyB0aGUgZGF0YSB0byB0aGUgYnJvd3NlciBjb25zb2xlIHVzaW5nIGNvbnNvbGUuZGVidWdcbiAqL1xuZXhwb3J0IGNsYXNzIERlYnVnV3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgZGVidWcpIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICB0aGlzLmRlYnVnID0gZGVidWc7XG4gICAgfVxuICAgIHdyaXRlKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVidWcpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS53cml0ZShkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTUVNFdmVudFdyaXRlciB9IGZyb20gXCIuL1NRU0V2ZW50V3JpdGVyXCI7XG5pbXBvcnQgeyBSZXN0RXZlbnRXcml0ZXIgfSBmcm9tIFwiLi9SZXN0RXZlbnRXcml0ZXJcIjtcbmltcG9ydCB7IEJ1ZmZlcmluZ1dyaXRlciB9IGZyb20gXCIuL0J1ZmZlcmluZ1dyaXRlclwiO1xuaW1wb3J0IHsgQmFzZTY0RW5jb2RlV3JpdGVyIH0gZnJvbSBcIi4vQmFzZTY0RW5jb2RlV3JpdGVyXCI7XG5pbXBvcnQgeyBKU09ORW52ZWxvcGVXcml0ZXIgfSBmcm9tIFwiLi9KU09ORW52ZWxvcGVXcml0ZXJcIjtcbmltcG9ydCB7IFRyYWlsV3JpdGVyIH0gZnJvbSBcIi4vVHJhaWxXcml0ZXJcIjtcbmltcG9ydCB7IEJyb3dzZXJUcmFja2luZ1dyaXRlciB9IGZyb20gXCIuL0Jyb3dzZXJUcmFja2luZ1dyaXRlclwiO1xuaW1wb3J0IHsgRGVidWdXcml0ZXIgfSBmcm9tIFwiLi9EZWJ1Z1dyaXRlclwiO1xuaW1wb3J0IHsgUXVlcnlXcml0ZXIgfSBmcm9tIFwiLi9RdWVyeVdyaXRlclwiO1xuaW1wb3J0IHsgVHJhaWwgfSBmcm9tIFwiLi4vcXVlcnkvVHJhaWxcIjtcbmV4cG9ydCBjbGFzcyBEZWZhdWx0V3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHsgZW5kcG9pbnQsIHNxcyB9ID0gb3B0aW9ucztcbiAgICAgICAgLy8gV3JpdGVyIHBpcGVsaW5lLCBhZGQvcmVtb3ZlIHBpZWNlcyBhY2NvcmRpbmcgdG8gdXNlIGNhc2VcbiAgICAgICAgLy8gVGhpcyB3cml0ZXIgcGlwZWxpbmUgd2lsbCBzZW5kIEJhc2U2NCBlbmNvZGVkIGFycmF5IG9mIGpzb24gZXZlbnRzXG4gICAgICAgIGxldCB3cml0ZXIgPSBpc1NRUyhlbmRwb2ludCwgc3FzKSA/IG5ldyBTUVNFdmVudFdyaXRlcihlbmRwb2ludCkgOiBuZXcgUmVzdEV2ZW50V3JpdGVyKGVuZHBvaW50KTtcbiAgICAgICAgd3JpdGVyID0gbmV3IEJhc2U2NEVuY29kZVdyaXRlcih3cml0ZXIpO1xuICAgICAgICB3cml0ZXIgPSBuZXcgQnVmZmVyaW5nV3JpdGVyKHdyaXRlciwgXCJidWZmZXI6XCIgKyBvcHRpb25zLmVuZHBvaW50KTtcbiAgICAgICAgd3JpdGVyID0gbmV3IERlYnVnV3JpdGVyKHdyaXRlciwgb3B0aW9ucy5kZWJ1Zyk7XG4gICAgICAgIHdyaXRlciA9IG5ldyBRdWVyeVdyaXRlcih3cml0ZXIsIG9wdGlvbnMucmVzb2x2ZXIucXVlcnlSZXNvbHZlcik7XG4gICAgICAgIHdyaXRlciA9IG5ldyBUcmFpbFdyaXRlcih3cml0ZXIsIG9wdGlvbnMudHJhaWwgfHwgbmV3IFRyYWlsKG9wdGlvbnMucmVzb2x2ZXIucXVlcnlSZXNvbHZlciwgb3B0aW9ucy5yZXNvbHZlci5zZXNzaW9uUmVzb2x2ZXIpLCBvcHRpb25zLnJlc29sdmVyLnF1ZXJ5UmVzb2x2ZXIpO1xuICAgICAgICB3cml0ZXIgPSBuZXcgSlNPTkVudmVsb3BlV3JpdGVyKHdyaXRlciwgb3B0aW9ucy5yZXNvbHZlci5zZXNzaW9uUmVzb2x2ZXIsIG9wdGlvbnMuY2hhbm5lbCk7XG4gICAgICAgIHdyaXRlciA9IG5ldyBCcm93c2VyVHJhY2tpbmdXcml0ZXIod3JpdGVyLCB7XG4gICAgICAgICAgICByZWNvcmRSZWZlcnJlcjogb3B0aW9ucy5yZWNvcmRSZWZlcnJlcixcbiAgICAgICAgICAgIHJlY29yZFVybDogb3B0aW9ucy5yZWNvcmRVcmwsXG4gICAgICAgICAgICByZWNvcmRMYW5ndWFnZTogb3B0aW9ucy5yZWNvcmRMYW5ndWFnZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy53cml0ZXIgPSB3cml0ZXI7XG4gICAgfVxuICAgIHdyaXRlKGRhdGEpIHtcbiAgICAgICAgdGhpcy53cml0ZXIud3JpdGUoZGF0YSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaXNTUVMoZW5kcG9pbnQsIGZvcmNlU1FTKSB7XG4gICAgcmV0dXJuIGZvcmNlU1FTIHx8IChlbmRwb2ludC5pbmRleE9mKFwic3FzXCIpICE9IC0xICYmIGVuZHBvaW50LmluZGV4T2YoXCJhbWF6b25hd3MuY29tXCIpICE9IC0xKTtcbn1cbiIsIi8qKlxuICogV3JhcCB0aGUgZXZlbnRzIGluIGEgSlNPTiBlbnZlbG9wZSwgZW5yaWNoIGVhY2ggcmVjb3JkIHdpdGggdGltZXN0YW1wLCBzZXNzaW9uIGFuZCBjaGFubmVsIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgSlNPTkVudmVsb3BlV3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgc2Vzc2lvblJlc29sdmVyLCBjaGFubmVsKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5zZXNzaW9uUmVzb2x2ZXIgPSBzZXNzaW9uUmVzb2x2ZXI7XG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XG4gICAgfVxuICAgIHdyaXRlKGRhdGEpIHtcbiAgICAgICAgZGF0YS50aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgZGF0YS5zZXNzaW9uID0gdGhpcy5zZXNzaW9uUmVzb2x2ZXIoKTtcbiAgICAgICAgZGF0YS5jaGFubmVsID0gdGhpcy5jaGFubmVsO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLndyaXRlKGRhdGEpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQXBwZW5kcyB0aGUgcXVlcnkgdG8gdGhlIGRhdGEgaWYgbm8gcXVlcnkgcHJvcGVydHkgZXhpc3RzXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWVyeVdyaXRlciB7XG4gICAgY29uc3RydWN0b3IoZGVsZWdhdGUsIHF1ZXJ5UmVzb2x2ZXIpIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICB0aGlzLnF1ZXJ5UmVzb2x2ZXIgPSBxdWVyeVJlc29sdmVyO1xuICAgIH1cbiAgICB3cml0ZShkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YS5xdWVyeSlcbiAgICAgICAgICAgIGRhdGEucXVlcnkgPSB0aGlzLnF1ZXJ5UmVzb2x2ZXIoKS50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLndyaXRlKGRhdGEpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogU3RyYWlnaHQtZm9yd2FyZCBSRVNUIHdyaXRlIHZpYSBHRVQgcmVxdWVzdFxuICovXG5leHBvcnQgY2xhc3MgUmVzdEV2ZW50V3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbmRwb2ludCkge1xuICAgICAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQ7XG4gICAgfVxuICAgIHdyaXRlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSB0aGlzLmVuZHBvaW50ICsgXCI/ZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTUVNFdmVudFdyaXRlciB7XG4gICAgY29uc3RydWN0b3IocXVldWUsIGZpZm8gPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnF1ZXVlID0gcXVldWU7XG4gICAgICAgIHRoaXMuZmlmbyA9IGZpZm87XG4gICAgfVxuICAgIHdyaXRlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGxldCBzcmMgPSB0aGlzLnF1ZXVlICsgXCI/VmVyc2lvbj0yMDEyLTExLTA1JkFjdGlvbj1TZW5kTWVzc2FnZVwiO1xuICAgICAgICAvLyBTUVMgc3VwcG9ydHMgRklGTyBxdWV1ZXMgaW4gc29tZSByZWdpb25zIHRoYXQgY2FuIGFsc28gZ3VhcmFudGVlIHRoZSBvcmRlclxuICAgICAgICAvLyBvZiB0aGUgbWVzc2FnZXMuXG4gICAgICAgIGlmICh0aGlzLmZpZm8pIHtcbiAgICAgICAgICAgIC8vIFRPRE8gd2hlbiBlbm91Z2ggaW5mb3JtYXRpb24gaXMgcHJlc2VudCB0byB1bmlxdWVseSBpZGVudGlmeSBhIG1lc3NhZ2UsIHN3aXRjaCB0aGUgZGVkdXBsaWNhdGlvbiBpZCB0byBhIG1lc3NhZ2UgaGFzaFxuICAgICAgICAgICAgc3JjICs9IFwiJk1lc3NhZ2VHcm91cElkPTEmTWVzc2FnZURlZHVwbGljYXRpb25JZD1cIiArIE1hdGgucmFuZG9tKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgc3JjICs9IFwiJk1lc3NhZ2VCb2R5PVwiICsgZGF0YTtcbiAgICAgICAgaW1nLnNyYyA9IHNyYztcbiAgICB9XG59XG4iLCIvKipcbiAqIENhbGxzIGFsbCB3cml0ZXJzIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgZXJyb3Igc2FmZVxuICovXG5leHBvcnQgY2xhc3MgU3BsaXRTdHJlYW1Xcml0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHdyaXRlcnMpIHtcbiAgICAgICAgdGhpcy53cml0ZXJzID0gd3JpdGVycztcbiAgICB9XG4gICAgd3JpdGUoZGF0YSkge1xuICAgICAgICBmb3IgKGxldCB3cml0ZXIgb2YgdGhpcy53cml0ZXJzKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHdyaXRlci53cml0ZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkIG5vdCB3cml0ZSBkYXRhOiBcIiwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVHJhaWxXcml0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlbGVnYXRlLCB0cmFpbCwgcXVlcnlSZXNvbHZlcikge1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMudHJhaWwgPSB0cmFpbDtcbiAgICAgICAgdGhpcy5xdWVyeVJlc29sdmVyID0gcXVlcnlSZXNvbHZlcjtcbiAgICB9XG4gICAgd3JpdGUoZGF0YSkge1xuICAgICAgICBjb25zdCBxID0gdGhpcy5xdWVyeVJlc29sdmVyKCk7XG4gICAgICAgIGlmICgoIXEgfHwgIXEuaXNWYWxpZCgpKSAmJiAhZGF0YS5xdWVyeSAmJiB0aGlzLmlzQXBwZW5kVHJhaWwoZGF0YSkpIHtcbiAgICAgICAgICAgIC8vIFNlZSBpZiB3ZSBoYXZlIGEgcGF5bG9hZCBpZCBhbmQgYSB0cmFpbCBmb3IgaXQuIFRoaXMgbWVhbnMgd2VcbiAgICAgICAgICAgIC8vIGFyZSBjb2xsZWN0aW5nIGRhdGEgZm9yIGFuIGV2ZW50IHRoYXQgZG9lcyBub3QgaGF2ZSBhIHF1ZXJ5IGNvbnRleHRcbiAgICAgICAgICAgIC8vIG9uIHRoZSBwYWdlIGFueW1vcmUgYnV0IHdlIHdhbnQgdG8gYXNzb2NpYXRlIHRoZSBldmVudCB3aXRoIHRoZSBxdWVyeVxuICAgICAgICAgICAgLy8gY29udGV4dCBvZiB0aGUgb3JpZ2luYWwgc2VhcmNoIHJlc3VsdFxuICAgICAgICAgICAgdGhpcy5hcHBlbmRUcmFpbChkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlbGVnYXRlLndyaXRlKGRhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBlbmQgdGhlIFRyYWlsIGlmIGFueVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhcHBlbmRUcmFpbChkYXRhKSB7XG4gICAgICAgIGNvbnN0IHRyYWlsID0gdGhpcy50cmFpbC5mZXRjaCh0aGlzLmdldElkKGRhdGEpKTtcbiAgICAgICAgaWYgKHRyYWlsICYmIHRyYWlsLnF1ZXJ5KSB7XG4gICAgICAgICAgICBkYXRhLnF1ZXJ5ID0gdHJhaWwucXVlcnk7XG4gICAgICAgICAgICBkYXRhLnF1ZXJ5VGltZSA9IHRyYWlsLnRpbWVzdGFtcDtcbiAgICAgICAgICAgIGRhdGEudHJhaWxUeXBlID0gdHJhaWwudHlwZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBmb3IgbGVnYWN5IHN1cHBvcnQ6IHNvbWV0aW1lcyBkYXRhIHdhcyB3cmFwcGVkIGluIHByb3BlcnR5IGNhbGxlZCBcImRhdGFcIlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRJZChkYXRhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKGRhdGEpXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5pZCB8fCAoKF9hID0gZGF0YS5kYXRhKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFdmFsdWF0ZXMgaWYgdGhlIFRyYWlsIHNob3VsZCBiZSBhcHBlbmRlZCB0byB0aGlzIGV2ZW50XG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGlzQXBwZW5kVHJhaWwoZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YSAmJiBbXCJjaGVja291dFwiLCBcImJhc2tldFwiLCBcImZpbHRlclwiXS5pbmRleE9mKGRhdGEudHlwZSkgPiAtMTtcbiAgICAgICAgLy8gVEE6IFRoaXMgd2FzIHByZXZpb3VzbHkgXCJkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLmlkICYmIHRoaXMudHJhaWxcIlxuICAgICAgICAvLyB0aGUgb25seSBDb2xsZWN0b3JzIGFwcGVuZGluZyBhIHByb3BlcnR5IGNhbGxlZCBcImRhdGFcIiB0byBpdHMgZXZlbnQgYXJlIENsaWNrQ29sbGVjdG9yIGkuZS5cbiAgICAgICAgLy8gQ2hlY2tvdXRDbGlja0NvbGxlY3RvciwgQmFza2V0Q2xpY2tDb2xsZWN0b3IsIEZpbHRlckNsaWNrQ29sbGVjdG9yXG4gICAgICAgIC8vIEkndmUgcmVmYWN0b3JlZCB0aGlzIGltcGxpY2l0IGNvbmRpdGlvbiB0byB0aGlzIGZ1bmN0aW9uXG4gICAgICAgIC8vIFRPRE8gdmFsaWRhdGUgaWYgdGhpbmdzIHdpbGwgYnJlYWsgd2l0aCBuZXcgaW1wbFxuICAgIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gXCIuL0Jhc2U2NEVuY29kZVdyaXRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQnVmZmVyaW5nV3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9EZWZhdWx0V3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9KU09ORW52ZWxvcGVXcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1Jlc3RFdmVudFdyaXRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vU3BsaXRTdHJlYW1Xcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1NRU0V2ZW50V3JpdGVyXCI7XG4iLCJleHBvcnQgKiBmcm9tIFwiLi9CYXNlNjRFbmNvZGVXcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0Jyb3dzZXJUcmFja2luZ1dyaXRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vQnVmZmVyaW5nV3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Db25zb2xlV3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9EZWJ1Z1dyaXRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vRGVmYXVsdFdyaXRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vSlNPTkVudmVsb3BlV3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9RdWVyeVdyaXRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vUmVzdEV2ZW50V3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9TcGxpdFN0cmVhbVdyaXRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vU1FTRXZlbnRXcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1RyYWlsV3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Xcml0ZXJcIjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgKiBmcm9tIFwiLi9Db2xsZWN0b3JNb2R1bGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2NvbGxlY3RvcnMvXCI7XG5leHBvcnQgKiBmcm9tIFwiLi93cml0ZXJzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9xdWVyeVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vbG9nZ2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9yZXNvbHZlcnNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3V0aWxzXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=