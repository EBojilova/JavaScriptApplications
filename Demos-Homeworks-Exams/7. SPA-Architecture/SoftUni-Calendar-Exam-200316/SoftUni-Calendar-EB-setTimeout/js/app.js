var app = app || {};

(function () {
    app.router = $.sammy(function () {
        var requester = app.requester.config('kid_ZyZ1U4HpyZ', 'dbdb1257714548fda1f7162ac29b8127');
        var selector = '#container';

        var userModel = app.userModel.load(requester);
        var lectureModel = app.lectureModel.load(requester);

        var userViewBag = app.userViews.load();
        var lectureViewBag = app.lectureViews.load();
        var welcomeViewBag = app.welcomeViews.load();

        var userController = app.userController.load(userModel, userViewBag);
        var lectureController = app.lectureController.load(lectureModel, lectureViewBag);
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

        //lectureController
        this.get('#/calendar/list/', function () {
            lectureController.getLectures(selector);
        });

        this.get('#/calendar/my/', function () {
            lectureController.getMyLectures(selector);
        });

        this.get('#/calendar/add/', function () {
            lectureController.loadAddPage(selector);
        });

        this.get('#/calendar/edit/:lectureId', function () {
        });

        this.get('#/calendar/delete/:lectureId', function () {
        });

        // BINDING custom eventite, za da izbegnem Dependecy Injection na controlerite s viewtata

        // {username: username, password: password}
        this.bind('register', function (e, data) {
            userController.register(data)
        });

        this.bind('login', function (e, data) {
            userController.login(data)
        });

        //{"title":"lectureTitle", "start":"lectureStartDateTime", "end":"lectureEndDateTime", "lecturer":"username"}
        this.bind('add-lecture', function (e, data) {
            lectureController.addLecture(data);
        });

        this.bind('show-edit-lecture', function (e, data) {
            this.redirect('#/calendar/delete/' + data._id);
            setTimeout(function () {
                lectureController.loadEditPage(selector, data)
            }, 500);
        });

        this.bind('edit-lecture', function (e, data) {
            lectureController.editLecture(data);
        });

        this.bind('show-delete-lecture', function (e, data) {
            this.redirect('#/calendar/delete/' + data._id);
            setTimeout(function () {
                lectureController.loadDeletePage(selector, data)
            }, 500);
        });

        this.bind('delete-lecture', function (e, lectureId) {
            lectureController.deleteLecture(lectureId);
        });
    });

    app.router.run('#/');
}());

