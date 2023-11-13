var expect = require("../node_modules/chai/chai").expect;
var userRouter = require("../src/user.routes");

describe("Test a user routes function", function() {
    it("Gets a certain user", function() {
        var result = userRouter.get();

        expect(result).to.deep.equal("expected result");
    })
});

describe("Test a user routes function", function() {
    it("Posts a certain user", function() {
        var result = userRouter.post();

        expect(result).to.deep.equal("expected result");
    })
});

describe("Test a user routes function", function() {
    it("Puts a certain user", function() {
        var result = userRouter.put();

        expect(result).to.deep.equal("expected result");
    })
});

describe("Test a user routes function", function() {
    it("Deletes a certain user", function() {
        var result = userRouter.delete();

        expect(result).to.deep.equal("expected result");
    })
});

