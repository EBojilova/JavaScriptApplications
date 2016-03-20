var app = app || {};

app.UserRequester = (function() {
	function UserRequester() {
		this.serviceUrl = app.requester.baseUrl + 'user/' + app.requester.appId;
	}

	UserRequester.prototype.signUp = function(username, password, email) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl;
		var data = {
			username: username,
			password: password,
			email: email
		};
		app.requester.makeRequest('POST', requestUrl, data).then(function(success) {
			sessionStorage['sessionAuth'] = success._kmd.authtoken;
			sessionStorage['userId'] = success._id;
			defer.resolve();

			noty({
				text: 'Signup successful.',
				type: 'info',
				layout: 'topCenter',
				timeout: 5000
			});

		}, function(error) {
			var errorMsg = error.responseJSON.description;
			noty({
				text: errorMsg,
				type: 'error',
				layout: 'topCenter',
				timeout: 5000
			});
			console.error(error);
			defer.reject();
		}).done();

		return defer.promise;
	};

	UserRequester.prototype.login = function(username, password) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/login';
		var data = {
			username: username,
			password: password
		};
		app.requester.makeRequest('POST', requestUrl, data).then(function(success) {
			sessionStorage['sessionKey'] = btoa(username + ':' + password);
			sessionStorage['sessionAuth'] = success._kmd.authtoken;
			sessionStorage['userId'] = success._id;
			sessionStorage['username'] = success.username;
			defer.resolve();
			noty({
				text: 'Login as ' + username + ' (successful)',
				type: 'info',
				layout: 'topCenter',
				timeout: 5000
			});
			// add business logic

			// console.log(success);
		}, function(error) {
			var errorMsg = error.responseJSON.description;
			noty({
				text: errorMsg,
				type: 'error',
				layout: 'topCenter',
				timeout: 5000
			});
			console.error(error);
			defer.reject();
		}).done();

		return defer.promise;
	};

	UserRequester.prototype.getInfo = function() {
		var requestUrl = this.serviceUrl + '/_me';

		app.requester.makeRequest('GET', requestUrl, null, true).then(function(success) {
			// attach result to DOM
			// $('#display').text(success.username);
			// console.log(success);
		}, function(error) {
			console.error(error);
		}).done();
	};

	UserRequester.prototype.logout = function() {
		var requestUrl = this.serviceUrl + '/_logout';

		app.requester.makeRequest('POST', requestUrl, null, true).then(function(success) {
			sessionStorage.clear();
			$('header span').text('');
			$('header a').hide();

			// console.log(success);
		}, function(error) {
			console.error(error);
		}).done();
	};

	return UserRequester;
}());