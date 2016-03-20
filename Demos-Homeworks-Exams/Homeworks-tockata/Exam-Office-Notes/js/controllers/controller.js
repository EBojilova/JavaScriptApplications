var app = app || {};

app.controller = (function () {
    function Controller(model) {
        this._model = model;
    }

    Controller.prototype.loadGuestScreen = function (selector) {
        app.guestView.load(selector);
    };

    Controller.prototype.loadRegister = function (selector) {
        app.registerView.load(selector);
    };

    Controller.prototype.loadLogin = function (selector) {
        app.loginView.load(selector);
    };

    Controller.prototype.loadHome = function (selector) {
        var fullName = localStorage.getItem('fullName'),
            username = localStorage.getItem('username'),
            user = {
                fullName: fullName,
                username: username
            };

        app.homeView.load(selector, user);
    };

    Controller.prototype.loadOffice = function (selector) {
        this._model.note.getAllNotesWithDeadline()
            .then(function (data) {
                app.officeNotesView.load(selector, data);
            }, function (error) {
                Noty.error(error.responseJSON.error);
            })
    };

    Controller.prototype.loadAddNote = function (selector) {
        app.addNoteView.load(selector);
    };

    Controller.prototype.loadMyNotes = function (selector) {
        var author = localStorage.getItem('fullName');
        this._model.note.getCurrentUserNotes(author)
            .then(function (data) {
                app.currentUserNotesView.load(selector, data);
            }, function (error) {
                Noty.error(error.responseJSON.error);
            });
    };

    Controller.prototype.loadEditNote = function (selector, noteId) {
        this._model.note.getNoteById(noteId)
            .then(function (data) {
                app.editNoteView.load(selector, data);
            }, function (error) {
                Noty.error(error.responseJSON.error);
            });
    };

    Controller.prototype.loadDeleteNote = function (selector, noteId) {
        this._model.note.getNoteById(noteId)
            .then(function (data) {
                app.deleteNoteView.load(selector, data);
            }, function (error) {
                Noty.error(error.responseJSON.error);
            });
    };

    Controller.prototype.attachEventHandlers = function (selector) {
        attachLoginHandler.call(this, selector);
        attachLogoutHandler.call(this, selector);
        attachRegisterHandler.call(this, selector);
        attachAddNoteHandler.call(this, selector);
        attachEditButtonHandler.call(this, selector);
        attachConfirmEditHandler.call(this, selector);
        attachDeleteButtonHandler.call(this, selector);
        attachConfirmDeleteHandler.call(this, selector);
    };

    var attachRegisterHandler = function (selector) {
        var _this = this;
        $(selector).on('click', '#registerButton', function () {
            var username = $('#username').val(),
                password = $('#password').val(),
                fullName = $('#fullName').val();

            _this._model.user.register(username, password, fullName)
                .then(function (data) {
                    localStorage.setItem('sessionToken', data.sessionToken);
                    localStorage.setItem('username', username);
                    localStorage.setItem('fullName', fullName);
                    localStorage.setItem('userId', data.objectId);
                    redirectTo('#/home');
                    Noty.success('User successfuly registered');
                },
                function (error) {
                    redirectTo('#/register');
                    Noty.error(error.responseJSON.error);
                });
        });
    };

    var attachLoginHandler = function (selector) {
        var _this = this;
        $(selector).on('click', '#loginButton', function () {
            var username = $('#username').val();
            var password = $('#password').val();

            _this._model.user.login(username, password)
                .then(function (data) {
                    localStorage.setItem('sessionToken', data.sessionToken);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('fullName', data.fullName);
                    localStorage.setItem('userId', data.objectId);
                    Noty.success('Login successfull');
                    redirectTo('#/home');
                },
                function (error) {
                    Noty.error(error.responseJSON.error);
                });
        });
    };

    var attachLogoutHandler = function (selector) {
        var _this = this;

        $(selector).on('click', '#logout', function () {
            _this._model.user.logout();
            localStorage.clear();
            redirectTo('#/');
            Noty.success('Logout successfull!');
        });
    };

    var attachAddNoteHandler = function (selector) {
        var _this = this;

        $(selector).on('click', '#addNoteButton', function () {
            var title = $('#title').val(),
                text = $('#text').val(),
                deadline = $('#deadline').val(),
                author = localStorage.getItem('fullName'),
                userId = localStorage.getItem('userId');

            if (title === '' || text == '' || deadline == '') {
                Noty.error('Please fill all the fields!');
                return;
            }

            _this._model.note.addNote(title, text, author, deadline, userId)
                .then(function (data) {
                    Noty.success('Note added successfully.');
                    redirectTo('#/myNotes');
                }, function (error) {
                    Noty.error(error.responseJSON.error);
                });
        });
    };

    var attachEditButtonHandler = function (selector) {
        $(selector).on('click', '.edit', function (event) {
            var noteId = $(event.target).parent().data('id');
            redirectTo('#/editNote/' + noteId);
        });
    };

    var attachConfirmEditHandler = function (selector) {
        var _this = this;

        $(selector).on('click', '#editNoteButton', function (event) {
            var noteId = $(event.target).parent().parent().data('id'),
                title = $('#title').val(),
                text = $('#text').val(),
                deadline = $('#deadline').val();

            _this._model.note.editNote(title, text, deadline, noteId)
                .then(function (data) {
                    redirectTo('#/myNotes');
                    Noty.success('Note successfully edited!');
                }, function (error) {
                    Noty.error(error.responseJSON.error);
                });
        });
    };

    var attachDeleteButtonHandler = function (selector) {
        $(selector).on('click', '.delete', function (event) {
            var noteId = $(event.target).parent().data('id');
            redirectTo('#/deleteNote/' + noteId);
        });
    };

    var attachConfirmDeleteHandler = function (selector) {
        var _this = this;

        $(selector).on('click', '#deleteNoteButton', function (event) {
            var noteId = $(event.target).parent().parent().data('id');

            _this._model.note.deleteNote(noteId)
                .then(function (data) {
                    redirectTo('#/myNotes');
                    Noty.success('Note successfully deleted!');
                }, function (error) {
                    Noty.error(error.responseJSON.error);
                });
        });
    };
    
    function redirectTo(url) {
        window.location = url;
    }

    return {
        load: function(model) {
            return new Controller(model);
        }
    };
}());
