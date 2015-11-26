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
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require("socket.io").listen(server);

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var port = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]




    // Arduino Setting 

var five = require("johnny-five");
var board = new five.Board();
var sensor;
var socket;

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

    

        // Socket.IOで値を"sensor"というイベント名で送信
    //      socket.emit("sensor", { value: value });
    });

    
    sensor.within([80, 100], function() {
        console.log("package is delivered!");
    });

});


io.sockets.on('connection', function (socket) {
    
      //open port for sensor data
      port.open(function(error) {

              if (error) {
                console.log('failed to open: ' + error);
            } else {
                  console.log('Serial open');

                  socket.on('open', function () {
                    // console.log(data.open);
                    // port.write('A');
                    port.write('O');
                    // port.write('A');

                  });

                  port.on('data', function(data) {
                  console.log(data);

                  });
            }

      });




      // Send data to Parse

      // socket.on('sendToParse', function (data) {
      //       console.log(data.name);
      //       console.log(data.password);

      //       appParse.insert('post', { name: data.name, password: data.password }, function (err, response) {
      //       console.log("entry made");

      //       appParse.find('post', '' , function (err, response) {
      //       // console.log(response);
      //       socket.emit('toScreen',{ name: data.name });

      //             });
      //         });
      //   });//socket on 'parse' end Bracket

});


