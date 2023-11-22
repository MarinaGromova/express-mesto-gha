const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Поле "Название" должно быть заполнено'],
      minLength: [2, 'Минимальная длина поля - 2 символа'],
      maxLength: [30, 'Максимальная длина поля - 30 символов'],
    },
    about: {
      type: String,
      minLength: [2, 'Минимальная длина поля - 2 символа'],
      maxLength: [30, 'Максимальная длина поля - 30 символов'],
    },
    avatar: {
      type: String,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', UserSchema);
