var app = app || {};

app.questionViews = (function () {
    function showQuestions(selector, data) {
        $.get('templates/questions.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector)
                .html(rendered);
            $('.getAnswers')
                .on('click', function () {
                    var parent = $(this)
                        .parent();
                    var parentId = parent.attr('data-id');
                    // po tozi nachin izbiagvame Dependecy injection na controlera s view
                    $.sammy(function () {
                        this.trigger('get-answers', {parent: parent, questionId: parentId})
                    })
                });
            $('.addAnswer')
                .on('click', function () {
                    var parent = $(this)
                        .parent(),
                        parentId = parent.attr('data-id'),
                        content = prompt('Add answer');
                    // po tozi nachin izbiagvame Dependecy injection na controlera s view
                    $.sammy(function () {
                        this.trigger('add-answer', {parent: parent, questionId: parentId, content: content})
                    });
                })
        })
    }

    return {
        load: function () {
            return {
                showQuestions: showQuestions
            }
        }
    }
}());