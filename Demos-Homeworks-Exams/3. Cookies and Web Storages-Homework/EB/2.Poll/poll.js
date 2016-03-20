Storage.prototype.setObject = function setObject(key, obj) {
    this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObject = function getObject(key) {
    return JSON.parse(this.getItem(key));
};

$(document)
.ready(function() {
    var questions = [
        {
            question     : 'Which is the highest peak in Bulgaria?',
            answers      : ['Botev', 'Vihren', 'Musala', 'Maliovica'],
            correctAnswer: 2
        },
        {
            question     : 'What is the color of the grass?',
            answers      : ['white', 'green', 'orange', 'yellow'],
            correctAnswer: 1
        },
        {
            question     : 'Which of given months is the beginning of the spring?',
            answers      : ['july', 'september', 'january', 'march'],
            correctAnswer: 3
        }
    ];
    // countdown= 5min x 60 sec
    var countdown = 300,
        minutes   = 5,
        seconds   = 0;

    $('#wrapper')
    .append('<p>');
    // setvame da se izpalniava na vsiaka sekunda
    var clock = setInterval(function() {
        if (countdown >= 0) {
            if (seconds < 10) {
                $('p')
                .text(minutes + ' : 0' + seconds);
            }
            else {
                $('p')
                .text(minutes + ' : ' + seconds);
            }
        }

        if (countdown === 0) {
            showResults();
        }

        countdown--;
        minutes = seconds === 0 ?
                  minutes - 1 :
                  minutes;
        seconds = seconds === 0 ?
                  59 :
                  seconds - 1;
    }, 1000);

    var ol = loadQuestionsDom();

    $('#wrapper')
    .append(ol);

    var btn = $('<button>')
    .text('Submit answers')
    .on('click', function() {
        //When the presses the 'submit' button, the timer stops, and shows the user his result and his errors.
        showResults();
    });

    $('#wrapper')
    .append(btn);

    if (!localStorage.poll) {
        var poll = {};
        for (var i = 0; i < questions.length; i++) {
            poll[i] = ' ';
        }

        localStorage.setObject('poll', poll);
    }
    else {
        //If the user exits the page by accident before submission, his answers should be reloaded from storage.
        //If the user has already completed the poll (successfully submitted), his result should be displayed.
        loadPreviousUserInput();
    }

    function loadQuestionsDom() {
        var questionIndex = 0,
            answerIndex   = 0,
            ol            = $('<ol>');

        ol.on('click', function(ev) {
            var question = $(ev.target)
            .attr('name'),
                answer   = $(ev.target)
                .attr('value');
            saveUserInput(question, answer);
        });

        questions.forEach(function(question) {
            answerIndex = 0;
            var li = $('<li>')
            .text(question.question);

            li.append('</br>');
            question.answers.forEach(function(answer) {
                var answerRadioButton = $('<input>')
                .attr('type', 'radio')
                .attr('name', questionIndex)
                .val(answerIndex);
                li.append(answerRadioButton);
                li.append($('<span>')
                          .text(answer));
                li.append('</br>');
                answerIndex += 1;
            });

            ol.append(li);
            questionIndex += 1;
        });
        return ol
    }

    function saveUserInput(question, answer) {
        var answers = localStorage.getObject('poll');
        answers[question] = answer;
        localStorage.setObject('poll', answers);
    }

    function loadPreviousUserInput() {
        var answers = localStorage.getObject('poll');

        for (var q in answers) {
            if (parseInt(answers[q]) || answers[q] == 0) {
                var question = q;
                var answer = answers[q];
                $('[name=' + question + '][value=' + answer + ']')
                .attr('checked', 'checked');
            }
        }
    }

    function showResults() {
        //When the presses the 'submit' button, the timer stops, and shows the user his result and his errors.
        clearInterval(clock);
        $('span')
        .css('background-color', 'white');
        var answers = localStorage.getObject('poll');

        if (!checkIfAllAnswersGiven()) {
            alert('Please give answer to all questions!');
        }
        else {
            for (var q in answers) {
                if (parseInt(answers[q]) || answers[q] == 0) {
                    var questionIndex = q;
                    var answerIndex = answers[q];
                    // we use next(), because we would like to change the colour of the span, next to radio btn
                    if (questions[questionIndex].correctAnswer == answerIndex) {
                        $('[name=' + questionIndex + '][value=' + answerIndex + ']')
                        .next()
                        .css('background-color', 'lightgreen');
                    }
                    else {
                        $('[name=' + questionIndex + '][value=' + answerIndex + ']')
                        .next()
                        .css('background-color', 'red');
                    }
                }
            }
        }
    }

    function checkIfAllAnswersGiven() {
        var answers = localStorage.getObject('poll');

        for (var i in answers) {
            if (answers[i] == ' ') {
                return false;
            }
        }

        return true;
    }
});