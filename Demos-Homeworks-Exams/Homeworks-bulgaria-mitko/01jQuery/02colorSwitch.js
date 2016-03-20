$('button').on('click', function(){
	var classToPaint = $('#class').val();
	var colorToPaint = $('#color').val();
	$('.' + classToPaint).css('background-color', colorToPaint);
});