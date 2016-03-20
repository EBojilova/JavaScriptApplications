var AnswerInputModel = (function() {
    function AnswerInputModel(id, content, questionId) {
        this._id = id;
        this.content = content;
        this.questionId = questionId;
    }

    return AnswerInputModel;
}());