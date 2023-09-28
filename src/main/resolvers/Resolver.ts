import {Writer} from "../writers/Writer";
import {Context} from "../utils/Context";
import {generateId, getCookie, getLocalStorage, setCookie} from "../utils/Util";
import {Query} from "../query/Query";

const MINUTES_ONE_DAY = 60 * 24;
const MINUTES_TWO_DAYS = 60 * 24 * 2;
const MINUTES_HALF_HOUR = 30;

export type CallbackResolver = (callback: (...params: any) => void) => void;
export type WriterResolver = (writer: Writer, type: string, context: Context) => void
export type BooleanResolver = (element?: HTMLElement, event?: Event) => boolean | undefined;
export type StringResolver = (element?: HTMLElement, event?: Event) => string | undefined;
export type AnyResolver = (element?: HTMLElement, event?: Event) => any;
export type NumberResolver = (element?: HTMLElement, event?: Event) => number | undefined;
export type QueryResolver = () => Query;

/**
 * Read the cookie with the provided name
 * @param name the name of the cookie
 */
export const cookieResolver = (name: string = ""): string => getCookie(name);

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
 * @param ttlMinutes ttl of the cookie in minutes
 */
export const cookieSessionResolver = (name = "SearchCollectorSession", ttlMinutes = MINUTES_TWO_DAYS): string => setCookie(name, cookieResolver(name) || generateId(), ttlMinutes);

/**
 * Find the position of a DOM element relative to other DOM elements of the same type.
 * To be used to find the position of an item in a search result.
 *
 * @param selectorExpression the css expression to query for other elements
 * @param element the element for which we want to know the position relative to the elements selected by selectorExpression
 * @param ctx the context to use. defaults to new Context(window, document)
 */
export const positionResolver = (selectorExpression: string, element: HTMLElement, ctx: Context = new Context(window, document)): number | undefined => {
	return Array.from(ctx.getDocument().querySelectorAll(selectorExpression))
		.reduce<number | undefined>((acc, node, index) => node === element ? index : acc, undefined);
};

/**
 * This is a persistent debug resolver which stores the debug query parameter across requests.
 */
export const debugResolver = () => {
	const DEBUG_KEY = "__collectorDebug";
	const debugParam = new URLSearchParams(window.location.search).get("debug");
	const isDebugParamExists = debugParam != null;
	if (isDebugParamExists) {
		const debug = debugParam === "true";
		getLocalStorage().setItem(DEBUG_KEY, String(debug));
	}

	return getLocalStorage().getItem(DEBUG_KEY) === "true";
}
