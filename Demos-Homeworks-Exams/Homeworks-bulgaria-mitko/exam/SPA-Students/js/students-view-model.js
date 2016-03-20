var app = app || {};

app.requester.config('kid_ZkGkhGHVJ-', '8d5c102ee77f482ab1d2b5f66c7bc4a0');

var userRequester = new app.UserRequester();
var collectionRequester = new app.CollectionRequester();

// userRequester.signUp('dimo', 'd');
// userRequester.login('dimo', 'd');
// userRequester.logout();

userRequester.login('dimo', 'd').then(function() {
	// collectionRequester.add('Students', 'pesho', '6');
	collectionRequester.getInfo('Students');

	// add new student
	$('#wrapper').on('click', '#addStudent', function() {
		var studentName = $('#studentName').val();
		var studentGrade = $('#studentGrade').val();
		if (studentName && studentGrade) {
			collectionRequester.add('Students', studentName, studentGrade).then(function() {
				collectionRequester.getInfo('Students');
			});
		}
	});

	$('#wrapper').on('click', '.deleteStudent', function() {
		var id = $(this).parent().attr('data-id');
		collectionRequester.delete('Students', id).then(function() {
			collectionRequester.getInfo('Students');
		});
	});

});