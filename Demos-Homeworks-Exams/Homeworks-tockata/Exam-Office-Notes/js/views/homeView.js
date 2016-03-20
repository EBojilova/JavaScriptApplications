var app = app || {};

app.homeView = (function () {
    function HomeView(selector, user) {
        $.get('./templates/home.html', function (template) {
            var output = Mustache.render(template, user);
            $(selector).html(output);
        });
    }

    return {
        load: function (selector, user) {
            return HomeView(selector, user);
        }
    }
}());
