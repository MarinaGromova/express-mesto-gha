const Card = require('../models/card');

const {
  BadRequestError,
  NotFoundError,
} = require('../errors/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      next(new NotFoundError('Пользователь не найден'));
    }
    res.send({ message: 'Card delete' });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.likeCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId);
    if (!card) {
      next(new NotFoundError('Пользователь не найден'));
    }
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    res.send(updatedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteLikeCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId);

    if (!card) {
      next(new NotFoundError('Пользователь не найден'));
    }
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);

    res.send(updatedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};
