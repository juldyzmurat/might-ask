var expect = require("../node_modules/chai/chai").expect;
// var dashboard = require("../src/dashboard");
const getUserData = require("../src/dashboard");

describe("Test a dashboard function", function () {
  it("Gets user data", function () {
    // var result = dashboard.getUserData();
    var result = getUserData();

    expect(result).to.equal("expected result");
  });
});
