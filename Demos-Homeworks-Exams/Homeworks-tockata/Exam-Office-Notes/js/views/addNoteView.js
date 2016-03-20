var app = app || {};

app.addNoteView = (function () {
    function AddNoteView(selector) {
        $.get('./templates/addNote.html', function (template) {
            var output = Mustache.render(template);
            $(selector).html(output);
        });
    }

    return {
        load: function (selector) {
            return AddNoteView(selector);
        }
    }
}());
