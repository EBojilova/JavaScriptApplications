var app = app || {};

(function () {
    app.router = $.sammy(function () {
        var requester = app.requester.config('kid_WkrgNGZG1-', '4ee13dffed2d4f16b37c99ee78570015');
        var selector = '#wrapper';

        var userModel = app.userModel.load(requester);
        var bookModel = app.bookModel.load(requester);

        var userViewBag = app.userViews.load();
        var bookViewBag = app.bookViews.load();
        var homeViewBag =app.homeViews.load();

        var userController = app.userController.load(userModel, userViewBag);
        var bookController = app.bookController.load(bookModel, bookViewBag);
        var homeController = app.homeController.load(homeViewBag);


        this.before({except: {path: '#\/(register|login)?'}}, function () {
            var sessionId = sessionStorage['sessionAuth'];
            if (!sessionId) {
                this.redirect('#/login');
                return false;
            } else {
                this.redirect('#/books');
            }
        });

        this.get('#/', function () {
            homeController.loadHomePage(selector);
        });

        this.get('#/login', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/books', function () {
            bookController.getAllBooks(selector);
        });

        this.get('#/logout', function () {
            var _this = this;
            userController.logout()
                .then(function() {
                    _this.redirect('#/');
                })
        });

        this.bind('redirectUrl', function(e, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(e, data) {
            userController.login(data)
        });

        this.bind('delete-book', function (e, data) {
            bookController.deleteBook(data);
        });

        this.bind('add-book', function (e, data) {
            bookController.addBook(data);
        });

        this.bind('edit-book', function (e, data) {
            bookController.editBook(data);
        });

    });

    app.router.run('#/');
}());

