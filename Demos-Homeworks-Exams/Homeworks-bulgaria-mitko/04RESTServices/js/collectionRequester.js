var app = app || {};

app.CollectionRequester = (function() {
	function CollectionRequester() {
		this.serviceUrl = app.requester.baseUrl + 'appdata/' + app.requester.appId;
	}

	CollectionRequester.prototype.getInfo = function(collection) {
		var requestUrl = this.serviceUrl + '/' + collection;

		app.requester.makeRequest('GET', requestUrl, null, true).then(function(success) {
			// add to DOM:
			if (collection === 'Books') {
					// delete elements
					$('#books').empty();
					$('#book').val('');
					$('#chooseBook').empty();
					// put new elements
					for(var book in success) {
						$('#books').append('<input type="text" id="' + success[book]._id + '" value="' + success[book].name + '"> <input type="submit" class="edit" value="Edit"> <input type="submit" class="delete" value="Delete"> <a href="#">List all tags for this book</a><br>');
						$('#chooseBook').append('<option value="' + success[book]._id + '"> ' + success[book].name + '</option>');
					}	
			} else {
				$('#tags').empty();
				$('#tag').val('');
				for(var tag in success) {
					$('#tags').append('<input type="text" id="' + success[tag]._id + '" value="' + success[tag].name + '"> <input type="submit" class="edit" value="Edit"> <input type="submit" class="delete" value="Delete"><br>');
				}
			}
			// console.log(success);
		}, function(error) {
			console.error(error);
		}).done();
	};

	CollectionRequester.prototype.add = function(collection, name, bookID) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/' + collection;
		if (bookID) {
			var data = {
				name: name,
				book: {"_type":"KinveyRef","_id": bookID,"_collection":"Books"}
			};
		} else {
			var data = {
				name: name
			};
		}
		
		app.requester.makeRequest('POST', requestUrl, data, true).then(function(success) {
			// add to DOM:

			defer.resolve();
			noty({
				text: name + ' was added successful.',
				type: 'info',
				layout: 'topCenter',
				timeout: 5000
			});
		}, function(error) {
			console.error(error);
			defer.reject();
		}).done();

		return defer.promise;
	};

	CollectionRequester.prototype.edit = function(collection, name, idToChange) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/' + collection + '/' + idToChange;
		var data = {
			name: name
		};

		app.requester.makeRequest('PUT', requestUrl, data, true).then(function(success) {
			// console.log(success);
			defer.resolve();
			noty({
				text: 'Cong! The name from now on will be ' + name,
				type: 'info',
				layout: 'topCenter',
				timeout: 5000
			});
		}, function(error) {
			console.error(error);
			defer.reject();
		}).done();

		return defer.promise;
	};

	CollectionRequester.prototype.delete = function(collection, idToChange) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/' + collection + '/' + idToChange;

		noty({
				text: 'Do you really want to delete it?',
				type: 'confirm',
				layout: 'topCenter',
				buttons: [
					{text: "Yes",
						onClick: function($noty) {
							app.requester.makeRequest('DELETE', requestUrl, null, true).then(function(success) {
								// console.log(success);
								defer.resolve();
								
							}, function(error) {
								console.error(error);
								defer.reject();
							}).done();
							$noty.close();
						}
					},
					{text: "No", 
						onClick: function($noty) {
							$noty.close();
						}
					}
				]
			});

		

		return defer.promise;
	};

	CollectionRequester.prototype.connect = function(collection, collectionFrom, idToSearch, bookName) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/' + collection + '?query={"book._id":"' + idToSearch + '"}&resove=' + collectionFrom;

		app.requester.makeRequest('GET', requestUrl, null, true).then(function(success) {
			$('#tags').empty();
			if (success[0]) {
				$('#tags').prev('h3').empty().append('<h3>List all tag/s of ' + bookName + ':</h3>');
				for(var tag in success) {
					$('#tags').append('<input type="text" id="' + success[tag]._id + '" value="' + success[tag].name + '"> <input type="submit" class="edit" value="Edit"> <input type="submit" class="delete" value="Delete"><br>');
				}
			} else {
				$('#tags').prev('h3').empty().append('<h3>List all tags of ' + bookName + ':</h3>');
				$('#tags').append('<h4>There are no tags added for that book. Add a new tag for that book and try again.</h4>');
			}
			defer.resolve();
			noty({
				text: 'Here is a list of all tags for the book' + bookName,
				type: 'info',
				layout: 'topCenter',
				timeout: 5000
			});
		}, function(error) {
			console.error(error);
			defer.reject();
		}).done();

		return defer.promise;
	};

	return CollectionRequester;
}());