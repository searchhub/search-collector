# SearchCollector - Fast and simple collection of search-specific browser events
SearchCollector is a fast and simple Javascript SDK specificatlly targeted at collecting search and search related events from
a browser. It allows you to assemble a solution suitable for your own needs, without imposing much requirements upfront.

SearchCollector is small - usual setup results in ~20k uncompressed size - and fast, no load or effect on the user experience.

# Getting started

## Install
```bash
$ npm install --save search-collector
```
## Assemble
Use different components based on your use case
```javascript
var SearchCollector = require("search-collector");

var collector = new SearchCollector.Collector({
  "sessionResolver" : new SearchCollector.CookieSessionResolver(),
  "endpoint" : "/collector" // relative to the current context or absolute depending where you want to send the data
});

// Collect filter clicks
collector.add(new SearchCollector.ClickCollector(".filter", e => e.getAttribute("id")));

// Register product displays
collector.add(new SearchCollector.ImpressionCollector(".product", e => e.getAttribute("id")));

collector.start();
```
## Deliver
Wrap the code in your preferred browser delivery solution, our recommendation is to deliver the whole assembly as a single minified javascript file.

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
Determines whether the event is part of an existing search session or a new one should be created. A search session happens across multiple tabs but expires after 30 min by default

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
Buffer incoming events for 1s and then write them out in bulk. Keeps the information across pages making sure no data is lost.

#### Base64Base64EncodeWriter
Pack the data by first URL encoding it to make sure all special chars are correctly represented and then apply URL-safe base64 encoding.
