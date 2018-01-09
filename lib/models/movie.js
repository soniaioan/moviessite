const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        index: true
    },
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: String,
    username: String,
    likesCounter: {
        type: Number,
        default: 0
    },
    hatesCounter: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Movie', schema);