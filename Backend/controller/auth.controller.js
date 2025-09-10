const User = require("../Data/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require('../utils/jwt');

// ✅ DEFINE REGISTER FIRST
  const register = async (req, res) => {
    try {
      const { fullName, email, city, province, zipCode, description, password } = req.body;
      if (!fullName || !email || !password) {
        return res
          .status(400)
          .json({ error: "fullName, email and password are required" });
      }

      // Avoid duplicate accounts
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ error: "Email already registered" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        fullName,
        email,
        city,
        province,
        zipCode,
        description,
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
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      const user = await User.findOne({ email });
      const passwordValid = user && (await bcrypt.compare(password, user.passwordHash));
      if (!passwordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = generateToken(user);
      return res.status(200).json({ token, email: user.email });
    } catch (err) {
      console.error('❌ Login error:', err);
      return res.status(500).json({ error: 'Server error during login' });
    }
  };

// ✅ THEN EXPORT IT
module.exports = {
  register,
  login,
};
