const File = require('../models/File');
const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// @desc    Upload file
// @route   POST /api/v1/files
// @access  Private
exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'Please upload a file');
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'multimedia-app',
    });

    // Create file in database
    const file = await File.create({
      name: req.file.originalname,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      size: result.bytes,
      tags: req.body.tags ? req.body.tags.split(',') : [],
      uploadedBy: req.user.id,
    });

    res
      .status(201)
      .json(new ApiResponse(true, file, 'File uploaded successfully'));
  } catch (err) {
    next(err);
  }
};

// @desc    Get all files
// @route   GET /api/v1/files
// @access  Private
exports.getFiles = async (req, res, next) => {
  try {
    const files = await File.find({ uploadedBy: req.user.id }).sort('-uploadedAt');
    res.status(200).json(new ApiResponse(true, files, 'Files fetched successfully'));
  } catch (err) {
    next(err);
  }
};

// @desc    Search files
// @route   GET /api/v1/files/search
// @access  Private
exports.searchFiles = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      throw new ApiError(400, 'Please provide a search query');
    }

    // Search with text index and rank by views and upload date
    const files = await File.find(
      { $text: { $search: query }, uploadedBy: req.user.id },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' }, views: -1, uploadedAt: -1 })
      .exec();

    res.status(200).json(new ApiResponse(true, files, 'Search results'));
  } catch (err) {
    next(err);
  }
};

// @desc    Get single file
// @route   GET /api/v1/files/:id
// @access  Private
exports.getFile = async (req, res, next) => {
  try {
    const file = await File.findOneAndUpdate(
      { _id: req.params.id, uploadedBy: req.user.id },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!file) {
      throw new ApiError(404, 'File not found');
    }

    res.status(200).json(new ApiResponse(true, file, 'File fetched successfully'));
  } catch (err) {
    next(err);
  }
};

// @desc    Delete file
// @route   DELETE /api/v1/files/:id
// @access  Private
exports.deleteFile = async (req, res, next) => {
  try {
    const file = await File.findOne({ _id: req.params.id, uploadedBy: req.user.id });

    if (!file) {
      throw new ApiError(404, 'File not found');
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(file.publicId);

    // Delete from database
    await file.remove();

    res.status(200).json(new ApiResponse(true, null, 'File deleted successfully'));
  } catch (err) {
    next(err);
  }
};