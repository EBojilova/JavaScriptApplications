var app = app || {};

(function () {
    var router = Sammy(function () {
        app.requester.config('kid_WkwKuJux1W', 'f134ec18f7454dd48469b4f5aade49be');
        var selector = '#wrapper';
        var userRequester = new app.UserRequester();
        var questionRequester = new app.questionRequester();
        var answerRequester = new app.answerRequester();

        function getAllAnswers(parent, questionId) {
            answerRequester.getAllAnswers(questionId)
                .then(function (answers) {
                    $.get('templates/answers.html', function (templ) {
                        var outputHtml = Mustache.render(templ, answers);
                        parent.children()
                            //.last e <div class="answers"></div>
                            .last()
                            .html(outputHtml);
                    });
                })
        }

        this.before(function () {

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
                $(selector)
                    .html(templ);
            })
        });

        this.get('#/login', function () {
            var _this = this;
            $.get('templates/login.html', function (templ) {
                $(selector)
                    .html(templ);
                $('#login')
                    .on('click', function () {
                        var username = $('#username')
                            .val(),
                            password = $('#password')
                                .val();

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
                    console.log(questions);
                    $.get('templates/data.html', function (templ) {
                        var rendered = Mustache.render(templ, questions);
                        $(selector)
                            .html(rendered);
                        $('.getAnswers')
                            .on('click', function () {
                                var question = $(this)
                                    .parent();
                                var questionId = question.attr('data-id');
                                getAllAnswers(question, questionId);
                            });
                        $('.addAnswer')
                            .on('click', function () {
                                'use strict';
                                var question = $(this)
                                    .parent(),
                                    questionId = question.attr('data-id'),
                                    content = prompt('Add answer');
                                answerRequester.addAnswer(content, questionId)
                                    .then(function (answer) {
                                        // v sluchai, che imame vizualizirani answerite, bez da pravim dopalnitelna zaiavka
                                        // da vizualizirame i novia answer
                                        var answersList=question.children()
                                            .last()
                                            .find('ol');
                                        if (answersList) {
                                            $('<li>')
                                                .html(answer.content)
                                                .appendTo(answersList);
                                        }
                                    })
                            })
                    })
                })
                .done();
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

