var Query = require("../main/query/Query.js");

module.exports = {

    testBasicEvaluate: function (test) {
        var q = new Query("brand=adidas/color=red/");
        test.equal("brand=adidas/color=red/", q.toString());

        test.done();
    },

    testOrValue: function (test) {
        var q = new Query("brand=adidas;puma/color=red/");
        test.equal("brand=adidas;puma/color=red/", q.toString());

        test.done();
    },

    testAndValue: function (test) {
        var q = new Query("brand=adidas,puma/color=red/");
        test.equal("brand=adidas,puma/color=red/", q.toString());

        test.done();
    },

    testOr: function (test) {
        var q = new Query("brand=adidas|category=shoes/color=red/");
        test.equal("brand=adidas|category=shoes/color=red/", q.toString());

        test.done();
    },

    testRemoveOr: function (test) {
        var q = new Query("brand=adidas|category=shoes|type=falafel/color=red/");

        q.removeSelection("type");
        test.equal("brand=adidas|category=shoes/color=red/", q.toString());

        q.removeSelection("brand");
        test.equal("category=shoes/color=red/", q.toString());

        test.done();
    },

    testAdd: function (test) {
        var q = new Query("brand=adidas");

        q.addSelection("color", "=", "red");
        test.equal("brand=adidas/color=red/", q.toString());

        q.addSelection("category", "=", "shoes", undefined, "or");
        test.equal("brand=adidas/color=red/category=shoes/", q.toString());

        q.addSelection("type", "=", "falafel", undefined, "or");
        test.equal("brand=adidas/color=red/category=shoes|type=falafel/", q.toString());

        test.done();
    },

    testRemoveAt : function(test) {
        var q = new Query("brand=adidas|category=shoes|type=falafel/color=red/");

        q.removeSelectionAt(2);
        test.equal("brand=adidas|category=shoes/color=red/", q.toString());

        q.removeSelectionAt(0);
        test.equal("category=shoes/color=red/", q.toString());

        test.done();
    }
}
