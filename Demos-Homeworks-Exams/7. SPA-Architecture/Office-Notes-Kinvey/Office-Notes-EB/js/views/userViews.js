var app = app || {};

app.userViews = (function () {
    function showHomePage(selector, data) {
        $.get('templates/home.html', function (templ) {
            var outputHtml = Mustache.render(templ, data);
            $('#menu').show();
            // text or Mustache will escape special characters, i.e. <pesho>
            $('#welcomeName').text(sessionStorage['username']);
            $(selector).html(outputHtml);
        })
    }

    function showRegisterPage(selector, data) {
        $.get('templates/register.html', function (templ) {
            var outputHtml = Mustache.render(templ, data);
            $(selector).html(outputHtml);
            $('#menu').hide();
            $('#registerButton').on('click', function (e) {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    fullName = $('#fullName').val();

                Sammy(function () {
                    //{"username":"user", "password":"pass", "fullName":"Pesho"}
                    this.trigger('register', {username: username, password: password, fullName: fullName});
                })
            })
        })
    }

    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('#menu').hide();
            $('#loginButton').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val();
                $.sammy(function () {
                    this.trigger('login', {username: username, password: password});
                });
            })
        })
    }

    return {
        load: function () {
            return {
                showHomePage: showHomePage,
                showRegisterPage: showRegisterPage,
                showLoginPage: showLoginPage
            }
        }
    }
}());