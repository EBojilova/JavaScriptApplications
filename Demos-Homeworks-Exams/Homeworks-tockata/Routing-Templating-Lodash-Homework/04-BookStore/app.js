(function () {
    var books = [{"book":"The Grapes of Wrath","author":"John Steinbeck","price":"34,24","language":"French"},
        {"book":"The Great Gatsby","author":"F. Scott Fitzgerald","price":"39,26","language":"English"},
        {"book":"Nineteen Eighty-Four","author":"George Orwell","price":"15,39","language":"English"},
        {"book":"Ulysses","author":"James Joyce","price":"23,26","language":"German"},
        {"book":"Lolita","author":"Vladimir Nabokov","price":"14,19","language":"German"},
        {"book":"Catch-22","author":"Joseph Heller","price":"47,89","language":"German"},
        {"book":"The Catcher in the Rye","author":"J. D. Salinger","price":"25,16","language":"English"},
        {"book":"Beloved","author":"Toni Morrison","price":"48,61","language":"French"},
        {"book":"Of Mice and Men","author":"John Steinbeck","price":"29,81","language":"Bulgarian"},
        {"book":"Animal Farm","author":"George Orwell","price":"38,42","language":"English"},
        {"book":"Finnegans Wake","author":"James Joyce","price":"29,59","language":"English"},
        {"book":"The Grapes of Wrath","author":"John Steinbeck","price":"42,94","language":"English"}];

    // Group all books by language and sort them by author
    // (if two books have the same author, sort by price):

    var groupedBooksByLanguage = _.groupBy(books, 'language');
    for (var language in groupedBooksByLanguage) {
        groupedBooksByLanguage[language] =
            _.sortByAll(groupedBooksByLanguage[language], ['author', 'price']);
    }

    var booksByLanguageRenderData = {
        'booksByLanguage': []
    };

    for (var language in groupedBooksByLanguage) {
        booksByLanguageRenderData.booksByLanguage.push({
            'language': language,
            'books': groupedBooksByLanguage[language]
        });
    }

    $.get('booksByLanguage.html', function (template) {
        var output = Mustache.render(template, booksByLanguageRenderData);
        $('#booksByLanguage').html(output);
    });

    // Get the average book price for each author
    var groupedBooksByAuthor = _.groupBy(books, 'author');
    var dataBooksByAuthor = {
        'averagePrices': []
    };

    for (var author in groupedBooksByAuthor) {
        var prices = _.map(groupedBooksByAuthor[author], 'price');
        var averageBookPrice = calculateAverageBookPrice(prices);
        dataBooksByAuthor.averagePrices.push({
            'author': author,
            'averagePrice': averageBookPrice
        });
    }

    $.get('averagePrices.html', function (template) {
        var output = Mustache.render(template, dataBooksByAuthor);
        $('#average-prices').html(output);
    });

    function calculateAverageBookPrice (prices) {
        var totalPrice = 0.00;
        prices.forEach(function (price) {
            var p = price.replace(',', '.');
            totalPrice += parseFloat(p);
        });

        return (totalPrice / prices.length).toFixed(2);
    }

    // Get all books in English or German, with price below 30.00, and group them by author:
    var englishBooks = _.filter(books, filterBooks);
    englishBooks = _.groupBy(englishBooks, 'author');
    var englishBooksRenderData = {
        'englishBooks': []
    };

    for (var prop in englishBooks) {
        englishBooksRenderData.englishBooks.push({
            'author': prop,
            'books': englishBooks[prop]
        });
    }

    $.get('englishBooks.html', function (template) {
        var output = Mustache.render(template, englishBooksRenderData);
        $('#english-books').html(output);
    });

    function filterBooks(book) {
        var bookPrice = parseFloat(book.price.replace(',', '.'));
        return book.language === 'English' && bookPrice < 30;
    }
}());
