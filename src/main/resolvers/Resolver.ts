import {Writer} from "../writers/Writer";
import {Context} from "../utils/Context";
import {generateId, getCookie, setCookie} from "../utils/Util";
import {Query} from "../query/Query";

const MINUTES_ONE_DAY = 60 * 24;
const MINUTES_HALF_HOUR = 30;

export type CallbackResolver = (callback: (param: any) => void) => void;
export type WriterResolver = (writer: Writer, type: string, context: Context) => void
export type BooleanResolver = (element?: HTMLElement) => boolean;
export type StringResolver = (element?: HTMLElement) => string;
export type NumberResolver = (element?: HTMLElement) => number;
export type QueryResolver = () => Query; //TODO document breaking change

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
 */
export const cookieSessionResolver = (name = "SearchCollectorSession"): string => cookieResolver(name) || setCookie(name, generateId(), MINUTES_HALF_HOUR);

/**
 * Find the position of a DOM element relative to other DOM elements of the same type.
 * To be used to find the position of an item in a search result.
 *
 * @param selectorExpression the css expression to query for other elements
 * @param element the element for which we want to know the position relative to the elements selected by selectorExpression
 */
export const positionResolver = (selectorExpression: string, element: HTMLElement): number | undefined => {
	const position = Array.from(document.querySelectorAll(selectorExpression))
		.reduce((acc, node, index) => node === element ? index : acc, undefined);
	//ts compiler interprets undefined accumulator in reduce as Element
	return position as number | undefined;
};