var app = app || {};

app.headers = (function () {
    function Headers(appKey) {
        this.appKey = appKey;
    }

    Headers.prototype.getHeaders = function (username, password) {
        var headers = {};
        if (sessionStorage['sessionToken']) {
            headers['Authorization'] = 'Kinvey ' + sessionStorage['sessionToken'];
        } else {
            if (username && password) {
                headers['Authorization'] = 'Basic ' + btoa(username + ":" + password);
            }
        }

        return headers;
    };

    Headers.prototype.getSecretOrMasterHeaders = function (secretOrMasterKey) {
        var headers = {};
        headers['Authorization'] = 'Basic ' + btoa(this.appKey + ":" + secretOrMasterKey);

        return headers;
    };

    //Headers.prototype.getMasterHeaders = function (masterKey) {
    //    var headers = {};
    //    headers['Authorization'] = 'Basic ' + btoa(this.appKey + ":" + masterKey);
    //
    //    return headers;
    //};

    return {
        load: function (appKey) {
            return new Headers(appKey);
        }
    }
}());