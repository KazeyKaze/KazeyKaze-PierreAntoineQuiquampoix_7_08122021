const jwt = require("jsonwebtoken");

///////////////////////////////
// AUTHENTIFICATION'S TOKEN
///////////////////////////////
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
};
