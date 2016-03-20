var app = app || {};
app.userController = (function () {
    function UserController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    UserController.prototype.loadLoginPage = function loadLoginPage(selector) {
        return this.viewBag.loginView.loadLoginView(selector, this);
    };

    UserController.prototype.loadRegisterPage = function loadRegisterPage(selector) {
        return this.viewBag.registerView.loadRegisterView(selector, this);
    };

    UserController.prototype.loadEditProfilePage = function loadEditProfilePage(selector) {
        var data = {
            username: sessionStorage.getItem('username'),
            fullName: sessionStorage.getItem('fullName')
        };

        this.viewBag.editProfileView.loadEditProfileView(selector, this, data);
    };

    UserController.prototype.login = function login(username, password) {
        return this.model.login(username, password)
            .then(function (loginData) {
                setUserToStorage(loginData);
                window.location.replace('#/home/');
                noty({
                    text: 'Logged-in Successfully',
                    type: 'info',
                    layout: 'topCenter',
                    timeout: 1000}
                );
            }, function (error) {
                var errMsg = error.responseJSON.error;
                noty({
                    text: 'Cannot Login: ' + errMsg,
                    type: 'error',
                    layout: 'topCenter',
                    timeout: 5000}
                );
            });
    };

    UserController.prototype.register = function register(username, pass, fullName) {
        return this.model.register(username, pass, fullName)
            .then(function (registerData) {
                setUserToStorage(registerData);
                window.location.replace('#/home/');
                noty({
                    text: 'Registered Successfully',
                    type: 'info',
                    layout: 'topCenter',
                    timeout: 1000}
                );
            }, function (error) {
                var errMsg = error.responseJSON.error;
                noty({
                    text: 'Cannot Register: ' + errMsg,
                    type: 'error',
                    layout: 'topCenter',
                    timeout: 5000}
                );
            });
    };

    UserController.prototype.logout = function logout() {
        return this.model.logout()
            .then(function () {
                clearUserFromStorage();
                window.location.replace('#/');
                noty({
                    text: 'Logged out Successfully',
                    type: 'info',
                    layout: 'topCenter',
                    timeout: 1000}
                );
            }, function (error) {
                var errMsg = error.responseJSON.error;
                noty({
                    text: 'Cannot Logout: ' + errMsg,
                    type: 'error',
                    layout: 'topCenter',
                    timeout: 5000}
                );
            });
    };

    UserController.prototype.editProfile = function editProfile(username, pass, fullName) {
        var userId = sessionStorage.getItem('userId');
        var _this = this;
        return this.model.editProfile(userId, username, pass, fullName)
            .then(function (data) {
                sessionStorage['username'] = username;
                sessionStorage['fullName'] = fullName;
                noty({
                    text: 'Profile edited Successfully',
                    type: 'info',
                    layout: 'topCenter',
                    timeout: 1000}
                );
            })
            .then(function(data){
                sessionStorage.removeItem('sessionToken');
                _this.login(username, pass);
            }, function (error) {
                var errMsg = error.responseJSON.error;
                noty({
                    text: 'Cannot Edit Profile: ' + errMsg,
                    type: 'error',
                    layout: 'topCenter',
                    timeout: 5000}
                );
            });
    };

    function setUserToStorage(data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('fullName', data.fullName);
        sessionStorage.setItem('sessionToken', data._kmd.authtoken);

    }

    function clearUserFromStorage() {
        delete sessionStorage['username'];
        delete sessionStorage['userId'];
        delete sessionStorage['fullName'];
        delete sessionStorage['sessionToken'];
    }

    return {
        load: function (model, userViews) {
            return new UserController(model, userViews);
        }
    };
})();