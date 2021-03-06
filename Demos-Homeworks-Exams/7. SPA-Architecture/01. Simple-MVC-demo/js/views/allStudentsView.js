var app = app || {};

app.allStudentsView = (function () {
    // Minusa e che imame Dependecy injection, tai kato tuka odavame controlera, koito vika viewto
    // Mojem da go izbegnem s custom eventi- vij proketa, koito e dobaven
    function render(controller, selector, data) {
        $.get('templates/allStudents.html', function (template) {
                var output = Mustache.render(template, data);
                $(selector)
                    .html(output);
            })
            .then(function () {
                $('#addStudent')
                    .click(function () {
                        var studentName = $('#name')
                            .val();
                        var studentGrade = $('#grade')
                            .val();
                        controller.addStudent('#students', studentName, studentGrade);
                    })
            });
    }

    return {
        render: function (controller, selector, data) {
            render(controller, selector, data);
        }
    };
}());