import React, { useEffect, useState } from 'react';
import cities from '../city.list.json';
import './Widget.css';

const api = {
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather?',
    apiKey: 'fa60c265836633f3a4a8baa52557c31e'
  }

  const months = ['Jan', 'Feb', 'Mar', "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday'];

const Widget = () => {
    const [weather, setWeather] = useState({});
    const [query, setQuery] = useState('');

    const getDate = (date) => {
        return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    const search = async (evt) => {
        if (evt.key === "Enter") {
            const response = await fetch(`${api.baseUrl}q=${query}&appid=${api.apiKey}&units=imperial`);
            setWeather(await response.json());
        }
    }

    return (
        <div className="widget-wrapper">
            <input
                type="text"
                onChange={e => setQuery(e.target.value)}
                onKeyPress={search}
                placeholder="Search..."
            />
            {weather.main && (
                <>
                    <h2>{weather.name}</h2>
                    <h3>{getDate(new Date())}</h3>
                    <h1>{Math.ceil(weather.main.temp)}&deg;F</h1>
                </>
            )}
        </div>
    )
}

export default Widget;
