const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // ← No options needed in Mongoose 7+

    console.log("✔ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;
