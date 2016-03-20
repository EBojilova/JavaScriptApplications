var app = app || {};

app.studentsViewModel = (function() {
    function StudentsViewModel(model) {
        this._model = model;
        this.studentToAdd = {};
    }

    StudentsViewModel.prototype.loadStudents = function (selector) {
        var _this = this;
        this._model.getStudents()
            .then(function (studentsData) {
                // InputBindingModel
                var outputData = {
                    students: studentsData.results
                };

                app.allStudentsView.render(_this, selector, outputData)
                    // here is the difference from the controller
                    .then(function () {
                        // pishem v neta how to make two way binding i izliza
                        // TODO: da go iznesa v iife BindViewVM
                        _this.studentToAdd.name = new BindViewToVM(document.getElementById('name'), "[no name]");
                        _this.studentToAdd.grade = new BindViewToVM(document.getElementById('grade'), "[no grade]");
                    }).done();
            }, function (error) {
                console.log(error.responseText);
            })
    };

    StudentsViewModel.prototype.addStudent = function (selector) {
        var _this = this;
        //OutputBindingModel
        var student = {
            name : this.studentToAdd.name.data,
            grade : Number(this.studentToAdd.grade.data)
        };

        this._model.addStudent(student)
            .then(function () {app.addStudentView.render(selector, student);

            }, function (error) {
                console.log(error.responseText);
            })
    };

    function BindViewToVM(element, data) {
        this.data = data;
        this.element = element;
        element.value = data;
        // TODO: podavame this kato event handler???
        //http://www.thecssninja.com/javascript/handleevent
        element.addEventListener("change", this, false);
    }

    BindViewToVM.prototype.handleEvent = function (event) {
        switch (event.type) {
            case "change":
                this.change(this.element.value);
        }
    };

    BindViewToVM.prototype.change = function (value) {
        this.data = value;
        this.element.value = value;
    };


    return {
        load: function (model) {
            return new StudentsViewModel(model);
        }
    }
}());