var app = app || {};

app.editNoteView = (function () {
    function EditNoteView(selector, note) {
        $.get('./templates/editNote.html', function (template) {
            var output = Mustache.render(template, note);
            $(selector).html(output);
        });
    }

    return {
        load: function (selector, note) {
            return EditNoteView(selector, note);
        }
    }
}());

