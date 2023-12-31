const { sign, verify } = require("jsonwebtoken");

const createToken = (req) => {
    const {email} = req.body 
  const accessToken = sign(
    { email},
    "jwtsecretplschange"
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });
  try {
    const validToken = verify(accessToken, "jwtsecretplschange");
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createToken, validateToken };