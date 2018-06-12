/**
 * Straight-forward REST write via GET request
 */
class RestEventWriter {

    constructor(endpoint) {
      this.endpoint = endpoint;
    }

    write(data) {
      var img = new Image();
      img.src = this.endpoint + "?" + data;
    }
}
module.exports = RestEventWriter;
