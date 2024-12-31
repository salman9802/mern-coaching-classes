const { jwtToken } = require("../middlewares/Auth");
const AdminModel = require("../models/AdminModel");

const adminRegister = async (req, res, next) => {
  const { username, password } = req.body;
  const isValidUsername =
    typeof username === "string" && username.trim().length > 0;
  const isValidPassword =
    typeof password === "string" && password.trim().length > 0;

  if (isValidUsername && isValidPassword) {
    const newAdmin = await new AdminModel({
      username,
      password,
      role: "nonroot",
    });
    newAdmin.save();
    res.status(201).json({ msg: "Admin created" });
  } else {
    res.statusCode = 400;
    next(new Error("Invalid username and password"));
  }
};

const adminLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const isValidUsername =
    typeof username === "string" && username.trim().length > 0;
  const isValidPassword =
    typeof password === "string" && password.trim().length > 0;

  if (isValidUsername && isValidPassword) {
    const adminExists = await AdminModel.findOne({ username, password });
    if (adminExists) {
      const token = jwtToken({ id: adminExists._id, username });
      if (token) {
        res.status(200).json({ msg: "Authentication successful", token });
      }
    }
  } else {
    res.statusCode = 400;
    next(new Error("Invalid username and password"));
  }
};

module.exports = {
  adminRegister,
  adminLogin,
};
