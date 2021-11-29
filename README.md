<p align="center">
  <a href="https://www.searchhub.io/" target="blank"><img src="https://avatars.githubusercontent.com/u/29304684?v=4" width="120" alt="Searchhub Logo" /></a>
</p>

<p align="center">A fast and simple Javascript SDK specifically targeted at collecting search and search related browser events.</p>

<p align="center">
    <a href="#" target="_blank"><img src="https://github.com/searchhub/search-collector/actions/workflows/build.yml/badge.svg" alt="build workflow" /></a>
    <a href="#" target="_blank"><img src="https://github.com/searchhub/search-collector/actions/workflows/tests.yml/badge.svg" alt="test workflow" /></a>
    <a href="https://github.com/searchhub/search-collector/blob/feature/ts-webpack/LICENSE" target="_blank"><img src="https://img.shields.io/npm/l/search-collector" alt="license" /></a>
    <a href="https://www.npmjs.com/package/search-collector" target="_blank"><img src="https://img.shields.io/npm/dw/search-collector" alt="downloads" /></a>
    <a href="https://www.npmjs.com/package/search-collector" target="_blank"><img src="https://img.shields.io/librariesio/release/npm/search-collector" alt="dependencies" /></a>
    <a href="https://www.npmjs.com/package/search-collector" target="_blank"><img src="https://img.shields.io/npm/v/search-collector" alt="version" /></a>
    <a href="https://twitter.com/cxpsearchhub" target="_blank"><img src="https://img.shields.io/github/stars/searchhub/search-collector?style=social" alt="stars" /></a>
    <a href="https://twitter.com/cxpsearchhub" target="_blank"><img src="https://img.shields.io/twitter/follow/cxpsearchhub?style=social" alt="twitter" /></a>
</p>

# Getting started

## Install

```bash
$ npm i -S search-collector
```

## Logging

`search-collector` ships with a default set of `Logger` and `LoggerTransport`. In most cases you just want to use or add
a new `LoggerTransport`. By default `TransportLogger` is used which will direct all log messages to all
provided `LoggerTransports`.

A `LoggerTransport` directs all implemented log levels to an output e.g. browser console or an REST endpoint. If you
add multiple transports all of them are invoked.

### Example configuration

Log to the console if `debug` is enabled or send error logs to an SQS queue if `debug` is disabled:

```javascript
if (debug) {
	collector.addLogTransport(new ConsoleTransport());
} else {
	collector.addLogTransport(new SQSErrorTransport("https://your-sqs-queue.com/collector"));
}
```

### Implement LoggerTransport

If you need more than SQS or console transport you can implement your own by implementing the desired log level:

```typescript
//typescript
class MyLoggerTransport extends LoggerTransport {
	error(msg: string, ...dataArgs) {
		fetch("/my-endpoint", {
			method: "POST",
			body: JSONT.stringify({args: dataArgs})
		});
	}
}

collector.addLogTransport(new MyLoggerTransport());
```

```javascript
//javasdcript
const myTransport = {
	error: (msg: string, ...dataArgs) => {
		fetch("/my-endpoint", {
			method: "POST",
			body: JSONT.stringify({args: dataArgs})
		});
	}
}

collector.addLogTransport(myTransport);
```

### Override Logger

You could also implement your own Logger. **Please be aware of that no LoggerTransports are called if you override the
Logger**

Instead of just implementing the log level you want to handle like in the `LoggerTransport` you have to implement all
log levels when you override the entire `Logger`.

## Assemble

Use different components based on your use case

```javascript
var SearchCollector = require("search-collector");

var collector = new SearchCollector.Collector({
	"sessionResolver": new SearchCollector.CookieSessionResolver(),
	"endpoint": "/collector" // relative to the current context or absolute depending where you want to send the data
});

// Collect filter clicks
collector.add(new SearchCollector.ClickCollector(".filter", e => e.getAttribute("id")));

// Register product displays
collector.add(new SearchCollector.ImpressionCollector(".product", e => e.getAttribute("id")));
LoggerTransport
collector.start();
```

## Deliver

Wrap the code in your preferred browser delivery solution, our recommendation is to deliver the whole assembly as a
single minified javascript file.

# Available components

#### BrowserCollector

Collect basic browser information. Note that depending on how you use this you may need to consult the GDPR guidelines

#### FilterClickCollector

Collect information about click events on search filters

#### ProductClickCollector

Collect information about clicks on products inside the search result

#### ImpressionCollector

Collect information upon product display in the browser viewport

#### SearchResultCollector

Collect information upon search

#### InstantSearchQueryCollector

Collect search events from a search-as-you-type type of setup

#### SearchEventResultCollector

Collect information about the search via and event rather than attaching to an element

#### CookieSessionResolver

Determines whether the event is part of an existing search session or a new one should be created. A search session
happens across multiple tabs but expires after 30 min by default

#### PositionResolver

Resolve the position of an element with a specific class within a list of similar elements

#### Query

Utility class for string representation of search and filter queries

#### SQSEventWriter

Write events to an SQS queue

#### RestEventWriter

Write events to a REST endpoint

#### JSONEnvelopeWriter

Package the payload as JSON, add contextual information like timestamp, current search query, the session, the channel

#### BufferingWriter

Buffer incoming events for 1s and then write them out in bulk. Keeps the information across pages making sure no data is
lost.

#### Base64Base64EncodeWriter

Pack the data by first URL encoding it to make sure all special chars are correctly represented and then apply URL-safe
base64 encoding.
