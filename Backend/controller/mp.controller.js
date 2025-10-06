const MPContact = require("../Data/MPContact");

const list = async (req, res) => {
  try {
    const { city, constituency, province } = req.query;
    const location = constituency || city;
    const filter = location
      ? {
          $or: [
            { constituency: new RegExp(location, "i") },
            { Constituency: new RegExp(location, "i") },
          ],
        }
      : province
      ? {
          $or: [
            { province: new RegExp(province, "i") },
            { "Province / Territory": new RegExp(province, "i") },
          ],
        }
      : {};
    const raw = await MPContact.find(filter).lean();
    const contacts = raw.map((c) => ({
      id: c._id,
      name: [c["First Name"], c["Last Name"]].filter(Boolean).join(" "),
      party: c["Political Affiliation"],
      constituency: c["Constituency"],
      province: c["Province / Territory"] || c.province,
      startDate: c["Start Date"],
    }));
    return res.json(contacts);
  } catch (err) {
    console.error("❌ MP fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch MP contacts" });
  }
};

module.exports = { list };
