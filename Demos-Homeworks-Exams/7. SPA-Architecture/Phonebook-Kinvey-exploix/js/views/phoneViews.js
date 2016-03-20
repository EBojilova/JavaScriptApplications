var app = app || {};

app.phoneViews = (function () {
    function PhoneViews() {
        this.listPhones = {
            loadPhonesView: loadPhonesView
        };

        this.addPhone = {
            loadAddPhoneView: addPhoneView
        };

        this.editPhone = {
            loadEditPhoneView: editPhoneView
        };

        this.deletePhone = {
            loadDeletePhoneView: deletePhoneView
        }
    }

    function loadPhonesView(selector, data) {
        return $.get('templates/phonebook.html', function (template) {
            var compiledTemplate = Handlebars.compile(template);
            var outHtml = compiledTemplate({results:data});
            $(selector).html(outHtml);
        });
    }

    function addPhoneView(selector, controller) {
        return $.get('templates/add-phone.html', function (template) {
            var compiledTemplate = Handlebars.compile(template);
            var outHtml = compiledTemplate();
            $(selector).html(outHtml);
        }).then(function () {
            $('#addPhone').click(function () {
                var person = $('#personName').val();
                var number = $('#phoneNumber').val();
                return controller.addPhone(person, number);
            })
        }).done();
    }

    function editPhoneView(selector, controller, data) {
        return $.get('templates/edit-phone.html', function (template) {
            var compiledTemplate = Handlebars.compile(template);
            var outHtml = compiledTemplate(data);
            $(selector).html(outHtml);
        }).then(function () {
            $('#editPhone').click(function () {
                var person = $('#personName').val();
                var number = $('#phoneNumber').val();
                return controller.editPhone(data._id, person, number);
            })
        });
    }

    function deletePhoneView(selector, controller, data) {
        return $.get('templates/delete-phone.html', function (template) {
            var compiledTemplate = Handlebars.compile(template);
            var outHtml = compiledTemplate(data);
            $(selector).html(outHtml);
        }).then(function () {
            $('#deleteButton').click(function () {
                return controller.deletePhone(data._id);
            })
        });
    }

    return {
        load: function () {
            return new PhoneViews();
        }
    }
})();
