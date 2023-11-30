var expect = require("chai").expect;

const sampleUser = {
  _id: "65677dd2f8213f7c52cee7cc",
  firstname: "Adi",
  lastname: "Ghosh",
  email: "axg1328@case.edu",
  access: "normal",
  profile_path: "path/name",
};

const sampleTask = [{"_id":"65686681aa942f957dd9223d","name":"cry about life","due":1701294600000,"estDur":300,"location":"Halluin, Nord, France","description":"","start":1701294600000,"categoryid":"Personal","userid":"axg1328@case.edu","actDur":500},{"_id":"656866a6aa942f957dd9223e","name":"be happy about life ","due":1701399360000,"estDur":7200,"location":"KSL Oval, Cleveland, OH, USA","description":"","start":null,"end":null,"categoryid":"Personal","userid":"axg1328@case.edu","actDur":7500},{"_id":"65687660a15d7db41d12fdb9","name":"make status work ","due":1701314400000,"estDur":5400,"actDur":5400,"location":"","description":"","start":null,"end":null,"categoryid":"Work","status":"done","userid":"axg1328@case.edu"},{"_id":"656876a2a15d7db41d12fdba","name":"figure it out","due":1701320340000,"estDur":5400,"actDur":6800,"location":"","description":"","categoryid":"Extracurricular","status":"to do","userid":"axg1328@case.edu"}];

describe("GET /users/:email", () => {
  it("should retrieve a user by email", async () => {
    const user = sampleUser.email;
    var currentUser = false;
    const request = "http://localhost:5200/users/".concat(user);
    const response = await fetch(request);
    const jsonData = await response.json();
    currentUser = jsonData;
    expect(currentUser).to.deep.equal(sampleUser);
  });
});

describe("GET /tasks/:email", () => {
  it("should retrieve a user's tasks by email", async () => {
    const user = sampleUser.email;
    var currentTask = false;
    const request = "http://localhost:5200/tasks/".concat(user);
    const response = await fetch(request);
    const jsonData = await response.json();
    currentTask = jsonData;
    expect(currentTask).to.deep.equal(sampleTask);
  });
});
