var app = app || {};
app.requester.config('kid_W1D-ZR7pCl', '71343686690646ee8e8b1d1984be7e9e');
var userRequester = new app.UserRequester();
var collectionRequester = new app.CollectionRequester('expense-reports');

//userRequester.signUp('jon','12345');
$('#sign-up').click(function () {
    userRequester.signUp('joaan', '12345');
});

$('#login').click(function () {
    userRequester.login('jon', '12345');
});

$('#logout').click(function () {
    userRequester.logout();
});

$('#getInfo').click(function () {
    userRequester.getInfo();
});

var count = 0;
$('#add').click(function () {
    collectionRequester.add('item' + ++count);
});
$('#delete').click(function () {
    collectionRequester.delete('item' + count--);
});


//userRequester.getInfo();
//userRequester.logout();
