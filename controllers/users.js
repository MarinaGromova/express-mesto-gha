const User = require('../models/user');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const ERROR_CODE = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS_OK).send(users))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Server Error' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'User not found' });
        return;
      }
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Invalid ID' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Server Error' });
      }
    });
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Server Error' });
      }
    });
};

module.exports.updateUsersInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'User not found' });
        return;
      }
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Server Error' });
      }
    });
};

module.exports.updateUsersAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'User not found' });
        return;
      }
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Server Error' });
      }
    });
};
