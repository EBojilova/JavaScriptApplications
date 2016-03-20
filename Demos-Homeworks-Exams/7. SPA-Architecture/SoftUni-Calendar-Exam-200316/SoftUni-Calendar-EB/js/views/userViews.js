var app = app || {};

app.userViews = (function () {
    function showHomePage(selector, data) {
        $.get('templates/welcome-user.html', function (templ) {
            // text or Mustache will escape special characters, i.e. <pesho>
            var outputHtml = Mustache.render(templ, data);
            $(selector).html(outputHtml);
        });
        $.get('templates/menu-home.html', function (templ) {
            $('#menu').html(templ);
        })
    }

    function showRegisterPage(selector, data) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $('#register-button').on('click', function (e) {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    confirmPassword = $('#confirm-password').val();
                if (password == confirmPassword) {
                    Sammy(function () {
                        //{"username":"user", "password":"pass"}
                        this.trigger('register', {username: username, password: password});
                    })
                }
                else {
                    Noty.error("The password and confirmation password should match!");
                }
            })
        })
    }

    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('#login-button').on('click', function () {
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