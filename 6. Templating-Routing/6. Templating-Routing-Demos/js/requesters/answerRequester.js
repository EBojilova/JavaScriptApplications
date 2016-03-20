var app = app || {};

app.answerRequester = (function () {
    function AnswerRequester() {
        this.serviceUrl = app.requester.baseUrl +
            'appdata/' +
            app.requester.appId +
            '/answers';
    }

    AnswerRequester.prototype.getAllAnswers = function (questionId) {
        var defer = Q.defer();
        var requestUrl = this.serviceUrl + '?query={"question._id":"' + questionId + '"}';
        app.requester.makeRequest('GET', requestUrl, null, true)
            .then(function (answers) {
                var result = {answers:[]};

                answers.forEach(function (answer) {
                    result.answers.push(new Answer(answer._id, answer.content, answer.question._id));
                });

                defer.resolve(result);
            }, function (error) {
                defer.reject(error);
            }).done();

        return defer.promise;
    };

    AnswerRequester.prototype.addAnswer = function(content, questionId) {
        var data = {
            content: content,
            question: {
                _type: 'KinveyRef',
                _id: questionId,
                _collection: 'questions'
            }
        };

        return app.requester.makeRequest('POST', this.serviceUrl, data, true)
    };

    return AnswerRequester;
}());

