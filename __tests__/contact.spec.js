const assert = require("assert");

const AdminController = require("../controllers/admin.controller");
const ErrorUtils = require("../utils/error");
const { STATUS_CODES } = require("../constants/http");
const ContactModel = require("../models/contact.model.js");

jest.mock("../models/contact.model.js");
// jest.mock("../controllers/admin.controller");
// jest.mock("../utils/error");

describe("adding contact", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis,
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should error with status code 400 and 'Invalid request' message", async () => {
    jest
      .spyOn(AdminController, "isValidString")
      .mockImplementationOnce(() => false);

    await ErrorUtils.asyncErrorHandler(AdminController.addContact)(
      req,
      res,
      next
    );

    const errorAssertSpy = jest.spyOn(ErrorUtils, "errorAssert");

    expect(errorAssertSpy).toThrow(assert.AssertionError);
    expect(errorAssertSpy).toHaveBeenCalledWith();
    // expect(errorAssertSpy).toHaveBeenCalledWith(
    //   false,
    //   STATUS_CODES.BAD_REQUEST,
    //   "Invalid request"
    // );
  });

  it("should create contact and return with status code 201 and appropriate response", async () => {
    const payload = {
      name: "test",
      mobile: "test",
      city: "test",
      educationClass: "test",
    };

    req.body = payload;

    await ErrorUtils.asyncErrorHandler(AdminController.addContact)(
      req,
      res,
      next
    );

    expect(ContactModel).toHaveBeenCalled();
    expect(ContactModel).toHaveBeenCalledWith(payload);
  });
});

describe("deleting contacts", () => {
  let req, res, next;
  const ids = [1, 2, 3];

  // jest.mock("../models/contact.model.js", () => ({
  //   deleteMany: jest.fn(({ _id }) =>
  //     _id.$in === ids ? { deletedCount: ids.length } : { deletedCount: 0 }
  //   ),
  // }));
  // jest.mock("../models/contact.model.js", () => {
  //   return function () {
  //     return {
  //       deleteMany: jest.fn(({ _id }) =>
  //         _id.$in === ids
  //           ? Promise.resolve({ deletedCount: ids.length })
  //           : Promise.resolve({ deletedCount: 0 })
  //       ),
  //     };
  //   };
  // });

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    ContactModel.deleteMany = jest.fn(({ _id }) =>
      _id.$in === ids ? { deletedCount: ids.length } : { deletedCount: 0 }
    );

    // jest.spyOn(ContactModel.prototype, "deleteMany")
    // jest.mock("../models/contact.model.js", () => ({
    //   deleteMany: jest.fn(({ _id }) =>
    //     _id.$in === ids ? { deletedCount: ids.length } : { deletedCount: 0 }
    //   ),
    // }));

    // jest.spyOn(ContactModel, "deleteMany").mockImplementationOnce(({ _id }) =>
    //   // _id.$in.length === ids.length && _id.$in.every((e, i) => e === ids[i])
    //   _id.$in === ids
    //     ? Promise.resolve({ deletedCount: ids.length })
    //     : Promise.resolve({ deletedCount: 0 })
    // );
    // jest.spyOn(ContactModel, "deleteMany").mockImplementationOnce(({ _id }) => {
    //   console.log(_id.$in, ids);
    //   // console.log(_id.$in === ids);

    //   return _id.$in.length === ids.length &&
    //     _id.$in.every((e, i) => e === ids[i])
    //     ? Promise.resolve({ deletedCount: ids.length })
    //     : Promise.resolve({ deletedCount: 0 });
    // });
  });

  it("should error with status code 400 and 'Invalid request'", async () => {
    req.body = { ids: [] };

    await ErrorUtils.asyncErrorHandler(AdminController.deleteContacts)(
      req,
      res,
      next
    );

    const errorAssertSpy = jest.spyOn(ErrorUtils, "errorAssert");

    expect(errorAssertSpy).toThrow(assert.AssertionError);
    expect(errorAssertSpy).toHaveBeenCalled();

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(assert.AssertionError));
  });
  it("Should error when deleting contacts", async () => {
    // jest.spyOn(ErrorUtils, "errorAssert").mockImplementationOnce(() => {});
    // ContactModel.mockImplementationOnce(() => ({
    //   deleteMany: jest.fn(() => {
    //     throw new Error("error");
    //   }),
    // }));
    jest.spyOn(ContactModel, "deleteMany").mockImplementationOnce(() => {
      throw new Error("test");
    });
    jest
      .spyOn(ContactModel, "deleteMany")
      .mockImplementationOnce(() => Promise.reject("test"));

    await ErrorUtils.asyncErrorHandler(AdminController.deleteContacts)(
      req,
      res,
      next
    );

    const deleteManySpy = jest.spyOn(ContactModel, "deleteMany");
    expect(deleteManySpy).toThrow(Error);
  });
  it("should find contacts to delete", async () => {
    req.body = { ids: ids };

    await ErrorUtils.asyncErrorHandler(AdminController.deleteContacts)(
      req,
      res,
      next
    );

    expect(ContactModel.deleteMany).toHaveBeenCalled();
    expect(ContactModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: ids },
    });
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.OK);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      msg: "Contacts deleted succesfully",
    });
  });
  it("should not find contacts to delete", async () => {
    const ids = [4, 5, 6];
    req.body = { ids };

    await ErrorUtils.asyncErrorHandler(AdminController.deleteContacts)(
      req,
      res,
      next
    );

    expect(ContactModel.deleteMany).toHaveBeenCalled();
    expect(ContactModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: ids },
    });

    // expect(next).toHaveBeenCalled();
    // expect(ErrorUtils.errorAssert).toThrow();
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.OK);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ msg: "No contacts found" });
  });
});
