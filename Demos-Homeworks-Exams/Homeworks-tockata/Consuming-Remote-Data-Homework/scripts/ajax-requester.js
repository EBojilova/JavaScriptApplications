var app = app || {};

app.ajaxRequester = (function () {
    function AjaxRequester () {
    }

    AjaxRequester.prototype.makeRequest =
        function (url, method, headers, data, success, error) {
            $.ajax({
                url: url,
                method: method,
                headers: headers,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: success,
                error: error
            });
    };

    AjaxRequester.prototype.getRequest =
        function (url, headers, success, error) {
            this.makeRequest(url, 'GET', headers, null, success, error);
        };

    AjaxRequester.prototype.postRequest =
        function (url, headers, data, success, error) {
            this.makeRequest(url, 'POST', headers, data, success, error);
        };

    AjaxRequester.prototype.putRequest =
        function (url, headers, data, success, error) {
            this.makeRequest(url, 'PUT', headers, data, success, error);
        };

    AjaxRequester.prototype.deleteRequest =
        function (url, headers, success, error) {
            this.makeRequest(url, 'DELETE', headers, null, success, error);
        };

    return {
        get: function () {
            return new AjaxRequester();
        }
    };
}());
