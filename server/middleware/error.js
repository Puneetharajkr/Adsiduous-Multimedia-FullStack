const ApiError = require('../utils/ApiError');

// Error handling middleware
exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    err = new ApiError(401, 'Invalid token');
  }

  // Handle JWT expired errors
  if (err.name === 'TokenExpiredError') {
    err = new ApiError(401, 'Token expired');
  }

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err = new ApiError(400, `${field} already exists`);
  }

  // Handle MongoDB validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    err = new ApiError(400, messages.join(', '));
  }

  // Handle Multer errors (file upload)
  if (err.name === 'MulterError') {
    err = new ApiError(400, err.message);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};