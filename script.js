$(document).ready(function () {
    // Selectors
    var ul = $(".list-group");
    var cardBody = $(".card-body");


    // Search button click event
    $(".btn").on("click", function (event) {
        event.preventDefault();
        // Get user search info
        var target = $(this).attr("data-target");
        console.log(target);
        var citySearch = $("#" + target).val();


        // Variables for ajax call
        var APIKey = "7e9660df6b46d307a4673d7d7829d2f1";
        var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + citySearch + "&units=imperial&appid=" + APIKey;


        // First Ajax call to populate main card
        $.ajax({
            url: currentWeatherURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);

                ////Variables from response
                var lattitude = response.coord.lat;
                var longitude = response.coord.lon;
                var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lattitude + "&lon=" + longitude + "&appid=" + APIKey;


                // Foramted date from search
                var searchDate = new Date(response.dt * 1000);
                formatedDate = searchDate.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" });


                // Create icon element from search
                var iconCode = response.weather[0].icon;
                iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                console.log(iconCode);


                //Append html to card body
                cardBody.empty();
                cardBody.append(/*html*/`<h2 class="card-title">${response.name} ${formatedDate} <img src="${iconUrl}"></h2>
                        <p class="card-text" id="temp">Temperature: ${response.main.temp} &#8457;</p>
                        <p class="card-text" id="humidity">Humidity: ${response.main.humidity}%</p>
                        <p class="card-text" id="wind">Wind Speed: ${response.wind.speed}MPH</p>
                        <p class="card-text">Uv Index: <span class="badge bg-success" id="uv-index">0/10</span></p>
                        `);


                //Second Ajax call for UV Index
                $.ajax({
                    url: uvIndexURL,
                    method: "GET"
                })
                    .then(function (response) {
                        console.log(uvIndexURL);
                        console.log(typeof response.value);
                        $("#uv-index").text(response.value);

                        // Set uv background color
                        if (response.value > 2 && response.value < 8) {
                            $("#uv-index").addClass("bg-warning");
                            $("#uv-index").removeClass("bg-success");
                            $("#uv-index").removeClass("bg-danger");

                        }
                        else if (response.value > 7) {
                            $("#uv-index").addClass("bg-danger");
                            $("#uv-index").removeClass("bg-success");
                            $("#uv-index").removeClass("bg-warning");
                        }
                        else {
                            $("#uv-index").addClass("bg-succsess");
                            $("#uv-index").removeClass("bg-warning");
                            $("#uv-index").removeClass("bg-danger");
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    })


            })
            .catch(function (error) {
                console.log(error);
            });

    })

})