var app = app || {};

app.booksView = (function () {
    function BooksView (selector, books) {
        $.get('./templates/books.html', function (template) {
            var output = Mustache.render(template, books);
            $(selector).html(output);
        });
    }

    return {
        load: function (selector, books) {
            return new BooksView(selector, books);
        }
    };
}());
