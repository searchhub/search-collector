# Search-Collector Integration Template

This template can be used as a starting point for a search-collector integration. Just check all `TODO` appearances and adjust them according to the target webshop.

It is also some kind of integration-checklist and reference implementation.

# Prepare

First all node dependencies must be installed. Therefor run:
```
npm install
```

or in case you prefer the usage of docker, run:
```
docker run --rm --volume "$(pwd)/:/opt/search-collector" node:8 npm install --prefix /opt/search-collector
```


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


## Develop with Browser-Integration-Plugin

In case you can't or don't want to include the script directly, you can use some browser plugin (e.g. [Tampermonkey](https://www.tampermonkey.net/) for Chrome or [Greasemonkey](https://www.greasespot.net/) for Firefox) to add that script for the target webshop.

To get debug output at the browser's console, add the parameter 'debug=true' to your target site or set the session-storage property 'searchhub-collector-debug=true'.


# Build final script

This script is not suitable for a browser. To prepare it for the final integration, the 'build' job needs to be run. It will use "browserify" and "uglify" to generate the output script:
```
npm run build 
```

or in case you prefer the usage of docker, run
```
docker run --rm --volume "$(pwd)/:/opt/search-collector" node:8 npm run build --prefix /opt/search-collector
```

Finally you should get the file `searchhub-collector.out.js`. This script can be included into the target webshop.
