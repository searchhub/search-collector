class LocalStorageQueue {

    constructor(id) {
      this.name = "search-collector-queue" + (id ? "-" + id : "");
      this.queue = [];

      var storedQueue = localStorage.getItem(this.name);
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
      localStorage.setItem(this.name, JSON.stringify(this.queue));
    }
}

module.exports = LocalStorageQueue;