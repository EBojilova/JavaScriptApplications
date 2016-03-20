Storage.prototype.setObject = function setObject(key, obj) {
    this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObject = function getObject(key) {
    return JSON.parse(this.getItem(key));
};

$(document).ready(function () {
    var quesions = [
        {
            question: 'Which is the highest peak in Bulgaria?',
            answers: ['Botev', 'Vihren', 'Musala', 'Maliovica'],
            correctAnswer: 2
        },
        {
            question: 'What is the color of the grass?',
            answers: ['white', 'green', 'orange', 'yellow'],
            correctAnswer: 1
        },
        {
            question: 'Which of given months is the beginning of the spring?',
            answers: ['july', 'september', 'january', 'march'],
            correctAnswer: 3
        }
    ];

    var countdown = 300,
        minutes = 5,
        seconds = 0;

    $('#wrapper').append('<p>');
    var clock = setInterval(function () {
        if (countdown >= 0) {
            if (seconds < 10) {
                $('p').text(minutes + ' : 0' + seconds);
            } else {
                $('p').text(minutes + ' : ' + seconds);
            }
        }

        if (countdown === 0) {
            showResults();
        }

        countdown--;
        minutes = seconds === 0 ? minutes - 1 : minutes;
        seconds = seconds === 0 ? 59 : seconds - 1;
    }, 1000);

    var nameIndex = 0,
        ol = $('<ol>'),
        btn = $('<button>');

    ol.on('click', function (ev) {
        var question = $(ev.target).attr('name'),
            answer = $(ev.target).attr('value');
        saveUserInput(question, answer);
    });

    quesions.forEach(function (q) {
        var valueOfRadioButton = 0,
            li = $('<li>').text(q.question);

        li.append('</br>');
        q.answers.forEach(function (a) {
            var answerRadioButton = $('<input>')
                .attr('type', 'radio')
                .attr('name', nameIndex)
                .val(valueOfRadioButton);
            li.append(answerRadioButton);
            li.append($('<span>').text(a));
            li.append('</br>');
            valueOfRadioButton += 1;
        });

        ol.append(li);
        $('#wrapper').append(ol);
        nameIndex += 1;
    });

    btn.text('Submit answers').on('click', function () {
        showResults();
    });

    $('#wrapper').append(btn);

    if (!localStorage.poll) {
        var poll = {};
        for (var i = 0; i < quesions.length; i++) {
            poll[i] = ' ';
        }

        localStorage.setObject('poll', poll);
    } else {
        loadPreviousUserInput();
    }

    function saveUserInput(question, answer) {
        var currentAnswer = localStorage.getObject('poll');
        currentAnswer[question] = answer;
        localStorage.setObject('poll', currentAnswer);
    }

    function loadPreviousUserInput() {
        var answers = localStorage.getObject('poll');

        for (var q in answers) {
            if (parseInt(answers[q]) || answers[q] == 0) {
                var question = q;
                var answer = answers[q];
                $('[name=' + question + '][value=' + answer + ']').attr('checked', 'checked');
            }
        }
    }

    function showResults() {
        clearInterval(clock);
        $('span').css('background-color', 'white');
        var answers = localStorage.getObject('poll');

        if (!checkIfAllAnswersGiven()) {
            alert('Please give answer to all questions!');
        } else {
            for (var q in answers) {
                if (parseInt(answers[q]) || answers[q] == 0) {
                    var question = q;
                    var answer = answers[q];

                    if (quesions[question]["correctAnswer"] == answer) {
                        $('[name=' + question + '][value=' + answer + ']').next().css('background-color', 'green');
                    } else {
                        $('[name=' + question + '][value=' + answer + ']').next().css('background-color', 'red');
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