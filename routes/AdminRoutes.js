const express = require("express");
const { jwtAuth } = require("../middlewares/Auth");
const { adminRegister, adminLogin } = require("../controllers/AdminController");

const adminRoutes = express.Router();

adminRoutes.get("/", jwtAuth, (req, res) => {
  res.send("admined");
});

adminRoutes.post("/register", adminRegister);

adminRoutes.post("/login", adminLogin);

module.exports = adminRoutes;
