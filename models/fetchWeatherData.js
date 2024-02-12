const Weather = require('../models/weather');

async function fetchWeatherData() {
    try {
        const weatherData = await Weather.find(); 
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

module.exports = fetchWeatherData;