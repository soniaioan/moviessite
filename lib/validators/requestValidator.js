const root = process.cwd()
const codes = require(root + '/lib/codes')
const Joi = require('joi')
const customError = require(root + '/lib/customError')
const constants = require(root + '/lib/constants')


const credentialsSchema = {
  username: Joi.string().required(),
  password: Joi.string().required(),
};

const movieSchema = {
  title: Joi.string().required(),
  description: Joi.string().required()
}

const voteSchema = {
  vote: Joi.string().valid([constants.VOTE_ACTION.LIKE,constants.VOTE_ACTION.UNLIKE,
    constants.VOTE_ACTION.HATE, constants.VOTE_ACTION.UNHATE ]).required()
}

function validate(body, schema) {
   return new Promise(function (resolve, reject) {
     let result = Joi.validate(body, schema)
     if (!result.error) {
        resolve(body)
     }
     reject(new customError(result.error.message, codes.INVALID_CREDENTIALS.code))
     return
   })
}

module.exports = {
  credentialsValidate : function(body){
    return validate(body, credentialsSchema)
  },
  movieValidate : function(body){
    return validate(body, movieSchema)
  },
  voteValidate: function(body) {
    return validate(body, voteSchema)
  }
}