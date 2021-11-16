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
