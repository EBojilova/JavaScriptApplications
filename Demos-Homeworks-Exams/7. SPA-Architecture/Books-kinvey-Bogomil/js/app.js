var app = app || {};

(function() {
    var router = Sammy(function () {
        var selector = '#container';

        var requester = app.requester.config('kid_b1qT4k_5yZ','548a19a4bdab4a4aa030adc5416e4314');

        var userViewBag = app.userViews.load();
        var booksViewBag =app.booksViews.load();

        var userModel = app.userModel.load(requester);
        var booksModel = app.booksModel.load(requester);

        var userController = app.userController.load(userModel, userViewBag);
        var booksController = app.booksController.load(booksModel, booksViewBag);

        this.get('#/', function() {
            this.redirect('#/login');
        });

        this.get('#/login', function() {
            userController.showLoginPage(selector);
        });

        this.get('#/logout', function() {
            userController.logout();
        });

        this.get('#/register', function() {
            userController.showRegisterPage(selector);
        });

        this.get('#/books', function() {
            booksController.loadAllBooks(selector);
        });

        this.get('#/addNewBook', function() {
            booksController.loadAddBookPage(selector);
        });

        this.bind('redirectUrl', function(e, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(e, data) {
            userController.login(data);
        });

        this.bind('register', function(e, data) {
            userController.register(data);
        });

        this.bind('add-new-book', function(e, data) {
            booksController.addNewBook(data);
        });

        this.bind('show-add-author', function (e, data) {

        })

    });

    router.run('#/');
}());