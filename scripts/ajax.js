var getQuote= function(stock, callback){
    var url = "https://www.quandl.com/api/v3/datasets/WIKI/" + stock.symbol + ".json?api_key=" + 'VsizqnSyP2XPZeWZDnwb';
    console.log(url);
    $.ajax({
        url:url,
        success: function(data) {
         callback(data.dataset);
        },
        error: function() {
         console.log("error");
        },
        type: "GET"
   });
}