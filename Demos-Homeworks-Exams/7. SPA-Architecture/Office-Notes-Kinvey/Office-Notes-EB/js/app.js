var app = app || {};

(function () {
    app.router = $.sammy(function () {
        var requester = app.requester.config('kid_WJvtOShoy-', '920273af8e1c4b19b178dadc2574eebd');
        var selector = '#container';

        var userModel = app.userModel.load(requester);
        var noteModel = app.noteModel.load(requester);

        var userViewBag = app.userViews.load();
        var noteViewBag = app.noteViews.load();
        var welcomeViewBag = app.welcomeViews.load();

        var userController = app.userController.load(userModel, userViewBag);
        var noteController = app.noteController.load(noteModel, noteViewBag);
        var welcomeController = app.welcomeController.load(welcomeViewBag);


        this.before({except: {path: '#\/(register/|login/)?'}}, function () {
            var sessionId = sessionStorage['sessionAuth'];
            if (!sessionId) {
                this.redirect('#/');
                return false;
            }
        });

        this.bind('redirectUrl', function (e, data) {
            this.redirect(data.url);
        });

        this.get('#/', function () {
            welcomeController.loadWelcomePage(selector);
        });

        //userController
        this.get('#/login/', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function () {
            userController.loadRegisterPage(selector);
        });

        this.get('#/home/', function () {
            userController.loadHomePage(selector);
        });

        this.get('#/logout/', function () {
            var _this = this;
            userController.logout();
        });
        //<li><a href="#/home/">Home</a></li>
        //<li><a href="#/office/">Office notes</a></li>
        //<li><a href="#/myNotes/">My notes</a></li>
        //<li><a href="#/addNote/">Add note</a></li>
        //<li><a href="#/logout/">Logout</a></li>

        //noteController
        this.get('#/office/', function () {
            noteController.getNotesForToday(selector);
        });

        this.get('#/myNotes/', function () {
            noteController.getMyNotes(selector);
        });

        this.get('#/addNote/', function () {
            noteController.loadAddPage(selector);
        });

        this.get('#/editNote/', function () {
        });

        this.get('#/deleteNote/', function () {
        });

        // BINDING custom eventite, za da izbegnem Dependecy Injection na controlerite s viewtata

        // {username: username, password: password}
        this.bind('register', function (e, data) {
            userController.register(data)
        });

        this.bind('login', function (e, data) {
            userController.login(data)
        });

        ////{"title":"Tests", "text":"Make tests", "author":"Pesho", "deadline":"01/05/2015", ACL":{…}}
        this.bind('add-note', function (e, data) {
            noteController.addNote(data);
        });

        this.bind('show-edit-note', function (e, data) {
            noteController.loadEditPage(selector, data);
        });

        this.bind('edit-note', function (e, data) {
            noteController.editNote(data);
        });

        this.bind('show-delete-note', function (e, data) {
            noteController.loadDeletePage(selector, data);
        });

        this.bind('delete-note', function (e, noteId) {
            noteController.deleteNote(noteId);
        });
    });

    app.router.run('#/');
}());

