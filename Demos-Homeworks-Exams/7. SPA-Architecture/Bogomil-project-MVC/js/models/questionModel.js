var app = app || {};

app.questionModel = (function () {
    function QuestionModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl + 'appdata/' + this.requester.appId + '/questions';
    }

    QuestionModel.prototype.getAllQuestions = function () {
        return this.requester.get(this.serviceUrl, true);
    };

    QuestionModel.prototype.addQuestion = function(data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    return {
        load: function(requester) {
            return new QuestionModel(requester);
        }
    }
}());

