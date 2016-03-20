var app = app || {};

app.controller = (function() {
    function Controller(data) {
        this.data = data;
    }

    Controller.prototype.load = function(selector) {
        $(selector).empty();
        this.data.getAllBooks()
            .then(function(data) {
                app.booksView.load(selector, data);
            }, function(error) {
                console.error(error.statusText);
            });
    };

    Controller.prototype.attachHandlers = function() {
        var selector = '#wrapper';
        attachAddBookEventHandler.call(this, selector);
        attachDeleteBookEventHandler.call(this, selector);
        attachEditBookEventHandler.call(this, selector);
    };

    var attachAddBookEventHandler = function(selector) {
        var _this = this;
        $(selector).on('click', '#add-btn', function() {
            var title = $('#title').val(),
                author = $('#author').val(),
                isbn = $('#isbn').val(),
                newBook = {
                    title: title,
                    author: author,
                    isbn: isbn
                };

            _this.data.addBook(newBook)
                .then(function(data) {
                        _this.load('#books');
                    },
                    function(error) {
                        console.log(error.statusText);
                    });
        });
    };

    var attachDeleteBookEventHandler = function(selector) {
        var _this = this;
        $(selector).on('click', '.delete-btn', function(ev) {
            var bookId = $(ev.target).data('id');

            _this.data.deleteBook(bookId)
                .then(function(data) {
                    $(ev.target).parent().remove();
                }, function(error) {
                    console.log(error.statusText);
                });
        });
    };

    var attachEditBookEventHandler = function(selector) {
        var _this = this;

        $(selector).on('click', '.edit-btn', function(ev) {
            if ($('#edit-book').length !== 0) {
                $('#edit-book').remove();
            }

            var bookId = ($(ev.target).data('id')),
                parent = $(ev.target).parent();

            _this.data.getBookById(bookId)
                .then(function (book) {
                    app.editBookView.load(parent, book);
                }, function (error) {
                    console.log(error.statusText);
                });

        });

        $(selector).on('click', '#submit-btn', function(ev) {
            var bookId = $(ev.target).data('id'),
                newTitle = $('#edit-title').val(),
                newAuthor = $('#edit-author').val(),
                newIsbn = $('#edit-isbn').val(),
                data = {
                    title: newTitle || undefined,
                    author: newAuthor || undefined,
                    isbn: newIsbn || undefined
                };

            _this.data.editBook(bookId, data)
                .then(function(data) {
                    _this.load($('#books'));
                }, function(error) {
                    console.log(error.statusText);
                });
        });
    };

    return {
        get: function(data) {
            return new Controller(data);
        }
    };
}());
