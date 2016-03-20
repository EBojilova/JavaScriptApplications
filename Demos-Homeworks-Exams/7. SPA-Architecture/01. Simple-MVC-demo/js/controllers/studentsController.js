var app = app || {};

app.studentsController = (function () {
    function StudentsController(model) {
        this._model = model;
    }

    StudentsController.prototype.loadStudents = function (selector) {
        // kontrolera kazva na modela da vzeme datata ot studenti i ia podava na view
        var _this = this;
        this._model.getStudents()
            .then(function (studentsData) {
                // InputBindingModel
                var outputData = {
                    students: studentsData.results
                };
                // Dependency Injection- podavame controlera na view
                app.allStudentsView.render(_this, selector, outputData);
            }, function (error) {
                console.log(error.responseText);
            })
    };

    StudentsController.prototype.addStudent = function (selector, name, grade) {
        //OutputBindingModel
        var student = {
            name: name,
            grade: Number(grade)
        };
        // kontrolera kazva na modela da dobavi student i go podava na view
        this._model.addStudent(student)
            .then(function () {
                app.addStudentView.render(selector, student);
            }, function (error) {
                console.log(error.responseText);
            })
    };


    return {
        load: function (model) {
            return new StudentsController(model);
        }
    }
}());