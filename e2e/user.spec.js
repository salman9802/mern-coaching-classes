const request = require("supertest");
const mongoose = require("mongoose");

const createApp = require("../app");
const { connectToMongo } = require("../db.config");

require("dotenv").config({
  path: ".env.test",
});

let app;

describe("user registration and login", () => {
  beforeEach(async () => {
    await connectToMongo();
    app = createApp();
  });

  it("should be able to register", () => {
    request(app).post("/api/admin/register");
  });

  it.todo("should be able to login");

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
