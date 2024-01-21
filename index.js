const apiKey = "c28299d283bd1b8dee1809d7611c4e22";

function searchWeather() {
  const cityInput = document.getElementById("cityInput").value;
  const weatherContainer = document.getElementById("weatherContainer");
  const graphContainer = document.getElementById("graphContainer");

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
        graphContainer,
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
  const graphContainer = document.getElementById("graphContainer");

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
            graphContainer,
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

function updateWeatherDataChart(
  graphContainer,
  temperature,
  humidity,
  windSpeed,
  pressure
) {
  // Clear existing content in the graphContainer
  graphContainer.innerHTML = "";

  // Create canvas element for the chart
  const canvas = document.createElement("canvas");
  canvas.id = "weatherDataChart";
  canvas.width = 400;
  canvas.height = 200;
  graphContainer.appendChild(canvas);

  // Draw the chart using the provided weather data
  const ctx = canvas.getContext("2d");
  const dataCount = 4;
  const numberCfg = { count: dataCount, min: -100, max: 100 };
  const labels = ["Temperature", "Humidity", "Wind Speed", "Pressure"];

  const datasets = [
    {
      label: "Weather Data",
      data: [temperature, humidity, windSpeed, pressure],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderWidth: 2,
      pointRadius: 5,
      pointBackgroundColor: "rgba(75, 192, 192, 1)",
    },
  ];

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  new Chart(ctx, {
    type: "line",
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          color: "#333", // Change this to your desired text color
        },
        y: {
          beginAtZero: true,
          color: "#333", // Change this to your desired text color
        },
      },
    },
  });
}
