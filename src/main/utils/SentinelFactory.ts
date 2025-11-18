import {ISentinel} from './ISentinel';
import {ListenerType} from './ListenerType';
import {Sentinel} from './Sentinel';
import {MutationSentinel} from './MutationSentinel';
import {StaticSentinel} from './StaticSentinel';

/**
 * Factory function to create the appropriate Sentinel implementation based on ListenerType
 *
 * @param listenerType - The type of sentinel to create
 * @param doc - The document to watch (defaults to global document)
 * @returns ISentinel implementation or null for DOM-only mode
 *
 * @example
 * const sentinel = createSentinel(ListenerType.Mutation, document);
 * sentinel.on('.my-class', (element) => {
 *   console.log('Element found:', element);
 * });
 */
export function createSentinel(listenerType: ListenerType, doc: Document = document): ISentinel {
  switch (listenerType) {
    case ListenerType.Static:
    case ListenerType.Dom:
      return new StaticSentinel(doc);

    case ListenerType.Mutation:
      return new MutationSentinel(doc);

    case ListenerType.Animation:
    case ListenerType.Sentinel:
      return new Sentinel(doc);

    default:
      return new MutationSentinel(doc);
  }
}
