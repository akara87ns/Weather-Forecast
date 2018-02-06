var city = document.getElementById("city");
var apiKey = "&APPID=3726fe9cef4ab9d506ee77d8d8f7f3d1";

//Enter key registered as search button click event
city.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btn").click()
    }
});

//Click event registered on search button
document.getElementById("btn").addEventListener("click", function() {
    searchWeatherForecast(), searchCurrentWeather()
});

function searchWeatherForecast() {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city.value + apiKey, true);

    xhr.onload = function() {
        if (this.status === 200) {
            //wfd = weather forecast data
            var wfd = JSON.parse(this.responseText);
            console.log(wfd);
        }
    }

    xhr.send();
}

function searchCurrentWeather() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + apiKey, true);

    xhr.onload = function() {
        if (this.status === 200) {
            //wfd = weather current data
            var wcd = JSON.parse(this.responseText);
            console.log(wcd);
        }
    }

    xhr.send();
}