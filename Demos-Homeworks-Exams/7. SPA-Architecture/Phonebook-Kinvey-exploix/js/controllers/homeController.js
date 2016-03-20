var app = app || {};

app.homeController = (function (){
    function HomeController(views){
        this.viewBag = views;

    }

    HomeController.prototype.welcomeScreen = function(selector){
        this.viewBag.welcomeView.loadWelcomeView(selector);
    };

    HomeController.prototype.homeScreen = function(selector){
        var data = {
          username: sessionStorage.getItem('username'),
          fullName: sessionStorage.getItem('fullName')
        };

        this.viewBag.homeView.loadHomeView(selector, data);
    };

    return {
        load: function (views) {
            return new HomeController(views);
        }
    };
})();