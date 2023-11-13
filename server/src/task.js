const mongodb = require("mongodb");

/**
 * Define the Task interface.
 */
const Task = {
  name: String,
  start: Date,
  due: Date,
  recurrence: mongodb.Int32,
  estimated_duration: mongodb.Int32,
  actual_duration: mongodb.Int32,
  location: String,
  categoryid: mongodb.ObjectId,
  userid: mongodb.ObjectId,
  _id: mongodb.ObjectId,
};

module.exports = Task;
