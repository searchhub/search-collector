<p align="center">
  <a href="https://www.searchhub.io/" target="blank"><img src="https://avatars.githubusercontent.com/u/29304684?v=4" width="120" alt="Searchhub Logo" /></a>
</p>

<p align="center">A fast and simple JavaScript library specifically targeted at collecting search and search related browser events.</p>

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

# Description

`search-collector` is a tiny JavaScript library for tracking search related events on e-commerce websites. It's built
with <a href="http://www.typescriptlang.org" target="_blank">TypeScript</a> and combines OOP (Object Oriented
Programming) and a sprinkle of FP (Functional Programming). In it's core it is meant to gather tracking data from
the <a href="https://www.w3schools.com/whatis/whatis_htmldom.asp" target="_blank">DOM</a> elements as soon as the page
has loaded.

# Getting started

Checkout the <a href="https://www.searchhub.io/search-collector/demo/" target="_blank">Demo</a>
and <a href="https://github.com/searchhub/search-collector-blueprint" target="_blank">Blueprint</a>
or `npm i -S search-collector`

# Concepts

The library is built around three main concepts:

## Resolver

A resolver is a function which will return a specific value.

```typescript
const sessionNameResolver = (someArg) => {
	return "my-session-" + someArg;
};
```

## Collector

A collector is a class which is responsible for gathering tracking data. All collectors have to extend
the `AbstractCollector` class which ships with some basic functionality and fields.

```typescript
import {AbstractCollector} from "search-collector";

export class BrowserCollector extends AbstractCollector {
	private readonly sessionResolver: StringResolver;

	constructor(sessionResolver) {
		super("browser");
		this.sessionResolver = sessionResolver;
	}

	attach(writer: Writer, log: Logger) {
		writer.write({
			type: this.getType(),
			sid: this.resolve(this.sessionResolver, log, "someResolverArg"),
			agent: this.getWindow().navigator.userAgent
		});
	}
}
```

## Writer

A writer is responsible to deliver the data gathered by collectors to your tracking destination.

```typescript
//typescript
class MyWriter implements Writer {
	write(data: any) {
		fetch("/my-endponit", {
			method: "POST",
			body: JSON.stringify(data)
		});
	}
}
```

# Logging

`search-collector` ships with a default set of `Logger` and `LoggerTransport`. In most cases you just want to use or add
a new `LoggerTransport`. By default `TransportLogger` is used which will direct all log messages to all
provided `LoggerTransports`.

A `LoggerTransport` directs all implemented log levels to an output e.g. browser console or an REST endpoint. If you add
multiple transports all of them are invoked.

## Example configuration

Log to the console if `debug` is enabled or send error logs to an SQS queue if `debug` is disabled:

```javascript
if (debug) {
	// log all messages to the browser console
	collector.addLogTransport(new ConsoleTransport());
} else {
	// send all error log messages to an SQS queue
	collector.addLogTransport(new SQSErrorTransport("https://your-sqs-queue.com/queue"));
}
```

## Implement LoggerTransport

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

## Override Logger

You could also implement your own Logger. Instead of just implementing the log level you want to handle like in
the `LoggerTransport` you have to implement all log levels when you override the entire `Logger`.

**Please be aware of that no LoggerTransports are called if you override the Logger**

# Available components

## Collectors

<a href="https://github.com/searchhub/search-collector/tree/master/src/main/collectors">See also</a>

#### AbstractCollector

A utility base class for collectors

#### AssociatedProductCollector

Collect information if an associated product (recommended, people also bought) was clicked

#### BasketClickCollector

Collect id and price if an item was add into the basket

#### BrowserCollector

Collect basic browser information. Note that depending on how you use this you may need to consult the GDPR guidelines

#### CheckoutClickCollector

Collect product information about bought products

#### ClickCollector

A base class which attached as click listener to all elements matching the supplied css expression

### ClickWriterResolverCollector

A base class which will pass the writer, type and logger to the resolver for greater flexibility

#### FilterClickCollector

Collect information about click events on search filters

#### FiredSearchCollector

Collect information that search was fired. Meant to be used on the product listing page.

#### GenericEventCollector

Collect different type of events via a custom event. The custom event should hold the properties "type" and "data" in
the custom payload.

#### ImpressionCollector

Collect information upon product display in the browser viewport

#### ProductClickCollector

Collect information about clicks on products inside the search result

#### InstantSearchQueryCollector

Collect search events from a search-as-you-type type of setup

#### RedirectCollector

Recognizes if the customer got redirect during the search process and tracks an appropriate event for it

#### SearchResultCollector

Collect information upon search

#### SuggestSearchCollector

Tracks if a search was triggered by an as you type suggestion

#### WriterResolverCollector

A base class which resolves immediately and passing the writer, the type of the event + context to the provided resolver
function.

## Resolver

<a href="https://github.com/searchhub/search-collector/tree/master/src/main/resolvers">See also</a>

#### cookieResolver

Resolves to the string value of a cookie or empty string if no cookie with that name exists

#### cookieSessionResolver

Create a session id which will last for 30 min or retrieves the session id if one already exists using cookies

#### positionResolver

Resolves the position of an element relative to all elements matching the provided css selector

#### debugResolver

Resolves to boolean value based on the presence and value of a query parameter called "debug" (?debug=true). The result
is persisted in localStorage across page reloads until you invoke the page with ?debug=false which will make this
resolver return false until you toggle it on again

#### Query

Utility class for string representation of search and filter queries

#### Trail

Persists a search phrase trail (Query, timestamp, type) in localStorage for each invocation of the register function.
You can then check for the presence of a trail with fetch(id) to relate e.g. event on product detail page to a search
query. All our Collectors are using this class already if appropriate and automatically append to the request using the
TrailWriter

## Writer

<a href="https://github.com/searchhub/search-collector/tree/master/src/main/writers">See also</a>

#### Base64EncodeWriter

Pack the data by first URL encoding it to make sure all special chars are correctly represented and then apply URL-safe
base64 encoding.

#### BrowserTrackingWriter

Appends browser related tracking data to the event like referer or browsers language

#### BufferingWriter

Buffer incoming events for 1s and then write them out in bulk. Keeps the information across pages making sure no data is
lost.

#### DebugWriter

Logs the data to the browsers console if the debug flag is true

#### DefaultWriter

A utility class which combines the following writers in order:

- SQSEventWriter or RestEventWriter
- BufferingWriter
- Base64EncodeWriter
- DebugWriter
- QueryWriter
- TrailWriter
- JSONEnvelopeWriter
- BrowserTrackingWriter

#### JSONEnvelopeWriter

Wraps the event in a JSON envelope, enrich each record with timestamp, session and channel information.

#### QueryWriter

Appends the Query class string representation to the event using the provided queryResolver

#### RestEventWriter

Write events to a REST endpoint

#### SplitStreamWriter

Calls all writers passed to the constructor error safe

#### SQSEventWriter

Write events to an SQS queue

#### TrailWriter

Appends the trail data to the event
