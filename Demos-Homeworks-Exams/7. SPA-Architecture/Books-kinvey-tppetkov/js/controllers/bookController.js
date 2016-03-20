var app = app || {};

app.bookController = (function() {
    function BookController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    BookController.prototype.getAllBooks = function(selector) {
        var _this =this;

        this._model.getAllBooks()
            .then(function (books) {
                var result = {
                    books: []
                };

                books.forEach(function (book) {
                    result.books.push(new BookInputModel(book._id, book.title, book.author, book.isbn));
                });

                _this._viewBag.showBooks(selector, result);
            }).done();
    };

    BookController.prototype.addBook = function(data) {
        var _this = this;

        var bookOutputModel = {
            title: data.title,
            author: data.author,
            isbn: data.isbn
        };

        this._model.addBook(bookOutputModel)
            .then(function() {
                _this.getAllBooks();
            })
    };
    BookController.prototype.deleteBook=function(data) {
        //TODO

    };

    BookController.prototype.editBook=function(data) {
        var _this = this;

        var bookOutputModel = {
            title: data.title,
            author: data.author,
            isbn: data.isbn
        };

        this._model.editBook(this)
            .then(function() {
                _this.getAllBooks();
            })
    };

    return {
        load: function(model, viewBag) {
            return new BookController(model, viewBag);
        }
    };
}());