const express = require("express");
const mongodb = require("mongodb");
const { collections } = require("./database");

const taskRouter = express.Router();
taskRouter.use(express.json());

taskRouter.get("/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const query = { userid: user };
    const tasks = await collections.tasks.find(query).toArray();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

taskRouter.get("/:user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.params.user;
    const query = { 
        _id: new mongodb.ObjectId(id), 
        userid: user,
    };
    const task = await collections.tasks.findOne(query);

    if (task) {
      res.status(200).send(task);
    } else {
      res.status(404).send(`Failed to find a task: ID ${id}`);
    }
  } catch (error) {
    res.status(500).send(`Failed to find a task: ID ${req.params.id}`);
  }
});

taskRouter.post("/", async (req, res) => {
  try {
    // const user = req.params.user;
    const task = req.body;
    const result = await collections.tasks.insertOne(task);

    if (result.acknowledged) {
      res.status(201).send(`Created a new task: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new task.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

taskRouter.put("/:user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.params.user;
    const task = req.body;
    const query = { 
        _id: new mongodb.ObjectId(id),
        userid: user,
    };
    const result = await collections.tasks.updateOne(query, { $set: task });

    if (result && result.matchedCount > 0) {
      res.status(200).send(`Updated a task: ID ${id}.`);
    } else if (result && result.matchedCount === 0) {
      res.status(404).send(`Failed to find a task: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update a task: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

taskRouter.delete("/:user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.params.user;
    const query = { 
        _id: new mongodb.ObjectId(id),
        userid: user,
    };
    const result = await collections.tasks.deleteOne(query);

    if (result && result.deletedCount > 0) {
      res.status(202).send(`Removed a task: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove a task: ID ${id}`);
    } else if (result && result.deletedCount === 0) {
      res.status(404).send(`Failed to find a task: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
module.exports = taskRouter;
