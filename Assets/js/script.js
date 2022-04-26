var searchButton = $(".searchButton");
var apiKey = "d7754aa4ed367412c583f46848c56a24";
var keyCount = 0;

// loop to keep data persistent on the HTML page
for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);

    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + city + "</li>");
}

// Click event for searchButton
searchButton.click(function () {
    var searchInput = $(".searchInput").val();

    // var for current weather
    var linkCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    // var for 5 day forecast  
    var linkFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

    if (searchInput == "") {
        //console.log(searchInput);
    } else {
        $.ajax({
            url: linkCurrent,
            method: "GET"
        }).then(function (response) {
            // list-group append an li to it with just set text
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name);
            // localStorage
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            // start current weather
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            // .addClass("card-text");
            currentCard.append(currentName);

            // adjust date
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            // Add Temp 
            var currentTemp = currentName.append("<p>");
            // .addClass("card-text");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            // Add Humidity
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            // // Add Wind Speed: 
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // UV Index URL
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
                // currentUV.append("UV Index: " + response.value);
            });

        });

    }
});

