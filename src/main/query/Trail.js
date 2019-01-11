const KEY = "search-collector-trail";
const TTL = 1000 * 60 * 30;

class Trail {

  constructor(queryResolver, sessionResolver) {
      this.queryResolver = queryResolver;
      this.sessionResolver = sessionResolver;

      try {
        let localTrails = this._load(localStorage);
        let now = new Date().getTime();

        // Drop all expired trails, TTL in sync with session duration of 30 min
        for (let id of Object.keys(localTrails)) {
          if (now > localTrails[id].timestamp + TTL) {
            delete localTrails[id];
          }
        }
        this._save(localStorage, localTrails);


        // Load existing session trails and merge it with the local storage trails.
        // This should guarantee that regardless of whether the pages further down the trail
        // (basket, checkout) were open in a new tab or not, we have a full representation
        // of all product clicks within the session. Reminder, sessionStorage is maintained
        // per tab/window and is deleted upon closing, localStorage is per website with no
        // default expiry.
        let sessionTrails = this._load(sessionStorage);
        let trails = Object.assign(localTrails, sessionTrails);
        this._save(sessionStorage, trails);

      } catch (e) {
        console.log("Error parsing stored event queue " + e);
      }
  }

  /**
  * Register this product id as starting a purchase journey at this session/query
  */
  register(id) {
    var trail = {
      "timestamp" : new Date().getTime(),
      "query" : this.queryResolver()
    };

    for (let storage of [localStorage, sessionStorage]) {
      var trails = this._load(storage);
      trails[id] = trail;
      this._save(storage, trails);
    }
  }

  fetch(id) {
    var trails = this._load(sessionStorage);
    return trails[id];
  }

  _load(storage) {
    var data = storage.getItem(KEY);
    return data ? JSON.parse(data) : {};
  }

  _save(storage, data) {
    storage.setItem(KEY, JSON.stringify(data));
  }
}

module.exports = Trail;
