var app = app || {};

app.model = (function () {
    function Model(baseUrl, requester, headers){
        this.user = app.user.load(baseUrl, requester, headers);
        this.note = app.note.load(baseUrl, requester, headers);
    }

    return {
        load: function (baseUrl, requester, headers) {
            return new Model(baseUrl, requester, headers);
        }
    }
}());
