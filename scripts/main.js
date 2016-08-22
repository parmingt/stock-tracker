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