const express = require("express");
const mongodb = require("mongodb");
const { collections } = require("./database");

const categoryRouter = express.Router();
categoryRouter.use(express.json());

categoryRouter.get("/", async (_req, res) => {
  try {
    const categories = await collections.categories.find({}).toArray();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

categoryRouter.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const category = await collections.categories.findOne(query);
  
      if (category) {
        res.status(200).send(category);
      } else {
        res.status(404).send(`Failed to find an category: ID ${id}`);
      }
    } catch (error) {
      res.status(500).send(`Failed to find an category: ID ${req.params.id}`);
    }
  });

  categoryRouter.post("/", async (req, res) => {
    try {
      const category = req.body;
      const result = await collections.categories.insertOne(category);
  
      if (result.acknowledged) {
        res.status(201).send(`Created a new category: ID ${result.insertedId}.`);
      } else {
        res.status(500).send("Failed to create a new category.");
      }
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });
  
  categoryRouter.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const category = req.body;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.categories.updateOne(query, { $set: category });
  
      if (result && result.matchedCount > 0) {
        res.status(200).send(`Updated a category: ID ${id}.`);
      } else if (result && result.matchedCount === 0) {
        res.status(404).send(`Failed to find a category: ID ${id}`);
      } else {
        res.status(304).send(`Failed to update a category: ID ${id}`);
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  });

  categoryRouter.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.categories.deleteOne(query);
  
      if (result && result.deletedCount > 0) {
        res.status(202).send(`Removed a category: ID ${id}`);
      } else if (!result) {
        res.status(400).send(`Failed to remove a category: ID ${id}`);
      } else if (result && result.deletedCount === 0) {
        res.status(404).send(`Failed to find a category: ID ${id}`);
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  });
  module.exports = categoryRouter;
  