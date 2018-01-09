const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        index:true
    },
    username: {
        type: String
    },
    /**
     * User's password, encypted.
     * @type {String}
     * @memberOf User#
     */
    password: {
        type: String
    },
    likes: [],
    hates: [],
    createdAt: {
        type: Date,
        default: Date.now
    },
    jwt: String
})
schema.index({'username': 1}, {unique: 1});
module.exports = mongoose.model('User', schema)
