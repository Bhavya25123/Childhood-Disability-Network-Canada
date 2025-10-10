const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");
const User = require("./Data/User");
const Member = require("./Data/Member");

dotenv.config();

const server = http.createServer(app);

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Promise.all([User.syncIndexes(), Member.syncIndexes()]);

    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Mongo error:", err);
  }
}

if (process.env.NODE_ENV !== "test") {
  start();
}

module.exports = { app, server, start };
