var products = []; //Массив для хранения элементов списка
var prodValue = []; //

$.getJSON('.././db/kulinar.json', function(data) {
    $.each(data, function(key, value) {
        prodValue.push(value);
        products.push('<li class="foodItem" id="' + value.name + '"><img class="foodPicture" src="..' + value.img + '"/></li>');
    });
    products.forEach(function(foodItem) {
        $(foodItem).appendTo('#sortable1');
    });
});
