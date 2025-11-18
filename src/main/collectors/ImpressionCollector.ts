import {AbstractCollector} from "./AbstractCollector";
import {ISentinel} from "../utils/ISentinel";
import {Sentinel} from "../utils/Sentinel";
import {BooleanResolver, NumberResolver, StringResolver} from "../resolvers/Resolver";
import ScrollMonitor from "scrollmonitor";
import {LocalStorageQueue} from "../utils/LocalStorageQueue";
import {debounce} from "../utils/Util";
import {createSentinel, ListenerType} from "../utils";

/**
 * Collect impressions - a display of a product in the browser viewport. If the product is shown multiple
 * times, the collector will record multiple events i.e. we don't apply filter logic here.
 *
 * Handles both DOM elements present in the DOM and elements inserted after the page load / collector construction.
 */
export class ImpressionCollector extends AbstractCollector {
  private readonly selectorExpression: string;
  private readonly idResolver: StringResolver;
  private readonly positionResolver: NumberResolver;
  private readonly expectedPageResolver: BooleanResolver;
  private readonly queue: LocalStorageQueue;
  private readonly listenerType: ListenerType;


  /**
   * Construct impression collector
   *
   * @constructor
   * @param {string} selectorExpression - Document query selector identifying the elements to attach to
   * @param idResolver - Resolve the id of the element
   * @param positionResolver - Resolve the position of the element in dom
   * @param expectedPageResolver - If supplied, impressions will only be tracked if this resolver returns true. Comes in handy for single page applications
   */
  constructor(selectorExpression: string, idResolver: StringResolver, positionResolver: NumberResolver, expectedPageResolver?: BooleanResolver, listenerType = ListenerType.Sentinel) {
    super("impression");
    this.selectorExpression = selectorExpression;
    this.idResolver = idResolver;
    this.positionResolver = positionResolver;
    this.expectedPageResolver = expectedPageResolver;
    this.queue = new LocalStorageQueue("impressions");
    this.listenerType = listenerType;
  }

  /**
   * Add impression event listeners to the identified elements, write the data
   * when the event occurs, with a delay of 1s - we could gather many events within this timeframe
   *
   * @param {object} writer - The writer to send the data to
   * @param {Logger} log - The logger
   */
  attach(writer, log) {
    const flush = debounce(() => {
      this.queue.transactionalDrain(queue => new Promise(res => {
        res(writer.write({
          type: this.type,
          data: queue
        }));
      }))
          .catch(err => log.error("Could not drain queue: ", err));
    }, 250);

    const handler = element => {
      ScrollMonitor.create(element).enterViewport(() => {
        if (this.expectedPageResolver && !this.expectedPageResolver()) {
          return;
        }

        this.queue.push({
          id: this.resolve(this.idResolver, log, element),
          position: this.resolve(this.positionResolver, log, element)
        });

        flush();
      }, true);
    };

    const sentinel: ISentinel = createSentinel(this.listenerType, this.getDocument());
    sentinel.on(this.selectorExpression, this.logWrapHandler(handler, log));
  }
}
