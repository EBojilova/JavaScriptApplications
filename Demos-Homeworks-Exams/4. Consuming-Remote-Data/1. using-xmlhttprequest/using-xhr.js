(function () {
	'use strict';
	function sendRequest(method, url,data, isAsync) {
		var httpRequest = new XMLHttpRequest(),
			isAsync = isAsync || false;
		
		httpRequest.open(method, url, isAsync);
		httpRequest.setRequestHeader('Authorization', 'Basic SGVsZW46MTIzNA==');
		httpRequest.send(data);
	}
	
	window.sendRequest = sendRequest;
}());