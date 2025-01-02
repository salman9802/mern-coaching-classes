const express = require("express");
const { jwtAuth } = require("../middlewares/Auth");
const AdminController = require("../controllers/AdminController");

const adminRoutes = express.Router();

adminRoutes.get("/", jwtAuth, (req, res) => {
  res.send("admined");
});

adminRoutes.post("/register", AdminController.adminRegister);

adminRoutes.post("/login", AdminController.adminLogin);

adminRoutes.get("/contacts/all", jwtAuth, AdminController.fetchContacts);
adminRoutes.post("/contacts", jwtAuth, AdminController.addContact);

module.exports = adminRoutes;
