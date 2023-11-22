const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Поле "Название" должно быть заполнено'],
      minLength: [2, 'Минимальная длина поля - 2 символа'],
      maxLength: [30, 'Максимальная длина поля - 30 символов'],
    },
    link: {
      type: String,
      require: true,
      minLength: [2, 'Минимальная длина поля - 2 символа'],
      maxLength: [30, 'Максимальная длина поля - 30 символов'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      ref: 'user',
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', CardSchema);
