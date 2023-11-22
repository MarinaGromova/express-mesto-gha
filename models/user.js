const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 2,
      maxLength: 30,
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
    },
    avatar: {
      type: String,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', UserSchema);
