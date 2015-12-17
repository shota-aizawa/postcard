var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


// all environments
app.set('port', process.env.PORT || 8000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var port = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false);

var eserver = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require("socket.io").listen(eserver);

  
var Parse = require('node-parse-api').Parse;
var APP_ID = "";
var MASTER_KEY = "";
var appParse = new Parse(APP_ID, MASTER_KEY);
var REST_API_KEY = "";
var Kaiseki = require('kaiseki');
var kaiseki = new Kaiseki(APP_ID,REST_API_KEY );

var moment = require('moment');
var dateEST = moment().format("YYYY-MM-DD");
var mydata;

   
var sensor;
var socket;

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var PORT = 33333;
//var HOST = "192.168.1.58";
var HOST = "1192.168.0.6";



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


port.open(function(error) {

  if (error) {
    console.log('failed to open: ' + error);
  } else {

    port.write("A");
    console.log('Serial open');
    port.on('data', function(data) {
    
    console.log(data);
    mydata= data;
    var sensorData = mydata.split();

    if(parseInt(sensorData[0])>800){
     appParse.insert('Postcard', { "Number":2 , "Date":dateEST, "Name": "letter"}, function (err, response) {
                   console.log(response);
                   console.log("entry made!!");
                   console.log(dateEST);
           });
     };
  

    port.write("A");
    });



server.on('listening', function(){
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});



io.sockets.on('connection', function (socket) {

      server.on('message', function (message, remote){
          console.log(remote.address + "," + remote.port + "," + message);
          var mes = remote.address + "," + remote.port + "," + message;
          socket.emit('message', {mes:mes});
      });
            socket.on('sendToParse', function (data) {
              console.log(data);
              appParse.insert('Postcard', { "Number":2 , "Date":dateEST, "Name": "letter"}, function (err, response) {

             });
            });
            socket.on('getFromParse', function (data) {
              
                  console.log(data);

                  var params = {
                                where: {"Date": dateEST},
                                count:true
                                
                      };
                  kaiseki.getObjects('Postcard', params, function(err, res, body, success) {
                  // console.log(res);
                  
                  console.log('Total number of packages = ', body.count);

                  socket.emit('toScreen', {ParseData: body});
                  });            
                  });

});

}
  
});

// server.bind(PORT,HOST);


