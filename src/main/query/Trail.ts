// Let the product search trails live for 2 days. Note that
// the product trail is independent from any session, thus we should be
// able to identify the source query for a product even across sessions
import {QueryResolver, StringResolver} from "../resolvers/Resolver";
import {getLocalStorage, getSessionStorage} from "../utils/Util";
import {TrailType} from "./TrailType";

const TTL = 1000 * 60 * 60 * 24 * 2;

export type TrailData = {
	timestamp: number,
	query: string,
	type: TrailType
}

export class Trail {
	queryResolver: QueryResolver;
	sessionResolver: StringResolver;
	key: string;

	/**
	 *
	 * @param queryResolver
	 * @param sessionResolver
	 * @param uid the unique id of this trail. Used as part of the key to save all Trail steps/parts
	 */
	constructor(queryResolver: QueryResolver,
							sessionResolver: StringResolver,
							uid?: string) {
		this.queryResolver = queryResolver;
		this.sessionResolver = sessionResolver;
		this.key = "search-collector-trail" + (uid ? "-" + uid : "");

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
			const sessionTrails = this._load(getSessionStorage());
			const trails = Object.assign(localTrails, sessionTrails);
			this._save(getSessionStorage(), trails);

		} catch (e) {
			console.log("Error parsing stored event queue " + e);
		}
	}

	/**
	 * Register this product id as starting a purchase journey at this session/query
	 * Possible trail types are "main" and "associated"
	 */
	register(id: string, trailType = TrailType.Main, queryString?) {
		const trail = {
			timestamp: new Date().getTime(),
			query: queryString || this.queryResolver().toString(),
			type: trailType
		};

		for (let storage of [getLocalStorage(), getSessionStorage()]) {
			const trails = this._load(storage);
			trails[id] = trail;
			this._save(storage, trails);
		}
	}

	fetch(id): TrailData {
		const trails = this._load(getSessionStorage());
		return trails[id];
	}

	private _load(storage) {
		const data = storage.getItem(this.key);
		return data ? JSON.parse(data) : {};
	}

	private _save(storage, data) {
		storage.setItem(this.key, JSON.stringify(data));
	}
}
