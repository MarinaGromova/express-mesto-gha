const mongoose = require('mongoose');

const express = require('express');

const { celebrate, Joi } = require('celebrate');

const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');

const { regexUrl } = require('./utils/utils');

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(20),
      avatar: Joi.string().regex(regexUrl),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => res.status(404).send({ message: 'NOT_FOUND' }));

app.listen(PORT);
