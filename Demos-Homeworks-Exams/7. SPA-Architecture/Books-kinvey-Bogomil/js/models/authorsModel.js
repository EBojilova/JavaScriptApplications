var app = app || {};

app.authorsModel = (function () {
    function AuthorsModel(requester) {
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/authors';
    }

    AuthorsModel.prototype.getAuthorsByBookId = function(bookId) {
        var endpointUrl = this.serviceUrl + '?query={"book._id":"'+bookId +'"}';
        return this._requester.get(endpointUrl, true);
    };

    AuthorsModel.prototype.getAllAuthors = function () {
        return this._requester.get(this.serviceUrl, true);
    };

    AuthorsModel.prototype.addNewAuthor = function(data) {
        return this._requester.post(this.serviceUrl, data, true);
    };

    return {
        load: function (requester) {
            return new AuthorsModel(requester);
        }
    }
}());