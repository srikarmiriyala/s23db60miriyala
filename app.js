var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vehicleRouter = require('./routes/vehicle');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var vehicle = require('./models/vehicle');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vehicle', vehicleRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);

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

require('dotenv').config();
const connectionString = process.env.MONGO_CON;
const mongoose = require('mongoose');
mongoose.connect(connectionString);

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

// We can seed the collection if needed on server start

async function recreateDB(){
  // Delete everything
  //await Vechile.deleteMany();
  await vehicle.deleteMany({});
  let instance1 = new 
  vehicle({vehicle_type:"commercial",vehicle_color:"red",vehicle_price:35000});
  await instance1.save();
  //instance1.save( function(err,doc) {
  //if(err) return console.error(err);
  console.log("First object saved")
  //});
 
  let instance2 = new 
  vehicle({vehicle_type:"public",vehicle_color:"grey",vehicle_price:55000});
  await instance2.save();
  //instance1.save( function(err,doc) {
  //if(err) return console.error(err);
  console.log("second object saved")
  //});
 
  let instance3 = new 
  vehicle({vehicle_type:"personal",vehicle_color:"blue",vehicle_price:15000});
  await instance3.save();
  //instance1.save( function(err,doc) {
  //if(err) return console.error(err);
  console.log("Third object saved")
  //});
 }
 let reseed = true;
 if (reseed) { recreateDB();}

module.exports = app;
