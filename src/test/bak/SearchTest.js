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

  testSearch : async function(test) {
    var browser = await puppeteer.launch({args: ['--no-sandbox']});
    var page = await browser.newPage();
    await page.goto('http://localhost:8080/');

    var data = await util.fetch(stack, "browser");
    test.equal("browser", data.type)

    await page.focus("#text");
    await page.type("lazy fox");

    var data = await util.fetch(stack, "search");
    test.equal("search", data.type);
    test.equal("lazy fox", data.data);

    browser.close();
    test.done();
  },

  testMinLengthSearch : async function(test) {
    test.expect(2);

    var browser = await puppeteer.launch({args: ['--no-sandbox']});
    var page = await browser.newPage();
    await page.goto('http://localhost:8080/');

    var data = await util.fetch(stack, "browser");
    test.equal("browser", data.type)

    await page.focus("#text");
    await page.type("ab");

    data = await util.fetch(stack, "search");
    test.equal(data, undefined);

    browser.close();
    test.done();
  }
}
