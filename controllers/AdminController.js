const { jwtToken } = require("../middlewares/Auth");
const AdminModel = require("../models/AdminModel");

const adminRegister = async (req, res, next) => {
  const { username, password } = req.body;
  const isValidUsername =
    typeof username === "string" && username.trim().length > 0;
  const isValidPassword =
    typeof password === "string" && password.trim().length > 0;

  let err;
  try {
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
      const adminExists = await AdminModel.findOne({ username });
      if (adminExists) {
        const token = jwtToken({ id: adminExists._id, username });
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

module.exports = {
  adminRegister,
  adminLogin,
};
