var SQSEventWriter = require("./writers/SQSEventWriter");
var RestEventWriter = require("./writers/RestEventWriter");
var BufferingWriter = require("./writers/BufferingWriter");
var Base64EncodeWriter = require("./writers/Base64EncodeWriter");
var JSONEnvelopeWriter = require("./writers/JSONEnvelopeWriter");

/**
 * Default assembly point of collectors and writers.
 */
class Collector {

  constructor(options) {
    this.options = options;
    this.collectors = [];
  }

  add(collector) {
    this.collectors.push(collector);
  }

  start() {
    var endpoint = this.options.endpoint;

    // Writer pipeline, add/remove pieces according to use case
    // This writer pipeline will send Base64 encoded array of json events
    var writer =  isSQS(endpoint) ? new SQSEventWriter(endpoint) : new RestEventWriter(endpoint);
    writer = new Base64EncodeWriter(writer);
    writer = new BufferingWriter(writer);
    writer = new JSONEnvelopeWriter(writer, this.options);

    this.collectors.forEach(function(collector) {
      collector.attach(writer);
    });
  }
}
module.exports = Collector;

// TODO handle SQS compatible messaging system implementations, investigate parameter requirements
function isSQS(endpoint) {
  return endpoint.indexOf("sqs") != -1 && endpoint.indexOf("amazonaws.com") != -1;
}
