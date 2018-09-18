var getQuote= function(stock, callback){
    var url = "https://www.quandl.com/api/v3/datasets/WIKI/" + stock.symbol + ".json?api_key=" + 'VsizqnSyP2XPZeWZDnwb';
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                resolve(myJson.dataset);
            });
        });
}

var getStockData = function(stock){
    return new Promise((resolve, reject) => {
        if (!stock) {reject();}
        getQuote(stock).then(function(dataset){
            stock.name = getName(stock.symbol, dataset.name);
            stock.data = dataset.data;
            console.log(stock);
            resolve();
        });
    });
};

var getAllStockData = function(stockList){
    var numStocks = stockList.length;
    if(numStocks === 0){return;}
    var count = 0;
    return new Promise((resolve, reject) => {
        stockList.forEach(function(stock){
            if (!stock.symbol) return count++;
            getStockData(stock).then(() => {
                count++;
                if(count === numStocks){
                    resolve();
                }
            });
        })
    })
}

var getServerSymbols = function(){
    return new Promise((resolve, reject) => {
        fetch('/symbols').then((data) => {
            resolve(data.json());
        });
    });
}

var addServerSymbol = function(submitData, callback){
    fetch('/addSymbol', {
        method: 'POST',
        body: JSON.stringify(submitData)
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