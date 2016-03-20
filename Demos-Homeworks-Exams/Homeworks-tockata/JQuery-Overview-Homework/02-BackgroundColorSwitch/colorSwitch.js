$(document).ready(function() {
    $('button').on('click', function() {
        var className = $('#class').val();
        var color = $('#color').val();

        $('.' + className).css('background', color);
    });
})