// Let the product search trails live for 2 days. Note that
// the product trail is independent from any session, thus we should be
// able to identify the source query for a product even across sessions
import {QueryResolver, StringResolver} from "../resolvers/Resolver";
import {getLocalStorage} from "../utils/Util";

const TTL = 1000 * 60 * 60 * 24 * 2;

export class Trail {
	queryResolver: QueryResolver;
	sessionResolver: StringResolver;
	key: string;

	constructor(queryResolver: QueryResolver,
							sessionResolver: StringResolver,
							id?: string) {
		this.queryResolver = queryResolver;
		this.sessionResolver = sessionResolver;
		this.key = "search-collector-trail" + (id ? "-" + id : "");

		try {
			const localTrails = this._load(getLocalStorage());
			const now = new Date().getTime();

			// Drop all expired trails, TTL in sync with session duration of 30 min
			for (let id of Object.keys(localTrails)) {
				if (now > localTrails[id].timestamp + TTL) {
					delete localTrails[id];
				}
			}
			this._save(getLocalStorage(), localTrails);

			// Load existing session trails and merge it with the local storage trails.
			// This should guarantee that regardless of whether the pages further down the trail
			// (basket, checkout) were open in a new tab or not, we have a full representation
			// of all product clicks within the session. Reminder, sessionStorage is maintained
			// per tab/window and is deleted upon closing, localStorage is per website with no
			// default expiry.
			const sessionTrails = this._load(sessionStorage);
			const trails = Object.assign(localTrails, sessionTrails);
			this._save(sessionStorage, trails);

		} catch (e) {
			console.log("Error parsing stored event queue " + e);
		}
	}

	/**
	 * Register this product id as starting a purchase journey at this session/query
	 * Possible trail types are "main" and "associated"
	 */
	register(id, trailType = TrailType.Main, query?) {
		const trail = {
			"timestamp": new Date().getTime(),
			"query": query || this.queryResolver().toString(),
			"type": trailType
		};

		for (let storage of [localStorage, sessionStorage]) {
			const trails = this._load(storage);
			trails[id] = trail;
			this._save(storage, trails);
		}
	}

	fetch(id) {
		const trails = this._load(sessionStorage);
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

export enum TrailType {
	Main = "main",
	Associated = "associated"
}
