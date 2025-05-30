const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/auth');
const {
  uploadFile,
  getFiles,
  getFile,
  searchFiles,
  deleteFile,
} = require('../controllers/files');

const router = express.Router();

// Multer configuration for file upload
const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

router
  .route('/')
  .post(protect, upload.single('file'), uploadFile)
  .get(protect, getFiles);

router.get('/search', protect, searchFiles);
router
  .route('/:id')
  .get(protect, getFile)
  .delete(protect, deleteFile);

module.exports = router;