var app = app || {};

app.editBookView = (function () {
    function EditBookView (parent, book) {
        $.get('./templates/editBook.html', function (template) {
            var output = Mustache.render(template, book);
            parent.append(output);
        });
    }

    return {
        load: function (selector, books) {
            return new EditBookView(selector, books);
        }
    };
}());
