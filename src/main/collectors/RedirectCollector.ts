import {AbstractCollector} from "./AbstractCollector";
import {Context} from "../utils/Context";
import {
	BooleanResolver,
	CallbackResolver,
	cookieSessionResolver,
	NumberResolver,
	StringResolver
} from "../resolvers/Resolver";
import {getSessionStorage, ListenerType, Sentinel} from "../utils";
import {Query, Trail, TrailType} from "../query";

export type RedirectKpiCollectorParams = {
	resultCountResolver?: NumberResolver
	collectors?: Array<AbstractCollector>,
	maxPathSegments?: number,
	nestedRedirects?: {
		subSelectors?: string[],
		depth?: number
	},
	redirectTTLMillis?: number
}

interface NestedRedirect {
	query: string,
	depth: number
}

/**
 * Keep track of human triggered searches followed by a redirect to a page different than the search result page
 */
export class RedirectCollector extends AbstractCollector {

	/**
	 * Key used to store the keywords of the last executed search
	 */
	private static LAST_SEARCH_STORAGE_KEY = "__lastSearch";

	/**
	 * Key used to store query information for a given redirect landing page (path of the url)
	 */
	private static PATH_STORAGE_KEY = "___pathStorage";

	private static NESTED_REDIRECT_KEYWORDS_STORAGE_KEY = "___nestedRedirectKeywordsStorage";

	private readonly resultCountResolver: NumberResolver;
	private readonly collectors: Array<AbstractCollector>;
	private readonly queryResolver: (phrase) => Query;
	private readonly sessionResolver: StringResolver;
	private readonly redirectTTL: number;
	private readonly redirectTrail: Trail;

	/**
	 * Sub selectors to use when searching for elements which trigger redirects that are associated to the initial search query
	 * @private
	 */
	private readonly subSelectors: string[];

	/**
	 * Maximum number of path segments to store in the path storage
	 * @default -1 (unlimited)
	 * @private
	 */
	private readonly maxPathSegments: number;

	/**
	 * Maximum depth of nested redirects to track
	 * @default 1
	 * @private
	 */
	private readonly depth: number;

	/**
	 * Used to track if the collectors have been attached already in case attached is called multiple times
	 * @private
	 */
	private isCollectorsAttached = false;

	/**
	 * Used to track if the trigger has been installed already in case attached is called multiple times
	 */
	private isTriggerInstalled = false;

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
	constructor(private readonly triggerResolver: CallbackResolver,
							private readonly expectedPageResolver: BooleanResolver,
							private readonly redirectKpiParams: RedirectKpiCollectorParams = {},
							private readonly listenerType = ListenerType.Sentinel,
							context?: Context) {
		super("redirect", context);
		this.triggerResolver = triggerResolver;
		this.expectedPageResolver = expectedPageResolver;
		this.listenerType = listenerType;

		this.collectors = redirectKpiParams.collectors || [];
		this.resultCountResolver = redirectKpiParams.resultCountResolver || (_ => void 0);
		this.redirectTTL = this.redirectKpiParams.redirectTTLMillis || 86400000;
		this.maxPathSegments = this.redirectKpiParams.maxPathSegments || -1;

		this.subSelectors = this.redirectKpiParams.nestedRedirects?.subSelectors || [];
		this.depth = this.redirectKpiParams.nestedRedirects?.depth || 1;

		this.queryResolver = (phrase: string) => {
			if (phrase.indexOf("$s=") > -1) {
				return new Query(phrase);
			}
			const query = new Query();
			query.setSearch(phrase);
			return query;
		};

		this.sessionResolver = () => cookieSessionResolver();

		this.redirectTrail = new Trail(() => {
			const pathInfo = RedirectCollector.getRedirectPathInfo(this.getPathname());
			return new Query(pathInfo?.query);
		}, this.sessionResolver);
	}

