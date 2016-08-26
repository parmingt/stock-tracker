$(document).ajaxStart(function(){
    $('#stockInput').prop('disabled', true);
    $('#updateButton').html('Loading...');
})
$(document).ajaxStop(function(){
    $('#stockInput').prop('disabled', false);
    $('#updateButton').html('Update');
})

var lineColors = ['#ff4d4d','#3333ff','#33ffbb','#ff884d'];

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
    var chart = new Chartist.Line('.ct-chart', data);
    chart.on('draw', function(){
        // var index = 0;
        // $('.ct-line').each(function(){
        //     var colorCode = lineColors[lineColors.length - index - 1];
        //     $(this).css('stroke',colorCode);
        //     index++;
        // })
        
        // index = 0;
        // $('.ct-point').each(function(){
        //     var colorCode = lineColors[lineColors.length - index - 1];
        //     $(this).css('stroke',colorCode);
        //     index++;
        // })
    });
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

function getChartDates(timeframe){
    var dateArray = [];
    var numDays;
    var decrement = 1;
    switch(timeframe){
        case 'week':
            numDays = 7;
            break;
        case 'month':
            numDays = 30;
            decrement = 2;
            break;
        case 'year':
            numDays = 365;
            decrement = 10;
            break;
        default:
            numDays = 7;
    }
    for(var i = numDays; i >= 1; i-= decrement){
        dateArray.push(moment().subtract(i,'days').format('YYYY-MM-DD'));
    }
    return dateArray;
}

function getDataForChart(units, dates, stock){
    if(stock.data.length === 0){return;}
    var firstDate = dates[0];
    var priceArray = new Array(dates.length);
    var firstIndex = stock.getIndexOfDate(firstDate);
    dates.forEach(function(date, dateArrayIndex){
        var priceIndex = stock.getIndexOfDate(date);
        if(priceIndex && units === '%'){
            priceArray[dateArrayIndex] = ((stock.data[priceIndex][4]/stock.data[firstIndex][4] * 100) - 100).toFixed(2);
        }
        else if(priceIndex && units === '$'){
            priceArray[dateArrayIndex] = (stock.data[priceIndex][4]).toFixed(4);
        }
    })
    return priceArray;
}