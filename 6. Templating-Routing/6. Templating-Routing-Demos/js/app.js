var app = app || {};

(function () {
    var router = Sammy(function () {
        app.requester.config('kid_-yLWl1ga0g', '3b5ebc0f78a74ab881fc409f68142ac1');
        var selector = '#wrapper';
        var userRequester = new app.UserRequester();
        var questionRequester = new app.questionRequester();
        var answerRequester = new app.answerRequester();

        function getAllAnswers(parent, id) {
            answerRequester.getAllAnswers(id)
                .then(function (answers) {
                    $.get('templates/answers.html', function(templ){
                        var outputHtml = Mustache.render(templ, answers);
                        parent.children().last().html(outputHtml);
                    });
                })
        }

        this.before(function() {

        })

        this.before({except: {path: '#\/(register|login)?'}}, function () {
            var sessionId = sessionStorage['sessionAuth'];
            if (!sessionId) {
                this.redirect('#/login');
                return false;
            } else {
                this.redirect('#/questions');
            }
        });

        this.get('#/', function () {
            $.get('templates/home.html', function (templ) {
                $(selector).html(templ);
            })
        });

        this.get('#/login', function () {
            var _this = this;
            $.get('templates/login.html', function (templ) {
                $(selector).html(templ);
                $('#login').on('click', function () {
                    var username = $('#username').val(),
                        password = $('#password').val();

                    userRequester.login(username, password)
                        .then(function () {
                            _this.redirect('#/questions');
                        })
                        .done();
                })
            })
        });

        this.get('#/questions', function () {
            questionRequester.getAllQuestions()
                .then(function (questions) {
                    $.get('templates/data.html', function (templ) {
                        var rendered = Mustache.render(templ, questions);
                        $(selector).html(rendered);
                        $('.getAnswers').on('click', function () {
                            var parent = $(this).parent();
                            var parentId = parent.attr('data-id');
                            getAllAnswers(parent, parentId);
                        });
                        $('.addAnswer').on('click', function () {
                            var parent = $(this).parent(),
                                parentId = parent.attr('data-id'),
                                content = prompt('Add answer');
                            answerRequester.addAnswer(content, parentId)
                                .then(function (answer) {
                                    if(!parent.children().last().find('ol')) {
                                        $.get('templates/answers.html', function(templ){
                                            var ans = new Answer(answer._id, answer.content, answer.question._id);
                                            var outputHtml = Mustache.render(templ, ans);
                                            parent.children().last().html(outputHtml);
                                        });
                                    } else {
                                        $('<li>').html(answer.content).appendTo(parent.children().find('ol'));
                                    }
                                })
                        })
                    })
                }).done();

        });

        this.get('#/logout', function () {
            var _this = this;
            userRequester.logout()
                .then(function () {
                    _this.redirect('#/');
                })
        })
    });



    router.run('#/');
}());

