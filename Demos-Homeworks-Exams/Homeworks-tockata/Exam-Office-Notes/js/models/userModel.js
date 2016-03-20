var app = app || {};

app.user = (function () {
    function User(baseUrl, requester, headers) {
        this.baseUrl = baseUrl;
        this.requester = requester;
        this.headers = headers;
    }

    User.prototype.register = function register(username, password, fullName) {
        var data = {
            username: username,
            password: password,
            fullName: fullName
        };

        var serviceUrl = this.baseUrl + 'users/';
        return this.requester.post(serviceUrl, this.headers.getHeaders(), data);
    };

    User.prototype.login = function login(username, password) {
        var serviceUrl = this.baseUrl + 'login?username=' + username
            + '&password=' + password;

        return this.requester.get(serviceUrl, this.headers.getHeaders());
    };

    User.prototype.logout = function logout() {
        var serviceUrl = this.baseUrl + 'logout';
        return this.requester.post(serviceUrl, this.headers.getHeaders(true));
    };

    User.prototype.getUserById = function getUserById(userId) {
        var serviceUrl = this.baseUrl + 'users/' + userId;
        return this.requester.get(serviceUrl, this.headers.getHeaders());
    };

    return {
        load: function (baseUrl, requester, headers) {
            return new User(baseUrl, requester, headers);
        }
    }
}());
