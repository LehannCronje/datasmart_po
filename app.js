var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

var indexRouter = require('./routes/index');
var landingRouter = require('./routes/landingPage');
var chooseClientRouter = require('./routes/chooseClient');
var invoiceRouter = require('./routes/invoice');
var generateInvoiceRouter = require('./routes/generateInvoice');


var app = express();

//setup session
app.use(session({
  'secret': 'lehann',
  resave: true,
}))

var hbs = exphbs.create({
  extname: '.hbs',
  helpers: {
    equal:function(lvalue, rvalue, options) {
      if (arguments.length < 3)
          throw new Error("Handlebars Helper equal needs 2 parameters");
      if( lvalue!=rvalue ) {
          return options.inverse(this);
      } else {
          return options.fn(this);
      }
    },
    compare: function(lvalue,rvalue,options){
        if (arguments.length < 3)
          throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

      var operator = options.hash.operator || "==";

      var operators = {
          '==':       function(l,r) { return l == r; },
          '===':      function(l,r) { return l === r; },
          '!=':       function(l,r) { return l != r; },
          '<':        function(l,r) { return l < r; },
          '>':        function(l,r) { return l > r; },
          '<=':       function(l,r) { return l <= r; },
          '>=':       function(l,r) { return l >= r; },
          'typeof':   function(l,r) { return typeof l == r; }
      }

      if (!operators[operator])
          throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

      var result = operators[operator](lvalue,rvalue);

      if( result ) {
          return options.fn(this);
      } else {
          return options.inverse(this);
      }
    }
  }
});

// view engine setup
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/landingPage', landingRouter);
app.use('/chooseClient', chooseClientRouter);
app.use('/invoice', invoiceRouter);
app.use('/generateInvoice', generateInvoiceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
