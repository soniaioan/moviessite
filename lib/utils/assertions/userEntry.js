const should = require('should');

should.Assertion.add(
    // the name of the custom assertion
    'ValidUserEntry',
    // the implementation of the custom assertion
    function (data) {
        this.params = {
            operator: 'to be a valid user entry',
            expected: data
        };
        var usr = this.obj
        should.exist(usr)
        usr.should.be.an.Object
        (function () {
            JSON.stringify(usr)
        }).should.not.throw()
        should.exist(usr.username)
        should.exist(usr.password)
        should.exist(usr.createdAt)
        should.exist(usr.jwt)
        should.exist(usr._id)
        usr.username.should.eql(data.username)
    },
    true
);
