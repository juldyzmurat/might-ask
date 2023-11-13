var expect = require("../node_modules/chai/chai").expect;
var categoryRouter = require("../src/category.routes");

describe("Test a category routes function", function() {
    it("Gets a certain category", function() {
        var result = categoryRouter.get();

        expect(result).to.deep.equal("expected result");
    })
});

describe("Test a category routes function", function() {
    it("Posts a certain category", function() {
        var result = categoryRouter.post();

        expect(result).to.deep.equal("expected result");
    })
});

describe("Test a category routes function", function() {
    it("Puts a certain category", function() {
        var result = categoryRouter.put();

        expect(result).to.deep.equal("expected result");
    })
});

describe("Test a category routes function", function() {
    it("Deletes a certain category", function() {
        var result = categoryRouter.delete();

        expect(result).to.deep.equal("expected result");
    })
});

