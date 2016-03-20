var app = app || {};

app.requester.config('kid_-yNybCwNyb', '440aa28c10934b64bb30aea715b41d6a');

var userRequester = new app.UserRequester();
var collectionRequester = new app.CollectionRequester();

// userRequester.signUp('dimo', 'd');
// userRequester.login('dimo', 'd');
// userRequester.logout();

userRequester.login('dimo', 'd').then(function() {
	// collectionRequester.add('Questions', 'What is your favourite language?');
	// collectionRequester.add('Answers', 'Phone', '56e040ed6e07b39b05046630');

	function saveAnswers(answer, id, votes, questionID) {
		if (id) {
			collectionRequester.edit('Answers', answer, id, votes, questionID);
		} else {
			if (answer) {
				collectionRequester.add('Answers', answer, 0, questionID);
			}
		}
	}

	$('#questions').on('click', '.deleteButton', function() {
		var id = $(this).prev().prev().prev().attr('data-id');
		collectionRequester.delete('Questions', id).then(function() {
			collectionRequester.getInfo('Questions');
		});
	});

	$('#questions').on('click', '.editButton', function() {
		var id = $(this).prev().prev().attr('data-id');
		var input = $('<input />', {
	        'type': 'text',
	        'class': 'editedQuestion',
	        'value': $(this).prev().prev().prev().text()
	    });
		$(this).attr('class', 'saveButton').text('Save');

		$(this).prev().remove();
		$(this).next().remove();

		var form = $(this).prev();
		form.prev().replaceWith(input);
		form.find('input').attr('type', 'text');
		form.find('label').remove();

		var newAnswer = $('<input type="text" name="answer" placeholder="Add new answer"><br>');
		switch($(this).prev().find('input').length) {
			case 0:
				form.find('h4').remove();
		        form.append(newAnswer).append(newAnswer.clone()).append(newAnswer.clone()).append(newAnswer.clone());
		        break;
		    case 1:
		        form.append(newAnswer).append(newAnswer.clone()).append(newAnswer.clone());
		        break;
		    case 2:
		        form.append(newAnswer).append(newAnswer.clone());
		        break;
		    case 3:
		        form.append(newAnswer);
		        break;
		}
	});

	$('#questions').on('click', '.saveButton', function() {
		var form = $(this).prev();
		var question = form.prev().val();
		var id = form.attr('data-id');
		collectionRequester.edit('Questions', question, id).then(function() {
			var answer1ID = form.find('input').eq(0).attr('id');
			var answer1Value = form.find('input').eq(0).val();
			var answer1Votes = Number(form.find('input').eq(0).attr('data-votes'));
			var answer2ID = form.find('input').eq(1).attr('id');
			var answer2Value = form.find('input').eq(1).val();
			var answer2Votes = Number(form.find('input').eq(1).attr('data-votes'));
			var answer3ID = form.find('input').eq(2).attr('id');
			var answer3Value = form.find('input').eq(2).val();
			var answer3Votes = Number(form.find('input').eq(2).attr('data-votes'));
			var answer4ID = form.find('input').eq(3).attr('id');
			var answer4Value = form.find('input').eq(3).val();
			var answer4Votes = Number(form.find('input').eq(3).attr('data-votes'));

			saveAnswers(answer1Value, answer1ID, answer1Votes, id);
			saveAnswers(answer2Value, answer2ID, answer2Votes, id);
			saveAnswers(answer3Value, answer3ID, answer3Votes, id);
			saveAnswers(answer4Value, answer4ID, answer4Votes, id);
			
			collectionRequester.getInfo('Questions');
		});
	});

	$('#questions').on('click', '#addQuestion', function() {
		var question = $(this).prev().prev().val();
		collectionRequester.add('Questions', question).then(function() {
			collectionRequester.getInfo('Questions');
		});
	});

	$('#questions').on('click', '.voteButton', function() {
		var answer = $(this).parent().find('input:radio:checked').val();
		var currentVote = $(this).parent().find('input:radio:checked').attr('data-votes') || 0;
		var vote = +currentVote + 1;
		var answerID = $(this).parent().find('input:radio:checked').attr('id');
		var questionID = $(this).prev().attr('data-id');
		var question = $(this).prev().prev().text();

		collectionRequester.addVote('Answers', answer, vote, answerID, questionID).then(function() {
			collectionRequester.showVotes('Answers', questionID, 'Questions', question);
		});
	});

	$('body').on('click', '#backButton', function() {
		$('#questions').show().find('input:checked').prop('checked', false);
		$('#results').hide();
	});
});

// userRequester.login('dimo', 'padalski').then(function(success) {
// 	userRequester.getInfo();
// 	collectionRequester.getInfo('Books');