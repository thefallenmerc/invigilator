const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    required: true,
    type: Schema.Types.String,
    trim: true,
  },
  email: {
    required: true,
    unique: true,
    type: Schema.Types.String,
    trim: true,
  },
  password: {
    required: true,
    type: Schema.Types.String,
    trim: true,
  },
}, {
  timestamps: true,
  toObject: {
    transform: (obj, ret) => {
      delete ret.__v;
      delete ret._id;
      return ret;
    }
  },
  toJSON: {
    transform: (obj, ret) => {
      delete ret.__v;
      delete ret._id;
      return ret;
    }
  },
});

module.exports = mongoose.model("User", userSchema);