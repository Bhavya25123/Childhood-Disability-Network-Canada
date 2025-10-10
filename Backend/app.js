const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const mpRoutes = require("./routes/mp.routes");
const memberRoutes = require("./routes/member.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/mps", mpRoutes);
app.use("/api/members", memberRoutes);

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "Resource not found" });
  }
  return next();
});

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

module.exports = app;
