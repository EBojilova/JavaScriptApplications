var app = app || {};

app.userModel = (function () {
    function UserModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl + 'user/' + this.requester.appId +'/';
    }

    UserModel.prototype.register = function (data) {
        var requestUrl = this.serviceUrl;
        return this.requester.post(requestUrl, data);
    };

    // podavame ot userControler
    // {username: username, password: password}
    UserModel.prototype.login = function (data) {
        var requestUrl = this.serviceUrl + 'login';
        return this.requester.post(requestUrl, data)
    };

    UserModel.prototype.logout = function () {
        var requestUrl = this.serviceUrl + '_logout';
        return this.requester.post(requestUrl, null, true);
    };

    // TODO:
    UserModel.prototype.editProfile = function (data) {
        var requestUrl = this.serviceUrl + sessionStorage['userId'];
        return this.requester.put(requestUrl, data, true);
    };

    UserModel.prototype.deleteProfile = function () {
        var requestUrl = this.serviceUrl + sessionStorage['userId']+ '/?hard=true';
        return this.requester.delete(requestUrl,  true);
    };

    UserModel.prototype.getUserData = function () {
        var requestUrl = this.serviceUrl + sessionStorage['userId'];
        return this.requester.get(requestUrl,  true);
    };

    UserModel.prototype.getUserDataById = function (userId) {
        var requestUrl = this.serviceUrl + userId;
        return this.requester.get(requestUrl,  true);
    };

    return {
        load: function(requester) {
            return new UserModel(requester);
        }
    };
}());