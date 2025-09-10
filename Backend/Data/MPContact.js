const mongoose = require("mongoose");

const mpContactSchema = new mongoose.Schema({
  name: String,
  party: String,
  constituency: String,
  email: String,
  phone: String,
  image: String,
});

const mpConnection = mongoose.createConnection(process.env.MP_MONGO_URI);

module.exports = mpConnection.model("MPContact", mpContactSchema);
