var expect = require("../node_modules/chai/chai").expect;
var dashboard = require("../src/dashboard");

describe("Test a function", function() {
    it("Does something", function() {
        var result = dashboard.getUserData();

        expect(result).to.equal("expected result");
    })
});