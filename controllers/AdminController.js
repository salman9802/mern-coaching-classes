const { jwtToken } = require("../middlewares/Auth");
const AdminModel = require("../models/AdminModel");
const ContactModel = require("../models/ContactModel");

const isValidString = (s) => typeof s === "string" && s.trim().length > 0;

const adminRegister = async (req, res, next) => {
  const { username, password } = req.body;
  const isValidUsername =
    typeof username === "string" && username.trim().length > 0;
  const isValidPassword =
    typeof password === "string" && password.trim().length > 0;

  let err;
  try {
    const exists = await AdminModel.findOne({ username });
    if (exists) {
      err = new Error("Username already exists");
      err.status = 400;
      throw err;
    }

    if (isValidUsername && isValidPassword) {
      const newAdmin = await new AdminModel({
        username,
        password,
      });
      newAdmin.save();
      res.status(201).json({ msg: "Admin created" });
    } else {
      err = new Error("Invalid username or password");
      err.status = 400;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

const adminLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const isValidUsername =
    typeof username === "string" && username.trim().length > 0;
  const isValidPassword =
    typeof password === "string" && password.trim().length > 0;

  let err;
  try {
    if (isValidUsername && isValidPassword) {
      const adminExists = await AdminModel.findOne({ username, password });
      if (adminExists) {
        const token = adminExists.generateJWT();
        if (token) {
          res.status(200).json({ msg: "Authentication successful", token });
        } else {
          err = new Error("Cannot create token");
          throw err;
        }
      } else {
        err = new Error("Invalid username or password");
        err.status = 400;
        throw err;
      }
    } else {
      err = new Error("Invalid username or password");
      err.status = 400;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

const fetchContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find();
    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, mobile, city, educationClass } = req.body;
    if (
      isValidString(name) &&
      isValidString(mobile) &&
      isValidString(city) &&
      isValidString(educationClass)
    ) {
      const newContact = new ContactModel({
        name,
        mobile,
        city,
        educationClass,
      });
      newContact.save();
      res
        .status(201)
        .json({ msg: "Contact added succesfully", id: newContact._id });
    } else {
      const err = new Error("Invalid body");
      err.status = 400;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

const deleteContacts = async (req, res, next) => {
  try {
    const { ids: contactIds } = req.body;

    if (Array.isArray(contactIds) && contactIds.length > 0) {
      const results = await ContactModel.deleteMany({
        _id: { $in: contactIds },
      });

      res.status(200).json({ msg: "Contacts deleted succesfully" });
      // if (results.deletedCount > 0)
      //   res.status(202).json({ msg: "Contacts deleted succesfully" });
      // else res.status(200).json({ msg: "No contacts found" });
    } else {
      const err = new Error("Invalid syntax.");
      err.status = 400;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

const fetchAllAdmins = async (req, res, next) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json({ admins });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  adminRegister,
  adminLogin,
  fetchContacts,
  addContact,
  deleteContacts,
  fetchAllAdmins,
};
