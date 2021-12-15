import {AbstractCollector} from "./AbstractCollector";

/**
 * Collect different type of events via a custom event. The custom event should hold the properties
 * "type" and "data" in the custom payload.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events for guidance
 */
export class GenericEventCollector extends AbstractCollector {
	private readonly eventName: string;

	/**
	 * Construct event based collector
	 *
	 * @constructor
	 * @param {string} eventName - the name of the event to react on
	 * @param type
	 */
	constructor(eventName: string, type = "GenericEvent") {
		super(type);
		this.eventName = eventName;
	}

	/**
	 * Attach a writer, note that this collector is asynchronous and will write
	 * the data when the event triggers
	 *
	 * @param {object} writer - The writer to send the data to
	 * @param log
	 */
	attach(writer, log) {
		this.getWindow().addEventListener(this.eventName, this.logWrapHandler((e: CustomEvent) => {
			writer.write({
				"type": e.detail.type,
				...e.detail.data
			});
		}, log));
	}
}
