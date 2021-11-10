var server = require("./util/http-server");
var util = require("./util/test-util");
var puppeteer = require('puppeteer');

var stack = [];
module.exports = {

  setUp : function(done) {
    server.start(data => stack.push(data), "demo");
    done();
  },

  tearDown : function(done) {
    server.stop();
    done();
  },

  testProductList : async function(test) {
    var browser = await puppeteer.launch({args: ['--no-sandbox']});
    var page = await browser.newPage();
    await page.goto('http://localhost:8080/');

    let size = 36;
    let range = [...Array(size).keys()].map(i => i + 1234);

    var data = await util.fetchAll(stack, "product-list");
    test.equal(size, data.length);

    for (let e of data) {
      test.ok(range.indexOf(Number(e.data)) != -1);
    }

    browser.close();
    test.done();
  }
}
