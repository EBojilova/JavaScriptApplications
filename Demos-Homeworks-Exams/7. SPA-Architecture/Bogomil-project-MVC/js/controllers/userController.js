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

    UserController.prototype.loadLoginPage = function(selector) {
        this._viewBag.showLoginPage(selector)
    };

    UserController.prototype.login = function(data) {
        // podavame ot userView
        // {username: username, password: password}
        var userOutputModel = {
            username: data.username,
            password: data.password
        };

        this._model.login(userOutputModel)
            .then(function (success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                // bindnato e v api.js
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/questions'});
                })
            }).done()
    };

    UserController.prototype.logout = function() {
        return this._model.logout()
            .then(function() {
                sessionStorage.clear();
            })
    };

    return {
        load: function (model, viewBag) {
            return new UserController(model, viewBag)
        }
    }
}());