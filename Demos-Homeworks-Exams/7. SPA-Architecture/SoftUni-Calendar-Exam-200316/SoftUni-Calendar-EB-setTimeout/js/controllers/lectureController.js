var app = app || {};

app.lectureController = (function () {
    function LectureController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    LectureController.prototype.getLectures = function (selector) {
        var _this = this;
        this._model.getLectures()
            .then(function (lectures) {
                    //var result;
                    //if (lectures.length > 0) {
                    //    result = {lectures: lectures};
                    //}
                    _this._viewBag.showLectures(selector, lectures);
                },
                function (error) {
                    Noty.error("A problem occurred while trying to get all lectures!");
                }).done();
    };

    LectureController.prototype.getMyLectures = function (selector) {
        var _this = this;
        this._model.getLecturesByUserId(sessionStorage['userId'])
            .then(function (lectures) {
                    //var result;
                    //if (lectures.length > 0) {
                    //    result = {lectures: lectures};
                    //}
                    _this._viewBag.showLectures(selector, lectures);
                },
                function (error) {
                    Noty.error("A problem occurred while trying to get your lectures!");
                }).done();
    };


    LectureController.prototype.loadAddPage = function (selector) {
        this._viewBag.showAddLecture(selector)
    }
    LectureController.prototype.addLecture = function (data) {
        this._model.addLecture(data)
            .then(function () {
                    Noty.success("Lecture successfully added.");
                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/calendar/my/'});
                    });
                },
                function (error) {
                    Noty.error("A problem occurred while trying to add your lecture!");
                })
    };

    LectureController.prototype.loadEditPage = function (selector, data) {
        this._viewBag.showEditLecture(selector, data);
    };

    LectureController.prototype.editLecture = function (data) {
        this._model.editLecture(data)
            .then(function () {
                    Noty.success("Lecture successfully edited.");
                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/calendar/my/'});
                    });
                },
                function (error) {
                    Noty.error("A problem occurred while trying to edit lecture or you are not authorized to edit!");
                })
    };

    LectureController.prototype.loadDeletePage = function (selector, data) {
        this._viewBag.showDeleteLecture(selector, data);
    };

    LectureController.prototype.deleteLecture = function (data) {
        this._model.deleteLecture(data)
            .then(function () {
                    Noty.success("Lecture successfully deleted.");
                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/calendar/my/'});
                    });
                },
                function (error) {
                    Noty.error("A problem occurred while trying to delete lecture or you are not authorized to delete!");
                })
    };

    return {
        load: function (model, viewBag) {
            return new LectureController(model, viewBag);
        }
    };
}());