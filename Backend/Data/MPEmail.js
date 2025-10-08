const mongoose = require("mongoose");

const mpEmailSchema = new mongoose.Schema(
  {
    "District name": String,
    "Primary role": String,
    "Name": String,
    "First name": String,
    "Last name": String,
    "Gender": String,
    "Party name": String,
    "Email": String,
    "Photo URL": String,
    "Source URL": String,
    "Website": String,
    "Facebook": String,
    "Instagram": String,
    "Twitter": String,
    "LinkedIn": String,
    "YouTube": String,
  },
  { collection: "MPEmail" }
);

module.exports = mongoose.model("MPEmail", mpEmailSchema);
