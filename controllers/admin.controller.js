const { STATUS_CODES } = require("../constants/http");
const { jwtToken } = require("../middlewares/auth.middleware.js");
const AdminModel = require("../models/admin.model.js");
const ContactModel = require("../models/contact.model.js");
const { errorAssert } = require("../utils/error.js");

const isValidString = (s) => typeof s === "string" && s.trim().length > 0;

const adminRegister = async (req, res, next) => {
  const { username, password } = req.body;
  const isValidUsername =
    typeof username === "string" && username.trim().length > 0;
  const isValidPassword =
    typeof password === "string" && password.trim().length > 0;

  const exists = await AdminModel.findOne({ username });
  errorAssert(!exists, STATUS_CODES.CONFLICT, "Username already exists");

  errorAssert(
    isValidUsername && isValidPassword,
    STATUS_CODES.BAD_REQUEST,
    "Invalid username or password"
  );

  const newAdmin = await new AdminModel({
    username,
    password,
  });
  newAdmin.save();
  res.status(STATUS_CODES.CREATED).json({ msg: "Admin created" });
};

const adminLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const isValidUsername =
    typeof username === "string" && username.trim().length > 0;
  const isValidPassword =
    typeof password === "string" && password.trim().length > 0;

  errorAssert(
    isValidUsername && isValidPassword,
    STATUS_CODES.BAD_REQUEST,
    "Invalid username or password."
  );

  const adminExists = await AdminModel.findOne({ username, password });
  errorAssert(
    adminExists,
    STATUS_CODES.BAD_REQUEST,
    "Invalid username or password. (gubpoi, gubpoi)"
  );

  const token = adminExists.generateJWT();
  errorAssert(
    token,
    STATUS_CODES.SERVICE_UNAVAILABLE,
    "Unable to create token"
  );
  res.status(STATUS_CODES.OK).json({ msg: "Authentication successful", token });
};

const fetchContacts = async (req, res, next) => {
  const contacts = await ContactModel.find();
  res.status(STATUS_CODES.OK).json({ contacts });
};

const addContact = async (req, res, next) => {
  const { name, mobile, city, educationClass } = req.body;

  errorAssert(
    isValidString(name) &&
      isValidString(mobile) &&
      isValidString(city) &&
      isValidString(educationClass),
    STATUS_CODES.BAD_REQUEST,
    "Invalid request"
  );

  const newContact = new ContactModel({
    name,
    mobile,
    city,
    educationClass,
  });
  newContact.save();
  res
    .status(STATUS_CODES.CREATED)
    .json({ msg: "Contact added succesfully", id: newContact._id });
};

const deleteContacts = async (req, res, next) => {
  const { ids: contactIds } = req.body;

  errorAssert(
    Array.isArray(contactIds) && contactIds.length > 0,
    STATUS_CODES.BAD_REQUEST,
    "Invalid Request"
  );

  const results = await ContactModel.deleteMany({
    _id: { $in: contactIds },
  });

  if (results.deletedCount > 0)
    res.status(STATUS_CODES.OK).json({ msg: "Contacts deleted succesfully" });
  else res.status(STATUS_CODES.OK).json({ msg: "No contacts found" });
};

const fetchAllAdmins = async (req, res, next) => {
  const admins = await AdminModel.find();
  res.status(STATUS_CODES.OK).json({ admins });
};

const deleteAdmin = async (req, res, next) => {
  const { id } = req.body;
  if (isValidString(id)) {
    const result = await AdminModel.deleteOne({ _id: id });
    res.status(STATUS_CODES.OK).json({ result, id });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
  fetchContacts,
  addContact,
  deleteContacts,
  fetchAllAdmins,
  deleteAdmin,
};
