var app = app || {};

app.welcomeController = (function() {
    function WelcomeController(viewBag) {
        this._viewBag = viewBag;
    }

    WelcomeController.prototype.loadWelcomePage = function(selector) {
        this._viewBag.showWelcomePage(selector);
    };

    return {
        load: function (viewBag) {
            return new WelcomeController(viewBag);
        }
    }
}());