const MPContact = require("../Data/MPContact");

const list = async (req, res) => {
  try {
    const { province } = req.query;
    const filter = province
      ? { province: new RegExp(`^${province}$`, "i") }
      : {};
    const contacts = await MPContact.find(filter);
    return res.json(contacts);
  } catch (err) {
    console.error("❌ MP fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch MP contacts" });
  }
};

module.exports = { list };
