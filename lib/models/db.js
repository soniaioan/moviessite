// db.js
const mongoose = require('mongoose')
const Promise = require('bluebird')
const root = process.cwd()
const Log = require('log')
    , log = new Log('info');
const config = require(root + '/lib/config')
const environment = config.get('NODE_ENV')
const mongoConnectionString = config.get('mongodb')
log.info('Environment: ' + environment)
log.info('MongoDB URI: ' + mongoConnectionString)
mongoose.connect(config.get('mongodb'), {
        server: {
            socketOptions: {
                keepAlive: 300000,
                connectTimeoutMS: 30000
            }
        }
    })

const db = mongoose.connection
db.on('error', function (err) {
    log.error('MongoDB connection error: ' + new Error(err.stack))
})
db.once('open', function callback () {
    log.info('Connected to MongoDB.' )
})
module.exports = Promise.promisifyAll(mongoose)
