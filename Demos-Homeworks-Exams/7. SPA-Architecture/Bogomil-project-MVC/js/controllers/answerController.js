var app = app || {};

app.answerController = (function () {
    function AnswerController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
        //initEvents.call(this);
    }

    // event handlera sme go iznesli v app.js
    //function initEvents(){
    //    var _this=this;
    //    Sammy(function () {
    //        this.bind('get-answers', function (e, data) {
    //            _this.getAllAnswersByQuestionId(data);
    //        });
    //
    //        this.bind('add-answer', function (e, data) {
    //            _this.addAnswer(data);
    //        });
    //    })
    //}

    AnswerController.prototype.getAllAnswersByQuestionId = function(data) {
        // datata, koiato podavame e(vij questionView)
        //{parent: parent, questionId: parentId
        var _this = this;

        this._model.getAllAnswersByQuestionId(data.questionId)
            .then(function (answers) {
                var result = {
                    answers: []
                };

                answers.forEach(function (answer) {
                    result.answers.push(new AnswerInputModel(answer._id, answer.content, answer.question._id));
                });
                _this._viewBag.showAnswers(data.parent, result);
            }).done();
    };

    AnswerController.prototype.addAnswer = function(data) {
        // datata, koiato podavame e(vij questionView)
        // {parent: parent, questionId: parentId, content: content
        var _this = this;
        var answerOutputModel = {
            content: data.content,
            question: {
                _type: 'KinveyRef',
                _id: data.questionId,
                _collection: 'questions'
            }
        };

        this._model.addAnswer(answerOutputModel)
            .then(function() {
               // _this.getAllAnswersByQuestionId(data);
                // v sluchai, che imame vizualizirani answerite, bez da pravim dopalnitelna zaiavka
                // da vizualizirame i novia answer
                var answersList=data.parent.children()
                    .last()
                    .find('ol');
                if (answersList) {
                    $('<li>')
                        .html(answerOutputModel.content)
                        .appendTo(answersList);
                }
            })
    };

    return {
        load: function (model, viewBag, router) {
            return new AnswerController(model, viewBag, router);
        }
    }
}());