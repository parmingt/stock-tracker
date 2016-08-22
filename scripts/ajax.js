var getQuote= function(stock, callback){
    var url = "https://www.quandl.com/api/v3/datasets/WIKI/" + stock.symbol + ".json?api_key=" + 'VsizqnSyP2XPZeWZDnwb';
    $.ajax({
        url:url,
        success: function(data) {
         callback(data.dataset);
        },
        error: function() {
         console.log("not found");
         alert("symbol not found");
        },
        type: "GET"
   });
}

var getStockData = function(stock, callback){
    getQuote(stock, function(data){
        stock["name"] = getName(stock.symbol, data.name);
        stock["lastData"] = data.data[0];
        callback();
    })
};