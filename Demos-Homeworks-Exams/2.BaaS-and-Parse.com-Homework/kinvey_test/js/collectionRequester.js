var app = app || {};

app.CollectionRequester = (function () {
    function CollectionRequester(collectionName) {
        this.serviceUrl = app.requester.baseUrl + 'appdata/' + app.requester.appId + '/' + collectionName;
    }


    CollectionRequester.prototype.add = function (itemName) {
        var data = {
            name: itemName
        };
        app.requester.makeRequest('POST', this.serviceUrl, data, true).then(function (success) {
            sessionStorage[itemName] = success._id;
        }, function (error) {
            console.error(error);
        }).done()
    };

    CollectionRequester.prototype.delete = function (itemName) {
        var url = this.serviceUrl + '/' + sessionStorage[itemName];
        app.requester.makeRequest('DELETE', url, {}, true);
    };

    return CollectionRequester;
}());