const mongodb = require("mongodb");

const collections = {
  users: undefined,
};

async function connectToDatabase(uri) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("mightask");
  // await applyUserSchemaValidation(db);
  // await applyTaskSchemaValidation(db);

  const userCollection = db.collection("user");
  const taskCollection = db.collection("task");
  const categoryCollection = db.collection("category");
  collections.users = userCollection;
  collections.tasks = taskCollection;
  collections.categories = categoryCollection;
}

async function applyUserSchemaValidation(db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password", "access"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        email: {
          bsonType: "string",
          description: "'email' is required and is a string",
          minLength: 5,
        },
        password: {
          bsonType: "string",
          description: "'password' is required and is a string",
          minLength: 5,
        },
        access: {
          bsonType: "string",
          description: "'access' is required and is one of 'admin' or 'normal'",
          enum: ["admin", "normal"],
        },
      },
    },
  };

  async function applyTaskSchemaValidation(db) {
    const jsonSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["name", "user"],
        additionalProperties: false,
        properties: {
          _id: {},
          user: {},
          name: {
            bsonType: "string",
            description: "'name' is required and is a string",
          },
        },
      },
    }
  };

  await db
    .command({
      collMod: "users",
      validator: jsonSchema,
    })
    .catch(async (error) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("users", { validator: jsonSchema });
      }
    });
}

module.exports = {
  collections,
  connectToDatabase,
  // applyUserSchemaValidation,
};
