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
    const taskstoschedules = await collections.taskstoschedules
      .find({})
      .toArray();
    res.status(200).send(taskstoschedules);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

taskToScheduleRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const tasktoschedule = await collections.taskstoschedules.findOne(query);

    if (tasktoschedule) {
      res.status(200).send(tasktoschedule);
    } else {
      res.status(404).send(`Failed to find an tasktoschedule: ID ${id}`);
    }
  } catch (error) {
    res
      .status(500)
      .send(`Failed to find an tasktoschedule: ID ${req.params.id}`);
  }
});

taskToScheduleRouter.post("/", async (req, res) => {
  try {
    const tasktoschedule = req.body;
    const result = await collections.taskstoschedules.insertOne(tasktoschedule);

    if (result.acknowledged) {
      res
        .status(201)
        .send(`Created a new tasktoschedule: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new tasktoschedule.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

taskToScheduleRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tasktoschedule = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.taskstoschedules.updateOne(query, {
      $set: tasktoschedule,
    });

    if (result && result.matchedCount > 0) {
      res.status(200).send(`Updated a tasktoschedule: ID ${id}.`);
    } else if (result && result.matchedCount === 0) {
      res.status(404).send(`Failed to find a tasktoschedule: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update a tasktoschedule: ID ${id}`);
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
    const result = await collections.taskstoschedules.deleteOne(query);

    if (result && result.deletedCount > 0) {
      res.status(202).send(`Removed a tasktoschedule: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove a tasktoschedule: ID ${id}`);
    } else if (result && result.deletedCount === 0) {
      res.status(404).send(`Failed to find a tasktoschedule: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
module.exports = taskToScheduleRouter;
