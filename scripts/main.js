$(document).ajaxStart(function(){
    $('#stockInput').fadeOut('fast');
})
$(document).ajaxStop(function(){
    $('#stockInput').fadeIn('fast');
})