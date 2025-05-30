const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// @desc    Get all users (Admin only)
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(new ApiResponse(true, users, 'Users fetched successfully'));
  } catch (err) {
    next(err);
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // TODO: Add cleanup for user's files in production
    
    res.status(200).json(new ApiResponse(true, null, 'User deleted successfully'));
  } catch (err) {
    next(err);
  }
};