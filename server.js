const path = require("path");
const fs = require("fs");

require("dotenv").config();

const express = require("express");

const PORT = process.env.PORT || 80;
const app = express();

if (process.env.NODE_ENV === "production") {
  const DIST_PATH = path.join(__dirname, "frontend", "dist");
  if (fs.existsSync(DIST_PATH)) {
    console.log(`Using distribution found at '${DIST_PATH}'`);

    app.use(express.static(DIST_PATH));
    app.get("*", (req, res) => {
      res.sendFile(path.join(DIST_PATH, "index.html"));
    });
  } else {
    console.log(`No distribution found! '${DIST_PATH}' does not exists.`);
    setImmediate(() => {
      process.exit(1);
    });
  }
}

app.listen(PORT, ["localhost", process.env.LOCAL_IP], () => {
  console.log(`Server started at http://localhost:${PORT}`);
  if (process.env.LOCAL_IP)
    console.log(`Also on http://${process.env.LOCAL_IP}:${PORT}`);
});
