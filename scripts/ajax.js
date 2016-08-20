var getQuote= function(symbol){
    var url = "https://www.quandl.com/api/v3/datasets/WIKI/" + symbol + ".json";
    $.ajax({
        url:url,
        success: function(data) {
         console.log(data);
        },
        error: function() {
         console.log("error");
        },
        type: "GET"
   });
}