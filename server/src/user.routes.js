const express = require("express");
const mongodb = require("mongodb");
const { collections } = require("./database");

const userRouter = express.Router();
userRouter.use(express.json());

// userRouter.get("/", async (_req, res) => {
//   try {
//     //console.log("Hi");
//     const users = await collections.users.find({}).toArray();
//     res.status(200).send(users);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

userRouter.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const query = { email: email };
    const user = await collections.users.findOne(query);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send(`Failed to find an user: ID ${id}`);
    }
  } catch (error) {
    res.status(500).send(`Failed to find an user: ID ${req.params.id}`);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const user = req.body;
    const result = await collections.users.insertOne(user);

    if (result.acknowledged) {
      res.status(201).send(`Created a new user: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new user.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

userRouter.put("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = req.body;
    const query = { email: new mongodb.ObjectId(email) };
    const result = await collections.users.updateOne(query, { $set: user });

    if (result && result.matchedCount > 0) {
      res.status(200).send(`Updated an user: ID ${id}.`);
    } else if (result && result.matchedCount === 0) {
      res.status(404).send(`Failed to find an user: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an user: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

// userRouter.delete("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const query = { _id: new mongodb.ObjectId(id) };
//     const result = await collections.users.deleteOne(query);

//     if (result && result.deletedCount > 0) {
//       res.status(202).send(`Removed an user: ID ${id}`);
//     } else if (!result) {
//       res.status(400).send(`Failed to remove an user: ID ${id}`);
//     } else if (result && result.deletedCount === 0) {
//       res.status(404).send(`Failed to find an user: ID ${id}`);
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).send(error.message);
//   }
// });

module.exports = userRouter;
