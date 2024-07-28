import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/weather');
                setWeatherData(response.data);
            } catch (error) {
                setError('Error fetching weather data.');
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
        const interval = setInterval(fetchWeatherData, 300000); // 5 minutes

        return () => clearInterval(interval);
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {Object.keys(weatherData).length === 0 ? (
                <div>Loading weather data...</div>
            ) : (
                Object.keys(weatherData).map(city => (
                    <div key={city}>
                        <h2>{city}</h2>
                        {weatherData[city].map((data, index) => (
                            <div key={index}>
                                <p>Weather: {data.weather}</p>
                                <p>Temperature: {data.temp.toFixed(2)}°C</p>
                                <p>Feels Like: {data.feels_like.toFixed(2)}°C</p>
                                <p>Timestamp: {new Date(data.timestamp * 1000).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default Weather;
