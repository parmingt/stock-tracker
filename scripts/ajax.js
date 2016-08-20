var getQuote= function(symbol){
    var url = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + symbol; 
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