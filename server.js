const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(logger('dev'));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budget', {
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.use(require('./routes/api.js'));

app.listen(PORT, () => console.log(`App running on port ${PORT}!`));
