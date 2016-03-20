// ignore this first line (its fidle mock) and it will return what ever you pass as json:... parameter... consider to change it to your ajax call
$.ajax({
    url: '03tableGenerator.json',
    type: "post",
    dataType: "json",

    success: function(data, textStatus, jqXHR) {
        // since we are using jQuery, you don't need to parse response
        drawTable(data);
    }
});

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function drawRow(rowData) {
    var row = $("<tr />");
    $("#personDataTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData["manufacturer"] + "</td>"));
    row.append($("<td>" + rowData["model"] + "</td>"));
    row.append($("<td>" + rowData["year"] + "</td>"));
    row.append($("<td>" + rowData["price"] + "</td>"));
    row.append($("<td>" + rowData["class"] + "</td>"));
}
