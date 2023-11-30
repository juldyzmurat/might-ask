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
    _id: "656786ca3691689dba5c860c",
    name: "Gardening",
    due: 1701549900000,
    location: "",
    description: "Grow nice",
    start: 1701470700000,
    categoryid: "Recreation",
    userid: "axg1328@case.edu",
  },
  {
    _id: "6567873b3691689dba5c860d",
    name: "Software Engg presentation",
    due: 1702576800000,
    location: "",
    description: "Headache",
    start: null,
    categoryid: "Work",
    userid: "axg1328@case.edu",
  },
  {
    _id: "656787a43691689dba5c860e",
    name: "Comp Sec Exam",
    due: 1701895800000,
    location: "Cleveland, OH, USA",
    description: "Another headache",
    start: 1702050600000,
    categoryid: "Work",
    userid: "axg1328@case.edu",
  },
  {
    _id: "656788123691689dba5c860f",
    name: "Play football",
    due: 1701900000000,
    location: "",
    description: "Concussion time",
    start: 1701640200000,
    categoryid: "Recreation",
    userid: "axg1328@case.edu",
  },
  {
    _id: "6567884a3691689dba5c8610",
    name: "Fly to NY",
    due: 1703555520000,
    location: "",
    description: "Christmas",
    start: 1703530260000,
    categoryid: "Travel",
    userid: "axg1328@case.edu",
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
    expect(currentTask).to.deep.equal(sampleTask);
  });
});
