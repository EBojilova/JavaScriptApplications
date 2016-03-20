var app = app || {};

(function () {
    var appId = '2TLylvHecizgLTorRdJILPr3a9tZK7tanFt7EOiy',
        restAPI = 'bih1cbcIO9H3AzQnn3lIqPY0iHqcIQh2cYpHIyXJ',
        baseUrl = 'https://api.parse.com/1/',
        mainSelector = '#wrapper',

        headers = app.headers.load(appId, restAPI),
        requester = app.ajaxRequester.load(),
        model = app.model.load(baseUrl, requester, headers),
        controller = app.controller.load(model);

    controller.attachEventHandlers(mainSelector);

    app.router = Sammy(function () {
        var selector = '#container';

        this.before(function () {
            if (localStorage.getItem('sessionToken')) {
                var fullName = localStorage.getItem('fullName');
                $('#menu').show();
                $('#welcomeMenu').text('Welcome, ' + fullName);
            } else {
                $('#menu').hide();
            }
        });

        this.get('#/', function() {
            if (localStorage.getItem('sessionToken')) {
                app.router.setLocation('#/home');
                return;
            }

            controller.loadGuestScreen(selector);
        });

        this.get('#/register', function() {
            if (localStorage.getItem('sessionToken')) {
                app.router.setLocation('#/home');
                return;
            }

            controller.loadRegister(selector);
        });

        this.get('#/login', function() {
            if (localStorage.getItem('sessionToken')) {
                app.router.setLocation('#/home');
                return;
            }

            controller.loadLogin(selector);
        });

        this.get('#/home', function() {
            if (!localStorage.getItem('sessionToken')) {
                app.router.setLocation('#/');
                return;
            }

            controller.loadHome(selector);
        });

        this.get('#/office', function() {
            if (!localStorage.getItem('sessionToken')) {
                app.router.setLocation('#/');
                return;
            }

            controller.loadOffice(selector);
        });

        this.get('#/myNotes', function() {
            if (!localStorage.getItem('sessionToken')) {
                app.router.setLocation('#/');
                return;
            }

            controller.loadMyNotes(selector);
        });

        this.get('#/addNote', function() {
            if (!localStorage.getItem('sessionToken')) {
                app.router.setLocation('#/');
                return;
            }

            controller.loadAddNote(selector);
        });

        this.get('#/editNote/:noteId', function() {
            if (!localStorage.getItem('sessionToken')) {
                app.router.setLocation('#/');
                return;
            }

            var noteId = this.params['noteId'];
            controller.loadEditNote(selector, noteId);
        });

        this.get('#/deleteNote/:noteId', function() {
            if (!localStorage.getItem('sessionToken')) {
                app.router.setLocation('#/');
                return;
            }

            var noteId = this.params['noteId'];
            controller.loadDeleteNote(selector, noteId);
        });

        this.get('#/logout', function() {
            if (!localStorage.getItem('sessionToken')) {
                app.router.setLocation('#/');
                return;
            }

            controller.loadLogout(selector);
        });
    });

    app.router.run('#/');
}());

