const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'weather.db'
});

const Weather = sequelize.define('Weather', {
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weather: {
        type: DataTypes.STRING,
        allowNull: false
    },
    temp: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    feels_like: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const DailySummary = sequelize.define('DailySummary', {
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avg_temp: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    max_temp: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    min_temp: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dominant_weather: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync();

module.exports = { Weather, DailySummary };
