const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userTestSchema = new Schema({
    test: {
        type: Schema.Types.ObjectId,
        ref: "Test",
    },
    batch: String,
    date: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
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

module.exports = mongoose.model('UserTest', userTestSchema);