var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var app = express();
var server = http.createServer(app);

var symbols = ['AAPL', 'MSFT'];

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.bodyParser());

app.get('/', function(request, response) {
  response.render('index.html');
})

app.get('/symbols', function(request, response){
  response.end(JSON.stringify(symbols));
});

app.post('/addSymbol', function(request, response){
  var newSymbol = request.body.symbol;
  var exists = false;
  symbols.forEach(function(symbol){
    if(symbol === newSymbol){
      exists = true;
    }
  })
  if(!exists){
    symbols.push(newSymbol);
  }
  response.end();
})

app.post('/removeSymbol',function(request, response){
  var removedSymbol = request.body.symbol;
  var newSymbols = symbols;
  newSymbols.forEach(function(symbol, index){
    if(symbol === removedSymbol){
      newSymbols.splice(index, 1);
    }
  });
  symbols = newSymbols;
  response.end();
})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
});

