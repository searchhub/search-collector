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

      // Expire after 1 day of inactivity, we don't need our sessions
      // for security purpose, but to rather stitch search actions.
      setCookie(name, session, 60 * 24);
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

    // Handle the upcoming forced switch to SameSite & Secure params https://www.chromestatus.com/feature/5633521622188032
    // Since this is a generic library, we can't restrict the domain under which it's beeing served, thus not setting domain
    // for the cookie. It's usually loaded and subsequently requested from a third-party domain, thus we need to specify SameSite=None which
    // per the latest specifications requires the Secure attribute. 
    //
    // To allow local debugging, we won't set these when loaded on localhost. Note, after this change, you won't be able to serve
    // the collector to real clients over non-https connections - the session cookies won't match
    var sameSite = window.location.hostname === "localhost" ? "" : "; SameSite=None; Secure";

    document.cookie = name + "=" + (value || "")  + expires + "; path=/" + sameSite;
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
  for (var i = 0; i < 7; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return text;
}

module.exports = CookieSessionResolver;
