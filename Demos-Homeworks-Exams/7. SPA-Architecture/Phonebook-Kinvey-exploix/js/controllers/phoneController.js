var app = app || {};
app.phoneController = (function () {
    function PhoneController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    PhoneController.prototype.loadAddPhoneView = function loadAddPhoneView(selector) {
        return this.viewBag.addPhone.loadAddPhoneView(selector, this);
    };

    PhoneController.prototype.loadPhoneView = function loadAddPhone(selector, urlParams, action) {
        var data = urlParams.split('&');
        var outData = {
            _id: data[0].split('id=')[1],
            name: data[1].split('person=')[1],
            phoneNumber: data[2].split('number=')[1]
        };

        if (action === 'delete') {
            this.viewBag.deletePhone.loadDeletePhoneView(selector, this, outData);
        } else {
            this.viewBag.editPhone.loadEditPhoneView(selector, this, outData);
        }
    };

    PhoneController.prototype.listAllPhones = function listAllPhones(selector) {
        var _this = this;
        var userId = sessionStorage.getItem('userId');
        return this.model.listAllPhones()
            .then(function (data) {
                data = data.filter(function (item) {
                    if (item.user._obj._id === userId) {
                        return true;
                    }
                    return false;
                });
                return _this.viewBag.listPhones.loadPhonesView(selector, data);
            })
            .catch(function (error) {
                var errMsg = error.responseJSON.error;
                noty({
                        text: 'Cannot Get ALL Phones: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 5000
                    }
                );
            })
    };

    PhoneController.prototype.addPhone = function addPhone(person, number) {
        var _this = this;
        return this.model.addPhone(person, number)
            .then(function () {
                window.location.replace('#/phones/');
                noty({
                        text: 'Phone Added Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 1000
                    }
                );
            }, function (error) {
                var errMsg = error.responseJSON.error;
                noty({
                        text: 'Cannot Add Phone: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 5000
                    }
                );
            });
    };

    PhoneController.prototype.deletePhone = function deletePhone(phoneId) {
        return this.model.deletePhone(phoneId)
            .then(function () {
                window.location.replace('#/phones/');
                noty({
                        text: 'Phone Deleted Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 1000
                    }
                );
            }, function (error) {
                var errMsg = error.responseJSON.error;
                noty({
                        text: 'Cannot Delete Phone: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 5000
                    }
                );
            });
    };

    PhoneController.prototype.editPhone = function editPhone(phoneId, person, number) {
        return this.model.editPhone(phoneId, person, number)
            .then(function () {
                window.location.replace('#/phones/');
                noty({
                        text: 'Phone Editted Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 1000
                    }
                );
            }, function (error) {
                var errMsg = error.responseJSON.error;
                noty({
                        text: 'Cannot Edit Phone: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 5000
                    }
                );
            });
    };

    return {
        load: function (model, views) {
            return new PhoneController(model, views);
        }
    }
})();