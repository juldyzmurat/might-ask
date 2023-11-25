const express = require("express");
const mongodb = require("mongodb");
const { collections } = require("./database");

const taskToScheduleRouter = express.Router();
taskToScheduleRouter.use(express.json());

/* we're going to need to update these routes at some point, 
 * becuase the standard get/post/put/delete doesn't really work for this relation
 * 
 */ 


taskToScheduleRouter.get("/", async (_req, res) => {
  try {
    const tasks_schedules = await collections.tasks_schedules.find({}).toArray();
    res.status(200).send(tasks_schedules);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

taskToScheduleRouter.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const task_schedule = await collections.tasks_schedules.findOne(query);
  
      if (task_schedule) {
        res.status(200).send(task_schedule);
      } else {
        res.status(404).send(`Failed to find an task_schedule: ID ${id}`);
      }
    } catch (error) {
      res.status(500).send(`Failed to find an task_schedule: ID ${req.params.id}`);
    }
  });

  taskToScheduleRouter.post("/", async (req, res) => {
    try {
      const task_schedule = req.body;
      const result = await collections.tasks_schedules.insertOne(task_schedule);
  
      if (result.acknowledged) {
        res.status(201).send(`Created a new task_schedule: ID ${result.insertedId}.`);
      } else {
        res.status(500).send("Failed to create a new task_schedule.");
      }
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });
  
  taskToScheduleRouter.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const task_schedule = req.body;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.tasks_schedules.updateOne(query, { $set: task_schedule });
  
      if (result && result.matchedCount > 0) {
        res.status(200).send(`Updated a task_schedule: ID ${id}.`);
      } else if (result && result.matchedCount === 0) {
        res.status(404).send(`Failed to find a task_schedule: ID ${id}`);
      } else {
        res.status(304).send(`Failed to update a task_schedule: ID ${id}`);
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  });

  taskToScheduleRouter.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.tasks_schedules.deleteOne(query);
  
      if (result && result.deletedCount > 0) {
        res.status(202).send(`Removed a task_schedule: ID ${id}`);
      } else if (!result) {
        res.status(400).send(`Failed to remove a task_schedule: ID ${id}`);
      } else if (result && result.deletedCount === 0) {
        res.status(404).send(`Failed to find a task_schedule: ID ${id}`);
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  });
  module.exports = taskToScheduleRouter;
  