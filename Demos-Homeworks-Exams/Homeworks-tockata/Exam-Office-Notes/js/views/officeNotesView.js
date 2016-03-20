var app = app || {};

app.officeNotesView = (function () {
    function OfficeNotesView(selector, notes) {
        $.get('./templates/officeNoteTemplate.html', function (template) {
            var output = Mustache.render(template, notes);
            $(selector).html(output);
        });
    }

    return {
        load: function (selector, notes) {
            return OfficeNotesView(selector, notes);
        }
    }
}());


