var today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
var today = mm + '/' + dd + '/' + yyyy;
    
var icon =$("<i>")
var userCityName;

$(".searchBtn").on("click", function(e) {
         e.preventDefault()

userCityName =  $("#city-input").val();
console.log(userCityName)

if (userCityName === "") {
    alert("You must enter a city");
            
        }
    console.log("clicked button")
getWeather();
    });
    

function getWeather() {
   
APIKey = "bfedd0c93a6a513e8a245897a85a7ed7"

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userCityName + "&appid=" + APIKey;
        
$.ajax({
    url: queryURL,
    method: "GET"
          })
// We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

    console.log("38", response)

 //Converting temperature to farenheit. 
var tempF = (response.main.temp - 273.15) * 1.80 + 32;
var image = $("#weatherIcon").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
       
//console.log("icon" , response.weather[0].icon)

var icon =$("<i>")
       

if (tempF.toFixed(0) < 35) {
        
        icon.addClass("fas fa-snowflake");
        $("#temp-icon").append(icon)

} else {
        
        icon.addClass("fas fa-temperature-high");
        $("#temp-icon").append(icon)
    };


    $(".cityName").text("City Name: " + response.name +" " + "("+ today +")");    
    $(".temperature").text("Temperature: " + tempF.toFixed(0) + "°F ").append(icon);
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    $(".windSpeed").text("Wind Speed: " + response.wind.speed + " " + "mph");
           
           
//Grabbing longitude and Latitude Cordinates from  console.log(response) to get UV index

var Lat = response.coord.lat
var Lon = response.coord.lon

console.log(Lat, Lon)

var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+ Lat + "&lon=" + Lon + "&appid=" + APIKey;
        
$.ajax({
    url: queryURL,
    method: "GET"
          })
.then(function(response) {

    console.log(response)

//Getting UV index value from above response
$(".uvIndex").text("UV Index: " + response.value);

//Defining the color for UV index
if (response.value > 3) {
          $(".uvIndex").css('background-color', 'red');
            }

 else {
     $(".uvIndex").css('background-color', 'lightgreen');
            }
           })

fivedayforecast()

///5 day forecast
function fivedayforecast() {
var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + userCityName + "&cnt=7&appid=" + APIKey;
//var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +  userCityName + "&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
          })

// We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

    console.log("109", response)

$("h3").text("5 Day Forecast:");
$(".container").show();
$(".date").text()



console.log("good")
//$(".futureCast").show();
    })

}
           })};