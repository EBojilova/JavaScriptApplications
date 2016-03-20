var app = app || {};

app.CollectionRequester = (function() {
	function CollectionRequester() {
		this.serviceUrl = app.requester.baseUrl + 'appdata/' + app.requester.appId;
	}

	CollectionRequester.prototype.getInfo = function(collection, select) {
		var requestUrl = this.serviceUrl + '/' + collection;

		app.requester.makeRequest('GET', requestUrl, null, true).then(function(success) {
			var result = success;
			// add to DOM:
			if (collection === 'Country') {
				for(var country in success) {
					if (!select) {
						$('#countries').append('<input type="text" id="' + success[country]._id + '" value="' + success[country].name + '"> <input type="submit" class="edit" value="Edit"> <input type="submit" class="delete" value="Delete"> <a href="#">List all towns from this country</a><br>');
					} else {
						$('#chooseCountry').append('<option value="' + success[country]._id + '"> ' + success[country].name + '</option>');
					}
				}	
			} else {
				for(var town in success) {
					$('#towns').append('<input type="text" id="' + success[town]._id + '" value="' + success[town].name + '"> <input type="submit" class="edit" value="Edit"> <input type="submit" class="delete" value="Delete"><br>');
				}
			}
			// console.log(success);
		}, function(error) {
			console.error(error);
		}).done();
	};

	CollectionRequester.prototype.add = function(collection, name, countryID) {
		var requestUrl = this.serviceUrl + '/' + collection;
		if (countryID) {
			var data = {
				name: name,
				country: {"_type":"KinveyRef","_id": countryID,"_collection":"Country"}
			};
		} else {
			var data = {
				name: name
			};
		}
		
		app.requester.makeRequest('POST', requestUrl, data, true).then(function(success) {
			// add to DOM:
			if (collection === 'Country') {
				$('#countries').append('<input type="text" id="' + success._id + '" value="' + success.name + '"> <input type="submit" class="edit" value="Edit"> <input type="submit" class="delete" value="Delete"> <a href="#">List all towns from this country</a><br>');
			} else {
				$('#towns').append('<input type="text" id="' + success._id + '" value="' + success.name + '"> <input type="submit" class="edit" value="Edit"> <input type="submit" class="delete" value="Delete"><br>');
			}
			// console.log(success);
		}, function(error) {
			console.error(error);
		}).done();
	};

	CollectionRequester.prototype.edit = function(collection, name, idToChange) {
		var requestUrl = this.serviceUrl + '/' + collection + '/' + idToChange;
		var data = {
			name: name
		};

		app.requester.makeRequest('PUT', requestUrl, data, true).then(function(success) {
			// console.log(success);
		}, function(error) {
			console.error(error);
		}).done();
	};

	CollectionRequester.prototype.delete = function(collection, idToChange) {
		var requestUrl = this.serviceUrl + '/' + collection + '/' + idToChange;

		app.requester.makeRequest('DELETE', requestUrl, null, true).then(function(success) {
			// console.log(success);
		}, function(error) {
			console.error(error);
		}).done();
	};

	CollectionRequester.prototype.connect = function(collection, collectionFrom, idToSearch, countryName) {
		var requestUrl = this.serviceUrl + '/' + collection + '?query={"country._id":"' + idToSearch + '"}&resove=' + collectionFrom;

		app.requester.makeRequest('GET', requestUrl, null, true).then(function(success) {
			$('#towns').empty();
			if (success[0]) {
				$('#towns').prev('h3').empty().append('<h3>List all town/s of ' + countryName + ':</h3>');
				for(var town in success) {
					$('#towns').append('<input type="text" id="' + success[town]._id + '" value="' + success[town].name + '"> <input type="submit" class="edit" value="Edit"> <input type="submit" class="delete" value="Delete"><br>');
				}
			} else {
				$('#towns').prev('h3').empty().append('<h3>List all towns of ' + countryName + ':</h3>');
				$('#towns').append('<h4>There are no towns added for that country. Add a new town for that country and try again.</h4>');
			}
		}, function(error) {
			console.error(error);
		}).done();
	};

	return CollectionRequester;
}());