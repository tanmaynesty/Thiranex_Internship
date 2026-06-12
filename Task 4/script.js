// script.js

// TODO: Replace with your actual OpenWeatherMap API key
const API_KEY = 'YOUR_API_KEY_HERE'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const errorMessage = document.getElementById('error-message');

// Event Listener for the Search Button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        showError('Please enter a city name.');
    }
});

// Optional: Allow pressing "Enter" to search
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

/**
 * Fetches weather data asynchronously
 * @param {string} city - The city name to search for
 */
async function fetchWeather(city) {
    try {
        // 1. Hide previous results/errors while loading
        weatherDisplay.classList.add('hidden');
        errorMessage.classList.add('hidden');

        // 2. Construct the API URL (using metric units for Celsius and m/s)
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

        // 3. Await the fetch request
        const response = await fetch(url);

        // 4. Handle HTTP errors (e.g., 404 City Not Found)
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check your spelling.');
            } else {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        }

        // 5. Parse the JSON data
        const data = await response.json();

        // 6. Pass the parsed JSON to the rendering function
        renderWeather(data);

    } catch (error) {
        // Catch network errors or the custom errors thrown above
        showError(error.message);
    }
}

/**
 * Parses the nested JSON and updates the DOM
 * @param {Object} data - The JSON response from the API
 */
function renderWeather(data) {
    // Extracting data from the nested JSON object
    const cityName = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Injecting data into the DOM
    document.getElementById('city-name').textContent = `${cityName}, ${country}`;
    document.getElementById('temperature').textContent = `${temp.toFixed(1)}°C`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('wind-speed').textContent = `${windSpeed} m/s`;

    // Reveal the weather display container
    weatherDisplay.classList.remove('hidden');
}

/**
 * Displays error messages to the user
 * @param {string} message - The error message to show
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
}