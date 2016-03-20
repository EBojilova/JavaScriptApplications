function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            $('#timer').text('00:00');
            clearInterval(interval);
        }
    }, 1000);
}

// reset timer
// $('#reset').on('click', function() {
// 	$('#timer').text("5:00");
// 	localStorage.setItem("timeToDisplay", "5:00");
// 	localStorage.setItem("timming", 300);
// 	console.log("mitko");
// });

if (!localStorage.getItem("submit")) {
	var display = $('#timer');
	if (!localStorage.getItem("timming")) {
		var fiveMinutes = 60 * 5;
		startTimer(fiveMinutes, display);
	} else {
		var displayTime = localStorage.getItem("timeToDisplay");
		var timing = localStorage.getItem("timming");
		$('#timer').text(displayTime);
		startTimer(timing, display);
	}

	if ($('#timer').text() === '00:00') {
		$('input[type="submit"]').attr('disabled', true);
		$('#timeFinished').html('Sorry, the time have passed and you cannot submit the form anymore! Try again next life...');
	}

	$('#timer').bind("DOMSubtreeModified", function() {
		var time = $('#timer').text();
		localStorage.setItem("timeToDisplay", time);

		var clock = time.split(':');
		var totaltime = 60 * Number(clock[0]) + Number(clock[1]);
		localStorage.setItem("timming", totaltime);
	});
}



$('input[type="submit"]').on('click', function() {
	localStorage.setItem("submit", "submitted");
});

$('input[name="name"]').on('click', function() {
	var name = $('input[name="name"]:checked').val();
	localStorage.setItem("name", name);
});
$('input[name="item"]').on('click', function() {
	var item = $('input[name="item"]:checked').val();
	localStorage.setItem("item", item);
});
$('input[name="role"]').on('click', function() {
	var role = $('input[name="role"]:checked').val();
	localStorage.setItem("role", role);
});
$('input[name="ability"]').on('click', function() {
	var ability = $('input[name="ability"]:checked').val();
	localStorage.setItem("ability", ability);
});

if (!localStorage.getItem("submit") || !localStorage.getItem("name") || !localStorage.getItem("item") || !localStorage.getItem("role") || !localStorage.getItem("ability")) {
	if(localStorage.getItem("name")) {
		var name = localStorage.getItem("name");
		$('input[value="' + name + '"]').prop('checked', true);
	}

	if(localStorage.getItem("item")) {
		var item = localStorage.getItem("item");
		$('input[value="' + item + '"]').prop('checked', true);
	}

	if(localStorage.getItem("role")) {
		var role = localStorage.getItem("role");
		$('input[value="' + role + '"]').prop('checked', true);
	}

	if(localStorage.getItem("ability")) {
		var ability = localStorage.getItem("ability");
		$('input[value="' + ability + '"]').prop('checked', true);
	}
} else {
	$('h2').empty().text('Thanks for taking our poll');
	$('#container').empty();
	$('h3').empty();
	var text = "You have finished the poll in " + localStorage.getItem("timeToDisplay") + " minutes:seconds<br>";
	text += "The name you have choosen is " + localStorage.getItem("name") + "<br>";
	text += "The item is " + localStorage.getItem("item") + "<br>";
	text += "The role is " + localStorage.getItem("role") + "<br>";
	text += "The ability is " + localStorage.getItem("ability") + "<br><br>";
	text += "You and 77% of the people choosen the same things.";
	$('#container').html(text);
}
