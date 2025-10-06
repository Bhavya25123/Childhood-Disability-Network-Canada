const User = require("../Data/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const { validateRegistrationPayload } = require("../utils/validation");

// ✅ DEFINE REGISTER FIRST
const register = async (req, res) => {
  try {
    const { errors, values } = validateRegistrationPayload(req.body);

    if (Object.keys(errors).length > 0) {
      const firstField = Object.keys(errors)[0];
      const firstMessage = errors[firstField];
      return res.status(400).json({ error: firstMessage, details: errors });
    }

    const { password, email, ...profile } = values;

    // Avoid duplicate accounts
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...profile,
      email,
      passwordHash,
    });
    await newUser.save();
    return res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("❌ Error:", err);
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already registered" });
    }
    return res.status(500).json({ error: "Failed to register user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalizedEmail || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email: normalizedEmail });
    const passwordValid = user && (await bcrypt.compare(password, user.passwordHash));
    if (!passwordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);
    return res.status(200).json({ token, email: user.email, fullName: user.fullName });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ error: "Server error during login" });
  }
};

// ✅ THEN EXPORT IT
module.exports = {
  register,
  login,
};
