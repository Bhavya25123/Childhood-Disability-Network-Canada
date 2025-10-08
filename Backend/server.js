const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config();

const authRoutes = require("./routes/auth.routes");
const mpRoutes = require("./routes/mp.routes");
const memberRoutes = require("./routes/member.routes");
const User = require("./Data/User");
const Member = require("./Data/Member");

// App + Server
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/mps", mpRoutes);
app.use("/api/members", memberRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "Resource not found" });
  }
  return next();
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("❌ Unexpected server error:", err);
  const status = err.status || 500;
  const message =
    typeof err.message === "string" && err.message
      ? err.message
      : "An unexpected error occurred";
  res.status(status).json({ error: message });
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    // Ensure obsolete indexes (e.g., legacy username) are removed
    await Promise.all([User.syncIndexes(), Member.syncIndexes()]);

    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Mongo error:", err));

