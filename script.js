var userCityName =  $(this).parent().find("textarea").val();

    var today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    var today = mm + '/' + dd + '/' + yyyy;
    
    $(".submit").on("click", function(e) {
        e.preventDefault();
        if (userCityName.val() === "") {
            alert("You must enter a city");
            return;
        }
        console.log("clicked button")
        getWeather(userCityName.val());
    });
    

    function getWeather(userCityName) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userCityName + "&appid=" + APIKey;
        
        $.ajax({
            url: queryURL,
            method: "GET"
          })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {

            console.log(response)
        
            $(".cityName").text("City Name: " + response.name);    
            $(".temperature").text("Temperature: " + response.main.temp);
        
              // Log the queryURL
             // console.log(queryURL);
        
              // Log the resulting object
             // console.log(response);
            })};