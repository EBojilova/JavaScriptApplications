$(document)
.ready(function() {
    'use strict';
    var LOOP_INTERVAL = 5000,
        index         = 1,
        slides        = $('.slide');

    slides.hide();
    slides.first()
          .show();

    $('#previous')
    .on('click', function() {
        moveToNextSlide('previous');
    });

    $('#next')
    .on('click', function() {
        moveToNextSlide('next');
    });

    setInterval(function() {
        moveToNextSlide('next');
    }, LOOP_INTERVAL);

    function moveToNextSlide(direction) {
        var nextDivToShow,
            divToHide = $('.slide:visible');

        if (direction === 'next') {
            index++;
            if (index === slides.length) {
                index = 0;
            }
        }
        else {
            index--;
            if (index === -1) {
                index = slides.length - 1;
            }
        }

        nextDivToShow = $(slides[index]);
        divToHide.fadeOut(1000);
        nextDivToShow.fadeIn(1000);
    }
});