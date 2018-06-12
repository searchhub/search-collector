/**
 * Wrap the events in a JSON envelope, enrich each record with timestamp and if
 * available - session, query and channel information.
 *
 * If the options passed ot the writer contain debug=true, this writer will also 
 * log to the console
 */
class JSONEnvelopeWriter {

    constructor(delegate, options) {
      this.delegate = delegate;
      this.sessionResolver = options.sessionResolver;
      this.queryResolver = options.queryResolver;
      this.debug = options.debug ? true : false;
      this.channel = options.channel;
    }

    write(data) {
      // Data is already JSON object bassed by the various collectors. More common attributes
      // may be added in the future here
      data.timestamp = new Date().getTime();

      if (this.sessionResolver) {
        data.session = this.sessionResolver.get();
      }

      if (this.queryResolver) {
        data.query = this.queryResolver().toString();
      }

      if (this.channel) {
        data.channel = this.channel;
      }

      if (this.debug) {
        console.log(JSON.stringify(data));
      }

      this.delegate.write(data);
    }
}
module.exports = JSONEnvelopeWriter
