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
  role: String,
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
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      return ret;
    }
  },
  toJSON: {
    transform: (obj, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      return ret;
    }
  },
});

module.exports = mongoose.model("User", userSchema);