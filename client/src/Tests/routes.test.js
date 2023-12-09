var expect = require("chai").expect;

const sampleUser = {
  _id: "65677dd2f8213f7c52cee7cc",
  firstname: "Adi",
  lastname: "Ghosh",
  email: "axg1328@case.edu",
  access: "normal",
  profile_path: "path/name",
};

const sampleTask = [
  {
    "_id": "65686681aa942f957dd9223d",
        "actDur": 500,
        "categoryid": "Personal",
        "description": "",
        "due": 1701294600000,
        "estDur": 300,
        "location": "Halluin, Nord, France",
        "name": "cry about life",
        "start": 1701294600000,
            "userid": "axg1328@case.edu"
  },
  {
    "_id": "656866a6aa942f957dd9223e",
          "actDur": 7500,
          "categoryid": "Personal",
          "description": "",
          "due": 1701399360000,
          "end": null,
          "estDur": 7200,
          "location": "KSL Oval, Cleveland, OH, USA",
          "name": "be happy about life ",
          "start": null,          
          "userid": "axg1328@case.edu",
  },
  {
    "_id": "65687660a15d7db41d12fdb9",
        "actDur": 5400,
        "categoryid": "Work",
            "description": "",
            "due": 1701314400000,
            "end": null,
            "estDur": 5400,
    "location": "",
          "name": "make status work ",
          "start": null,
          "status": "done",
      "userid": "axg1328@case.edu",
  },
  {
    "_id": "656876a2a15d7db41d12fdba",
          "actDur": 6800,
          "categoryid": "Extracurricular",
          "description": "",
          "due": 1701320340000,
          "estDur": 5400,          
          "location": "",
      "name": "figure it out",
          "status": "to do",
          "userid": "axg1328@case.edu",
  },
];

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
    console.log(sampleTask)
    expect(currentTask).to.deep.equal(sampleTask);
  });
});
