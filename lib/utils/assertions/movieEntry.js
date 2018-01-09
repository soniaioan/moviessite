const should = require('should');

should.Assertion.add(
    // the name of the custom assertion
    'ValidMovieEntry',
    // the implementation of the custom assertion
    function (data) {
        this.params = {
            operator: 'to be a valid movie entry',
            expected: data
        };
        var mv = this.obj
        should.exist(mv)
        mv.should.be.an.Object
        (function () {
            JSON.stringify(mv)
        }).should.not.throw()
        should.exist(mv.description)
        should.exist(mv.title)
        should.exist(mv._id)
        should.exist(mv.createdAt)
        should.exist(mv.hatesCounter)
        should.exist(mv.likesCounter)
        should.exist(mv.hatesCounter)
        should.exist(mv.userId)
        should.exist(mv.username)
        mv.description.should.eql(data.description)
        mv.title.should.eql(data.title)
    },
    true
);