$(document).ready(function () {
    'use strict';

    if (!sessionStorage.sessionVisits) {
        sessionStorage.setItem('sessionVisits', 0);
    }

    if (!localStorage.getItem('name')) {
        var label,
            input,
            btn;

        label = $('<label>').text('Enter your name: ');
        input = $('<input>');
        input.attr('placeholder', 'Name');
        btn = $('<button>').text('Submit').on('click', function() {
            var name = $('input').val();
            localStorage.setItem('name', name);
        });

        $('#wrapper').append(label)
            .append(input)
            .append(btn);

        localStorage.setItem('totalVisits', 0);
    } else {
        var updatedTotalVisits = parseInt(localStorage.totalVisits) + 1;
        var updatedSessionVisits = parseInt(sessionStorage.sessionVisits) + 1;
        localStorage.setItem('totalVisits', updatedTotalVisits);
        sessionStorage.setItem('sessionVisits', updatedSessionVisits);
        $('#wrapper').append($('<p>').text('Hello ' + localStorage.name));
        $('#wrapper').append($('<p>').text('Total visits: ' + localStorage.totalVisits));
        $('#wrapper').append($('<p>').text('Session visits: ' + sessionStorage.sessionVisits));
    }
});