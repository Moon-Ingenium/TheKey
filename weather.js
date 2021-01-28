var searchInput = $("#search-text");
var displayEl = $(".search-list");
var searchText = "";
var uvEl = $(".uvIndex");
var btn = $(".search-btn");
var cities = [];
var header = $(".forecast-header");
var forecastEl = $(".five-day-forecast");
var forecastRow = $("#forecast");
function displaySearchCity() {
    searchText = searchInput.val();
    cities.push(searchText);
}
// on click event to get city 
function getUvIndex(lat, lon) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=36edb26270cfd8ba7f33ada2c6f55cab";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        uvEl.text("UV Index: " + response.value);
        // uv mild 
        if (response.value <= 2) {
            uvEl.css("background-color", "yellow");

        }
        else if (response.value >= 4) {
            // uv moderate
            uvEl.css("background-color", "orange");
        }
        else {
            // uv severe
            uvEl.css("background-color", "red");
        }
    });
}
function cityHistoryDisplay(newCity) {
    console.log(newCity);
    for (var i = 0; i < cities.length; i++) {
        // if statement
        var currentCity = newCity || cities[i];
        if (!newCity) {
            var cityListBtn = $("<button>").text(currentCity);
            cityListBtn.addClass("city-button btn btn-lg btn-block btn-outline-dark");
            displayEl.append(cityListBtn);
            localStorage.setItem("cities", cities);
        }
    }

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=36edb26270cfd8ba7f33ada2c6f55cab&units=imperial";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        getUvIndex(response.coord.lat, response.coord.lon);
        var cityDiv = $(".city");
        // show city, date, and weather icon 
        var date = moment(response.dt_txt).format("ll")
        var weatherEl = $("<img>");
        var weatherIcon = response.weather[0].icon;
        console.log(weatherEl);
        weatherEl.attr("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png");
        cityDiv.html(" Weather Details: " + response.name + " " + date + " " + weatherEl.prop('outerHTML'));
        $(".humidity").text("Humidity: " + response.main.humidity + " %");
        $(".temp").text("Temprature: " + response.main.temp + " ℉");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH")
    });

    var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&appid=36edb26270cfd8ba7f33ada2c6f55cab&units=imperial";
    $.ajax({
        url: fiveDayQueryUrl,
        method: "GET"
    }).then(function (response) {
        //    gets 5 day current weather
        forecastEl.text(" 5-Day Forecast");
        var fiveDay = [];
        var current = {};

        for (var i = 0; i < response.list.length; i++) {
            if (i % 8 === 0) {
                current = response.list[i];
                var date = $("<div>");
                var body = $("<div class ='card-body'>");
                var currentIcon = current.weather[0].icon;
                var temp = $("<div>");
                var icon = $("<img>");
                var humidity = $("<div>");
                var forecastDay = $("<div class = 'col'>");
                var card = $("<div class = 'card bg-primary text-white'>");
                $("#forecast").append(forecastDay);
                forecastDay.append(card);
                card.append(body);
                body.append(date);
                body.append(temp);
                temp.text(current.main.temp + " ℉");
                body.append(icon);
                icon.attr("src", "http://openweathermap.org/img/w/" + currentIcon + ".png");
                body.append(humidity);
                humidity.text(current.main.humidity + "%");
                date.text(moment(current.dt_txt).format("ll"));

            }

        };


    });
}

btn.on("click", function (event) {
    displayEl.empty();
    forecastRow.empty();
    event.preventDefault();
    displaySearchCity();
    searchInput.val("");
    cityHistoryDisplay();
});
// when I click the city it history it pulls up current stats
$('body').on('click', function (event) {
    // if event target has class city button
    if ($(event.target).hasClass("city-button")) {
        forecastRow.empty();
        event.preventDefault();
        cityHistoryDisplay($(event.target).text());

    }
});
