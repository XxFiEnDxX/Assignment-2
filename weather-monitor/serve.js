const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

const API_KEY = '779a4c75a8080134b305a55891755652';
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
let weatherData = {};

const kelvinToCelsius = (kelvin) => kelvin - 273.15;

const fetchWeatherData = async () => {
    for (const city of cities) {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const data = response.data;
            const processedData = {
                weather: data.weather[0].main,
                temp: kelvinToCelsius(data.main.temp),
                feels_like: kelvinToCelsius(data.main.feels_like),
                timestamp: data.dt
            };
            if (!weatherData[city]) {
                weatherData[city] = [];
            }
            weatherData[city].push(processedData);
            // Add alert logic here if necessary
        } catch (error) {
            console.error(`Error fetching data for ${city}: `, error);
        }
    }
};

// Schedule the fetchWeatherData function to run every 5 minutes

cron.schedule('*/5 * * * *', fetchWeatherData);

app.get('/api/weather', (req, res) => {
    res.json(weatherData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    fetchWeatherData(); // Initial fetch
});
