const Card = require('../models/card');

const {
  STATUS_CREATED,
  ERROR_CODE,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Server Error' }));
};

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Server Error' });
      }
    });
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      res.status(NOT_FOUND).send({
        message: 'NOT_FOUND',
      });
      return;
    }
    res.send({ message: 'Card delete' });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    } else {
      res.status(SERVER_ERROR).send({
        message: 'Server Error',
      });
    }
  }
};

module.exports.likeCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId);
    if (!card) {
      res.status(NOT_FOUND).send({
        message: 'NOT_FOUND',
      });
      return;
    }
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    res.send(updatedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    } else {
      res.status(SERVER_ERROR).send({
        message: 'Server Error',
      });
    }
  }
};

module.exports.deleteLikeCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId);

    if (!card) {
      res.status(NOT_FOUND).send({
        message: 'NOT_FOUND',
      });
      return;
    }
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);

    res.send(updatedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    } else {
      res.status(SERVER_ERROR).send({
        message: 'Server Error',
      });
    }
  }
};
