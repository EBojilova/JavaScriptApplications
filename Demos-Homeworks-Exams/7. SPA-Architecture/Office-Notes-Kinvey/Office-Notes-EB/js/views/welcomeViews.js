var app = app || {};

app.welcomeViews = (function () {
    function showWelcomePage(selector) {
        $.get('templates/welcome.html', function (templ) {
            $('#menu').hide();
            $(selector).html(templ);

        })
    }

    return {
        load: function () {
            return {
                showWelcomePage: showWelcomePage
            }
        }
    }
}());