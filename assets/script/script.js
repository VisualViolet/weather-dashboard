const apiKey = "f170c4477d9ee4c56a98f0324cfdbeb4";
const unit = "imperial";
const currentDate = "(" + dayjs().format("M/D/YYYY") + ")";

var searchBtn = document.getElementById("search-btn");
const cityEl = document.getElementById("city-name");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");


function getWeather(){
    var city = document.getElementById("city-search").value;
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + apiKey;
    fetch(requestURL)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        var city = (data.name);
        var temperature = (data.main.temp);
        var wind = (data.wind.speed);
        var humidity = (data.main.humidity + "%");
        var icon = (data.weather[0].icon);
        var iconEl = document.createElement("img");
        cityEl.innerHTML = (city + " " + currentDate);
        iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + icon + ".png");
        cityEl.append(iconEl);
        tempEl.innerHTML = ("Temperature: " + temperature);
        windEl.innerHTML = ("Wind: " + wind + " MPH");
        humidityEl.innerHTML = ("Humidity: " + humidity);

    })
}

searchBtn.addEventListener('click', getWeather);




