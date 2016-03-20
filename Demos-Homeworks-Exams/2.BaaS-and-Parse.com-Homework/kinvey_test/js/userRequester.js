var app = app || {};

app.UserRequester = (function () {
    // TODO: var requestUrl
    function UserRequester() {
        this.serviceUrl = app.requester.baseUrl + 'user/' + app.requester.appId;
    }

    UserRequester.prototype.signUp = function (username, password, email) {
        var requestUrl = this.serviceUrl,
            data = {
                username: username,
                password: password,
                email: email
            };
        app.requester.makeRequest('POST', requestUrl, data).then(function (success) {
            sessionStorage['sessionAuth'] = success._kmd.authtoken;
            sessionStorage['userId'] = success._id;
        }, function (error) {
            console.error(error);
        }).done()
    };

    UserRequester.prototype.login = function (username, password) {
        var requestUrl = this.serviceUrl + '/login',
            data = {
                username: username,
                password: password
            };

        app.requester.makeRequest('POST', requestUrl, data).then(function (success) {
            sessionStorage['sessionAuth'] = success._kmd.authtoken;
            sessionStorage['userId'] = success._id;
        }, function (error) {
            console.error(error);
        }).done()
    };

    UserRequester.prototype.logout = function () {
        var requestUrl = this.serviceUrl + '/_logout';
        app.requester.makeRequest('POST', requestUrl, {}, true).then(function (success) {
            console.log('Logout successfully');
            console.log(success);
        }, function (error) {
            console.error(error);
        }).done();
    };

    UserRequester.prototype.getInfo = function () {
        var requestUrl = this.serviceUrl + '/_me';

        app.requester.makeRequest('GET', requestUrl, null, true).then(function (success) {
            console.log(success);
        }, function (error) {
            console.error(error);
        }).done();
    };

    return UserRequester;
}());