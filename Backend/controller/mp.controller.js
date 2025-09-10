const MPContact = require("../Data/MPContact");

const list = async (req, res) => {
  try {
    const contacts = await MPContact.find();
    return res.json(contacts);
  } catch (err) {
    console.error("❌ MP fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch MP contacts" });
  }
};

module.exports = { list };
