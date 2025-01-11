const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
    type: {
      type: String,
      enum: ["root", "nonroot"],
      default: "nonroot",
    },
  },
  {
    collection: "admins",
  }
);

// function to generate jwt token
adminSchema.methods.generateJWT = function () {
  const payload = {
    username: this.username,
    type: this.type,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });
  return token;
};

module.exports = mongoose.model("admins", adminSchema);
