$(document).ready(function () {
    // Selectors
    var cityH2 = $(".card-title");


    // Variables for ajax call
    var APIKey = "7e9660df6b46d307a4673d7d7829d2f1";
    var citySearch = "Austin";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + citySearch + "&units=imperial&appid=" + APIKey;

    // Ajax call to openweather API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);



            cityH2.text(citySearch);
            // Transfer content to HTML
            // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            // $(".wind").text("Wind Speed: " + response.wind.speed);
            // $(".humidity").text("Humidity: " + response.main.humidity);

            // // Convert the temp to fahrenheit
            // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            // // add temp content to html
            // $(".temp").text("Temperature (K) " + response.main.temp);
            // $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

            // // Log the data in the console as well
            // console.log("Wind Speed: " + response.wind.speed);
            // console.log("Humidity: " + response.main.humidity);
            // console.log("Temperature (F): " + tempF);
        });

})