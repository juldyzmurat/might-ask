const mongodb = require("mongodb");

/**
 * Define the User interface.
 */
const User = {
  firstname: String,
  lastname: String,
  email: String,
  profile_path: String,
  access: ["admin", "normal"],
  _id: mongodb.ObjectId,
};

module.exports = User;
