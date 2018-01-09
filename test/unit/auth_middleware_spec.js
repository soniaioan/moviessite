const root = process.cwd()
const should = require('should')
const expect = require('chai').expect
const sinon = require('sinon')
const userDao = require(root + '/lib/dao/userDao')
const auth = require(root +'/lib/middleware/auth')
const codes = require(root + '/lib/codes')
const jwt = require('jsonwebtoken')
describe('Unit Tests: Auth Middleware Functionality', () => {
    it('If user dao returns no result for decoded userid from jwt, unauthorized error should be throwed', () => {
        sinon.stub(jwt, 'verify').returns(Promise.resolve({decoded: {_id: 'dfdfdfd'}}))
        sinon.stub(userDao, 'findByUserId').returns(Promise.resolve({}))
        let req = {headers: {'x-access-token': 'fdfdfd'}}
        let res = {}
        let next = {}
        return auth(req, res, next).then((result) => {
        }).catch((err) =>{
            expect(err.message).equal(codes.UNAUTHORIZED.message)
        })
    })
})
