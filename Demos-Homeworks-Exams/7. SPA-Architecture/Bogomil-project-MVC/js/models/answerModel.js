var app = app || {};

app.answerModel = (function () {
    function AnswerModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl + 'appdata/' + this.requester.appId + '/Answers';
    }

    AnswerModel.prototype.getAllAnswersByQuestionId = function (questionId) {
        var requestUrl = this.serviceUrl + '?query={"question._id":"' + questionId + '"}';
        return this.requester.get(requestUrl, true);
    };

    AnswerModel.prototype.addAnswer = function(data) {
        return this.requester.post(this.serviceUrl, data, true)
    };

    return {
        load: function(requester) {
            return new AnswerModel(requester);
        }
    }
}());

