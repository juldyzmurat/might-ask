const express = require("express");
const mongodb = require("mongodb");
const { collections } = require("./database");

const notificationRouter = express.Router();
notificationRouter.use(express.json());

notificationRouter.get("/", async (_req, res) => {
  try {
    //console.log("Hi");
    const notifications = await collections.notifications.find({}).toArray();
    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

notificationRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const notification = await collections.notifications.findOne(query);

    if (notification) {
      res.status(200).send(notification);
    } else {
      res.status(404).send(`Failed to find an notification: ID ${id}`);
    }
  } catch (error) {
    res.status(500).send(`Failed to find an notification: ID ${req.params.id}`);
  }
});

notificationRouter.post("/", async (req, res) => {
  try {
    const notification = req.body;
    const result = await collections.notifications.insertOne(notification);

    if (result.acknowledged) {
      res
        .status(201)
        .send(`Created a new notification: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new notification.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

notificationRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const notification = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.notifications.updateOne(query, {
      $set: notification,
    });

    if (result && result.matchedCount > 0) {
      res.status(200).send(`Updated an notification: ID ${id}.`);
    } else if (result && result.matchedCount === 0) {
      res.status(404).send(`Failed to find an notification: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an notification: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

notificationRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.notifications.deleteOne(query);

    if (result && result.deletedCount > 0) {
      res.status(202).send(`Removed an notification: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an notification: ID ${id}`);
    } else if (result && result.deletedCount === 0) {
      res.status(404).send(`Failed to find an notification: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
module.exports = notificationRouter;
