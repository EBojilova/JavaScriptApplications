(function () {
    var $div = $('<div>').text('div.appendTo(body)'),
        $body = $('body');

    $div.appendTo('body');
    $body.append($('<div>').text('body.append(div)'));
    //$('div') referira navsiakade edin i sast query selector i na vsiakade ste zalepi paragraph
    $('div').append('<p>paragraph</p>');

    var newDiv = document.createElement('div');
    newDiv.textContent = 'body.prepend(div)';

    $body.append(newDiv);
    $body.prepend(newDiv);
})();