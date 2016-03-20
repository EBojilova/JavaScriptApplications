var app = app || {};

app.data = (function () {
    var HEADERS = {
        'X-Parse-Application-Id': 'eFIZra4mi17YkmO6xt6GaDKAxXYNuD96ydWONcJJ',
        'X-Parse-REST-API-Key': 'XJvHHjuIdRweu7PPgm60DMIyQEqWYmKF2nv5F24T'
    };

    function Books(baseUrl, ajaxRequester) {
        this._serviceUrl = baseUrl + 'classes/Book/';
        this._ajaxRequester = ajaxRequester;
    }

    Books.prototype.getAllBooks = function getAllBooks() {
        return this._ajaxRequester.getRequest(this._serviceUrl, HEADERS);
    };

    Books.prototype.getBookById = function getBookById(objectId) {
        return this._ajaxRequester.getRequest(this._serviceUrl + objectId, HEADERS);
    };

    Books.prototype.addBook = function addBook(data) {
        return this._ajaxRequester.postRequest(this._serviceUrl, HEADERS, data);
    };

    Books.prototype.deleteBook = function deleteBook(objectId) {
        return this._ajaxRequester.deleteRequest(this._serviceUrl + objectId, HEADERS);
    };

    Books.prototype.editBook = function editBook(objectId, data) {
        return this._ajaxRequester.putRequest(this._serviceUrl + objectId, HEADERS, data);
    };

    return {
        get: function (baseUrl, ajaxRequester) {
            return new Books(baseUrl, ajaxRequester);
        }
    };
}());
