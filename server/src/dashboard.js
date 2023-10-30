// const express = require("express");
// const mongodb = require("mongodb");
// const userRoute = require("./user.routes");
// const { connectToDatabase } = require("./database");
const { collections } = require("./database");

// const userRouter = express.Router();
// userRouter.use(express.json());

async function getUserData() {
    // console.log(collections);
    const data = await collections.tasks.find({}).toArray();
    const numData = data.length
    console.log(numData);
    // res.status(200).send(users);
};

module.exports = getUserData;