const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiration = "2h";

function signToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = signToken;