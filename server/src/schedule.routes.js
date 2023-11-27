const express = require("express");
const mongodb = require("mongodb");
const { collections } = require("./database");

const scheduleRouter = express.Router();
scheduleRouter.use(express.json());

scheduleRouter.get("/", async (_req, res) => {
  try {
    const schedules = await collections.schedules.find({}).toArray();
    res.status(200).send(schedules);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

scheduleRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const schedule = await collections.schedules.findOne(query);

    if (schedule) {
      res.status(200).send(schedule);
    } else {
      res.status(404).send(`Failed to find a schedule: ID ${id}`);
    }
  } catch (error) {
    res.status(500).send(`Failed to find a schedule: ID ${req.params.id}`);
  }
});

scheduleRouter.post("/", async (req, res) => {
  try {
    const schedule = req.body;
    const result = await collections.schedules.insertOne(schedule);

    if (result.acknowledged) {
      res.status(201).send(`Created a new schedule: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new schedule.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

scheduleRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const schedule = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.schedules.updateOne(query, {
      $set: schedule,
    });

    if (result && result.matchedCount > 0) {
      res.status(200).send(`Updated a schedule: ID ${id}.`);
    } else if (result && result.matchedCount === 0) {
      res.status(404).send(`Failed to find a schedule: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update a schedule: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

scheduleRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.schedules.deleteOne(query);

    if (result && result.deletedCount > 0) {
      res.status(202).send(`Removed a schedule: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove a schedule: ID ${id}`);
    } else if (result && result.deletedCount === 0) {
      res.status(404).send(`Failed to find a schedule: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
module.exports = scheduleRouter;
