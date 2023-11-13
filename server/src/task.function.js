const { collections } = require("./database");

async function getTaskData() {
    const data = await collections.tasks.find({}).toArray();
};

module.exports = getTaskData;