(function () {
    var questions = [],
    // 300= 5minutes x 60seconds
        timer = new Timer (300, showResults);

    function loadQuestions () {
        var questionsData = [
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

        function loadQuestionsOl () {
            var $ol = $ ('<ol>')
            .attr ('id', 'questions');

            $ol.on ('click', function (ev) {
                var questionIndex = $ (ev.target.parentNode)
                .attr ('id'),
                    answerIndex = $ (ev.target)
                    .attr ('id');
                questions[questionIndex].saveUserAnswer (answerIndex);
            });

            var questionIndex = 0,
                answerIndex = 0;
            questionsData.forEach (function (question) {
                answerIndex = 0;
                var li = $ ('<li>')
                .attr ('id', questionIndex);
                var $questionName = $ ('<div>')
                .text (question.question);
                li.append ($questionName);
                question.answers.forEach (function (answer) {
                    var answerRadioButton = $ ('<input>')
                    .attr ('type', "radio")
                    .attr ('name', questionIndex)
                    .attr ('id', '' + questionIndex + answerIndex);
                    li.append (answerRadioButton);
                    li.append ($ ('<label>')
                               .attr ('for', '' + questionIndex + answerIndex)
                               .text (answer));
                    answerIndex += 1;
                });

                $ol.append (li);
                questionIndex += 1;
            });
            return $ol
        }

        var $timer = $ ('<h1>')
        .attr ('id', 'timer')
        .text ('Timer');

        var $ol = loadQuestionsOl ();

        var $btn = $ ('<button>')
        .text ('Submit answers')
        .attr ('id', 'submitButton')
        .on ('click', showResults);

        $ (document.body)
        .append ($timer)
        .append ($ol)
        .append ($btn);

        $ ('#questions')
        .find ('li')
        .each (function (index, $question) {
            var question = new Question (index);
            question.setTrueAnswer (questionsData[index].correctAnswer);
            question.loadUserAnswer ();
            questions[index] = question;
        });
    }

    function showResults () {
        //stop timer
        timer.stop ();
        // hide submit btn
        $ ('#submitButton')
        .hide ();
        // disable all radio btns
        $ ('#questions')
        .find ('input')
        .attr ('disabled', 'disabled');
        // show result and clear localStorage
        var key;
        for (key in questions) {
            questions[key].showTrueAnswer ();
            questions[key].emptyStorage ();
        }
    }

    loadQuestions ();

    $ ('#questions')
    .find ('input')
    .on ('click', function (e) {
        var id = $ (e.target)
        .parent ()
        .attr ('id'),
            answerId = $ (e.target)
            .attr ('id');
        questions[id].saveUserAnswer (answerId);
    });

    timer.start ();

}) ();