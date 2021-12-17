/**
 * Parse the browser query string or the passed string into a javascript object
 * with keys the query parameter names and values the corresponding values.
 *
 * @param {string} queryString - the query string to parse, window.location.search if not available
 * @return {object}
 */
export const parseQueryString = (queryString = window.location.search) => {
	return new URLSearchParams(queryString);
}

/**
 * Some browser like Safari prevent accessing localStorage in private mode by throwing exceptions.
 * Use this method to retrieve a mock impl which will at least prevent errors.
 */
export const getLocalStorage = (): Storage => {
	if ("localStorage" in window) {
		try {
			localStorage.getItem("abc"); // access localStorage to trigger incognito mode exceptions
			return localStorage;
		} catch (e) {
			console.error(e);
		}
	}
	return cookieStorage(525600, "__localStorageMock___");
}

/**
 * URL safe base64 encoding
 *
 * @param {string} str - The string to be encoded, only ASCII/ISO-8859-1 supported
 */
export const base64Encode = (str: string) => {
	// Note, + replaced with -, / replaced with _
	const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
	let o1, o2, o3, bits, h1, h2, h3, h4, e = [], pad = '', c;

	c = str.length % 3;  // pad string to length of multiple of 3
	if (c > 0) {
		while (c++ < 3) {
			pad += '=';
			str += '\0';
		}
	}
	// note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars

	for (c = 0; c < str.length; c += 3) {  // pack three octets into four hexets
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
	str = e.join('');  // use Array.join() for better performance than repeated string appends

	// replace 'A's from padded nulls with '='s
	str = str.slice(0, str.length - pad.length) + pad;

	return str;
}

export const generateId = () => {
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let text = "";
	for (let i = 0; i < 7; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export const getSessionStorage = (): Storage => {
	if ("sessionStorage" in window) {
		try {
			sessionStorage.getItem("abc"); // access sessionStorage to trigger incognito mode exceptions
			return sessionStorage;
		} catch (e) {
			console.error(e);
		}
	}
	return cookieStorage(void 0, "__sessionStorageMock___");
}

function cookieStorage(ttlMinutes: number | undefined, storageName: string) {
	const LOCAL_STORAGE_COOKIE_NAME = storageName;

	function getStorageFromCookie() {
		return JSON.parse(getCookie(LOCAL_STORAGE_COOKIE_NAME) || "{}");
	}

	function saveStorageToCookie(data: string) {
		setCookie(LOCAL_STORAGE_COOKIE_NAME, data, ttlMinutes); // one year
	}

	return {
		getItem(key: string) {
			return getStorageFromCookie()[key] || null;
		},
		setItem(key: string, value: string) {
			const localStorageState = getStorageFromCookie();
			localStorageState[key] = value;
			saveStorageToCookie(JSON.stringify(localStorageState));
		},
		removeItem(key: string) {
			const localStorageState = getStorageFromCookie();
			delete localStorageState[key];
			saveStorageToCookie(JSON.stringify(localStorageState));
		},
		clear() {
			const localStorageState = {};
			saveStorageToCookie(JSON.stringify(localStorageState));
		},
		key(n: number) {
			const localStorageState = getStorageFromCookie();
			const keys = Object.keys(localStorageState);
			if (n > keys.length - 1)
				return null;

			return keys[n];
		},
		get length() {
			const localStorageState = getStorageFromCookie()
			return Object.keys(localStorageState).length;
		}
	}
}

export const setCookie = (name: string, value: string, ttlMinutes ?: number): string => {
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
}

export const getCookie = (cname: string): string | "" => {
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
}

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
export const debounce = (func: Function, wait = 100, immediate = false) => {
	var timeout, args, context, timestamp, result;

	function later() {
		var last = Date.now() - timestamp;

		if (last < wait && last >= 0) {
			timeout = setTimeout(later, wait - last);
		} else {
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
		if (!timeout) timeout = setTimeout(later, wait);
		if (callNow) {
			result = func.apply(context, args);
			context = args = null;
		}

		return result;
	}

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
