const ObjectId = require('mongoose').Types.ObjectId;
module.exports = {
    users: [{
        _id:  new ObjectId('5a3f6cb80392668a7bcdd3fd'),
        username: 'George',
        password: '$2a$08$cgdYaWRpZOZ4dvOSWdocCuRcqYG1V9kMhd2scAXqJjfgqeuTD/eua',
        likes: ['5a3f6cb80392668a7bcdd3fa'],
        hates: ['5a3f6cb80392668a7bcdd3f5'],
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTNmNmNiODAzOTI2NjhhN2JjZGQzZmQiLCJpYXQiOjE1MTQ1NTUyNDIsImV4cCI6MTUxNTQxOTI0Mn0.xiyCvG5-f2pgtsX5yfnGIB2xqCvKfoyCYR7F8yttZcY'
    }, {
        _id:  new ObjectId('5a4260c5664b0a220c00bd1e'),
        username: 'Maria',
        password: '$2a$08$cgdYaWRpZOZ4dvOSWdocCuRcqYG1V9kMhd2scAXqJjfgqeuTD/eua',
        likes: [],
        hates: ['5a3f6cb80392668a7bcdd3fc'],
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTQyNjBjNTY2NGIwYTIyMGMwMGJkMWUiLCJpYXQiOjE1MTQ1NTY3NTcsImV4cCI6MTUxNTQyMDc1N30.PViKMlg4IW3Fnu4LFC2UUwN_11BRQ6hEM0D7m1SRp24'
    }],
    movies: [{
        _id:  new ObjectId('5a3f6cb80392668a7bcdd3fb'),
        title: 'Kill Bill Vol 1',
        description: 'Lorem ipsum dolor sit amet, ex eum vidisse viderer, eos errem inermis in. Sit eu laudem tempor, mei ea movet mnesarchum adipiscing. Quo quod suscipit scripserit ad. In omnis semper ocurreret vis, ne nam verear epicuri maluisset, aperiam accumsan ei mei.',
        userId: '5a4260c5664b0a220c00bd1e',
        username: 'Maria',
        likesCounter: 12,
        hatesCounter: 13
    }, {
        _id:  new ObjectId('5a3f6cb80392668a7bcdd3fc'),
        title: 'Kill Bill Vol 2',
        description: 'Lorem ipsum dolor sit amet, ex eum vidisse viderer, eos errem inermis in. Sit eu laudem tempor, mei ea movet mnesarchum adipiscing. Quo quod suscipit scripserit ad. In omnis semper ocurreret vis, ne nam verear epicuri maluisset, aperiam accumsan ei mei.',
        userId: '5a3f6cb80392668a7bcdd3fd',
        username: 'George',
        likesCounter: 13,
        hatesCounter: 8
    }, {
        _id:  new ObjectId('5a3f6cb80392668a7bcdd3fa'),
        title: 'Pulp Fiction',
        description: 'Lorem ipsum dolor sit amet, ex eum vidisse viderer, eos errem inermis in. Sit eu laudem tempor, mei ea movet mnesarchum adipiscing. Quo quod suscipit scripserit ad. In omnis semper ocurreret vis, ne nam verear epicuri maluisset, aperiam accumsan ei mei.',
        userId: '5a3f6cb80392668a7bcdd3fd',
        username: 'George',
        likesCounter: 10,
        hatesCounter: 11
    }, {
        _id:  new ObjectId('5a3f6cb80392668a7bcdd3f5'),
        title: 'Django',
        description: 'Lorem ipsum dolor sit amet, ex eum vidisse viderer, eos errem inermis in. Sit eu laudem tempor, mei ea movet mnesarchum adipiscing. Quo quod suscipit scripserit ad. In omnis semper ocurreret vis, ne nam verear epicuri maluisset, aperiam accumsan ei mei.',
        userId: '5a4260c5664b0a220c00bd1e',
        username: 'Maria',
        likesCounter: 5,
        hatesCounter: 6
    }]
}
