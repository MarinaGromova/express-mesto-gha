const Card = require('../models/card');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const ERROR_CODE = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(STATUS_OK).send(cards))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Server Error' }));
};

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Server Error' });
      }
    });
};

module.exports.deleteCard = async (req, res) => {
  try {
    if (req.params.cardId.length === 24) {
      const card = await Card.findByIdAndDelete(req.params.cardId);
      if (!card) {
        res.status(NOT_FOUND).send({
          message: 'NOT_FOUND',
        });
        return;
      }
      res.send({ message: 'Card delete' });
    } else {
      res.status(ERROR_CODE).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(SERVER_ERROR).send({
      message: 'Server Error',
    });
  }
};

module.exports.likeCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    if (cardId.length === 24) {
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
    } else {
      res.status(ERROR_CODE).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(SERVER_ERROR).send({
      message: 'Server Error',
    });
  }
};

module.exports.deleteLikeCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    if (cardId.length === 24) {
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
    } else {
      res.status(ERROR_CODE).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(SERVER_ERROR).send({
      message: 'Server Error',
    });
  }
};
