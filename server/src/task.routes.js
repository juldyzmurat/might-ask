const express = require("express");
const mongodb = require("mongodb");
const { collections } = require("./database");

const taskRouter = express.Router();
taskRouter.use(express.json());

taskRouter.get("/task", async (_req, res) => {
  try {
    console.log("Bye");
    const tasks = await collections.tasks.find({}).toArray();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

taskRouter.get("/task/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const task = await collections.tasks.findOne(query);
  
      if (task) {
        res.status(200).send(task);
      } else {
        res.status(404).send(`Failed to find an task: ID ${id}`);
      }
    } catch (error) {
      res.status(500).send(`Failed to find an task: ID ${req.params.id}`);
    }
  });

  taskRouter.post("/task/post", async (req, res) => {
    try {
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
  
  taskRouter.put("/task/put/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const task = req.body;
      const query = { _id: new mongodb.ObjectId(id) };
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

  taskRouter.delete("/task/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new mongodb.ObjectId(id) };
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
  