require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const scoresRouter = require('./routes/scores');

const cors = require('cors');

const RateLimit = require('express-rate-limit');

const app = express();

app.use(cors());

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
});

app.use(limiter);

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/scores', scoresRouter);

module.exports = app;
