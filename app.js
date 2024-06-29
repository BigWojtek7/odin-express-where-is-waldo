require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const cors = require('cors');

const app = express();

app.use(cors());

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://wojtasjg:VWCta3rKJQuwvFus@cluster0.0tdju1c.mongodb.net/waldo?retryWrites=true&w=majority&appName=Cluster0')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
