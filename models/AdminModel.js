const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["root", "nonroot"],
      default: "nonroot",
    },
  },
  {
    collection: "admins",
  }
);

module.exports = mongoose.model("admins", adminSchema);
