var app = app || {};

app.questionController = (function() {
    function QuestionController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    QuestionController.prototype.getAllQuestions = function(selector) {
        var _this =this;

        this._model.getAllQuestions()
            .then(function (questions) {
                var result = {
                    questions: []
                };

                questions.forEach(function (question) {
                    result.questions.push(new QuestionInputModel(question._id, question.content));
                });

                _this._viewBag.showQuestions(selector, result);
            }).done();
    };

    QuestionController.prototype.addQuestion = function(data) {
        var _this = this;

        var questionOutputModel = {
            title: data.title
        };

        this._model.addQuestion(questionOutputModel)
            .then(function() {
                _this.getAllQuestions();
            })
    };

    return {
        load: function(model, viewBag) {
            return new QuestionController(model, viewBag);
        }
    };
}());