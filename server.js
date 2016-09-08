var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var app = express();
var server = http.createServer(app);

var initialSymbols = ['AAPL', 'MSFT'];
var symbolsList = initialSymbols;

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.bodyParser());

app.get('/', function(request, response) {
  response.render('index.html');
})

app.get('/symbols', function(request, response){
  response.end(JSON.stringify(symbolsList));
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
  response.end();
})

app.post('/removeSymbol',function(request, response){
  var removedSymbol = request.body.symbol;
  for(var index = symbolsList.length - 1; index >= 0; index--){
    if(symbolsList[index] === removedSymbol){
      symbolsList.splice(index, 1);
    }
  }
  response.end();
})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
});

