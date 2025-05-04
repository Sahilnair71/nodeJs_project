const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET,);

      // Attach user info to request
      req.user = decoded.user;

      // Proceed to next middleware/handler
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  } else {
 
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = validateToken;
