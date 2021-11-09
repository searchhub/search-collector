import {Util} from "../utils/Util";
import {cookieResolver} from "./CookieResolver";

const MINUTES_ONE_DAY = 60 * 24;
const MINUTES_HALF_HOUR = 30;

/**
 * Resolve the id of the current search session. A search session is defined as
 * limited time slice of search activity across multiple tabs. By default a session
 * would be considered expired after 30 min of inactivity.
 *
 * In case the resolver is constructed with a cookie name, the session lifecycle
 * will be governed by the lifecycle of that cookie. Otherwise the resolver will
 * set its own cookie.
 */
export const cookieSessionResolver = (name = "SearchCollectorSession"): string => cookieResolver(name) || Util.setCookie(name, Util.generateId(), MINUTES_HALF_HOUR)