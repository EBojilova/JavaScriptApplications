(function() {
    function loginIn(e) {
        var userName = $('#userName')
        .val();
        localStorage.setItem('userName', userName);
    }

    if (!localStorage['visitsCount']) {
        localStorage.setItem('visitsCount', 0);
    }

    if (!sessionStorage['visitsCount']) {
        sessionStorage.setItem('visitsCount', 0);
    }

    if (localStorage['userName']) {
        $('form')
        .hide();
        $('#greeting')
        .text('Hello, ' + localStorage['userName'] + '!');
        localStorage['visitsCount']++;
        sessionStorage['visitsCount']++;
    }
    else {
        $('#loginButton')
        .on('click', loginIn);
        localStorage['visitsCount']=0;
        sessionStorage['visitsCount']=0;
    }

    $('<div>')
    .text('Total visits: ' + localStorage['visitsCount'])
    .appendTo('body');
    $('<div>')
    .text('Session visits: ' + sessionStorage['visitsCount'])
    .appendTo('body');

})();