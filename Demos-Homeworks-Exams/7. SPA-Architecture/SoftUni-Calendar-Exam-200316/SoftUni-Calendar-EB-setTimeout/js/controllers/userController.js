var app = app || {};

app.userController = (function () {
        function UserController(model, viewBag) {
            var _this = this;
            this._model = model;
            this._viewBag = viewBag;
            //initEvents.call(this);
        }

        // event handlera sme go iznesli v app.js
        //function initEvents(){
        //    var _this=this;
        //    Sammy(function () {
        //            this.bind('login', function(e, data) {
        //               _this.login(data)
        //            });
        //    })
        //}
        UserController.prototype.loadRegisterPage = function (selector) {
            this._viewBag.showRegisterPage(selector)
        };

        UserController.prototype.register = function (data) {
            console.log(data);
            this._model.register(data)
                .then(function (userData) {
                        sessionStorage['sessionAuth'] = userData._kmd.authtoken;
                        sessionStorage['userId'] = userData._id;
                        sessionStorage['username'] = userData.username;
                        sessionStorage['fullName'] = userData.fullName;
                        Noty.success("Registration successful.");
                        Sammy(function () {
                            this.trigger('redirectUrl', {url: '#/home/'});
                        });
                    },
                    function (error) {
                        Noty.error("Already registered user.");
                    }).done();
        };


        UserController.prototype.loadLoginPage = function (selector) {
            this._viewBag.showLoginPage(selector)
        };

        UserController.prototype.login = function (data) {
            // podavame ot userView
            // {username: username, password: password}
            this._model.login(data)
                .then(function (userData) {
                        sessionStorage['sessionAuth'] = userData._kmd.authtoken;
                        sessionStorage['userId'] = userData._id;
                        sessionStorage['username'] = userData.username;
                        sessionStorage['fullName'] = userData.fullName;
                        Noty.success("Successfully logged in.");
                        $.sammy(function () {
                            this.trigger('redirectUrl', {url: '#/home/'});
                        })
                    },
                    function (error) {
                        Noty.error("Incorrect username/password!");
                    }).done()
        };

        UserController.prototype.deleteProfile = function () {
            this._model.deleteProfile()
                .then(function () {
                    sessionStorage.clear();
                    $.sammy(function () {
                        this.trigger('redirectUrl', {url: '#/'});
                    })
                }).done()
        };

        UserController.prototype.loadHomePage = function (selector) {
            var data = {
                username: sessionStorage['username'],
                fullName: sessionStorage['fullName']
            };
            this._viewBag.showHomePage(selector, data)
        };

        UserController.prototype.logout = function () {
            return this._model.logout()
                .then(function () {
                        Noty.success("Successfully logged out.");
                        sessionStorage.clear();
                        $.sammy(function () {
                            this.trigger('redirectUrl', {url: '#/'});
                        })
                    },
                    function (error) {
                        Noty.error("A problem occurred while loging out");

                    });
        };

        return {
            load: function (model, viewBag) {
                return new UserController(model, viewBag)
            }
        }
    }()
);