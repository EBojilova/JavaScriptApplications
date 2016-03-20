var app = app || {};

app.ajaxRequester = (function () {
    function AjaxRequester () {
    }

    AjaxRequester.prototype.getRequest =
        function (url, headers) {
            return makeRequest(url, 'GET', headers, null);
        };

    AjaxRequester.prototype.postRequest =
        function (url, headers, data) {
            return makeRequest(url, 'POST', headers, data);
        };

    AjaxRequester.prototype.putRequest =
        function (url, headers, data) {
            return makeRequest(url, 'PUT', headers, data);
        };

    AjaxRequester.prototype.deleteRequest =
        function (url, headers) {
            return makeRequest(url, 'DELETE', headers, null);
        };

        function makeRequest (url, method, headers, data) {
        var deferred = Q.defer();

            $.ajax({
                url: url,
                method: method,
                headers: headers,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data) {
                    deferred.resolve(data);
                },
                error:  function (error) {
                    deferred.reject(error);
                }
            });

            return deferred.promise;
    }

    return {
        get: function () {
            return new AjaxRequester();
        }
    };
}());
