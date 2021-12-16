import {LocalStorageQueue} from "../utils/LocalStorageQueue";
import {Writer} from "./Writer";

/**
 * A writer that buffers the incoming events in a local storage queue and writes
 * them out in batches every second. If the queue is not empty, when the timer ticks
 * the writer will send the available data regardless of whether there are collector events i.e.
 * even in times of inactivity or when loading the page and previous state is available.
 *
 * The writer will also try to send the available data on browser unload event.
 */
export class BufferingWriter implements Writer {
	delegate: Writer;
	queue: LocalStorageQueue;
	timer: NodeJS.Timeout;
	id: string;
	timerMs: number;

	constructor(delegate: Writer, id: string, timerMs = 1000) {
		this.delegate = delegate;
		this.queue = new LocalStorageQueue(id);
		this.timerMs = timerMs;
		this.timer = setTimeout(this.flush.bind(this), timerMs);
		this.id = id;
	}

	write(data) {
		this.queue.push(data);
	}

	flush(cancelTimer) {
		if (this.queue.size() > 0) {
			// if the browser shutsdown before the write is complete
			this.queue.transactionalDrain(queue => new Promise(res => res(this.delegate.write(queue))))
				.catch(err => console.error("could not drain queue: ", err));
		}

		if (!cancelTimer) {
			this.timer = setTimeout(this.flush.bind(this), this.timerMs);
		}
	}
}
