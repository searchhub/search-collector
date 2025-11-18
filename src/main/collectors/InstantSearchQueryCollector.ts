import {AbstractCollector} from "./AbstractCollector";
import {ListenerType} from "../utils/ListenerType";
import {createSentinel} from "../utils/SentinelFactory";

/**
 * Collect search information from a field that has a "as-you-type" trigger and
 * renders search results immediately. May trigger multiple times depending on
 * type speed patterns - we expect that the interval between key strokes would be
 * less than 500ms
 */
export class InstantSearchQueryCollector extends AbstractCollector {
  private readonly selectorExpression: string;
  private readonly delayMs: number;
  private readonly minLength: number;
  private readonly listenerType: ListenerType;

  /**
   * Construct instant search collector
   *
   * @constructor
   * @param {string} selectorExpression - Document query selector identifying the elements to attach to
   * @param delayMs
   * @param minLength
   * @param listenerType
   */
  constructor(selectorExpression: string,
              delayMs: number = 500,
              minLength: number = 2,
              listenerType = ListenerType.Sentinel) {
    super("instant-search");
    this.selectorExpression = selectorExpression;
    this.delayMs = delayMs;
    this.minLength = minLength;
    this.listenerType = listenerType;
  }

  /**
   * Add impression event listeners to the identified elements, write the data
   * when the event occurs
   *
   * @param {object} writer - The writer to send the data to
   * @param log
   */
  attach(writer, log) {
    const type = this.getType();
    const handler = (e, searchBox) => {
      // Ignore shift, ctrl, etc. presses, react only on characters
      if (e.which === 0) {
        return;
      }

      // Delay the reaction of the event, clean the timeout if the event fires
      // again and start counting from 0
      delay((timestamp) => {
        const keywords = searchBox.value;
        if (keywords && keywords.length >= this.minLength) {
          writer.write({
            "type": type,
            "keywords": keywords,
            timestamp
          });
        }
      }, this.delayMs);
    }

    // Use factory to create the appropriate sentinel implementation
    const sentinel = createSentinel(this.listenerType, this.getDocument());
    sentinel.on(this.selectorExpression, (el) => {
      el.addEventListener("keyup", this.logWrapHandler(handler, log, el));
    });
  }
}

const delay = (function () {
  let timer;
  let time;
  return function (callback, ms) {
    clearTimeout(timer);
    if (!time)
      time = new Date().getTime();
    timer = setTimeout(() => {
      callback(time)
      time = null;
    }, ms);
  };
})();
