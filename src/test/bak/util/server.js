var server = require("./http-server");

var dataDir = process.argv[2]; // 0 and 1 are command and filename
var storeDir = process.argv[3];

server.start(null, dataDir, storeDir);
