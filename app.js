var createError = require('http-errors');
var express = require('express');
const bodyparser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session')
var hbs=require('express-handlebars')
const handle = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

var app = express();

var file=require('express-fileupload')
var db=require('./config/connection')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layouts/',partialsDir:__dirname+'/views/partials/', helpers:{inc: function(value, options){
  return parseInt(value) + 1;
}}}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(file());
app.use(session({secret:"Key",cookie:{maxAge:600000}}))
app.use(cookieParser());
db.connect((err)=>{
  if(err)
   console.log("Error"+err);
  else
  console.log("Database connected to mongodb");
})
app.use('/', userRouter);
app.use('/admin', adminRouter);

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
