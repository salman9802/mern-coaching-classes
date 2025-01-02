const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    educationClass: {
      type: String,
      required: true,
    },
  },
  {
    collection: "contacts",
  }
);

module.exports = mongoose.model("contacts", contactSchema);
