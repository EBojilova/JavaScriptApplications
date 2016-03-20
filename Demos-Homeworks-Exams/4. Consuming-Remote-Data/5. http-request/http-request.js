// Generated by CoffeeScript 1.7.1
(function () {
    this.httpRequest = (function () {
        var getHttpRequest, getJSON, makeRequest, postJSON;
        getHttpRequest = (function () {
            var xmlHttpFactories;
            xmlHttpFactories = [

                function () {
                    return new XMLHttpRequest ();
                },
                function () {
                    return new ActiveXObject ("Msxml3.XMLHTTP");
                },
                function () {
                    return new ActiveXObject ("Msxml2.XMLHTTP.6.0");
                },
                function () {
                    return new ActiveXObject ("Msxml2.XMLHTTP.3.0");
                },
                function () {
                    return new ActiveXObject ("Msxml2.XMLHTTP");
                },
                function () {
                    return new ActiveXObject ("Microsoft.XMLHTTP");
                }
            ];
            return function () {
                var xmlFactory, _i, _len;
                for (_i = 0, _len = xmlHttpFactories.length; _i < _len; _i++) {
                    xmlFactory = xmlHttpFactories[_i];
                    try {
                        return xmlFactory ();
                    }
                    catch (_error) {

                    }
                }
                return null;
            };
        }) ();
        makeRequest = function (options) {
            var httpRequest, requestUrl, type, success, error, contentType, accept, data;
            httpRequest = getHttpRequest ();
            options = options || {};
            //extract the values from the options and provide default values for the missing arguments
            requestUrl = options.url;
            type = options.type || 'GET';
            success = options.success || function () {
                };
            error = options.error || function () {
                };
            contentType = options.contentType || '';
            accept = options.accept || '';
            data = options.data || null;

            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === 4) {
                    switch (Math.floor (httpRequest.status / 100)) {
                        case 2:
                            success (httpRequest.responseText);
                            break;
                        default:
                            error (httpRequest.responseText);
                            break;
                    }
                }
            };
            httpRequest.open (type, requestUrl, true);
            httpRequest.setRequestHeader ('Authorization', 'Basic SGVsZW46MTIzNA==');
            httpRequest.setRequestHeader ('Content-Type', contentType);
            httpRequest.setRequestHeader ('Accept', accept);
            return httpRequest.send (data);
        };
        getJSON = function (url, success, error) {
            var options = {
                url        : url,
                type       : 'GET',
                contentType: 'application/json',
                accept     : 'application/json',
                success    : function (data) {
                    if (!success) {
                        return;
                    }
                    if (data) {
                        return success (JSON.parse (data));
                    }
                    else {
                        return success ();
                    }
                },
                error      : function (err) {
                    if (!error) {
                        return;
                    }
                    if (err) {
                        return error (JSON.parse (err));
                    }
                    else {
                        return error ();
                    }
                }
            };
            return makeRequest (options);
        };
        postJSON = function (url, data, success, error) {
            var options = {
                url        : url,
                type       : 'POST',
                contentType: 'application/json',
                accept     : 'application/json',
                data       : data,
                success    : function (data) {
                    if (!success) {
                        return;
                    }
                    if (data) {
                        return success (JSON.parse (data));
                    }
                    else {
                        return success ();
                    }
                },
                error      : function (err) {
                    if (!error) {
                        return;
                    }
                    if (err) {
                        return error (JSON.parse (err));
                    }
                    else {
                        return error ();
                    }
                }
            };
            return makeRequest (options);
        };
        return {
            make    : makeRequest,
            getJSON : getJSON,
            postJSON: postJSON
        };
    }) ();

}).call (this);

//# sourceMappingURL=http-request.map