// created elements
const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const cityName = document.querySelector("#city-name");
const date = document.querySelector("#date");
const weatherIcon = document.querySelector("#weather-icon");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const forecastCards = document.querySelectorAll(".forecast-card");

// get city weather
async function getWeatherData(city) {
    const apiKey = "4b82206812c40b239f6c2ba98569a5ec";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    return data;
  }

  // get forecast
async function getForecastData(city) {
    const apiKey = "4b82206812c40b239f6c2ba98569a5ec";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    return data.list;
  }

  // update weather
function updateCurrentWeather(data) {
    cityName.textContent = data.name;
    date.textContent = new Date().toLocaleDateString();
    temperature.textContent = `${Math.round(data.main.temp)}°F`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    weatherIcon.innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
  }

  // update forecast
function updateForecast(data) {
    let forecastIndex = 0;
    for (let i = 0; i < data.length; i++) {
      const forecastDate = new Date(data[i].dt_txt);
      if (forecastDate.getHours() === 12) {
        const forecastCard = forecastCards[forecastIndex];
        const forecastIcon = forecastCard.querySelector(".forecast-icon");
        const forecastDateEl = forecastCard.querySelector(".forecast-date");
        const forecastTemp = forecastCard.querySelector(".forecast-temp");
        const forecastHumidity = forecastCard.querySelector(".forecast-humidity");
        
        forecastIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data[i].weather[0].icon}.png" alt="${data[i].weather[0].description}">`;
        forecastDateEl.textContent = forecastDate.toLocaleDateString();
        forecastTemp.textContent = `${Math.round(data[i].main.temp)}°C`;
        forecastHumidity.textContent = `Humidity: ${data[i].main.humidity}%`;
        
        forecastIndex++;
      }
    }
  }

// form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const city = cityInput.value.trim();
    if (!city) {
      return;
    } 
     // current weather
  const currentData = await getWeatherData(city);
  updateCurrentWeather(currentData);
  
  // forecast data
  const forecastData = await getForecastData(city);
  updateForecast(forecastData);
}

// event listener 
searchForm.addEventListener("submit", handleFormSubmit);