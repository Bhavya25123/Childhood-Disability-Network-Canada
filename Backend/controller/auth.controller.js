const User = require("../Data/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require('../utils/jwt');

// ✅ DEFINE REGISTER FIRST
const register = async (req, res) => {
  console.log("✅ REGISTER route hit", req.body);
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, passwordHash, role });
    const result = await newUser.save();
    console.log("✅ Saved to DB:", result);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token, role: user.role, email: user.email });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// ✅ THEN EXPORT IT
module.exports = {
  register,
  login,
};
