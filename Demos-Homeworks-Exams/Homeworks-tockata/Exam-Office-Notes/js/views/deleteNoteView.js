var app = app || {};

app.deleteNoteView = (function () {
    function DeleteNoteView(selector, note) {
        $.get('./templates/deleteNote.html', function (template) {
            var output = Mustache.render(template, note);
            $(selector).html(output);
        });
    }

    return {
        load: function (selector, note) {
            return DeleteNoteView(selector, note);
        }
    }
}());

