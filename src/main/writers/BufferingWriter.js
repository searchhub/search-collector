var LocalStorageQueue = require("../utils/LocalStorageQueue");

/**
 * A writer that buffers the incoming events in a local storage queue and writes
 * them out in batches every second. If the queue is not empty, when the timer ticks
 * the writer will send the available data regardless of whether there are collector events i.e.
 * even in times of inactivity or when loading the page and previous state is available.
 *
 * The writer will also try to send the available data on browser unload event.
 */
class BufferingWriter {

  constructor(delegate, id) {
    this.delegate = delegate;
    this.queue = new LocalStorageQueue(id);
    this.timer = setTimeout(this.flush.bind(this), 1000);
    this.id = id;
  }

  write(data) {
    this.queue.push(data);
  }

  flush(cancelTimer) {
    if (this.queue.size() > 0) {
      // TODO organize drain and write via callbacks to ensure no data is lost
      // if the browser shutsdown before the write is complete
      var data = this.queue.drain();
      this.delegate.write(data);
    }

    if (!cancelTimer) {
      this.timer = setTimeout(this.flush.bind(this), 1000);
    }
  }
}

module.exports = BufferingWriter;
