// created elements
const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const cityName = document.querySelector("#city-name");
const date = document.querySelector("#date");
const weatherIcon = document.querySelector("#weather-icon");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const forecastCards = document.querySelectorAll(".forecast-card");

// get city weather
async function getWeatherData(city) {
    const apiKey = "4b82206812c40b239f6c2ba98569a5ec";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    return data;
  }

  // get forecast
async function getForecastData(city) {
    const apiKey = "4b82206812c40b239f6c2ba98569a5ec";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    return data.list;
  }