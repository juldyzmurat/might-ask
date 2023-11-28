const mongodb = require("mongodb");

/**
 * Define the Schedule interface.
 */
const Schedule = {
  userid: mongodb.ObjectId,
  _id: mongodb.ObjectId,
};

module.exports = Schedule;
