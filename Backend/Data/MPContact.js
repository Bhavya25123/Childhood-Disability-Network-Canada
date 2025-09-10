const mongoose = require("mongoose");

const mpContactSchema = new mongoose.Schema(
 { "Honorific Title": String,
  "First Name": String,
  "Last Name": String,
  "Constituency": String,
  "Province / Territory": String,
  "Political Affiliation": String,
  "Start Date": String,
}, { collection: "MPContacts" });

module.exports = mongoose.model("MPContact", mpContactSchema);
