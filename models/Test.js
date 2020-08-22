const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: String,
  description: {
    required: false,
    type: String,
  },
  isMCQ: Boolean,
  options: [String],
  answer: {
    required: false,
    type: String
  }
});

const testSchema = new Schema({
  title: {
    required: true,
    type: Schema.Types.String,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  timeAlloted: Number,
  description: String,
  questions: [questionSchema],
}, {
  timestamps: true,
  toObject: {
    transform: (obj, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  },
  toJSON: {
    transform: (obj, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  },
});

module.exports = mongoose.model("Test", testSchema);