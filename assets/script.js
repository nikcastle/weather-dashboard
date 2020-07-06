//Assignment code
var currentCity;
var lastSearched = []; 
var fiveDayForecast;
var daysOfWeek = ["Sunday",
"Monday", 
"Tuesday", 
"Wednesday",
"Thursday",
"Friday",
"Saturday"]


//set display for default/last searched city forecast


//set display for current city weather. Include city name, date, icon of weather, temperature, humidity, wind speed, UV index

//color coded UV index: favorable, moderate, severe


//5 day forecast for selected city. Include: dates, temperature, icon of weather conditions, humidity


//search bar for looking up cities
function displayWeather() {
    var userLocation = $(this).attr("data-name");
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={e318c6cc07b96c8c279bb20fa2877307}" ;
    
    //show search history
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var wrapper = $("<div class='wrapper'>");
        var cityName = $("<h2>").text(response.Name);
    })
    
    console.log(userLocation);
}

function searchHistory() {
    $("#buttons-view").empty();
    for (var i = 0; i < lastSearched.length; i++) {
        var a = $("<button>");
        a.addClass("cityName");
        a.attr("data-name",lastSearched[i]);
        a.text(lastSearched[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-city").on("click", function(event) {
    event.preventDefault();
    var userCity = $("#user-input").val().trim();
    console.log(userCity);

    lastSearched.push(userCity);

    searchHistory();
});

$(document).on("click"), ".cityName"
//use display:flex previously searched cities. They should be buttons, flex-direction: column-reverse (puts most recent at the top), justify-content: flex-start, CHECK ACTIVITY 06-10 WORKING MOVIE APP