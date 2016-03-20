var app = app || {};

app.requester.config('kid_bJpZVghTAg', '511c69cfe3a141c2839e0c8cce6c5dc6');

var userRequester = new app.UserRequester();
var collectionRequester = new app.CollectionRequester();

// userRequester.signUp('dimo', 'padalski');
// userRequester.login('internetUser', '1234');
// userRequester.logout();

userRequester.login('dimo', 'padalski').then(function(success) {
	userRequester.getInfo();
	collectionRequester.getInfo('Country');
	// collectionRequester.add('Country', 'Kosovo');

	// add new country
	$('#addCountry').on('click', function() {
		var countryName = $('#country').val();
		if (countryName) {
			collectionRequester.add('Country', $('#country').val());
		}
	});

	// edit country
	$('#countries').on('click', 'input[value="Edit"]', function(event) {
		var id = $(this).prevAll('input[type="text"]').attr('id');
		var value = $(event.target).prev('input[type="text"]').val();
		// console.log(id, value);
		if (id && value) {
			collectionRequester.edit('Country', value, id);
		}
	});

	// delete country
	$('#countries').on('click', 'input[value="Delete"]', function(event) {
		var id = $(this).prevAll('input[type="text"]').attr('id');
		if (id) {
			collectionRequester.delete('Country', id);
		}
		// delete elements
		$(event.target).prev().prev().hide();
		$(event.target).prev().hide();
		$(this).hide();
		$(event.target).next().hide();
	});

	collectionRequester.getInfo('Town');
	collectionRequester.getInfo('Country', true);

	// edit town
	$('#towns').on('click', 'input[value="Edit"]', function(event) {
		var id = $(this).prevAll('input[type="text"]').attr('id');
		var value = $(event.target).prev('input[type="text"]').val();
		// console.log(id, value);
		if (id && value) {
			collectionRequester.edit('Town', value, id);
		}
	});

	// delete town
	$('#towns').on('click', 'input[value="Delete"]', function(event) {
		var id = $(this).prevAll('input[type="text"]').attr('id');
		if (id) {
			collectionRequester.delete('Town', id);
		}

		// delete elements
		$(event.target).prev().prev().hide();
		$(event.target).prev().hide();
		$(this).hide();
	});

	// add new town
	$('#addTown').on('click', function() {
		var townName = $('#town').val();
		var countryId = $(this).prev().val();
		if (townName && countryId) {
			collectionRequester.add('Town', townName, countryId);
		}
	});

	// select all town by a given country
	$('#countries').on('click', 'a', function() {
		var id = $(this).prevAll('input[type="text"]').attr('id');
		var country = $(this).prevAll('input[type="text"]').val();
		if (id) {
			collectionRequester.connect('Town', 'Country', id, country);
		}
	});
}, function(error) {
	console.error(error);
});