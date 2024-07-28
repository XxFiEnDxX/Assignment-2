import React from 'react';
import './App.css';
import Weather from './Weather.js';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Weather Monitor</h1>
                <Weather />
            </header>
        </div>
    );
}

export default App;
