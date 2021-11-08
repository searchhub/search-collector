import {AbstractCollector} from "./AbstractCollector";


/**
 * Collect the basic search information - the keywords used for the search and
 * the number of result via a custom event. The custom event should hold the properties
 * "keywords" and "count" in the custom payload. It may hold the action property in case
 * we have a pagination or refinement of the search result.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events for guidance
 */
export class SearchEventResultCollector extends AbstractCollector {
	eventName: string;

	/**
	 * Construct search event result collector
	 *
	 * @constructor
	 * @param {string} eventName - the name of the event to react on
	 */
	constructor(eventName: string) {
		super("search");
		this.eventName = eventName;
	}

	/**
	 * Attach a writer, note that this collector is asynchronous and will write
	 * the data when the event triggers
	 *
	 * @param {object} writer - The writer to send the data to
	 */
	attach(writer) {
		this.getWindow().addEventListener(this.eventName, (e: CustomEvent) => {
			writer.write({
				"type": "search",
				"keywords": e.detail.keywords,
				"count": e.detail.count,
				"action": e.detail.action ? e.detail.action : "search"
			});
		})
	}
}