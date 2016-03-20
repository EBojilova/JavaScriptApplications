var app = app || {};

app.userViews = (function () {
    function UserViews() {
        this.loginView = {
            loadLoginView: loadLoginView
        };

        this.registerView = {
            loadRegisterView: loadRegisterView
        };

        this.editProfileView = {
            loadEditProfileView: loadEditProfileView
        };
    }

    function loadLoginView(selector, controller) {
        $.get('templates/login.html', function (template) {
            var compiledTemplate = Handlebars.compile(template);
            var outHtml = compiledTemplate();
            $(selector).html(outHtml);
        }).then(function () {
           $('#loginButton').click(function() {
               var username = $('#username').val();
               var password = $('#password').val();

               return controller.login(username, password);
            })
        });
    }

    function loadRegisterView(selector, controller) {
        return $.get('templates/register.html', function (template) {
            var compiledTemplate = Handlebars.compile(template);
            var outHtml = compiledTemplate();
            $(selector).html(outHtml);
        }).then(function () {
           $('#registerButton').click(function() {
               var username = $('#username').val();
               var password = $('#password').val();
               var fullname = $('#fullName').val();

               return controller.register(username, password, fullname);
            })
        });
    }

    function loadEditProfileView(selector, controller, data) {
        $.get('templates/edit-profile.html', function (template) {
            var compiledTemplate = Handlebars.compile(template);
            var outHtml = compiledTemplate(data);
            $(selector).html(outHtml);
        }).then(function () {
           $('#editProfileButton').click(function() {
               var username = $('#username').val();
               var password = $('#password').val();
               var fullname = $('#fullName').val();

               return controller.editProfile(username, password, fullname);
            })
        });
    }


    return {
        load: function () {
            return new UserViews();
        }
    }
})();
