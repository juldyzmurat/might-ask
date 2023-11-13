var expect = require("../node_modules/chai/chai").expect;
var taskRouter = require("../src/task.routes");

describe("Test a task routes function", function() {
    it("Gets a certain task", function() {
        var result = taskRouter.get();

        expect(result).to.deep.equal("expected result");
    })
});

describe("Test a task routes function", function() {
    it("Posts a certain task", function() {
        var result = taskRouter.post();

        expect(result).to.deep.equal("expected result");
    })
});

describe("Test a task routes function", function() {
    it("Puts a certain task", function() {
        var result = taskRouter.put();

        expect(result).to.deep.equal("expected result");
    })
});

describe("Test a task routes function", function() {
    it("Deletes a certain task", function() {
        var result = taskRouter.delete();

        expect(result).to.deep.equal("expected result");
    })
});

