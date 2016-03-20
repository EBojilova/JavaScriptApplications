var app = app || {};

app.auhtorsViews = (function () {
    function showAllAuthors(parent, data) {
        $.get('templates/authors.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            parent.children().last().html(rendered);
        })
    }

    function showAddNewAuthor(selector) {
        $.get('templates/addNewAuthor.html', function (templ) {
            $(selector).html(templ);
            $('#addNewAuthor').on('click', function() {
                var name = $('#name').val();
                Sammy(function () {
                    this.trigger('add-new-author', {name: name, });
                });
            })
        })
    }

    return {
        load: function () {
            return {
                showAllAuthors: showAllAuthors,
                showAddNewAuthor: showAddNewAuthor
            }
        }
    }
}());