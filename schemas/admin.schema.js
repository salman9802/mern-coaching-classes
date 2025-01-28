const { z } = require("zod");

const adminRegisterSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" }),
});

const adminLoginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" }),
});

module.exports = { adminRegisterSchema, adminLoginSchema };
