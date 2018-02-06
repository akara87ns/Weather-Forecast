var city = document.getElementById("city");
var apiKey = "&APPID=3726fe9cef4ab9d506ee77d8d8f7f3d1";
var outputHTML = document.getElementById("results");

//Enter key registered as a click event of a search button
city.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btn").click()
    }
});

//Click event registered on search button
document.getElementById("btn").addEventListener("click", function() {
    searchCurrentWeather(), searchWeatherForecast()
});

function searchCurrentWeather() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + apiKey, true);

    xhr.onload = function() {
        if (this.status === 200) {
            //wfd = weather current data
            var wcd = JSON.parse(this.responseText);
            console.log(wcd);
            var output = "";
            output += 
                "<div class='currentData'>" + 
                    "<h2>" + wcd.name + "</h2>" +
                    "<div class='currentRow'" + 
                        "<div>" + 
                            "<img src='http://openweathermap.org/img/w/" + wcd.weather[0].icon + ".png'>" + 
                            "<p>" + wcd.weather[0].description + "</p>" + 
                        "</div>" + 
                        "<div>" + 
                            "<p><span>" + Math.round(wcd.main.temp - 273.15) + "<span> C</p>" + 
                        "</div>" +
                        "<div>" + 
                            "<p>Humidity: " + wcd.main.humidity + "%</p>" +
                            "<p>Pressure: " + wcd.main.pressure + " hPa</p>" +
                            "<p>Wind: " + Math.round(wcd.wind.speed * 1.61) + "kmh</p>" +
                        "</div>" +
                "</div>";

            outputHTML.innerHTML = output;
        }
        else {
            outputHTML.innerHTML = "<p>City not found. Try to spell name of the city in english.</p>"; 
        }
    }

    xhr.send();
}

function searchWeatherForecast() {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city.value + apiKey, true);

    xhr.onload = function() {
        if (this.status === 200) {
            //wfd = weather forecast data
            var wfd = JSON.parse(this.responseText);
            console.log(wfd);
        } else {
            outputHTML.innerHTML = "<p>City not found. Try to spell name of the city in english language</p>"; 
        }
    }

    xhr.send();
}

