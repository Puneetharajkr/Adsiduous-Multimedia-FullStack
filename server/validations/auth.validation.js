const validator = require('validator');
const ApiError = require('../utils/ApiError');

exports.validateRegisterInput = (data) => {
  const errors = {};
  
  // Name validation
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name is required';
  } else if (data.name.length > 50) {
    errors.name = 'Name must be less than 50 characters';
  }

  // Email validation
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Password validation
  if (!data.password || data.password.trim() === '') {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Object.keys(errors).length > 0) {
    throw new ApiError(400, 'Validation failed', errors);
  }
};

exports.validateLoginInput = (data) => {
  const errors = {};
  
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  }

  if (!data.password || data.password.trim() === '') {
    errors.password = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
    throw new ApiError(400, 'Validation failed', errors);
  }
};