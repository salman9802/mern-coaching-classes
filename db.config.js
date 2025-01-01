const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    if (
      !process.env.MONGO_URI ||
      (typeof process.env.MONGO_URI === "string" &&
        process.env.MONGO_URI.length === 0)
    )
      throw new Error("'MONGO_URI' env variable not found!");

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("Cannot connect with MongoDB. Stopping...");
    setImmediate(() => {
      // to ensure process.stdout finishes
      process.exit(1); // Exit process with failure
    });
  }
};

module.exports = { connectToMongo };
