// const { describe } = require("@jest/globals");

// jest.resetModules();

const assert = require("assert");

const AdminController = require("../controllers/admin.controller.js");
const {
  adminRegisterSchema,
  adminLoginSchema,
} = require("../schemas/admin.schema.js");
const { asyncErrorHandler, ServerError } = require("../utils/error.js");
const AdminModel = require("../models/admin.model.js");
const { STATUS_CODES } = require("../constants/http.js");

jest.mock("../schemas/admin.schema.js", () => ({
  adminRegisterSchema: {
    parse: jest.fn(),
  },
  adminLoginSchema: {
    parse: jest.fn(),
  },
}));

// beforeEach(() => {
//   jest.spyOn(adminRegisterSchema, "parse").mockImplementation(() => {
//     throw new Error("ZodValidationError");
//   });
// });

// jest.mock("../models/admin.model.js", () => ({
//   findOne: jest.fn(() => {}),
// }));
jest.mock("../models/admin.model.js");

let req, res, next;
beforeEach(() => {
  req = { body: {} };
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  next = jest.fn();
});

describe("admin registration", () => {
  //   it("test", () => {
  //     expect(2 + 2).toBe(4);
  //   });

  it("should fail zod schema validation", async () => {
    adminRegisterSchema.parse.mockImplementation(() => {
      throw new Error("ZodValidationError");
    });

    // Turn parse into a Jest spy
    // jest.spyOn(adminRegisterSchema, "parse").mockImplementation(() => {
    //   throw new Error("ZodValidationError");
    // });

    await asyncErrorHandler(AdminController.adminRegister)(req, res, next);

    expect(adminRegisterSchema.parse).toThrow("ZodValidationError");
    expect(adminRegisterSchema.parse).toHaveBeenCalled();
    expect(adminRegisterSchema.parse).toHaveBeenCalledWith({ ...req.body });

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it("should return response 'Username already exists' with status code 409", async () => {
    adminRegisterSchema.parse.mockImplementation(() => {});
    AdminModel.findOne.mockImplementation(() => true);

    await asyncErrorHandler(AdminController.adminRegister)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(assert.AssertionError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("Username already exists"),
      })
    );
  });

  it("should create new admin and return with token and status code 201", async () => {
    adminRegisterSchema.parse.mockImplementation(() => ({
      username: "test",
      password: "test",
    }));

    // AdminModel.findOne.mockImplementation(() => false);
    // AdminModel.mockImplementation(() => ({
    //   findOne: jest.fn(() => false),
    //   save: jest.fn(),
    // }));

    // mock static method
    jest.spyOn(AdminModel, "findOne").mockResolvedValueOnce(false);
    // mock instance method
    jest.spyOn(AdminModel.prototype, "save").mockResolvedValueOnce({});

    await asyncErrorHandler(AdminController.adminRegister)(req, res, next);

    // const adminModelSpy = jest.spyOn();

    expect(AdminModel).toHaveBeenCalled();
    expect(AdminModel).toHaveBeenCalledWith({
      username: "test",
      password: "test",
    });

    // const saveMethod = jest.spyOn(AdminModel.prototype, "save");
    expect(AdminModel.prototype.save).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.CREATED);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      msg: "Admin created",
    });
  });
});

describe("admin login", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should fail zod schema validation", async () => {
    adminLoginSchema.parse.mockImplementation(() => {
      throw new Error("ZodValidationError");
    });

    await asyncErrorHandler(AdminController.adminLogin)(req, res, next);

    expect(adminLoginSchema.parse).toThrow("ZodValidationError");
    expect(adminLoginSchema.parse).toHaveBeenCalled();
    expect(adminLoginSchema.parse).toHaveBeenCalledWith({ ...req.body });
  });

  it("should return response 'User Exists' (that's a typo) with status code 400 when user does not exists", async () => {
    adminLoginSchema.parse.mockImplementation(() => ({
      username: "test",
      password: "test",
    }));

    jest.spyOn(AdminModel, "findOne").mockResolvedValueOnce(null);

    await asyncErrorHandler(AdminController.adminLogin)(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(assert.AssertionError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("User Exists"),
      })
    );
  });

  it("should return response 'Unable to create token' with status code 503 when failing to generate token", async () => {
    const testPayload = {
      username: "test",
      password: "test",
    };

    adminLoginSchema.parse.mockImplementation(() => testPayload);
    jest.spyOn(AdminModel, "findOne").mockImplementation(() => ({
      generateJWT: jest.fn(() => null),
    }));

    await asyncErrorHandler(AdminController.adminLogin)(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(assert.AssertionError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("Unable to create token"),
      })
    );
  });

  it("should return response token with status code 200", async () => {
    const token = "token";

    jest.spyOn(AdminModel, "findOne").mockImplementation(() => ({
      username: "test",
      password: "test",
      generateJWT: jest.fn(() => token),
    }));

    await asyncErrorHandler(AdminController.adminLogin)(req, res, next);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.OK);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg: "Authentication successful",
        token: token,
      })
    );
  });
});
