$(document).ready(function () {
  var today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  var today = mm + "/" + dd + "/" + yyyy;

  var icon = $("<i>");
  var userCityName;
//  var userCityName = $("#city-input").val();
  var oldSearches = JSON.parse(localStorage.getItem("usersearches")) || []
  init();
  
  $("#clearHistory").on("click", function() {
    console.log("15")

   $("#lastSearches").empty()
    window.localStorage.clear();
  
  });

  function generateSearchButtons() {
   
  // window.localStorage.empty()
    $("#lastSearches").empty()

      oldSearches.forEach(function(userCityName){
        var buttonEl = $("<button>").text(userCityName)

        console.log(buttonEl)
    
     $("#lastSearches").append(buttonEl) 
    })

  }

  $("#lastSearches").on("click", "button", function(){
    $("#fiveDay").show();
    $("#cast").show();

getWeather($(this).text())

    
 }) 
 


  //hiding display of five day focast
  function init() {
   $("#cast").hide();
    $("#fiveDay").hide();
    //generateSearchButtons()
  }

  //event listener on search button with funtion

  $(".searchBtn").on("click", function (e) {
   $("#cast").show();
   $("#fiveDay").show();
    e.preventDefault();

   userCityName = $("#city-input").val();
   // console.log(userCityName);

    if (userCityName === "") {
      alert("You must enter a city");
    }
    console.log("clicked button");
    getWeather(userCityName);
  });

  function getWeather(userCityName) {
    APIKey = "bfedd0c93a6a513e8a245897a85a7ed7";

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      userCityName +
      "&appid=" +
      APIKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {

    //pushing user entered city name to var oldSearches.
        oldSearches.push(userCityName)

    //strigifying the objects on var oldSearches.
        localStorage.setItem("usersearches", JSON.stringify(oldSearches))
        
        
    //running generate button function
        generateSearchButtons() 

      //  console.log("38", response);

        //Converting temperature to farenheit.
        var tempF = (response.main.temp - 273.15) * 1.8 + 32;
        var image = $("#weatherIcon").attr(
          "src",
          "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
        );

        //console.log("icon" , response.weather[0].icon)

        //creating i div for adding font awesome class
        var icon = $("<i>");

        if (tempF.toFixed(0) < 35) {
          icon.addClass("fas fa-snowflake");
          $("#temp-icon").append(icon);
        } else {
          icon.addClass("fas fa-temperature-high");
          $("#temp-icon").append(icon);
        }

        $(".cityName").text(
          "City Name: " + response.name + " " + "(" + today + ")"
        );
        $(".temperature")
          .text("Temperature: " + tempF.toFixed(0) + "°F ")
          .append(icon);
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".windSpeed").text(
          "Wind Speed: " + response.wind.speed + " " + "mph"
        );

        //Grabbing longitude and Latitude Cordinates from  console.log(response) to get UV index

        var Lat = response.coord.lat;
        var Lon = response.coord.lon;

       // console.log(Lat, Lon);

        var queryURL =
          "https://api.openweathermap.org/data/2.5/uvi?lat=" +
          Lat +
          "&lon=" +
          Lon +
          "&appid=" +
          APIKey;

        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function (response) {
       //   console.log(response);

          //Getting UV index value from above response
          $(".uvIndex").text("UV Index: " + response.value);

          //Defining the color for UV index
          if (response.value > 3) {
            $(".uvIndex").css("background-color", "red");
          } else {
            $(".uvIndex").css("background-color", "lightgreen");
          }
        });

        fivedayforecast();

        ///5 day forecast
        function fivedayforecast() {
          var queryURL =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            userCityName +
            "&appid=" +
            APIKey;
          //var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" +  Lat + "&lon=" + Lon + "&exclude=hourly,minutely,alerts&appid=" + APIKey;

          $.ajax({
            url: queryURL,
            method: "GET",
          })

            // We store all of the retrieved data inside of an object called "response"
            .then(function (response) {
              console.log("125", response);
              var result = response.list;

      //        console.log(result.length);
              $("h3").text("5 Day Forecast:");
             
        $("#fiveDay").empty()
              for (var i = 5; i < result.length; i += 8) {
                var onlyDate = response.list[i].dt_txt.substr(0, 10);
                var tempF = (response.list[i].main.temp - 273.15) * 1.8 + 32;
                //var imgDiv = $("<img id: 'icon', src: 'http://openweathermap.org/img/w/'>" + response.list[i].weather[0].icon + ".png")
                var image = $("<img>").attr(
                  "src",
                  "http://openweathermap.org/img/w/" +
                    response.list[i].weather[0].icon +
                    ".png"
                );
                var fiveDayDiv = $(
                  "<div class='card text-center mx-auto mb-10 p-3' id=' style='width: 18rem; height: 10rem;'>"
                );
                var dateDiv = $("<div class='date'>").appendTo(fiveDayDiv);
                var tempDiv = $("<div class= 'temp'>");
                var humidDiv = $("<div class='humid'>");

                dateDiv.text(onlyDate);
       //         console.log(onlyDate);

                console.log(response.list[i].weather[0].icon);

                tempDiv.text("Temp: " + tempF.toFixed(0) + "  °F");
        //        console.log(tempF.toFixed(0));

                humidDiv.text(
                  "Humid: " + response.list[i].main.humidity + " %"
                );
         //       console.log(response.list[i].main.humidity);

                //$(".temp").text("Temp:" + tempF.toFixed(0) + "°F ")
                // $(".humid").text("Humid:" + response.list[i].main.humidity + "%")

                dateDiv.appendTo(fiveDayDiv); // or you can also write it as[ fiveDayDiv.append(dateDiv) ]
                image.appendTo(fiveDayDiv);
                tempDiv.appendTo(fiveDayDiv);
                humidDiv.appendTo(fiveDayDiv);
                $("#fiveDay").append(fiveDayDiv);
                $("#fiveday").appendTo($(".container"));

                //console logging to check  the list:
           //     console.log(response.list[i]);
              }
            });
        }
      });
  }
});
