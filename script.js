var userCityName =  document.getElementById("city-input");

    var today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    var today = mm + '/' + dd + '/' + yyyy;
    
    $(".searchBtn").on("click", function(e) {
        e.preventDefault()
        if (userCityName === "") {
            alert("You must enter a city");
            
        }
        console.log("clicked button")
        getWeather();
    });
    

    function getWeather() {
APIKey="bfedd0c93a6a513e8a245897a85a7ed7"

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ "Herriman" + "&appid=" + APIKey;
        
        $.ajax({
            url: queryURL,
            method: "GET"
          })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {

            console.log(response)
        
            $(".cityName").text("City Name: " + response.name);    
            $(".temperature").text("Temperature: " + response.main.temp);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".windSpeed").text("Wind Speed: " + response.wind.speed);
            $(".uvIndex").text("UV Index: " + response.main.temp);

           })};