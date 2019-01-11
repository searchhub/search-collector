const http = require('http');
const url = require('url');
const fs = require('fs');
const urldecode = require('decode-uri-component');
const chalk = require('chalk');

var server;
var positions = [];

function stopHTTPServer() {
    server.close();
    console.log("[INFO] Shutting down HTTP server");
}

function startHTTPServer(collectorCallback, dataDir, storeDir) {
  // Small HTTP server for the static files. The tracking events are produced there and consumed
  // in the queue logic above
  server = http.createServer(function(req, res) {
  	var u = url.parse(req.url, true);

  	var filePath = u.pathname != "/" ? u.pathname.substring(1) : "index.html";

    // FIXME there should be a better way for this lookup
    filePath = (dataDir || process.cwd()) + "/" + filePath;

  	fs.exists(filePath, function(exists) {
  		if (exists) {
  			fs.readFile(filePath, function(error, content) {
  				if (error) {
  					console.log("[ERROR] Reading file %s failed, error %s", filePath, error);
  					res.writeHead(500);
  					res.end();
  				} else {
  					if (endsWith(filePath, ".html")) {
  						res.writeHead(200, {'Content-Type' : 'text/html'});
  					} else if (endsWith(filePath, ".css")) {
  						res.writeHead(200, {'Content-Type' : 'text/css'});
  					} else if (endsWith(filePath, ".js")) {
  						res.writeHead(200, {'Content-Type' : 'text/javascript'});
  					} else {
  						res.writeHead(200, {'Content-Type' : 'text/plain'});
  					}
  					res.end(content, 'utf-8');
  				}
  			});
      } else if (u.pathname == "collector" || u.pathname == "/collector") {
        if (u.search) {
          var data = u.search.substring(1);

          var decoded = urldecode(Buffer.from(data, 'base64').toString('utf-8'));
          console.log(decoded);

          // Keep a running MRR
          let length = positions.length;
          for (r of JSON.parse(decoded)) {
            if (r.type == "product") {
              positions.push(r.data.position);
            }
          }

          if (positions.length > length) {
            let mrr = positions.map(p => 1/p).reduce((a, p) => a + p) / positions.length;
            console.log(chalk.green("Mean Reciprocal Rank ") + chalk.magenta.bold(mrr.toPrecision(5)));
          }

          if (collectorCallback) {
            collectorCallback(data);
          }

          if (storeDir) {
            let content = "";
            for (let r of JSON.parse(decoded)) {
              content += JSON.stringify(r) + "\n";
            }

            let target = storeDir.endsWith("/") ? storeDir : storeDir + "/";
            target += "collector.log";
            
            fs.appendFile(target, content, err => {if (err) throw err;});
          }
        }
        res.writeHead(204);
        res.end();
  		} else {
  			res.writeHead(404);
  			res.end();
  		}
  	});

  });

  server.listen(8080, '0.0.0.0');
  console.log("[INFO] HTTP server running at http://0.0.0.0:8080/");
}


function readPostData(req, callback) {
    var body = "";
    req.on('data', data => {body += data});
    req.on('end', () => callback(body));
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports.stop = stopHTTPServer;
module.exports.start = startHTTPServer;
