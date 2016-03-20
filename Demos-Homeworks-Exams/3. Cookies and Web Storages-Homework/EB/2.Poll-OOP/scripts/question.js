var Question = (function() {
    function Question(qiestonIndex) {
        this.questionIndex = qiestonIndex;
    }

    Question.prototype.setTrueAnswer = function(trueAnsswerIndex) {
        this._trueAnswerDoubleIndex = '' + this.questionIndex + trueAnsswerIndex;
    };

    Question.prototype.saveUserAnswer = function(userAnswerIndex) {
        this._userAnswerDoubleIndex = userAnswerIndex;
        localStorage.setItem(this.questionIndex, userAnswerIndex);
    };

    Question.prototype.loadUserAnswer = function() {
        if (localStorage[this.questionIndex]) {
            this._userAnswerDoubleIndex = localStorage[this.questionIndex];
            $('#' + this._userAnswerDoubleIndex)
            .attr('checked', true);
        }
    };

    Question.prototype.showTrueAnswer = function() {
        if(this._trueAnswerDoubleIndex==this._userAnswerDoubleIndex){
            $('#' + this._userAnswerDoubleIndex + '+ label')
            .css('background', 'greenyellow');
        }
        else {
            $('#' + this._userAnswerDoubleIndex + '+ label')
            .css('background', 'red');
        }
    };

    Question.prototype.emptyStorage = function() {
        delete localStorage[this.questionIndex];
    };

    return Question;
})();

