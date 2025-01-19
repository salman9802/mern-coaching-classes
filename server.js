const path = require("path");
const fs = require("fs");

const express = require("express");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const { connectToMongo } = require("./db.config.js");
connectToMongo();
const { errorHandler } = require("./middlewares/error.middleware.js");

const PORT = process.env.PORT || 80;
const app = express();

// Serving static resources from react
const DIST_PATH = path.join(__dirname, "frontend", "dist");
if (process.env.NODE_ENV === "production") {
  if (fs.existsSync(DIST_PATH)) {
    console.log(`Using distribution found at '${DIST_PATH}'`);

    app.use(express.static(DIST_PATH));
  } else {
    console.log(`No distribution found! '${DIST_PATH}' does not exists.`);
    setImmediate(() => {
      process.exit(1);
    });
  }
}

// Middlewares to parse json and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Admin routes
app.use("/api/admin", require("./routes/admin.route.js"));

// Fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_PATH, "index.html"));
});

// Custom error handling middleware
app.use(errorHandler);

app.listen(PORT, ["localhost", process.env.LOCAL_IP], () => {
  console.log(`Server started at http://localhost:${PORT}`);
  if (process.env.LOCAL_IP)
    console.log(`Also on http://${process.env.LOCAL_IP}:${PORT}`);
});
