var app = app || {};

app.controller = (function () {
    function Controller (data) {
        this.data = data;
    }

    Controller.prototype.load = function (selector) {
        $(selector).empty();
        this.data.getAllBooks(
            function(data){
                var books = data.results;
                books.forEach(function (book) {
                    var div = $('<div class="book" data-id="' + book.objectId + '">'),
                        h2Title = $('<h2>').text('Title: ' + book.title),
                        pAuthor = $('<p>').text('Author: ' + book.author),
                        pIsbn = $('<p>').text('ISBN: ' + book.isbn),
                        deleteBtn = $('<button class="delete-btn" data-id="' + book.objectId + '">Delete book</button>'),
                        editBtn = $('<button class="edit-btn" data-id="' + book.objectId + '">Edit book</button>');

                    div.append(h2Title)
                        .append(pAuthor)
                        .append(pIsbn)
                        .append(deleteBtn)
                        .append(editBtn);

                    selector.append(div);
                });
            },
            function (error) {
                console.log(error);
            });
    };

    Controller.prototype.attachHandlers = function () {
        var selector = '#wrapper';
        attachAddBookEventHandler.call(this, selector);
        attachDeleteBookEventHandler.call(this, selector);
        attachEditBookEventHandler.call(this, selector);
    };

    var attachAddBookEventHandler = function (selector) {
        var _this = this;
        $(selector).on('click', '#add-btn', function () {
            var title = $('#title').val(),
                author = $('#author').val(),
                isbn = $('#isbn').val(),
                data = {
                    title: title,
                    author: author,
                    isbn: isbn
                };

            _this.data.addBook(data,
                function (data) {
                    var container = $('#books');
                    _this.data.getBookById(data.objectId, function (result) {
                        var div = $('<div class="book" data-id="' + result.objectId + '">'),
                            h2Title = $('<h2>').text('Title: ' + result.title),
                            pAuthor = $('<p>').text('Author: ' + result.author),
                            pIsbn = $('<p>').text('ISBN: ' + result.isbn),
                            deleteBtn = $('<button class="delete-btn" data-id="' + result.objectId + '">Delete book</button>'),
                            editBtn = $('<button class="edit-btn" data-id="' + result.objectId + '">Edit book</button>');

                        div.append(h2Title)
                            .append(pAuthor)
                            .append(pIsbn)
                            .append(deleteBtn)
                            .append(editBtn);

                        container.append(div);
                        $('#title').val('');
                        $('#author').val('');
                        $('#isbn').val('');
                    },
                        function (error) {
                            console.log(error);
                        });
                },
                function (error) {
                    console.log(error);
                });
        });
    };

    var attachDeleteBookEventHandler = function (selector) {
        var _this = this;
        $(selector).on('click', '.delete-btn', function (ev) {
            var bookId = $(ev.target).data('id');

            _this.data.deleteBook(bookId,
                function (data) {
                    $(ev.target).parent().remove();
                },
                function (error) {
                    console.log(error);
                });
        });
    };

    var attachEditBookEventHandler = function (selector) {
        var _this = this;

        $(selector).on('click', '.edit-btn', function (ev) {
            if ($('#edit-book').length != 0) {
                $('#edit-book').remove();
            }

            var bookId = ($(ev.target).data('id')),
                parent = $(ev.target).parent(),
                container = $('<div id="edit-book">'),
                titleInput = $('<input type="text" id="edit-title" placeholder="New title...">'),
                authorInput = $('<input type="text" id="edit-author" placeholder="New author...">'),
                isbnInput = $('<input type="text" id="edit-isbn" placeholder="New ISBN...">'),
                submitBtn = $('<button class="submit-btn" data-id="' + bookId + '">Confirm</button>');

            submitBtn.on('click', function (ev) {
                var bookId = $(ev.target).data('id'),
                    newTitle = $('#edit-title').val(),
                    newAuthor = $('#edit-author').val(),
                    newIsbn = $('#edit-isbn').val(),
                    data = {
                        title: newTitle || undefined,
                        author: newAuthor || undefined,
                        isbn: newIsbn || undefined
                    };

                _this.data.editBook(bookId, data,
                    function (data) {
                        _this.load($('#books'));
                    },
                    function (error) {
                        console.log(error);
                    })
            });
            container.append(titleInput);
            container.append('<br />');
            container.append(authorInput);
            container.append('<br />');
            container.append(isbnInput);
            container.append('<br />');
            container.append(submitBtn);
            parent.append(container);
        });
    };

    return {
        get: function (data) {
            return new Controller(data);
        }
    };
}());