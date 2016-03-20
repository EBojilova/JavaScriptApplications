$(document)
.ready(function() {
    'use strict';

    if (!sessionStorage.sessionVisits) {
        sessionStorage.setItem('sessionVisits', 0);
    }

    if (!localStorage.totalVisits) {
        sessionStorage.setItem('totalVisits', 0);
    }

    var $form=$('<form>');

    if (!localStorage.getItem('name')) {
        var label,
            input,
            btn;

        label = $('<label>')
        .text('Enter your name: ');
        input = $('<input>')
        .attr('placeholder', 'Name');
        btn = $('<button>')
        .text('Submit')
        .on('click', function() {
            var name = $('input')
            .val();
            localStorage.setItem('name', name);
        });

        $form
        .append(label)
        .append(input)
        .append(btn);
        $('#wrapper')
        .append($form);

        localStorage.totalVisits = 0;
        sessionStorage.sessionVisits = 0;
    }
    else {
        $form.hide();
        localStorage.totalVisits++;
        sessionStorage.sessionVisits++;
        $('#wrapper')
        .append($('<p>')
                .text('Hello, ' + localStorage.name + '!'));
    }
    $('#wrapper')
    .append($('<p>')
            .text('Total visits: ' + localStorage.totalVisits));
    $('#wrapper')
    .append($('<p>')
            .text('Session visits: ' + sessionStorage.sessionVisits));
});