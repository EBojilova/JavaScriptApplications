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
			var $bookmarksUl = $('#bookmarksView ul');
			$bookmarksUl.html('');
			for(var bk in success) {
				var bookmark = success[bk];
				var $bookmarkLi = $('<li>');
				$bookmarkLi.data('bookmark', bookmark);

				var $title = $('<div class="title">');
				$title.text(bookmark.title);
				$bookmarkLi.append($title);

				var $url = $('<a class="url" target="_blank">');
				$url.text(bookmark.url);
				$url.attr('href', bookmark.url);
				$bookmarkLi.append($url);

				var $deleteButton = $('<a href="#">Delete</a>');
				$deleteButton.attr('id', bookmark._id);
				$deleteButton.attr('class', 'delete');
				$deleteButton.click(function() {

				});
				$bookmarkLi.append($deleteButton);

				$bookmarksUl.append($bookmarkLi);

				$('#title').val('');
				$('#url').val('');

				$('#bookmarksView').show();
			}
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
		}).done();
	};

	CollectionRequester.prototype.add = function(collection, title, url) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/' + collection;
		var data = {
			title: title,
			url: 'http://' + url
		};
		
		app.requester.makeRequest('POST', requestUrl, data, true).then(function(success) {
			// add to DOM:
			defer.resolve();
			noty({
				text: 'Bookmark added successfully',
				type: 'info',
				layout: 'topCenter',
				timeout: 5000
			});
			// console.log(success);
		}, function(error) {
			var errorMsg = error.responseJSON.description;
			noty({
				text: errorMsg,
				type: 'error',
				layout: 'topCenter',
				timeout: 5000
			});
			defer.reject();
			console.error(error);
		}).done();

		return defer.promise;
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

	CollectionRequester.prototype.delete = function(collection, idToDelete) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/' + collection + '/' + idToDelete;

		app.requester.makeRequest('DELETE', requestUrl, null, true).then(function(success) {
			defer.resolve();
			noty({
				text: 'Bookmark deleted successfully',
				type: 'info',
				layout: 'topCenter',
				timeout: 5000
			});
			// console.log(success);
		}, function(error) {
			var errorMsg = error.responseJSON.description;
			noty({
				text: errorMsg,
				type: 'error',
				layout: 'topCenter',
				timeout: 5000
			});
			defer.reject();
			console.error(error);
		}).done();

		return defer.promise;
	};

	CollectionRequester.prototype.connect = function(collection, collectionFrom, idToSearch, bookName) {
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
		}, function(error) {
			console.error(error);
		}).done();
	};

	return CollectionRequester;
}());