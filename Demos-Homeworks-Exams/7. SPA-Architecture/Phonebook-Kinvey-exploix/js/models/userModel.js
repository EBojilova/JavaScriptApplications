var app = app || {};

app.userModel = (function (){
    function UserModel(baseUrl, apiKey, requester, headers){
        this.serviceUrl = baseUrl + 'user/' + apiKey + '/';
        this.apiKey = apiKey;
        this.requester = requester;
        this.headers = headers;
    }

    UserModel.prototype.login = function login(username, password){
        var headers = this.headers.getHeaders(username, password);
        headers['Content-Type'] = 'application/json';

        var defer = Q.defer();

        this.requester.post(this.serviceUrl + 'login', headers, {username:username, password:password})
            .then(function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    UserModel.prototype.register = function register(username, password, fullName){

        var headers = this.headers.getSecretOrMasterHeaders('4a75778f2e10449dbe94b5b4faaf5d0b');
        headers['Content-Type'] = 'application/json';

        var defer = Q.defer();
        var newUser = {
            username: username,
            password: password,
            fullName: fullName
        };

        this.requester.post(this.serviceUrl, headers, newUser)
            .then(function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    UserModel.prototype.logout = function logout(){
        var headers = this.headers.getHeaders();
        var defer = Q.defer();

        this.requester.post(this.serviceUrl + '_logout', headers)
            .then(function (data) {
                sessionStorage.clear();
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    UserModel.prototype.editProfile = function editProfile(userId, username, password, fullName){
        var headers = this.headers.getHeaders();
        headers['Content-Type'] = 'application/json';

        var defer = Q.defer();

        var edittedUser = {
            _id: sessionStorage.getItem('userId'),
            username: username,
            password: password,
            fullName: fullName
        };
        this.requester.put(this.serviceUrl + userId, headers, edittedUser)
            .then(function (data) {
                defer.resolve(data);
            }, function(error){
                defer.reject(error);
            });

        return defer.promise;
    };

    return {
        load: function (baseUrl, apiKey, requester, headers) {
            return new UserModel(baseUrl, apiKey, requester, headers);
        }
    }
})();