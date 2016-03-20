var app = app || {};

app.CollectionRequester = (function() {
	function CollectionRequester() {
		this.serviceUrl = app.requester.baseUrl + 'appdata/' + app.requester.appId;
	}

	CollectionRequester.prototype.getInfo = function(collection) {
		var requestUrl = this.serviceUrl + '/' + collection;

		app.requester.makeRequest('GET', requestUrl, null, true).then(function(success) {
			// add to DOM:
			$('#questions').empty();
			for(var question in success) {
				var q = success[question];
				var li = $('<li>');
				var div = $('<div>' + q.name + '</div>');
				var form = $('<form>');
				form.attr('data-id', q._id);
				var voteButton = $('<button>');
				voteButton.addClass('voteButton').text('Vote');
				var editButton = $('<button>');
				editButton.addClass('editButton').text('Edit');
				var deleteButton = $('<button>');
				deleteButton.addClass('deleteButton').text('Delete');

				li.append(div);
				li.append(form);
				li.append(voteButton);
				li.append(editButton);
				li.append(deleteButton);
				$('#questions').css('display', 'inherit').append(li);

				collectionRequester.connect('Answers', 'Questions', q._id, q.name);
			}

			// add new question
			$('#questions').append('<li><input type="text" placeholder="Add new question"><br><button id="addQuestion">Add</li>');


			// <li>
			// 	<div>Question #1</div>
			// 	<form>
			// 		<input type="radio" name="answer" id="answer1" value="">
			// 		<label for="answer1">First answer</label>
			// 		<br>
			// 		<input type="radio" name="answer" id="answer2" value="">
			// 		<label for="answer2">Second answer</label>
			// 		<br>
			// 	</form>
			// 	<button id="voteButton">Vote</button>
			// </li>

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

	CollectionRequester.prototype.add = function(collection, name, vote, questionID) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/' + collection;
		if (!questionID) {
			var data = {
				name: name
			};
		} else {
			var data = {
				name: name,
				question: {"_type":"KinveyRef","_id": questionID,"_collection":"Questions"},
				vote: vote
			};
		}
		
		app.requester.makeRequest('POST', requestUrl, data, true).then(function(success) {
			// add to DOM:
			defer.resolve();
			noty({
				text: 'Item was added successfully',
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

	CollectionRequester.prototype.edit = function(collection, name, idToChange, vote, questionID) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/' + collection + '/' + idToChange;
		if (!questionID) {
			var data = {
				name: name
			};
		} else {
			var data = {
				name: name,
				question: {"_type":"KinveyRef","_id": questionID,"_collection":"Questions"},
				vote: vote
			};
		}

		app.requester.makeRequest('PUT', requestUrl, data, true).then(function(success) {
			defer.resolve();
			// console.log(success);
		}, function(error) {
			defer.reject();
			console.error(error);
		}).done();

		return defer.promise;
	};

	CollectionRequester.prototype.delete = function(collection, idToDelete) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/' + collection + '/' + idToDelete;

		noty({
			text: 'Do you really want to delete the question?',
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

	CollectionRequester.prototype.connect = function(collection, collectionFrom, idToSearch, answerName) {
		var defer = Q.defer();
		// to change 'question'
		var requestUrl = this.serviceUrl + '/' + collection + '?query={"question._id":"' + idToSearch + '"}&resove=' + collectionFrom;

		app.requester.makeRequest('GET', requestUrl, null, true).then(function(success) {
			// console.log(collection, collectionFrom, idToSearch, answerName);
			
			if (success[0]) {
				for(var answer in success) {
					var a = success[answer];
					var input = $('<input>');
					var label = $('<label>');
					var br = $('<br>');
					input.attr({type: 'radio', name: 'answer', 'id': a._id, 'data-votes': a.vote, value: a.name});
					label.attr("for", a._id).text(a.name);
					$('[data-id="' + idToSearch + '"]').append(input).append(label).append(br);
				}
			} else {
				$('[data-id="' + idToSearch + '"]').append('<h4>There are no answers added for that question. Add a new answer for that question and try again.</h4>');
				$('[data-id="' + idToSearch + '"]').next().hide();
			}

			// disabled vote button if questions are less then 4
			if (success.length < 4) {
				$('[data-id="' + idToSearch + '"]').next('.voteButton').attr('disabled', true);
			}

			// <li>
			// 	<div>Question #1</div>
			// 	<form>
			// 		<input type="radio" name="answer" id="answer1" value="">
			// 		<label for="answer1">First answer</label>
			// 		<br>
			// 		<input type="radio" name="answer" id="answer2" value="">
			// 		<label for="answer2">Second answer</label>
			// 		<br>
			// 	</form>
			// 	<button id="voteButton">Vote</button>
			// </li>

			// noty({
			// 	text: 'Answer was connected with ' + answerName,
			// 	type: 'info',
			// 	layout: 'topCenter',
			// 	timeout: 5000
			// });
			defer.resolve();
		}, function(error) {
			console.error(error);
			defer.reject();
		}).done();

		return defer.promise;
	};

	CollectionRequester.prototype.addVote = function(collection, name, vote, idToChange, questionID) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/' + collection + '/' + idToChange;
		var data = {
			name: name,
			question: {"_type":"KinveyRef","_id": questionID,"_collection":"Questions"},
			vote: vote
		};

		app.requester.makeRequest('PUT', requestUrl, data, true).then(function(success) {
			defer.resolve();
			noty({
				text: 'Vote was recorded successfully',
				type: 'info',
				layout: 'topCenter',
				timeout: 5000
			});
			// console.log(success);
		}, function(error) {
			defer.reject();
			console.error(error);
		}).done();

		return defer.promise;
	};

	CollectionRequester.prototype.showVotes = function(collection, idToSearch, collectionFrom, question) {
		var defer = Q.defer();
		var requestUrl = this.serviceUrl + '/' + collection + '?query={"question._id":"' + idToSearch + '"}&resove=' + collectionFrom;

		app.requester.makeRequest('GET', requestUrl, null, true).then(function(success) {
			$('#questions').hide();
			$('#results').empty();
			$('#results').show();

			// create elements
			var questionDiv = $('<div>');
			questionDiv.text(question);
			var ul = $('<ul>');


			$('#results').append(questionDiv);
			$('#results').append(ul);
			var values = [];

			for(var a2 in success) {
				var a = success[a2];
				if (a.vote) {
					values.push(a.vote);
				} else {
					values.push(0);
				}
			}

			var sumAll = values.reduce(function(pv, cv) { return pv + cv; }, 0);
			console.log(values, sumAll);

			for(var answer in success) {
				var ans = success[answer];
				var li = $('<li>');
				var divAnswer = $('<div>');
				divAnswer.addClass('answer').text(ans.name);
				var divPro = $('<div>');
				var procent = ((ans.vote / sumAll) * 100).toFixed(2);
				divPro.addClass('percents').css('width', procent + '%').text(procent + '%');

				ul.append(li);
				li.append(divAnswer);
				li.append(divPro);
			}

			var backButton = $('<button>');
			backButton.attr('id','backButton').text('<-- Back to Polls');
			$('#results').append(backButton);

			// <div id="results" style="display: block;">
			// 	<div>Question</div>
			// 	<ul>
			// 		<li>
			// 			<div class="answer">Answer #1</div>
			// 			<div class="percents" style="width:60%">60</div>
			// 		</li>
			// 		<li>
			// 			<div class="answer">Answer #2</div>
			// 			<div class="percents" style="width:10%">10</div>
			// 		</li>
			// 		<li>
			// 			<div class="answer">Answer #3</div>
			// 			<div class="percents" style="width:30%">30</div>
			// 		</li>
			// 	</ul>
			// 	<button id="backButton">⇽ Back to Polls</button>
			// </div>

			defer.resolve();
			// console.log(success);
		}, function(error) {
			defer.reject();
			console.error(error);
		}).done();

		return defer.promise;
	};

	return CollectionRequester;
}());