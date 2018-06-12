/**
 * Resolve the id of the current search session. A search session is defined as
 * limited time slice of search activity across multiple tabs. By default a session
 * would be considered expired after 30 min of inactivity.
 *
 * In case the resolver is constructed with a cookie name, the session lifecycle
 * will be governed by the lifecycle of that cookie. Otherwise the resolver will
 * set its own cookie.
 */
class CookieSessionResolver {

  /**
   * Construct a resolver with the provided cookie name. Note that for this to work,
   * the cookie should be exposed to the domain the collector is loading from.
   *
   * @constructor
   * @param {string} name - Document query selector identifying all elements from the search result
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * Resolve the current session
   *
   * @param {string}
   */
  get() {
    // In case the page already provides accessible cookie information
    if (this.name) {
      return getCookie(this.name);
    } else {
      // Handle session information directly, session works across all tabs
      // and expires after 30 min of inactivity across all tabs
      var name = "SearchCollectorSession";

      var session = getCookie(name);
      if (!session) {
        session = generateId();
      }

      // Expire after 30 min of inactivity
      setCookie(name, session, 30);
    }

    return session;
  }
}

function setCookie(name, value, minutes) {
    var expires = "";

    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);

    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

function generateId() {
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var text = "";
  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = CookieSessionResolver;
