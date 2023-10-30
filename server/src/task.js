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
  location: String,
  category: String,
  user: mongodb.ObjectId,
  _id: mongodb.ObjectId,
};

module.exports = Task;
