var app = app || {};

app.ajaxRequester = (function () {
    function AjaxRequester () {
    }

    AjaxRequester.prototype.get = function (url, headers) {
        return makeRequest('GET', headers, url);
    };

    AjaxRequester.prototype.post = function (url, headers, data) {
        return makeRequest('POST', headers, url, data);
    };

    AjaxRequester.prototype.put = function (url, headers, data) {
        return makeRequest('PUT', headers, url, data);
    };

    AjaxRequester.prototype.delete = function (url, headers) {
        return makeRequest('DELETE', headers, url);
    };

    function makeRequest(method, headers, url, data) {
        var defer = Q.defer();

        $.ajax({
            method: method,
            headers: headers,
            url: url,
            data: JSON.stringify(data),
            success: function (data) {
                defer.resolve(data);
            },
            error: function (error) {
                defer.reject(error);
            }
        });

        return defer.promise;
    }

    return {
        load: function () {
            return new AjaxRequester();
        }
    }
}());
