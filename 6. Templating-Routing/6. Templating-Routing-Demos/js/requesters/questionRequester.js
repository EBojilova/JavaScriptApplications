var app = app || {};

app.questionRequester = (function () {
    function QuestionRequester() {
        this.serviceUrl = app.requester.baseUrl +
            'appdata/' +
            app.requester.appId +
            '/questions';
    }

    QuestionRequester.prototype.getAllQuestions = function () {
        var defer = Q.defer();
        app.requester.makeRequest('GET', this.serviceUrl, null, true)
            .then(function (questions) {
                var result = {
                    questions: []
                };

                questions.forEach(function (question) {
                    result.questions.push(new Question(question._id, question.title));
                });
                defer.resolve(result);
            }, function (error) {
                defer.reject(error);
            }).done();

        return defer.promise;
    };

    QuestionRequester.prototype.addQuestion = function(title) {
        var data = {
            title: title
        };

        app.requester.makeRequest('POST', this.serviceUrl, data, true)
    };

    return QuestionRequester;
}());

