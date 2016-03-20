var app = app || {};

app.data = (function () {
    var HEADERS = {
        'X-Parse-Application-Id': 'eFIZra4mi17YkmO6xt6GaDKAxXYNuD96ydWONcJJ',
        'X-Parse-REST-API-Key': 'XJvHHjuIdRweu7PPgm60DMIyQEqWYmKF2nv5F24T'
    };

    function Books(baseUrl, ajaxRequester) {
        this._serviceUrl = baseUrl + 'classes/Book/';
        this._ajaxRequester = ajaxRequester
    }

    Books.prototype.getAllBooks = function getAllBooks(success, error) {
        this._ajaxRequester.getRequest(this._serviceUrl, HEADERS, success, error);
    };

    Books.prototype.getBookById = function getBookById(objectId, success, error) {
        this._ajaxRequester.getRequest(this._serviceUrl + objectId, HEADERS, success, error);
    };

    Books.prototype.addBook = function addBook(data, success, error) {
        this._ajaxRequester.postRequest(this._serviceUrl, HEADERS, data, success, error);
    };

    Books.prototype.deleteBook = function deleteBook(objectId, success, error) {
        this._ajaxRequester.deleteRequest(this._serviceUrl + objectId, HEADERS, success, error);
    };

    Books.prototype.editBook = function editBook(objectId, data, success, error) {
        this._ajaxRequester.putRequest(this._serviceUrl + objectId, HEADERS, data, success, error);
    };

    return {
        get: function (baseUrl, ajaxRequester) {
            return new Books(baseUrl, ajaxRequester);
        }
    }
}());