const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const router = require('./routes');
const errorHandler = require('./middleware/error');

const app = express();

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Sanitize data
app.use(mongoSanitize());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Mount routers
app.use('/api/v1', router);

// Error handler middleware
app.use(errorHandler.errorHandler);

module.exports = app;