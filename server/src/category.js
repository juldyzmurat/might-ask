const mongodb = require("mongodb");

/**
 * Define the Category interface.
 */
const Category = {
  name: String,
  color: String,
  description: String,
  userid: mongodb.ObjectId,
  _id: mongodb.ObjectId,
};

module.exports = Category;
