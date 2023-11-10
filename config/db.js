const mongoose = require("mongoose");
async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("connected success");
  } catch (error) {
    console.log("connection failed", error);
  }
}

module.exports = connectToDb;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("connected success");
//   })
//   .catch((error) => {
//     console.log("connection failed", error);
//   });
