var app = app || {};

app.noteController = (function () {
    function NoteController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    NoteController.prototype.getNotesForToday = function (selector) {
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }

        var today = formatDate(new Date());

        var _this = this;
        this._model.getNotesForToday(today)
            .then(function (notes) {
                    var result;
                    if (notes.length > 0) {
                        result = {notes: notes};
                    }
                    _this._viewBag.showNotes(selector, result);
                },
                function (error) {
                    Noty.error("A problem occurred while trying to get today's notes!");
                }).done();
    };

    NoteController.prototype.getMyNotes = function (selector) {
        var _this = this;
        this._model.getNotesByUserId(sessionStorage['userId'])
            .then(function (notes) {
                    var result;
                    if (notes.length > 0) {
                        result = {notes: notes};
                    }
                    _this._viewBag.showMyNotes(selector, result);
                },
                function (error) {
                    Noty.error("A problem occurred while trying to get your notes!");
                }).done();
    };

    //showNotes: showNotes,
    //showMyNotes: showMyNotes,
    //showAddNote: showAddNote,
    //showEditNote: showEditNote,
    //showDeleteNote: showDeleteNote

    NoteController.prototype.loadAddPage = function (selector) {
        this._viewBag.showAddNote(selector)
    };

    NoteController.prototype.addNote = function (data) {
        this._model.addNote(data)
            .then(function () {
                    Noty.success("Note successfully added.");
                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/myNotes/'});
                    });
                },
                function (error) {
                    Noty.error("A problem occurred while trying to add your note!");
                })
    };

    NoteController.prototype.loadEditPage = function (selector, data) {
        this._viewBag.showEditNote(selector, data);
        Sammy(function () {
            // ne e getnato v app.js, pravim go samo posle da mojem da se redirektnem kam #/myNotes/
            this.trigger('redirectUrl', {url: '#/editNote/'});
        });
    };

    NoteController.prototype.editNote = function (data) {
        this._model.editNote(data)
            .then(function () {
                    Noty.success("Note successfully edited.");
                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/myNotes/'});
                    });
                },
                function (error) {
                    Noty.error("A problem occurred while trying to edit your note!");
                })
    };

    NoteController.prototype.loadDeletePage = function (selector, data) {
        this._viewBag.showDeleteNote(selector, data);
        Sammy(function () {
            // ne e getnato v app.js, pravim go samo posle da mojem da se redirektnem kam #/myNotes/
            this.trigger('redirectUrl', {url: '#/deleteNote/'});
        });
    };

    NoteController.prototype.deleteNote = function (data) {
        this._model.deleteNote(data)
            .then(function () {
                    Noty.success("Note successfully deleted.");
                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/myNotes/'});
                    });
                },
                function (error) {
                    Noty.error("A problem occurred while trying to delete your note!");
                })
    };

    return {
        load: function (model, viewBag) {
            return new NoteController(model, viewBag);
        }
    };
}());