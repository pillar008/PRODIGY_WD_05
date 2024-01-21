const apiKey = "564d347a7d0381e02fb4349b31b8ea4e";

function searchWeather() {
  const cityInput = document.getElementById("cityInput").value;
  const weatherContainer = document.getElementById("weatherContainer");

  // Fetch weather data from OpenWeatherMap API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // Display weather data in weatherContainer
      weatherContainer.innerHTML = `<h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} &deg;C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">`;

      // Update the chart with weather data
      updateWeatherDataChart(
        data.main.temp,
        data.main.humidity,
        data.wind.speed,
        data.main.pressure
      );
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

function getCurrentLocationWeather() {
  const weatherContainer = document.getElementById("weatherContainer");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Fetch weather data for current location from OpenWeatherMap API
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          // Display weather data in weatherContainer
          weatherContainer.innerHTML = `<h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} &deg;C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
            <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">`;

          // Update the chart with weather data
          updateWeatherDataChart(
            data.main.temp,
            data.main.humidity,
            data.wind.speed,
            data.main.pressure
          );
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function updateWeatherDataChart(temperature, humidity, windSpeed, pressure) {
  // Get canvas element for the weather data chart
  const weatherDataChartCanvas = document.getElementById("weatherDataChart");

  // Create or update the weather data chart
  createOrUpdateWeatherDataChart(
    weatherDataChartCanvas,
    temperature,
    humidity,
    windSpeed,
    pressure
  );
}

function createOrUpdateWeatherDataChart(
  canvas,
  temperature,
  humidity,
  windSpeed,
  pressure
) {
  if (!canvas.chart) {
    // Create a new horizontal bar chart if it doesn't exist
    const ctx = canvas.getContext("2d");
    canvas.chart = new Chart(ctx, {
      type: "horizontalBar",
      data: {
        labels: ["Temperature", "Humidity", "Wind Speed", "Pressure"],
        datasets: [
          {
            label: "Weather Data",
            data: [temperature, humidity, windSpeed, pressure],
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 205, 86, 0.7)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  } else {
    // Update the existing chart with new data
    canvas.chart.data.datasets[0].data = [
      temperature,
      humidity,
      windSpeed,
      pressure,
    ];
    canvas.chart.update();
  }
}
