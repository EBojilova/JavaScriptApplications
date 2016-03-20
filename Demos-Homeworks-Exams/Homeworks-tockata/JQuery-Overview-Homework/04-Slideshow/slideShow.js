$(document).ready(function () {
    'use strict';
    var LOOP_INTERVAL = 5000,
        index = 1,
        slides = $('.slide');
    slides.hide();
    slides.first().show();

    $('#previous').on('click', function () {
        moveToNextSlide('previous');
    });

    $('#next').on('click', function () {
        moveToNextSlide('next');
    });

    var loop = setInterval(function () {
        moveToNextSlide('next');
    }, LOOP_INTERVAL);

    function moveToNextSlide(direction) {
        var nextDivToShow = $(slides[index]),
            divToHide = $('.slide:visible');

        divToHide.fadeOut(1000);
        nextDivToShow.fadeIn(1000);

        if (direction === 'next') {
            if (index !== slides.length - 1) {
                index += 1;
            } else {
                index = 0;
            }
        } else {
            if (index !== 0) {
                index -= 1;
            } else {
                index = slides.length - 1;
            }
        }
        
        clearInterval(loop);
        loop = setInterval(function () {
            console.log(index);
            moveToNextSlide('next');
        }, LOOP_INTERVAL);
    }
});