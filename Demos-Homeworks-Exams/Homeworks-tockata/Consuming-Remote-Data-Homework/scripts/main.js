var app = app || {};

(function () {
    var baseUrl = 'https://api.parse.com/1/',
        ajaxRequester = app.ajaxRequester.get(),
        data = app.data.get(baseUrl, ajaxRequester),
        controller = app.controller.get(data),
        selector = $('#books');

    controller.load(selector);
    controller.attachHandlers();
}());
