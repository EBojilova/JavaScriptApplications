var app = app || {};

app.welcomeViews = (function () {
    function showWelcomePage(selector) {
        $.get('templates/welcome-guest.html', function (templ) {
            //$('#menu').hide();
            $(selector).html(templ);
        });
        $.get('templates/menu-login.html', function (templ) {
            $('#menu').html(templ);
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