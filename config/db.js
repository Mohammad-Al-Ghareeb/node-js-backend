const mongoose = require("mongoose");
async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT_URI);
    console.log("connected success");
  } catch (error) {
    console.log("connection failed", error.message);
  }
}

module.exports = connectToDb;
