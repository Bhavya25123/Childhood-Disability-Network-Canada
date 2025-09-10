const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const authRoutes = require("./routes/auth.routes");
const User = require("./Data/User");

dotenv.config();

// App + Server
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    // Ensure obsolete indexes (e.g., legacy username) are removed
    await User.syncIndexes();

    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Mongo error:", err));

