const mongoose = require("mongoose");

const mpContactSchema = new mongoose.Schema({
  name: String,
  party: String,
  constituency: String,
  email: String,
  phone: String,
  image: String,
  // Some datasets store the province under "Province / Territory". Include
  // both keys so queries work regardless of which field name is present.
  province: String,
  "Province / Territory": String,
});

// Reuse the main connection string if a dedicated MP one isn't provided
const mpUri = process.env.MP_MONGO_URI || process.env.MONGO_URI;

const mpConnection = mongoose.createConnection(mpUri, {
  dbName: process.env.MP_DB_NAME || "MPContacts",
});

module.exports = mpConnection.model("MPContact", mpContactSchema);

