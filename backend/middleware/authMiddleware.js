const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    // GET AUTH HEADER
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        message: "Access denied"
      });

    }

    // REMOVE "Bearer "
    const token =
      authHeader.replace("Bearer ", "");

    // VERIFY TOKEN
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // STORE USER DATA
    req.user = verified;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token"
    });

  }

};

module.exports = authMiddleware;