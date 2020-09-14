const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');

const app = express();
const uri = '/api/v0';

// create test user in db on startup if required
const createTestUser = require('./utils/create-test-user');
createTestUser();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (_origin, cb) => cb(null, true), credentials: true }));

// api routes
app.use(uri + '/users', require('./routes/user.routes'));

// swagger docs routes
// app.use('/api/v0/api-docs', require('./helpers/swagger'));

// global error handler
// app.use(require('./middlewares/handle-errors'));

module.exports = app;
