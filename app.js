const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const Log = require('log')
    , log = new Log('info');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./lib/routers/index');
const api = require('./lib/routers/api')
const config = require('./lib/config')
const error = require('./lib/middleware/error')
require('./lib/models/db')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('port', config.get('port') || 3012)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/', api);
app.use(error);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

});
app.listen(app.get('port'), function () {
    log.info('Express server listening on port ' + app.get('port'))
})
module.exports = app;
