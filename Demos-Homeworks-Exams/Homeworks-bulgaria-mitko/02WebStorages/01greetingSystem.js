// var myVariable = true;

// sessionStorage['myvariable'] = myVariable;
// myVariable = sessionStorage['myvariable'];

if(!localStorage.getItem("name")) {
	$('#greeting').text('stranger -_-');
	$('#fillName').html('Please, fill your name, so we know you when you come here again. So, we can greet you the right way ;) <br> <form method="post"><input type="text" placeholder="Fill your name" name="name"> <input type="submit" value="Submit" id="submit"></form>');
} else {
	var total = Number(localStorage.getItem("total")) + 1;
	localStorage.setItem("total", total);
	var total = Number(localStorage.getItem("total"));

	$('#greeting').text(localStorage.getItem("name") + "! Welcome to this amazing website! ;)");
	if (isNaN(sessionStorage['session'])) {
		sessionStorage['session'] = 0;
	}
	sessionStorage['session']++;
	$('#session').text("Session visits so far: " + sessionStorage['session']);

	$('#total').text("Total visits so far: " + total);
}

$('#submit').on('click', function() {
	if ($('input').val()) {
		localStorage.setItem("name", $('input').val());
		sessionStorage['session'] = 0;
		localStorage.setItem("total", 0);
	}
});