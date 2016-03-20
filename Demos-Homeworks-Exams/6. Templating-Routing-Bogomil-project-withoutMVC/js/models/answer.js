var Answer = (function() {
    function Answer(id, content, questionId) {
        this._id = id;
        this.content = content;
        this.questionId = questionId;
    }

    return Answer;
}());