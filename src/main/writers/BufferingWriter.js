/**
 * A writer that buffers the incoming events in a local storage queue and writes
 * them out in batches every second. If the queue is not empty, when the timer ticks
 * the writer will send the available data regardless of whether there are collector events i.e.
 * even in times of inactivity or when loading the page and previous state is available.
 *
 * The writer will also try to send the available data on browser unload event.
 */
class BufferingWriter {

  constructor(delegate) {
    this.delegate = delegate;
    this.queue = new LocalStorageQueue();
    this.timer = setTimeout(this.flush.bind(this), 1000);

    var self = this;

    // TODO check how hard it is to support older IE version here
    window.addEventListener("beforeunload", function() {
      self.flush(true);
    })
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

class LocalStorageQueue {

    constructor() {
      this.QUEUE_NAME = "search-collector-queue";
      this.queue = [];

      var storedQueue = localStorage.getItem(this.QUEUE_NAME);
      if (storedQueue) {
        try {
          this.queue = JSON.parse(storedQueue);
        } catch (e) {
          console.log("Error parsing stored event queue " + e);
        }
      }
    }

    push(data) {
      this.queue.push(data);
      this._save();
    }

    drain() {
      var buffer = this.queue;
      this.queue = [];
      this._save();

      return buffer;
    }

    size() {
      return this.queue.length;
    }

    _save() {
      localStorage.setItem(this.QUEUE_NAME, JSON.stringify(this.queue));
    }
}

module.exports = BufferingWriter;
