const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {

  const token = req.headers["authorization"]

  if (!token) return res.status(403).json("Token required")

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json("Invalid token")
  }

}