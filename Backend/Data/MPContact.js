const mongoose = require("mongoose");

const mpContactSchema = new mongoose.Schema(
  {
    "First Name": String,
    "Last Name": String,
    Constituency: String,
    "Province / Territory": String,
    "Political Affiliation": String,
    "Start Date": String,
  },
  { strict: false }
);

// Reuse the main connection string if a dedicated MP one isn't provided
const mpUri = process.env.MP_MONGO_URI || process.env.MONGO_URI;

const mpConnection = mongoose.createConnection(mpUri, {
  dbName: process.env.MP_DB_NAME || "MPContacts",
});

module.exports = mpConnection.model("MPContact", mpContactSchema);
