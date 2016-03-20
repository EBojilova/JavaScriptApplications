var app = app || {};

app.homeViews = (function () {
    function HomeViews() {
        this.welcomeView = {
            loadWelcomeView: loadWelcomeView
        };
        this.homeView = {
            loadHomeView: loadHomeView
        };
    }

    function loadWelcomeView(selector) {
        $.get('templates/welcome.html', function (template) {
            var compiledTemplate = Handlebars.compile(template);
            var outHtml = compiledTemplate();
            $(selector).html(outHtml);
        })
    }

    function loadHomeView(selector, data) {
        $.get('templates/home.html', function (template) {
            var compiledTemplate = Handlebars.compile(template);
            var outHtml = compiledTemplate(data);
            $(selector).html(outHtml);
        })
    }

    return {
        load: function () {
            return new HomeViews();
        }
    }
})();