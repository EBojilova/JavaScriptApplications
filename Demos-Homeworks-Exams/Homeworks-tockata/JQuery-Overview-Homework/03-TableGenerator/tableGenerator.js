$(document).ready(function() {
    $('button').on('click', function() {
        var data = JSON.parse($('#json').val());

        $('table').append('<thead><tr><th>Manufactorer</th><th>Model</th><th>Year</th><th>Price</th><th>Class</th></tr>');

        $('table').append('<tbody>');
        data.forEach(function(d) {
            $('tbody').append('<tr><td>' + d.manufacturer +
                '</td>' + '<td>' + d.model + '</td>' +
                '</td>' + '<td>' + d.year + '</td>' +
                '</td>' + '<td>' + d.price + '</td>' +
                '</td>' + '<td>' + d.class + '</td>');
        });
    });
});