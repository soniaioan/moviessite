// data are used by tests
const ObjectId = require('mongoose').Types.ObjectId;
const jw1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTNmNmNiODAzOTI2NjhhN2JjZGQzZmQiLCJpYXQiOjE1MTQ1NTUyNDIsImV4cCI6MTUxNTQxOTI0Mn0.xiyCvG5-f2pgtsX5yfnGIB2xqCvKfoyCYR7F8yttZcY'
const jw2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTQyNjBjNTY2NGIwYTIyMGMwMGJkMWUiLCJpYXQiOjE1MTQ1NTY3NTcsImV4cCI6MTUxNTQyMDc1N30.PViKMlg4IW3Fnu4LFC2UUwN_11BRQ6hEM0D7m1SRp24'
module.exports = {

    users: [{
        _id:  new ObjectId('5a3f6cb80392668a7bcdd3fd'),
        username: 'George',
        password: '$2a$08$cgdYaWRpZOZ4dvOSWdocCuRcqYG1V9kMhd2scAXqJjfgqeuTD/eua',
        likes: ['5a3f6cb80392668a7bcdd3fa'],
        hates: ['5a3f6cb80392668a7bcdd3f5'],
        jwt: jw1
    }, {
        _id:  new ObjectId('5a4260c5664b0a220c00bd1e'),
        username: 'Maria',
        password: '$2a$08$cgdYaWRpZOZ4dvOSWdocCuRcqYG1V9kMhd2scAXqJjfgqeuTD/eua',
        jwt: jw2,
        likes: [],
        hates: ['5a3f6cb80392668a7bcdd3fc']
    }],
    movies: [{
        _id:  new ObjectId('5a3f6cb80392668a7bcdd3fb'),
        title: 'Kill Bill Vol 1',
        description: 'Taradino B movie1',
        userId: '5a3f6cb80392668a7bcdd3fc',
        likesCounter: 12,
        hatesCounter: 13
    }, {
        _id:  new ObjectId('5a3f6cb80392668a7bcdd3fc'),
        title: 'Kill Bill Vol 2',
        description: 'Taradino B movie2',
        userId: '5a3f6cb80392668a7bcdd3fd',
        likesCounter: 2,
        hatesCounter: 13
    }, {
        _id:  new ObjectId('5a3f6cb80392668a7bcdd3fa'),
        title: 'Pulp Fiction',
        description: 'Taradino B movie 3',
        userId: '5a4260c5664b0a220c00bd1e',
        likesCounter: 2,
        hatesCounter: 13
    }, {
        _id:  new ObjectId('5a3f6cb80392668a7bcdd3f5'),
        title: 'Django',
        description: 'Taradino B movie 4',
        userId: '5a4260c5664b0a220c00bd1e',
        likesCounter: 2,
        hatesCounter: 13
    }]
}
