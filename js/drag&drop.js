$(function() {
    $('#sortable1').sortable({
        connectWith: '.connectedSortable'
    }).disableSelection();
    $('#sortable2').sortable({
        connectWith: '.connectedSortable',
        remove: function(event,ui) { //Срабатывает при удалении элемента
            var deleteItemIndex = -1;

            for(var index = 0; index < clicked.length; index++) { //Поиск индекса удаляемого элемента
                if(clicked[index].name === ui.item[0].id) {
                    deleteItemIndex = index;
                    break;
                }
            }

            if(deleteItemIndex !== -1) { //Удаление элемента из списка выбраных и вычитание из счётчика
                var caloriesCount = +$('.caloriesCounter').text() - clicked[deleteItemIndex].calories;
                $('.caloriesCounter').text(caloriesCount);
                clicked.splice(deleteItemIndex,1);
            }

        }
    }).disableSelection();
});

var clicked = [];//массив, для хранения нажатых элементов

//Клик срабатываемый для элементов еды, находящихся во втором списке
$('#sortable2').on('click', '.foodItem', function (e) {
    var selectedFood = prodValue.find(function(item) { //Поиск объекта выбраного элемента
        return item.name === e.currentTarget.id;
    });

    var checkClick = clicked.find(function(item) { //Проверка, был ли элемент уже нажат
        return item.name === selectedFood.name;
    });

    if(!checkClick) { //Если не нажат, создаём для него новый объект
        var food = {
            name: selectedFood.name,
            calories: 0,
            img: selectedFood.img
        };

        clicked.push(food);
    }

    if((checkClick && checkClick.calories === 0) || (food && food.calories === 0)) {
        var foodItem;
        if(checkClick) {
            foodItem = checkClick;
        } else {
            foodItem = food;
        }
        //Показать окно ввода калорий
        var container = document.querySelector('.container-popup');
        container.style.display = 'flex';
        var popup = document.querySelector('.popup');
        popup.id = 'shake';
        //Нажата кнопка Ok
        $('.popup-action').click(function() {
            $('.popup-action').off('click'); //Убираю событие клик, так как отрабатывает несколько раз

            var weight = +document.querySelector('.popup-input').value;

            if(weight === 0) {
                $('.popup-error').text('Значение не может быть равным нулю');
                $(popup).effect('shake');
            } else if(weight < 0) {
                $('.popup-error').text('Значение не может быть отрицательным');
                document.querySelector('.popup-input').value = 0;
                $(popup).effect('shake');
            } else {
                foodItem.calories = weight * (selectedFood.calories/100);

                var caloriesCount = +$('.caloriesCounter').text() + foodItem.calories; //Прибавляю к текущему значению счётчика
                $('.caloriesCounter').text(caloriesCount);

                container.style.display = 'none'; //Скрываю окно и очищаю инпут
                document.querySelector('.popup-input').value = 0;
            }
        })
    }
});

$('.pushToServer').click(function(e){
    $('.pushToServer').off('click');
    var calories = 0,
        images = [];

    clicked.forEach(function(food) {
        calories += +food.calories;
        images.push(food.img);
    });

    $.ajax({
        url: '/backend/backend.php',
        method: 'POST',
        data: {
            foods: images,
            calories: calories
        }
    }).done(function() {
        $('#sortable1').append($('#sortable2').children());
        $('.caloriesCounter').text('0');
        $('.lastEatenFoods').html('');
        clicked = [];
        getLastFood();
    })
});