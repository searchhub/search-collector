# Search-Collector Integration Template

This template can be used as a starting point for a search-collector integration. Just check all `TODO` appearances and adjust them according to the target webshop.

It is also some kind of integration-checklist and reference implementation.


# Testing in browser

To make this script ready for browser integration, run the job 'browserify':
```
npm run browserify
```

or in case you prefer the usage of docker, run:
```
docker run --rm --volume "$(pwd)/:/opt/search-collector" node:8 npm run browserify --prefix /opt/search-collector
```

You will get the file `searchhub-collector.out.js` that can be included into the shop. 
In case you can't or don't want to include the script directly, you can use some browser plugin to add that script for the target webshop (e.g. GreaseMonkey Addon for Firefox).

To get debug output at the browser's console, add the parameter 'debug=true' to your target site.


# Build final script

This script is not suitable for a browser. To do that, the defined 'build' job needs to be run.

But first install the dependencies with
```
npm install
```

or in case you prefer the usage of docker, run:
```
docker run --rm --volume "$(pwd)/:/opt/search-collector" node:8 npm install --prefix /opt/search-collector
```

Afterwards "compile" the script (it will use "browserify" and "uglify" to generate the output):
```
npm run build 
```

or in case you prefer the usage of docker, run
```
docker run --rm --volume "$(pwd)/:/opt/search-collector" node:8 npm run build --prefix /opt/search-collector
```

Finally you should get the file `searchhub-collector.out.js`. That can be included into the target webshop.
