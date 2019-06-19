var lastEater;

function getLastFood() {
    $.getJSON('.././db/eater.json', function(data) {
        $.each(data, function(key, value) {
            if((key + 1) === data.length) {
                lastEater = value;
            }
        });
        formLastEaterFoodList()
    });
}

function formLastEaterFoodList() {
    lastEater.foods.forEach(function(foodPicture) {
        var foodPictureElement = $('<div/>').append(
            $('<img/>', {
                class: 'foodPicture',
                src: foodPicture
            })
        );
        $('.lastEatenFoods').append(foodPictureElement);
    })
}

getLastFood();