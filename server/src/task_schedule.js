const mongodb = require("mongodb");

/**
 * Define the Task-to-Schedule relation interface.
 */
const TaskToSchedule = {
  scheduleid: mongodb.ObjectId,
  taskid: mongodb.ObjectId,
  start: Date,
  scheduled_duration: mongodb.int32,
  _id: mongodb.ObjectId,
};

module.exports = TaskToSchedule;
