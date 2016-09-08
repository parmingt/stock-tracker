var path = require('path');
var http = require('http');

var async = require('async');
var express = require('express');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var initialSymbols = ['AAPL', 'MSFT'];
var symbolsList = initialSymbols;

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.bodyParser());

app.get('/', function(request, response) {
  response.render('index.html');
})

app.get('/symbols', function(request, response){
  if((symbolsList) && symbolsList.length > 0){
    response.end(JSON.stringify(symbolsList));
  }
  else {
    response.end();
  }
});

app.post('/addSymbol', function(request, response){
  var newSymbol = request.body.symbol;
  var exists = false;
  symbolsList.forEach(function(symbol){
    if(symbol === newSymbol){
      exists = true;
    }
  })
  if(!exists){
    symbolsList.push(newSymbol);
  }
  io.emit('add symbol', newSymbol);
  response.end();
})

app.post('/removeSymbol',function(request, response){
  var removedSymbol = request.body.symbol;
  for(var index = symbolsList.length - 1; index >= 0; index--){
    if(symbolsList[index] === removedSymbol){
      symbolsList.splice(index, 1);
    }
  }
  io.emit('remove symbol', removedSymbol);
  response.end();
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('client update', function(){
    console.log('client update');
    io.emit('client update');
  });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
});

