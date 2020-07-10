//Assignment code
var currentCity;
var lastSearched = JSON.parse(localStorage.getItem("city")) || [];
var userLocation = $(this).attr("data-name");
var p = "Five Day Future Cast";



//set display for current city weather. Include city name, date, icon of weather, temperature, humidity, wind speed, UV index
function currentWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=e318c6cc07b96c8c279bb20fa2877307"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#todayCard").remove();
        console.log(response);
        var day = response;
        var card = $("<div id='todayCard'>").addClass("col-md-9 card");
        var cardBody = $("<div id='today'>").addClass("card-body");
        var date = $("<h3>").addClass("card-title").text("Today's Weather for ").append(currentCity);
        var temp = $("<h4>")
            .addClass("card-subtitle mb-2")
            .text(Math.round(day.main.temp) + "˚F");
        var hum = $("<p>").addClass("card-text").text("Humidity: " + day.main.humidity + "%")
        var windSpeed = $("<p>").addClass("wind").text("Wind Speed: " + Math.round(day.wind.speed) + " mph")
        var icon = $("<img>")
        icon.attr("src", "http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png");
        var iconText = $("<p>")
        iconText.text(day.weather[0].description);
        card.append(cardBody.append(date, temp, hum, windSpeed, icon, iconText));
        $("#main").append(card);
        var lat = day.coord.lat;
        var long = day.coord.lon;

        //color coded UV index: favorable, moderate, severe
        return $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=e318c6cc07b96c8c279bb20fa2877307&lat=" + lat + "&lon=" + long,
            method: "GET"
        })
    }).then(function (UVindex) {
        indexVal = $("<p>");
        indexVal.text("UV Index: " + UVindex.value).addClass("card-text");
      
        //add if statements for color coding
        if (UVindex.value <= 3) {
            indexVal.addClass("favorable").append(" Favorable");
        } else if (UVindex.value > 3 && UVindex.value < 7) {
            indexVal.addClass("moderate").append(" Moderate");
        } else if (UVindex.value > 7) {
            indexVal.addClass("severe").append(" Severe");
        }

        $("#today").append(indexVal);

    })

}


//5 day forecast for selected city. Include: dates, temperature, icon of weather conditions, humidity
function fiveDay() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=e318c6cc07b96c8c279bb20fa2877307";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#five-day").empty();
        
        for (var i = 0; i < 40; i += 8) {
            var day = response.list[i];
            var card = $("<div>").addClass("col-md-2 card week");
            var cardBody = $("<div>").addClass("card-body");
            var date = $("<h5>").addClass("card-title").text(day.dt_txt.split(" ")[0]);
            var temp = $("<h6>")
            .addClass("card-subtitle mb-2")
            .text(Math.round(day.main.temp) + "˚F");
            var hum = $("<p>").addClass("card-subtitle text-muted").text(day.main.humidity + "% Humidity");
            var icon = $("<img>")
            icon.attr("src", "http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png");
            var iconText = $("<p>")
            iconText.text(day.weather[0].description);
            card.append(cardBody.append(date, temp, icon, iconText, hum));
            $("#five-day").append(card);
        }

    });


}
//Card headers can be styled by adding .card-header to <h*> elements.

//search bar for looking up cities


function searchHistory() {
    $("#history-view").empty();
    for (var i = 0; i < lastSearched.length; i++) {
        var a = $("<p class='cityName'>");
        a.attr("data-name", lastSearched[i]);
        a.text(lastSearched[i]);
        $("#history-view").append(a);

    }
}


$("#add-city").on("click", function (event) {
    event.preventDefault();
    currentCity = $("#user-input").val().trim();


    if (!lastSearched.includes(currentCity)) {
        lastSearched.push(currentCity);
    }
    if (lastSearched.length > 5) {
        lastSearched.shift();
    }
        
    
   

    searchHistory();

    currentWeather();
    fiveDay();
    localStorage.setItem("city", JSON.stringify(lastSearched));

    $("#user-input").val("");
});




searchHistory();
$(document).on("click", ".cityName", function () {
    currentCity = $(this).text();
    currentWeather();
    fiveDay();
});