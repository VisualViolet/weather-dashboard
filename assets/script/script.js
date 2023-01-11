const apiKey = "f170c4477d9ee4c56a98f0324cfdbeb4";
const unit = "imperial";
var currentDate = (new Date()).toLocaleDateString('en-US');

var searchBtn = document.getElementById("search-btn");
const cityEl = document.getElementById("city-name");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const citySearchEl = document.getElementById("search-city");


function getWeather(){
    var city = document.getElementById("city-input").value;
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
        cityEl.innerHTML = (city + " " + "(" + currentDate + ")");
        iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + icon + ".png");
        cityEl.append(iconEl);
        tempEl.innerHTML = ("Temperature: " + temperature + "\u00B0");
        windEl.innerHTML = ("Wind: " + wind + " MPH");
        humidityEl.innerHTML = ("Humidity: " + humidity);

        

        requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + unit + "&appid=" + apiKey;
        fetch(requestURL)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            var forecastDays = document.querySelectorAll(".col");
            var city = data.city.name;

            for (let i = 0; i < forecastDays.length; i++) {
                forecastDays[i].innerHTML = "";
                var forecastDataIndex = i * 8 + 2;

                var forecastDate = new Date();
                forecastDate.setDate(forecastDate.getDate() + (i+1));
                forecastDate = forecastDate.toLocaleDateString('en-US');

                var forecastDateEl = document.createElement("h3");
                forecastDateEl.textContent = forecastDate;
                forecastDays[i].append(forecastDateEl);

                var icon = data.list[forecastDataIndex].weather[0].icon;
                var forecastIconEl = document.createElement("img");
                forecastIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + icon + ".png");
                forecastDays[i].append(forecastIconEl);


                var temperature = data.list[forecastDataIndex].main.temp;
                var forecastTempEl = document.createElement("p");
                forecastTempEl.textContent = ("Temperature: " + temperature + "\u00B0");
                forecastDays[i].append(forecastTempEl);

                var wind = data.list[forecastDataIndex].wind.speed;
                var forecastWindEl = document.createElement("p");
                forecastWindEl.textContent = ("Wind: " + wind + " MPH");
                forecastDays[i].append(forecastWindEl);

                var humidity = data.list[forecastDataIndex].main.humidity;
                var forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.textContent = ("Humidity: " + humidity);
                forecastDays[i].append(forecastHumidityEl);

            }
            createHistoryBtn(city);
        })

        function createHistoryBtn(city){
            var historyBtn = document.createElement("btn");
            historyBtn.setAttribute("type", "button");
            historyBtn.setAttribute("class", "btn custom-btn mt-2 history");
            historyBtn.textContent = city;
            citySearchEl.append(historyBtn);
        }

        
    })
}

function retrieveHistory() {
    alert("Yay, we work!");
}

searchBtn.addEventListener('click', getWeather);
document.getElementById("search-city").addEventListener('click', function(e){
    if(e.target.classList.contains("history"))
    {
        retrieveHistory();
    }
});




