var app = app || {};

app.UserRequester = (function () {
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
            var result = success;
            sessionStorage['sessionAuth'] = result._kmd.authtoken;
            sessionStorage['userId'] = result._id;
        }, function (error) {
            console.error(error);
        }).done()
    };

    UserRequester.prototype.login = function (username, password) {
        var defer = Q.defer();

        var requestUrl = this.serviceUrl + '/login',
            data = {
                username: username,
                password: password
            };

        app.requester.makeRequest('POST', requestUrl, data)
            .then(function (success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                defer.resolve();
            }, function (error) {
                console.error(error);
                defer.reject();
            }).done();

        return defer.promise;
    };

    UserRequester.prototype.getInfo = function () {
        var requestUrl = this.serviceUrl + '/_me';

        app.requester.makeRequest('GET', requestUrl, null, true).then(function (success) {
            console.log(success);
        }, function (error) {
            console.error(error);
        }).done();
    };

    UserRequester.prototype.logout = function () {
        var requestUrl = this.serviceUrl + '/_logout';
        return app.requester.makeRequest('POST', requestUrl, null, true)
            .then(function () {
                sessionStorage.clear();
            })
    };

    return UserRequester;
}());