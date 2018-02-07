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

//Turning seconds into miliseconds, and into actual date in the end
function getDate(date) {
    var date = new Date(date*1000);
    return date.toDateString();
}

//Clearing input field on page refresh and selecting text on focus
city.addEventListener("focus", function() {
    this.select();
});

window.onload = function() {
    city.value = "";
}


//AJAX function for getting current weather data
function searchCurrentWeather() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + apiKey, true);

    xhr.onload = function() {
        if (this.status === 200) {
            //wfd = weather current data
            var wcd = JSON.parse(this.responseText);
            console.log(wcd);
            var output = "";
            output += `
                <div class='currentData'> 
                    <h2>${wcd.name}</h2>
                    <div class='currentRow'>                                        <img src='http://openweathermap.org/img/w/${wcd.weather[0].icon}.png'>                  
                        <p><span class='big'> ${Math.round(wcd.main.temp - 273.15)}°<span> C</p>  
                        <div class='parameters'> 
                            <p>Humidity: <span>${wcd.main.humidity}%</span></p>
                            <p>Pressure: <span>${wcd.main.pressure} hPa</span></p>
                            <p>Wind: <span>${Math.round(wcd.wind.speed * 1.61)} kmh</span></p>
                        </div>                 
                    </div>
                    <p class='weatherDescription'>${wcd.weather[0].description}</p> 
                </div>`;

            outputHTML.innerHTML = output;
        }
        else {
            outputHTML.innerHTML = "<p>City not found. Try to spell name of the city in english.</p>"; 
        }
    }

    xhr.send();
}

//AJAX function for getting 7 day weather forecast
function searchWeatherForecast() {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city.value + apiKey, true);

    xhr.onload = function() {
        if (this.status === 200) {
            //wfd = weather forecast data
            var wfd = JSON.parse(this.responseText);
            console.log(wfd);

            var output = "";
            output += `
                <h3>7 days forecast</h3>
                <div class='daysForecast'>`; 

                for (var i = 0; i < wfd.list.length; i++) {
                    output += 
                    `<div> 
                        <p>${getDate(wfd.list[i].dt)}</p>
                        <img src='http://openweathermap.org/img/w/${wfd.list[i].weather[0].icon}.png'>
                        <p><span class='medium'> ${Math.round(wfd.list[i].temp.max - 273.15)}° </span> ${Math.round(wfd.list[i].temp.min - 273.15)}°</p> 
                        <p class='weatherDescription'> ${wfd.list[i].weather[0].description}</p> 
                    </div>`;
                }
            output += `</div>`; 

            outputHTML.innerHTML += output;
        } else {
            outputHTML.innerHTML = "<p>City not found. Try to spell name of the city in english language</p>"; 
        }
    }

    xhr.send();
}

