const express = require("express");

const { AdminAuth } = require("../middlewares/auth.middleware.js");
const AdminController = require("../controllers/admin.controller.js");
const { asyncErrorHandler } = require("../utils/error.js");

const adminRoutes = express.Router();

// Prefix: /api/admin
adminRoutes.get("/", AdminAuth, (req, res) => {
  throw new Error("Test error");
  res.send("admined");
});

adminRoutes.post(
  "/register",
  asyncErrorHandler(AdminAuth),
  asyncErrorHandler(AdminController.adminRegister)
);

adminRoutes.post("/login", asyncErrorHandler(AdminController.adminLogin));

adminRoutes.get(
  "/contacts/all",
  asyncErrorHandler(AdminAuth),
  asyncErrorHandler(AdminController.fetchContacts)
);
adminRoutes.post("/contacts", asyncErrorHandler(AdminController.addContact));
adminRoutes.delete(
  "/contacts/delete",
  asyncErrorHandler(AdminAuth),
  asyncErrorHandler(AdminController.deleteContacts)
);
adminRoutes.get(
  "/admins",
  asyncErrorHandler(AdminAuth),
  asyncErrorHandler(AdminController.fetchAllAdmins)
);
adminRoutes.delete(
  "/admins",
  asyncErrorHandler(AdminAuth),
  asyncErrorHandler(AdminController.deleteAdmin)
);

module.exports = adminRoutes;
