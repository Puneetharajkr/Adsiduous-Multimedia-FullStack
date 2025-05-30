const ApiError = require('../utils/ApiError');
const { FILE_TYPES, MAX_FILE_SIZE } = require('../constants');

exports.validateFileUpload = (file) => {
  if (!file) {
    throw new ApiError(400, 'Please upload a file');
  }

  // Check file size (50MB limit)
  if (file.size > MAX_FILE_SIZE) {
    throw new ApiError(400, `File size must be less than ${MAX_FILE_SIZE/1024/1024}MB`);
  }

  // Check file type
  const fileType = file.mimetype.split('/')[0];
  if (!FILE_TYPES.includes(fileType)) {
    throw new ApiError(400, `Only ${FILE_TYPES.join(', ')} files are allowed`);
  }
};

// Create constants.js in utils/ if not exists