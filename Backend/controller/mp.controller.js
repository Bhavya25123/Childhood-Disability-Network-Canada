const MPContact = require("../Data/MPContact");
const MPEmail = require("../Data/MPEmail");

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
    const emailsRaw = await MPEmail.find({}).lean();
    const contacts = raw.map((c) => ({
      id: c._id,
      name: [c["First Name"], c["Last Name"]].filter(Boolean).join(" "),
      party: c["Political Affiliation"],
      constituency: c["Constituency"],
      province: c["Province / Territory"] || c.province,
      startDate: c["Start Date"],
      email: c["Email"],
    }));
    // Map emails
    const emails = emailsRaw.map(e => ({
      id: e._id,
      name: [e["First name"], e["Last name"]].filter(Boolean).join(" "),
      email: e["Email"],
      sourceUrl: e["Source URL"],
    }));
  
    // Merge contacts and emails by matching name
    const merged = contacts.map(contact => {
      const emailEntry = emails.find(e => e.name.toLowerCase() === contact.name.toLowerCase());
      return {
        ...contact,
        email: emailEntry ? emailEntry.email : "Not found",
        sourceUrl: emailEntry ? emailEntry.sourceUrl : "https://www.ourcommons.ca/members/en",
      };
    });
  
    // Return merged results
    return res.json(merged);
    } catch (err) {
      console.error("❌ MP fetch error:", err);
      return res.status(500).json({ error: "Failed to fetch MP contacts" });
    }
};

module.exports = { list };
