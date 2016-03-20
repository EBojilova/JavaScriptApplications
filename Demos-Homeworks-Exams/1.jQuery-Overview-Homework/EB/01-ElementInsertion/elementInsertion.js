$(document).ready(function () {
    $('button').on('click', function(ev) {
        var tag = $('#new-element').val();
        var content = $('#content').val();
        var newElement = $("<" + tag + ">").text(content);

        if ($(ev.target).text() === 'Add before') {
            $(ev.target).parent().before(newElement);
        } else {
            $(ev.target).parent().after(newElement);
        }
    });
})