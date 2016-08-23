$(document).ajaxStart(function(){
    $('#stockInput').prop('disabled', true);
    $('#updateButton').html('Loading...');
})
$(document).ajaxStop(function(){
    $('#stockInput').prop('disabled', false);
    $('#updateButton').html('Update');
})

function getName(symbol, longName){
    var index = longName.indexOf(symbol);
    var shortName = longName.substr(0,index - 2);
    return shortName;
}

function makeChart(dates,dataSeries){
    var data = {
        labels: dates,
        series: dataSeries
    };
    new Chartist.Line('.ct-chart', data);
}

var Stock = function(symbol){
    this.symbol = symbol;
    this.data = [];
}

Stock.prototype.getIndexOfDate = function(date){
    var matchedIndex;
    if(this.data.length === 0){
        console.log('no data');
        return;
    } else {
        this.data.forEach(function(item, index){
            if(item[0] === date){
                matchedIndex = index;
                return;
            }
        });
        return matchedIndex;
    }
}

function getLastWeekDates(){
    var dateArray = [];
    for(var i = 1; i <= 7; i++){
        dateArray.push(moment().subtract(i,'days').format('YYYY-MM-DD'));
    }
    return dateArray;
}