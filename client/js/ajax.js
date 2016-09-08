var getQuote= function(stock, callback){
    var url = "https://www.quandl.com/api/v3/datasets/WIKI/" + stock.symbol + ".json?api_key=" + 'VsizqnSyP2XPZeWZDnwb';
    $.ajax({
        url:url,
        success: function(data) {
         callback(data.dataset);
        },
        error: function() {
         alert("symbol not found");
        },
        type: "GET"
   });
}

var getStockData = function(stock, callback){
    getQuote(stock, function(dataset){
        stock["name"] = getName(stock.symbol, dataset.name);
        stock.data = dataset.data;
        callback();
    })
};

var getAllStockData = function(stockList, callback){
    var numStocks = stockList.length;
    if(numStocks === 0){return;}
    var count = 0;
    stockList.forEach(function(stock){
        getStockData(stock, function(){
            count++;
            if(count === numStocks){
                callback();
            }
        })
    })
}

var getServerSymbols = function(callback){
    $.ajax({
        url: '/symbols',
        type: 'GET',
        success: function(data){
            callback(JSON.parse(data));
        }
    })
}

var addServerSymbol = function(submitData, callback){
    $.ajax({
        url: '/addSymbol',
        data: submitData,
        type: 'POST',
        dataType: 'json',
        complete: function(data){
        }
    });
};

var removeServerSymbol = function(submitData, callback){
    $.ajax({
        url: '/removeSymbol',
        data: submitData,
        type: 'POST',
        dataType: 'json',
        complete: function(data){
        }
    });
}