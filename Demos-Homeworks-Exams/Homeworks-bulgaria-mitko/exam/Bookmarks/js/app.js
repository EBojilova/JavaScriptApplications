var app = app || {};

app.requester.config('kid_Wy3fqPqGyW', '8d97830f08b24fcda2e368f7c773416d');

var userRequester = new app.UserRequester();
var collectionRequester = new app.CollectionRequester();

// userRequester.signUp('dimo', 'padalski');
// userRequester.login('internetUser', '1234');
// userRequester.logout();

(function() {
	$(function() {
		registerEventHandlers();

		if (sessionStorage['username']) {
			$('main > *').hide();
			$('#bookmarksView').show();
			$('header span').text(' - ' + sessionStorage['username']);
			$('header a').show();

			collectionRequester.getInfo('Bookmarks');
		} else {
			showHomeView();
		}
	});

	function registerEventHandlers() {
		$('#btnShowLoginView').click(showLoginView);
		$('#btnLogin').click(loginClicked);
		$('#btnLoginRegister').click(showRegisterView);
		$('#btnShowLoginRegister').click(showRegisterView);
		$('#btnRegister').click(registerClicked);
		$('#btnLogout').click(logoutClicked);
		$('#btnAddBookmark').click(addBookmark);
	}

	function showHomeView() {
		$('main > *').hide();
		$('#homeView').show();
	}

	function showLoginView() {
		$('main > *').hide();
		$('#loginView').show();
		$('#loginUsername').val('');
		$('#loginPassword').val('');
	}

	function loginClicked() {
		var username = $('#loginUsername').val();
		var password = $('#loginPassword').val();
		userRequester.login(username, password);
	}

	function showRegisterView() {
		$('main > *').hide();
		$('#registerView').show();
		$('#registerUsername').val('');
		$('#registerPassword').val('');
	}

	function registerClicked() {
		var username = $('#registerUsername').val();
		var password = $('#registerPassword').val();
		userRequester.signUp(username, password).then(function() {
			userRequester.login(username, password);
		});
	}

	function logoutClicked() {
		userRequester.logout();
		showHomeView();
	}

	function addBookmark() {
		var title = $('#title').val();
		var url = $('#url').val();
		if (title && url) {
			collectionRequester.add('Bookmarks', title, url).then(function() {
				collectionRequester.getInfo('Bookmarks');
			});
		}
	}

	$('ul').on('click', '.delete', function(event) {
		var id = event.target.id;

		noty({
			text: 'Delete this bookmark?',
			type: 'confirm',
			layout: 'topCenter',
			buttons: [
				{text: "Yes",
					onClick: function($noty) {
						if (id) {
							collectionRequester.delete('Bookmarks', id).then(function() {
								collectionRequester.getInfo('Bookmarks');
							});
						}
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

		
	});

})();

// userRequester.login('dimo', 'padalski').then(function(success) {
// 	userRequester.getInfo();
// 	collectionRequester.getInfo('Books');