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
    if (!apiUrl) return

    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetch(apiUrl)
        
        if (!data.ok) {
          throw new Error('Failed to fetch weather data')
        }
        
        const result = await data.json()
        setWeatherData(result)
      } catch (err) {
        setError(err.message)
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [apiUrl])

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