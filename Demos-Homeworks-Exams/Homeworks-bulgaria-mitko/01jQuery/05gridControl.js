$.fn.grid = function () {
	var $this = $(this);
	var addHeader = function (arr) {
		var $out = $('<tr>');
		arr.forEach(function (el) {
			var $th = $('<th>').text(el);
			$th.appendTo($out);
		});
		$out.appendTo($this);
	};
	var addRow = function (arr) {
	 	var $out = $('<tr>');
	 	arr.forEach(function (el) {
	 		var $td = $('<td>').text(el);
	 		$td.appendTo($out);
	 	});
	 	$out.appendTo($this);
	};
	return {
		addHeader: addHeader,
		addRow: addRow
	};
};

$(document).ready(function () {
	var grid = $('#myGrid').grid();
	grid.addHeader(['First Name', 'Last Name', 'Age']);
	grid.addRow(['Bay', 'Ivan', 50]);
	grid.addRow(['Kaka', 'Penka', 26]);

	$("button").on("click", function() {
		var first = $("#first").val();
		var last = $("#last").val();
		var age = $("#age").val();

		grid.addRow([first, last, age]);
	});
});