	public setContext(context: Context) {
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
	private static setRedirectPath(path: string, query: string, key: string = RedirectCollector.PATH_STORAGE_KEY) {
		const redirectPaths = this.getRedirectPaths();
		redirectPaths[path] = {
			query,
			timestamp: new Date().getTime()
		};

		getSessionStorage().setItem(key, JSON.stringify(redirectPaths));
	}

	/**
	 * Get all marked paths
	 * @private
	 */
	private static getRedirectPaths(key: string = RedirectCollector.PATH_STORAGE_KEY) {
		return JSON.parse(getSessionStorage().getItem(key) || "{}");
	}

	/**
	 * Retrieve data for the given path
	 * @param path
	 * @param key
	 * @private
	 */
	private static getRedirectPathInfo(path: string, key: string = RedirectCollector.PATH_STORAGE_KEY) {
		return this.getRedirectPaths(key)[path];
	}

	/**
	 * Delete all expired redirect paths
	 * @private
	 */
	private expireRedirectPaths(key: string = RedirectCollector.PATH_STORAGE_KEY) {
		const redirectPaths = RedirectCollector.getRedirectPaths(key);
		const now = new Date().getTime();
		Object.keys(redirectPaths).forEach(path => {
			const pathInfo = redirectPaths[path];
			if (now - Number(pathInfo.timestamp) > this.redirectTTL) {
				delete redirectPaths[path];
			}
		});
		getSessionStorage().setItem(key, JSON.stringify(redirectPaths));
	}

	/**
	 * Check whether we should be recording a redirect event
	 *
	 * @param {object} writer - The writer to send the data to
	 * @param log
	 */
	attach(writer, log) {
		if (this.isTriggerInstalled === false) {
			this.resolve(this.triggerResolver, log, keyword => getSessionStorage().setItem(RedirectCollector.LAST_SEARCH_STORAGE_KEY, keyword));
			this.isTriggerInstalled = true;
		}

		this.expireRedirectPaths();

		// Fetch the latest search if any
		const lastSearch = getSessionStorage().getItem(RedirectCollector.LAST_SEARCH_STORAGE_KEY);

		if (lastSearch) {
			getSessionStorage().removeItem(RedirectCollector.LAST_SEARCH_STORAGE_KEY);

			// If we have not landed on the expected search page, it must have been a redirect
			if (shouldTrackRedirect(document.referrer) && !this.resolve(this.expectedPageResolver, log)) {
				const query = this.queryResolver(lastSearch).toString()
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
				this.redirectTrail.register(window.location.pathname, TrailType.Main, query);
			}
		}

		// this is only  triggered when a subSelector item was clicked i.e. a nested redirect
		const lastSearchNestedRedirect = this.getNestedRedirect();
		if (lastSearchNestedRedirect) {
			const query = this.queryResolver(lastSearchNestedRedirect.query).toString();
			RedirectCollector.setRedirectPath(this.getPathname(), query);
			// register trail on the current pathname because the ProductClick collector doesn't know about the maxPathSegments property

			this.redirectTrail.register(window.location.pathname, TrailType.Main, query);
			getSessionStorage().removeItem(RedirectCollector.NESTED_REDIRECT_KEYWORDS_STORAGE_KEY);
		}

		/**
		 * Check if we have tracked this path before and if it is still valid.
		 * If valid, we have to attach the KPI collectors to gather KPIs for this landing page.
		 * We have to do this because people can navigate away from the landing page and back again and we don't want to lose all subsequent clicks etc.
		 */
		const pathInfo = RedirectCollector.getRedirectPathInfo(this.getPathname());
		if (pathInfo && this.isCollectorsAttached !== true) {
			this.attachCollectors(writer, log, pathInfo.query);
			this.isCollectorsAttached = true;

			// register trail on the current pathname because the ProductClick collector doesn't know about the maxPathSegments property
			this.redirectTrail.register(window.location.pathname, TrailType.Main, new Query(pathInfo.query).toString());

			// if we have nested redirects, we have to carry the query parameters over to the next page
			this.attachSubSelectors(pathInfo, lastSearchNestedRedirect?.depth || 0);
		}
	}

	private getNestedRedirect(): NestedRedirect | undefined {
		const payload = getSessionStorage().getItem(RedirectCollector.NESTED_REDIRECT_KEYWORDS_STORAGE_KEY);
		if (payload) {
			return JSON.parse(payload) as NestedRedirect;
		}
		return undefined;
	}

	private isMaxDepthExceeded(currentDepth: number = 0) {
		return currentDepth >= this.depth;
	}

	private registerNestedRedirect(query: string, currentDepth: number = 0) {
		if (this.isMaxDepthExceeded(currentDepth))
			return;

		const payload = {
			query: query,
			depth: currentDepth + 1
		};

		getSessionStorage().setItem(RedirectCollector.NESTED_REDIRECT_KEYWORDS_STORAGE_KEY, JSON.stringify(payload));
	}

	private attachSubSelectors(pathInfo, currentDepth: number) {
		if (this.isMaxDepthExceeded(currentDepth))
			return;

		this.subSelectors.forEach(selector => {
			const handleClick = () => {
				this.registerNestedRedirect(pathInfo.query, currentDepth);
			}

			if (this.listenerType === ListenerType.Sentinel) {
				const sentinel = new Sentinel(this.getDocument());
				sentinel.on(selector, element => {
					const info = RedirectCollector.getRedirectPathInfo(this.getPathname());
					if (info) { // the sentinel can trigger on any page, we need to make sure we attach subSelectors only on valid redirect paths
						element.addEventListener("click", handleClick);
					}
				})
			} else {
				document.querySelectorAll(selector).forEach(element => {
					element.addEventListener("click", handleClick);
				});
			}
		});
	}

	private getPathname(): string {
		if (this.maxPathSegments > 0) {
			const pathSegments = this.getWindow().location.pathname.split("/");
			return "/" + pathSegments.filter(s => !!s).slice(0, this.maxPathSegments).join("/");
		}
		return this.getWindow().location.pathname;
	}

	private attachCollectors(writer, log, query) {
		// attach all collectors which are responsible to gather kpi's after the redirect
		this.collectors.forEach(collector => {
			try {
				collector.attach({
					write(data) {
						writer.write({...data, query: data.query || query});
					}
				}, log)
			} catch (e) {
				if (log)
					log.error(e);
			}
		});
	}
}


function shouldTrackRedirect(referer: string) {
	if (referer) {
		try {
			const refUrl = new URL(referer);
			const currentUrl = new URL(window.location.href);
			if (currentUrl.origin && refUrl.origin)
				return refUrl.origin === currentUrl.origin;
		} catch (e) {
			console.error(e);
		}
	}

	return true;
}
