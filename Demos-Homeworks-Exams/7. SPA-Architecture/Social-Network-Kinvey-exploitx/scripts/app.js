var app = app || {};
(function () {
    var ajaxRequester = app.ajaxRequester.get();
    var data = app.data.get(ajaxRequester);
    var controller = app.controller.get(data);
    controller.attachEventHandlers();

    app.router = Sammy(function () {
        var mainSelector = '#main',
            headerSelector = '#header';

        this.get('#/', function () {
            controller.loadHeader(headerSelector);
            controller.loadHome(mainSelector);
        });

        this.get('#/login', function () {
            controller.loadLogin(mainSelector);
        });

        this.get('#/logout', function () {
            controller.logout();
            this.redirect('#/');
        });

        this.get('#/register', function () {
            controller.loadRegister(mainSelector);
        });

        this.get('#/editProfile', function () {
            controller.loadEditProfile(mainSelector);
        });

        this.get('#/post', function () {
            controller.loadPostBox(headerSelector);
        });
    });

    app.router.run('#/');
})();