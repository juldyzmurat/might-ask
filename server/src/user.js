const mongodb = require("mongodb");

/**
 * Define the User interface.
 */
const User = {
  name: String,
  email: String,
  password: String,
  access: ["admin", "normal"],
  _id: mongodb.ObjectId,
};

module.exports = User;
