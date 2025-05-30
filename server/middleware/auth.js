const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1) Check for token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      throw new ApiError(401, 'Not authorized to access this route');
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new ApiError(401, 'The user no longer exists');
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

// Role-based access control
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, 'Not authorized to access this route');
    }
    next();
  };
};