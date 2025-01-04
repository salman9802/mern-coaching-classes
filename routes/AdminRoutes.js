const express = require("express");
const { AdminAuth } = require("../middlewares/Auth");
const AdminController = require("../controllers/AdminController");

const adminRoutes = express.Router();

adminRoutes.get("/", AdminAuth, (req, res) => {
  res.send("admined");
});

adminRoutes.post("/register", AdminController.adminRegister);

adminRoutes.post("/login", AdminController.adminLogin);

adminRoutes.get("/contacts/all", AdminAuth, AdminController.fetchContacts);
adminRoutes.post("/contacts", AdminAuth, AdminController.addContact);
adminRoutes.delete(
  "/contacts/delete",
  AdminAuth,
  AdminController.deleteContacts
);
adminRoutes.get("/admins", AdminAuth, AdminController.fetchAllAdmins);

module.exports = adminRoutes;
