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

  testLoad : async function(test) {
    var browser = await puppeteer.launch({args: ['--no-sandbox']});
    var page = await browser.newPage();
    await page.goto('http://localhost:8080/');

    var data = await util.fetch(stack, "browser");
    test.equal("browser", data.type)

    browser.close();
    test.done();
  },

  testLinkClick : async function(test) {
    var browser = await puppeteer.launch({args: ['--no-sandbox']});
    var page = await browser.newPage();
    await page.goto('http://localhost:8080/');

    var data = await util.fetch(stack, "browser");
    test.equal("browser", data.type)

    await page.click("#Jackets");
    data = await util.fetch(stack, "filter");
    test.equal("filter", data.type);
    test.equal(".Jackets", data.data);

    browser.close();
    test.done();
  }
}
