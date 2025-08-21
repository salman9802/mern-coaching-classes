const request = require("supertest");
const mongoose = require("mongoose");

const createApp = require("../app");
const { connectToMongo } = require("../db.config");
const { STATUS_CODES } = require("../constants/http");
const AdminModel = require("../models/admin.model");

require("dotenv").config({
  path: ".env.test",
});

let app;

describe("Admin", () => {
  const admin = {
    username: "test",
    password: "test",
  };
  const newAdmin = {
    username: "test2",
    password: "test2",
  };
  const contact = {
    name: "test",
    mobile: "test",
    city: "test",
    educationClass: "test",
  };
  let token, newAdminId, contactId;

  beforeAll(async () => {
    await connectToMongo();
    await mongoose.connection.dropDatabase();
    app = createApp();
    await new AdminModel(admin).save();
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should be able to login", async () => {
    const response = await request(app).post("/api/admin/login").send(admin);
    expect(response.statusCode).toBe(STATUS_CODES.OK);

    token = response.body.token;
  });

  it("should be able to register new admin", async () => {
    const response = await request(app)
      .post("/api/admin/register")
      .set("Authorization", `Bearer ${token}`)
      .send(newAdmin);

    expect(response.statusCode).toBe(STATUS_CODES.CREATED);
  });

  it("should be able to fetch all admins", async () => {
    const response = await request(app)
      .get("/api/admin/admins")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.body.admins.length).toBe(2);

    const [admin1, admin2] = response.body.admins;
    expect(admin1).toEqual(
      expect.objectContaining({
        ...admin,
        type: "nonroot",
      })
    );
    expect(admin2).toEqual(
      expect.objectContaining({
        ...newAdmin,
        type: "nonroot",
      })
    );
    newAdminId = admin2._id;

    // approach #2: combined
    expect(response.body.admins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ ...admin, type: "nonroot" }),
        expect.objectContaining({ ...newAdmin, type: "nonroot" }),
      ])
    );
  });

  it("should be able to delete admin", async () => {
    const response = await request(app)
      .delete("/api/admin/admins")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: newAdminId });

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.body.id).toBe(newAdminId);
  });

  it("should be able to add contact", async () => {
    const response = await request(app)
      .post("/api/admin/contacts")
      .send(contact);

    expect(response.statusCode).toBe(STATUS_CODES.CREATED);
  });

  it("should be able to access contact", async () => {
    const response = await request(app)
      .get("/api/admin/contacts/all")
      .set("Authorization", `Bearer ${token}`);

    contactId = response.body.contacts[0]._id;

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.body.contacts.length).toBe(1);
    expect(response.body.contacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...contact,
        }),
      ])
    );
  });

  it("should be able to delete all contacts", async () => {
    const ids = [contactId];

    const response = await request(app)
      .delete("/api/admin/contacts/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({ ids });

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.body).toEqual({
      msg: "Contacts deleted succesfully",
    });

    const response2 = await request(app)
      .delete("/api/admin/contacts/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({ ids });

    expect(response2.statusCode).toBe(STATUS_CODES.OK);
    expect(response2.body).toEqual({
      msg: "No contacts found",
    });
  });
});
