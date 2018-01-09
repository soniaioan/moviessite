const root = process.cwd()
const User = require(root + '/lib/models/user')
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt')
const constants = require(root +'/lib/constants')


exports.findByUsername = function(username){
    return User.findAsync({username:username})
}
exports.findByUserId = function(userId){
    return User.findAsync({_id: new ObjectId(userId)})
}

exports.save = function(user){
    var mongooseUser = new User(user)
    mongooseUser._id = mongoose.Types.ObjectId()
    return bcrypt.hash(user.password, 8).then(function(hash) {
        mongooseUser.password = hash
        return mongooseUser.saveAsync(mongooseUser)
    })
}

exports.insert = function(user) {
    var mongooseUser = new User(user)
    return mongooseUser.saveAsync(user)
}
exports.remove = function() {
    return User.remove()
}


exports.updateJwt = function(username, jwtToken) {
    return User.updateAsync({username: username}, {jwt: jwtToken})
}

exports.updateVotesHistory = function(voteAction, movieId, userId) {
    let voteActions = [voteAction]
    return User.findAsync({_id: new ObjectId(userId)}).then((result) => {
        let user = result[0]
        let updateOp = {}
        switch(voteAction) {
            case constants.VOTE_ACTION.LIKE:
                updateOp = { $push: {likes: movieId } }
                if (user.hates.indexOf(movieId) >-1) {
                    voteActions.push(constants.VOTE_ACTION.UNHATE)
                    updateOp['$pull'] = {hates: movieId}
                }
                break;
            case constants.VOTE_ACTION.UNLIKE:
                updateOp = { $pull: {likes: movieId } }
                break;
            case constants.VOTE_ACTION.HATE:
                updateOp = { $push: {hates: movieId} }
                if (user.likes.indexOf(movieId) >-1) {
                    voteActions.push(constants.VOTE_ACTION.UNLIKE)
                    updateOp['$pull'] = {likes: movieId}
                }
                break;
            case constants.VOTE_ACTION.UNHATE:
                updateOp = { $pull: {hates: movieId} }
                break;
        }
        return User.updateAsync({_id: new ObjectId(userId)}, updateOp).then(()=>{
            return Promise.resolve(voteActions)
        })
    })
}

