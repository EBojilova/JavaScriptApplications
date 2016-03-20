// Generated by CoffeeScript 1.7.1
(function () {
    var error, getHttpRequest, httpRequest, resourceUrl, success;

    resourceUrl = 'https://baas.kinvey.com/appdata/kid_WkwKuJux1W/questions';

    getHttpRequest = (function () {
        var xmlHttpFactories;
        xmlHttpFactories = [
            function () {
                return new XMLHttpRequest ();
            }, function () {
                return new ActiveXObject ("Msxml3.XMLHTTP");
            }, function () {
                return new ActiveXObject ("Msxml2.XMLHTTP.6.0");
            }, function () {
                return new ActiveXObject ("Msxml2.XMLHTTP.3.0");
            }, function () {
                return new ActiveXObject ("Msxml2.XMLHTTP");
            }, function () {
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

    httpRequest = getHttpRequest ();

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            switch (Math.floor (httpRequest.status / 100)) {
                case 2:
                    success (JSON.parse (httpRequest.responseText));
                    break;
                default:
                    error (httpRequest.responseText);
            }
        }
    };

    httpRequest.open ('GET', resourceUrl, true);
    httpRequest.setRequestHeader ('Authorization', 'Basic SGVsZW46MTIzNA==');
    httpRequest.setRequestHeader ('Content-type', 'application/json');
    httpRequest.setRequestHeader ('Accept', 'application/json');
    httpRequest.send (null);

    success = function (response) {
        var list, question, questions, _i, _len, _ref;
        console.log (response)
        questions = response[0].results;
        console.log (questions)
        list = '<ul>';
        if ((questions != null) && questions.length !== 0) {
            _ref = response[0].results;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                question = _ref[_i];
                list += "<li>" + question.questionText + " created on " + question.updatedAt + "</li>";
            }
            list += '</ul>';
            document.getElementById ('http-response').innerHTML = list;
        }
        else {
            document.getElementById ('http-response').innerHTML = 'No students available';
        }
    };

    error = function (err) {
        document.getElementById ("http-response").innerHTML = "<div><h1 style='color:#f00'>Error happened</h1>" + err + "</div>";
    };

}).call (this);

//# sourceMappingURL=response-json.map