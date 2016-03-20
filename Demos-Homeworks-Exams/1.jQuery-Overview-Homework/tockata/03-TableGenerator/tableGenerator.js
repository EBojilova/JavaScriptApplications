$(document).ready(function() {
    // nai-ne mi haresa tova reshenie- vij reshenieto na Fil
    $('button').on('click', function() {
        var data = JSON.parse($('#json').val());
        var $table=$('<table>');

        $table.append('<thead><tr><th>Manufactorer</th><th>Model</th><th>Year</th><th>Price</th><th>Class</th></tr>');

        $table.append('<tbody>');
        data.forEach(function(car) {
            $table.append('<tr><td>' + car.manufacturer +
                '</td>' + '<td>' + car.model + '</td>' +
                '</td>' + '<td>' + car.year + '</td>' +
                '</td>' + '<td>' + car.price + '</td>' +
                '</td>' + '<td>' + car.class + '</td>');
        });
        $table.appendTo(document.body);
    });
});