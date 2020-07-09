//Assignment code
var currentCity;
var lastSearched = JSON.parse(localStorage.getItem("city")) || [];
var userLocation = $(this).attr("data-name");


//set display for default/last searched city forecast


//set display for current city weather. Include city name, date, icon of weather, temperature, humidity, wind speed, UV index
function currentWeather () {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=e318c6cc07b96c8c279bb20fa2877307"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#clear").remove();
        var day = response;
           console.log(day.main.temp);
           var card = $("<div id='clear'>").addClass("col-md-9 card");
           var cardBody = $("<div id='today'>").addClass("card-body");
           var date = $("<h3>").addClass("card-title").text("Today's Weather");
           var temp = $("<h4>")
                .addClass("card-subtitle mb-2")
                .text(Math.round(day.main.temp) + "˚F");
            card.append(cardBody.append(date, temp));
            $("#main").append(card);
            var lat = day.coord.lat;
            var long = day.coord.lon;
    
            //color coded UV index: favorable, moderate, severe
            return $.ajax({
                url:"https://api.openweathermap.org/data/2.5/uvi?appid=e318c6cc07b96c8c279bb20fa2877307&lat=" + lat +"&lon=" + long,
                method: "GET"
            })
    }).then(function(UVindex) {
        console.log(UVindex);
        indexVal = $("<p>").addClass("card-text").text(UVindex.value);
        //add if statements for color coding

        $("#today").append(indexVal);
    })

}

//IN BOTH CURRENT AND FIVE DAY FUNCTIONS
//icons for weather
//make an img tag and set src = api link for weather icons
//append img to card body



//5 day forecast for selected city. Include: dates, temperature, icon of weather conditions, humidity
function fiveDay () {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=e318c6cc07b96c8c279bb20fa2877307"; 
    console.log(currentCity);
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#five-day").empty();
       for(var i = 0; i < 40; i+=8) {
           var day = response.list[i];
           console.log(day.main.temp);
           var card = $("<div>").addClass("col-md-2 card");
           var cardBody = $("<div>").addClass("card-body");
           var date = $("<h5>").addClass("card-title").text(day.dt_txt.split(" ")[0]);
           var temp = $("<h6>")
                .addClass("card-subtitle mb-2 text-muted")
                .text(Math.round(day.main.temp) + "˚F");
            card.append(cardBody.append(date, temp));
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


    if(!lastSearched.includes(currentCity)) {
        lastSearched.push(currentCity);
    }

    searchHistory();
    
    currentWeather();
    fiveDay();
    localStorage.setItem("city", JSON.stringify(lastSearched)); 
    
    $("#user-input").val("");
});




searchHistory();
$(document).on("click", ".cityName", function() {
    currentCity = $(this).text();
    console.log(currentCity);
    currentWeather();
    fiveDay();
});
