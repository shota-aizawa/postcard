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


// app.get('/', function(req, res){
//   res.send('Express Rules  <a href="/express.html">express.html</a>');
// });

// set up a server and socket.io
var eserver = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require("socket.io").listen(eserver);

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var port = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]


// 
var Parse = require('node-parse-api').Parse;
var APP_ID = "jr3y6s5boZKmSNc5PTN5xnlBjS8n9LxUAFKoHPxj";
var MASTER_KEY = "rMYR8PJXpWfsmqXeslG3ZZ7QOsx6o7DKtCEwwGtb";
var appParse = new Parse(APP_ID, MASTER_KEY);
var REST_API_KEY = "q1b0RCvSEojhma3UsGDSHJC0vLg79MWvVTG56Is1";
var Kaiseki = require('kaiseki');
var kaiseki = new Kaiseki(APP_ID,REST_API_KEY );

var moment = require('moment');
var dateEST = moment().format("YYYY-MM-DD");

    // Arduino Setting 

var five = require("johnny-five");
var board = new five.Board();
var sensor;
var socket;

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
// var PORT = 33333;
// var HOST = "192.168.1.04";


board.on("ready", function() {
    // set up an analog pin and duration
    sensor = new five.Sensor({
        pin: "A0",
        freq: 700
    });

    
    // add a sensor with permission
    board.repl.inject({
        pot: sensor
    });

    // transmit input to numbers from 0 to 100
    sensor.scale(0, 100).on("data", function() {
        
        console.log(this.value);

    

        
    //      socket.emit("sensor", { value: value });
    });

    
    sensor.within([75, 100], function() {
        console.log("package is delivered!");
        // var dateEST = new Date().toISOString();
        // dateEST = dateEST.addHour(-5);
        
              

        appParse.insert('Postcard', { "Number":2 , "Date":dateEST, "Name": "letter"}, function (err, response) {
                  console.log(response);
                  console.log("entry made!!");
                  console.log(dateEST);
          });
    });

});


// server.on('listening', function(){
//     var address = server.address();
//     console.log('UDP Server listening on ' + address.address + ":" + address.port);
// });


io.sockets.on('connection', function (socket) {

      // server.on('message', function (message, remote){
      //     console.log(remote.address + "," + remote.port + "," + message);
      //     var mes = remote.address + "," + remote.port + "," + message;
      //     socket.emit('message', {mes:mes});
      // });

      //open port for sensor data
      // port.open(function(error) {

      //         if (error) {
      //           console.log('failed to open: ' + error);
      //       } else {
      //             console.log('Serial open');

      //             socket.on('open', function () {
      //               // console.log(data.open);
      //               // port.write('A');
      //               port.write('O');
      //               // port.write('A');

      //             });

      //             port.on('data', function(data) {
      //             console.log(data);

      //             });
      //       }

      // });

            socket.on('sendToParse', function (data) {
              console.log(data);

              

              appParse.insert('Postcard', { "Number":2 , "Date":dateEST, "Name": "letter"}, function (err, response) {
              // // console.log(response);
              // console.log(dateEST);
              // console.log("entry made");
            //                 console.log("test");

             });
            });


            socket.on('getFromParse', function (data) {
              
                  console.log(data);

                  // appParse.find('Postcard',{where: {'date': dateEST}},function(err,response){
                  //   console.log(response);

                  

                  var params = {
                                where: {"Date": dateEST},
                                count:true

                                
                      };
                  kaiseki.getObjects('Postcard', params, function(err, res, body, success) {
                  // console.log(res);
                  
                  console.log('Total number of packages = ', body.count);

                  socket.emit('toScreen', {ParseData: body});
                  });

                   // });
                  
                  

                  // var params = {
                  //               where: {date: dateEST},
                  //               count:false
                                
                  //     };
                  // kaiseki.getObjects('Postcard', params, function(err, res, body, success) {
                  //   // console.log(res);
                  
                  
                  // console.log('Your packages are delivered with', body);

                  // socket.emit('toScreen', {ParseData: body});
                  // });

                  
                  
                  });

      

});

// server.bind(PORT,HOST);


