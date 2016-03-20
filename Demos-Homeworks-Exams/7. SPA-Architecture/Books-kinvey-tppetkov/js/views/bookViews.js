var app = app || {};

app.bookViews = (function () {
    function showBooks(selector, data) {
        $.get('templates/books.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('.editBook').on('click', function () {
                var   title=prompt('Edit title'),
                     author=prompt('Edit author'),
                       isbn=prompt('Edit isbn');

                $.sammy(function () {
                    this.trigger('edit-book', {
                        title:title,
                        author:author,
                        isbn: isbn})
                })
            });

            $('.addBook').on('click', function () {
                 var   title=prompt('Add title'),
                      author=prompt('Add author'),
                        isbn=prompt('Add isbn');

                $.sammy(function () {
                    this.trigger('add-book', {
                        title:title,
                        author:author,
                        isbn: isbn})
                })
            });

            $('.deleteBook').on('click', function () {
                var element=$(this).parent();
                var elementID=element.attr('data-id');
               // $(this).parent().remove();
                $.sammy(function () {
                    this.trigger('delete-book', {parent: $(this).parent(), bookId: elementID})
                })
            });
        })
    }

    return {
        load: function () {
            return {
                showBooks: showBooks
            }
        }
    }
}());