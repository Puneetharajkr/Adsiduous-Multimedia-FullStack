const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { validateRegisterInput, validateLoginInput } = require('../validations/auth.validation');

exports.register = async (req, res, next) => {
  try {
    // Validate input
    validateRegisterInput(req.body);

    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'Email already in use');
    }

    // Create user
    const user = await User.create({ name, email, password });
    const token = user.generateAuthToken();
    
    res.status(201).json(
      new ApiResponse(true, { user, token }, 'User registered successfully')
    );
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    validateLoginInput(req.body);
    
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = user.generateAuthToken();
    res.status(200).json(
      new ApiResponse(true, { user, token }, 'User logged in successfully')
    );
  } catch (err) {
    next(err);
  }
};