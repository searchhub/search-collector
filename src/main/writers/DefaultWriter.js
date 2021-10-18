const SQSEventWriter = require("./SQSEventWriter");
const RestEventWriter = require("./RestEventWriter");
const BufferingWriter = require("./BufferingWriter");
const Base64EncodeWriter = require("./Base64EncodeWriter");
const JSONEnvelopeWriter = require("./JSONEnvelopeWriter");

class DefaultWriter {

    constructor(options) {
        var endpoint = options.endpoint;

        // Writer pipeline, add/remove pieces according to use case
        // This writer pipeline will send Base64 encoded array of json events
        var writer = isSQS(endpoint, options.sqs) ? new SQSEventWriter(endpoint) : new RestEventWriter(endpoint);
        writer = new Base64EncodeWriter(writer);
        writer = new BufferingWriter(writer, options.endpoint);
        writer = new JSONEnvelopeWriter(writer, options);
  
        this.writer = writer;
    }
  
    write(data) {
      this.writer.write(data);
    }
}

function isSQS(endpoint, forceSQS) {
    return forceSQS || (endpoint.indexOf("sqs") != -1 && endpoint.indexOf("amazonaws.com") != -1);
}

module.exports = DefaultWriter;