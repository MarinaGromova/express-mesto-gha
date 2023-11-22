const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 2,
      maxLength: 30,
    },
    link: {
      type: String,
      require: true,
      minLength: 2,
      maxLength: 30,
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
