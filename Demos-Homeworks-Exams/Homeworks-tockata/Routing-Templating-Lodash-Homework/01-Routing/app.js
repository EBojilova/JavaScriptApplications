var app = app || {};

(function () {
    app.router = Sammy(function () {
        var selector = 'h2';

        this.get('#/', function () {
            $('h2').html('Click on names above.');
        });

        this.get('#/Ivan', function () {
            $(selector).html('Hello, Ivan');
        });

        this.get('#/Mimi', function () {
            $(selector).html('Hello, Mimi');
        });

        this.get('#/Pesho', function () {
            $(selector).html('Hello, Pesho');
        });

        this.get('#/Gosho', function () {
            $(selector).html('Hello, Gosho');
        });

        this.get('#/Rosi', function () {
            $(selector).html('Hello, Rosi');
        });
    });

    app.router.run('#/');
}());
