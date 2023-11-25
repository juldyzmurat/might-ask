const mongodb = require("mongodb");

/**
 * Define the Task-to-Schedule relation interface.
 */
const TaskToSchedule = {
  userid: mongodb.ObjectId,
  taskid: mongodb.ObjectId,
  delivered: Boolean,
  snooze: Boolean,
  type: String,
  message: String,
  _id: mongodb.ObjectId,
};

module.exports = TaskToSchedule;
