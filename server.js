if (process.env.NODE_ENV !== "production") require("dotenv").config();

const { connectToMongo } = require("./db.config.js");
const createApp = require("./app.js");
connectToMongo();

const PORT = process.env.PORT || 80;

const app = createApp();

app.listen(PORT, ["localhost", process.env.LOCAL_IP], () => {
  console.log(`Server started at http://localhost:${PORT}`);
  if (process.env.LOCAL_IP)
    console.log(`Also on http://${process.env.LOCAL_IP}:${PORT}`);
});
