$('.openCaloriesChart').click(function(e) {
    var labels = [],
        calories = [];

    $.getJSON('../db/eater.json', function(data) {
        $.each(data, function(key,value) {
            var date = new Date(value.timestamp * 1000);
            var day = date.getDate();
            var mounth = date.getMonth();
            var year = date.getFullYear();
            labels.push(`${day}-${mounth}-${year}`);
            calories.push(value.calories);
        });
        drawChart(labels,calories);
    });
});

$('.closeCaloriesChart').click(function (e) {
    var container = document.querySelector('.wrapper-caloriesChart');
    container.style.display = 'none';
});

function drawChart(labels,data) {
    var container = document.querySelector('.wrapper-caloriesChart');
    container.style.display = 'flex';
    var ctx = document.getElementById('caloriesChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Калории',
                backgroundColor: 'rgb(104, 34, 189)',
                borderColor: 'rgb(48, 0, 107)',
                data: data
            }]
        }
    });
}