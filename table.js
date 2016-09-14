/*Task Description:
Create a table (Visually appealing UI) with 4 columns, 10 rows.
The table values should populate from json file. 
Table Header should have a dropdown icon, on click of that 
it should sort the respective column alphabetically.*/

$(function () {

    var cities;
    var data = $.getJSON("data.json?v=1", function( data ) {
        cities = data.cities;
        printData(cities);
    });


    $('thead th i').on('click', function () {
        var key = $(this).parent().attr("class").split("-")[0];
        $("th i").removeClass("active");
        $("th span").removeClass("active");

        $(this).addClass("active");
        $(this).parent().find("span").addClass("active");

        cities.sort(function (a,b) {
            return a[key] > b[key] ? 1 : -1;
        });

        printData(cities);
    });

//arrJson['key'];
//arrJson.key;


});


function printData(arr) {
    $('#mytable tbody').empty();
    for (var i in arr) {
        $('#mytable tbody').append('<tr><td>' + arr[i].country + '</td><td>' + arr[i].city + '</td><td>' +
            + arr[i].area + ' km<sup>2</sup></td><td>' + arr[i].population + ' million</td></tr>');
    }
}