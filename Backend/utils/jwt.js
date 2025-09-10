const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secretkey';

const generateToken = (user) => {
    const payload = {
      id: user._id,
      email: user.email,
    };
  
    return jwt.sign(payload, SECRET, { expiresIn: '2h' }); // same secret, same algorithm
  };
  
module.exports = { generateToken };
