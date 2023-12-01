const mongoose = require('mongoose');

const express = require('express');

const { errors } = require('celebrate');

const routes = require('./routes/index');

const handleError = require('./middlewares/handleError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(routes);

app.use(errors());

app.use(handleError);

app.listen(PORT);
