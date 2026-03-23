import React, { useState } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import ReactAnimatedWeather from "react-animated-weather";

export default function Weather() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState({ ready: false });

  function handleResponse(response) {
    setWeather({
      ready: true,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: Math.round(response.data.wind.speed),
      city: response.data.name,
      coordinates: response.data.coord,
    });
  }

  function search() {
    const apiKey = "39a3014fd34afe90bc14c4tc7oed280d";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function mapIcon(iconCode) {
    const iconMap = {
      "01d": "CLEAR_DAY",
      "01n": "CLEAR_NIGHT",
      "02d": "PARTLY_CLOUDY_DAY",
      "02n": "PARTLY_CLOUDY_NIGHT",
      "03d": "CLOUDY",
      "03n": "CLOUDY",
      "04d": "CLOUDY",
      "04n": "CLOUDY",
      "09d": "RAIN",
      "09n": "RAIN",
      "10d": "RAIN",
      "10n": "RAIN",
      "11d": "RAIN",
      "11n": "RAIN",
      "13d": "SNOW",
      "13n": "SNOW",
      "50d": "FOG",
      "50n": "FOG",
    };

    return iconMap[iconCode] || "CLEAR_DAY";
  }

  if (weather.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <input type="search" value={city} onChange={handleCityChange} />
          <button type="submit">Search</button>
        </form>

        <h1>{weather.city}</h1>

        <ReactAnimatedWeather
          icon={mapIcon(weather.icon)}
          color="blue"
          size={90}
          animate={true}
        />

        <h2>{weather.temperature}°C</h2>
        <p>{weather.description}</p>
        <p>Humidity: {weather.humidity}%</p>
        <p>Wind: {weather.wind} km/h</p>

        <WeatherForecast coordinates={weather.coordinates} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
