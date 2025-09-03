'use client'

import { useState, useEffect } from 'react'

export default function WeatherDisplay({ 
  title = "Weather report", 
  apiUrl, 
  buttonText = "Get weather for a specific location",
  onButtonClick 
}) {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

useEffect(() => {
  async function fetchWeather() {
    setLoading(true)
    setError(null) // reset error state

    try {
      const res = await fetch(apiUrl);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch weather data (${res.status}): ${text}`);
      }

      const result = await res.json();

      // OpenWeather sometimes gives cod: "404" instead of HTTP 404
      if (result.cod && result.cod !== 200) {
        throw new Error(result.message || "City not found");
      }

      setWeatherData(result);
    } catch (err) {
        // Instead of dumping the full raw error, keep it clean
        if (err.message.toLowerCase().includes("city not found")) {
          console.warn("City not found:", apiUrl); // log only useful info
          setError("Sorry, we couldn’t find that city. Please check the spelling and try again.");
        } else {
          console.error("Weather API error:", err.message); // log a simplified error
          setError("Something went wrong while fetching the weather data.");
        }
        } finally {
          setLoading(false);
        }
  }

  fetchWeather();
}, [apiUrl]);


  return (
    <div>
      <div className="bg-gray-200 p-3 mt-4">
        <p className="font-medium">{title}:</p>
        
        {loading && <p>Loading...</p>}
        
        {error && (
          <div className="text-red-600 bg-red-50 p-3 rounded mt-2">
            <p><strong>Error:</strong> {error}</p>
            <p>Please check your internet connection or try again later.</p>
          </div>
        )}
        
        {weatherData && !loading && !error && (
          <textarea 
            className="w-full h-96 p-2 font-mono text-xs mt-2"
            value={JSON.stringify(weatherData, null, 2)}
            readOnly
          />
        )}
      </div>
      
      {buttonText && (
        <button 
          className="bg-gray-200 hover:bg-blue-200 py-2 px-4 rounded mt-4 w-full"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}