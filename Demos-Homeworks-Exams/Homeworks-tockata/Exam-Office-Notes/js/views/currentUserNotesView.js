var app = app || {};

app.currentUserNotesView = (function () {
    function CurrentUserNotesView(selector, notes) {
        $.get('./templates/myNoteTemplate.html', function (template) {
            var output = Mustache.render(template, notes);
            $(selector).html(output);
        });
    }

    return {
        load: function (selector, notes) {
            return CurrentUserNotesView(selector, notes);
        }
    }
}());

