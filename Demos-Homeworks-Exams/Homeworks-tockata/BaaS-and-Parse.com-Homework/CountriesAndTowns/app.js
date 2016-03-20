$(document).ready(function () {
    var PARSE_APP_ID = "cKwGmursO5pnKNxiESd6m02KfE10dy22AFhNKZ6i";
    var PARSE_REST_API_KEY = "ytamGfiCpLTFY3MXHYo5BLC8R9Xx81Mj7FPYQkp3";

    $('h2').click(getCountries);

    getCountries();

    function getCountries() {
        $('li').remove();
        $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: "https://api.parse.com/1/classes/Country/",
            success: loadCountries,
            error: function () {
                showError('Error with getting countries!');
            }
        });
    }

    function loadCountries(data) {
        for (var c in data.results) {
            var country = data.results[c];
            var countryItem = $('<li>');
            var countryLink = $('<a href="#">').text(country.name);
            $(countryLink).data('country', country);
            $(countryLink).click(getTowns);
            countryItem.append(countryLink);

            var buttonContainer = $('<div class="button-container">');

            var btnEdit = $('<button class="country">Edit</button>').data('country', country);
            btnEdit.appendTo(buttonContainer);
            btnEdit.click(editCountry);

            var btnDelete = $('<button class="country">Delete</button>').data('country', country);
            btnDelete.appendTo(buttonContainer);
            btnDelete.click(deleteCountry);

            countryItem.append(buttonContainer);
            countryItem.appendTo($("#countries"));
        }
    }

    function editCountry() {
        if (!$('#edit-country').length) {
            var country = $(this).data('country');
            var inputField = $('<input type="text" placeholder="New name...">');
            inputField.attr('id', 'edit-country');
            var btn = $('<button class="confirm">Confirm</button>').data('country', country);
            inputField.appendTo($(this).parent());
            btn.appendTo($(this).parent());
            btn.click(saveCountryChanges);
        }
    }

    function saveCountryChanges() {
        var country = $(this).data('country');
        var newName = $(this).prev().val();

        if (validateEmptyString(newName)) {
            $.ajax({
                method: "PUT",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Country/' +
                    country.objectId,
                data: JSON.stringify(
                    { "name": newName }
                ),
                contentType: "application/json",
                success: getCountries,
                error: function () {
                    showError('Error with changing country name!');
                }
            });
        }
    }

    function deleteCountry() {
        var country = $(this).data('country');
        $.ajax({
            method: "DELETE",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Country/' +
                country.objectId,
            success: getCountries,
            error: function () {
                showError('Error with deleting country!');
            }
        });

        deleteCountryTowns(country.objectId);
    }

    function deleteCountryTowns(countryId) {
        $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town?where={"country":{"__type":"Pointer","className":"Country","objectId":"' + countryId + '"}}',
            success: deleteTowns,
            error: function () {
                showError('Error with getting towns for deletion!');
            }
        });
    }

    function deleteTowns(data) {
        var towns = data.results;
        towns.forEach(function (town) {
            $.ajax({
                method: "DELETE",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Town/' +
                    town.objectId,
                error: function () {
                    showError('Error with deleting towns in this country!');
                }
            });
        });
    }

    $('#add-country').on('click', function () {
        addCountry();
    });

    function addCountry() {
        var name = $('#country-name').val();

        if (validateEmptyString(name)) {
            $.ajax({
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Country/',
                data: JSON.stringify(
                    { "name": name }
                ),
                contentType: "application/json",
                success: getCountries,
                error: function () {
                    showError('Error with adding new country!');
                }
            });

            $('#country-name').val('');
        }
    }

    function getTowns() {
        var country = $(this).data('country');
        $('#towns').remove();
        $(this).parent().append('<ul id="towns">');
        $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town?where={"country":{"__type":"Pointer","className":"Country","objectId":"' + country.objectId + '"}}',
            success: loadTowns,
            error: function () {
                showError('Error with loading towns!');
            }
        });
    }

    function loadTowns(data) {
        $('#towns').append('<h3>Towns:</h3>');
        data.results.forEach(function (town) {
            var townLi = $('<li>').text(town.name);
            $('#towns').append(townLi);

            var buttonContainer = $('<div class="button-container">');

            var btnEdit = $('<button class="town">Edit</button>').data('town', town);
            btnEdit.appendTo(buttonContainer);
            btnEdit.click(editTown);

            var btnDelete = $('<button class="town">Delete</button>').data('town', town);
            btnDelete.appendTo(buttonContainer);
            btnDelete.click(deleteTown);

            buttonContainer.appendTo(townLi);
        });

        var newTownNameInput = $('<input>').attr('type', 'text').attr('id', 'new-town');
        var addTownButton = $('<button class="town">Add town</button>');
        addTownButton.click(addTown);

        $('#towns').append(newTownNameInput);
        $('#towns').append(addTownButton);
        addTownButton.data('countryId', ($(addTownButton).parent().parent().find('a')).data('country').objectId);
    }

    function editTown() {
        if (!$('#edit-town').length) {
            var town = $(this).data('town');
            var inputField = $('<input type="text" placeholder="New name...">');
            inputField.attr('id', 'edit-town');
            var btn = $('<button class="confirm">Confirm</button>').data('town', town);
            inputField.appendTo($(this).parent());
            btn.appendTo($(this).parent());
            btn.click(saveTownChanges);
        }
    }

    function saveTownChanges() {
        var town = $(this).data('town');
        var newName = $(this).prev().val();

        if (validateEmptyString(newName)) {
            $.ajax({
                method: "PUT",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Town/' +
                    town.objectId,
                data: JSON.stringify(
                    { "name": newName }
                ),
                contentType: "application/json",
                success: getCountries,
                error: function () {
                    showError('Error with changeing town name!');
                }
            });
        }
    }

    function deleteTown() {
        var town = $(this).data('town');
        $.ajax({
            method: "DELETE",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town/' +
                town.objectId,
            success: getCountries,
            error: function () {
                showError('Error with deleting town!');
            }
        });
    }

    function addTown() {
        var countryId = $(this).data('countryId');
        var newTownName = $(this).prev().val();

        if (validateEmptyString(newTownName)) {
            $.ajax({
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Town/',
                data: JSON.stringify(
                    {
                        "name": newTownName,
                        "country": { "__type": "Pointer", "className": "Country", "objectId": countryId }
                    }
                ),
                contentType: "application/json",
                success: getCountries,
                error: function () {
                    showError('Error with adding new town!');
                }
            });
        }
    }

    function validateEmptyString(value) {
        if (!value) {
            showError('Name cannot be empty!');
            return false;
        }

        return true;
    }

    function showError(message) {
        noty({
            text: message,
            type: 'error',
            layout: 'topCenter',
            timeout: 5000
        });
    }
});