var app = app || {};

app.requester.config('kid_-1bf_DFMJb', 'aeec7da9b9bc46acb6b0dd48e0e6f59e');

var userRequester = new app.UserRequester();
var collectionRequester = new app.CollectionRequester();

// userRequester.signUp('dimo', 'padalski');
// userRequester.login('internetUser', '1234');
// userRequester.logout();

userRequester.login('dimo', 'padalski').then(function(success) {
	userRequester.getInfo();
	collectionRequester.getInfo('Books');

	// add new book
	$('#addBook').on('click', function() {
		var bookName = $('#book').val();
		if (bookName) {
			collectionRequester.add('Books', bookName).then(function() {
				collectionRequester.getInfo('Books');
			});
		}
	});

	// edit book
	$('#books').on('click', 'input[value="Edit"]', function(event) {
		var id = $(this).prevAll('input[type="text"]').attr('id');
		var value = $(event.target).prev('input[type="text"]').val();
		// console.log(id, value);
		if (id && value) {
			collectionRequester.edit('Books', value, id).then(function() {
				collectionRequester.getInfo('Books');
			});
		}
	});

	// delete book
	$('#books').on('click', 'input[value="Delete"]', function(event) {
		var id = $(this).prevAll('input[type="text"]').attr('id');
		if (id) {
			collectionRequester.delete('Books', id).then(function() {
				collectionRequester.getInfo('Books');
			});
		}
	});

	collectionRequester.getInfo('Tags');

	// edit tag
	$('#tags').on('click', 'input[value="Edit"]', function(event) {
		var id = $(this).prevAll('input[type="text"]').attr('id');
		var value = $(event.target).prev('input[type="text"]').val();
		// console.log(id, value);
		if (id && value) {
			collectionRequester.edit('Tags', value, id).then(function() {
				collectionRequester.getInfo('Tags');
			});
		}
	});

	// delete tag
	$('#tags').on('click', 'input[value="Delete"]', function(event) {
		var id = $(this).prevAll('input[type="text"]').attr('id');
		if (id) {
			collectionRequester.delete('Tags', id).then(function() {
				collectionRequester.getInfo('Tags');
			});
		}
	});

	// add new tag
	$('#addTag').on('click', function() {
		var tagName = $('#tag').val();
		var bookId = $(this).prev().val();
		if (tagName && bookId) {
			collectionRequester.add('Tags', tagName, bookId).then(function() {
				collectionRequester.getInfo('Tags');
			});
		}
	});

	// select all tag by a given book
	$('#books').on('click', 'a', function() {
		var id = $(this).prevAll('input[type="text"]').attr('id');
		var book = $(this).prevAll('input[type="text"]').val();
		if (id) {
			collectionRequester.connect('Tags', 'Books', id, book);
		}
	});
}, function(error) {
	console.error(error);
});