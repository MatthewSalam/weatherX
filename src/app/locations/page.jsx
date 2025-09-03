'use client'
import WeatherLayout from '@/components/WeatherLayout'
import { useRouter } from 'next/navigation'
import WeatherDisplay from '@/components/WeatherDisplay'
import { useState } from 'react'

export default function LocationsPage() {
    const [location, setLocation] = useState('')
    const [apiUrl, setApiUrl] = useState('')
    const router = useRouter()

    const handleLocationSubmit = (e) => {
        e.preventDefault()
        if (location.trim()){
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&APPID=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
            setApiUrl(url)
        }
    }

    const handleBackToRandom = () =>{router.push('/')}

    return(
        <WeatherLayout
            title='Search Weather by Location'
            subtitle='Enter a city name to get the current weather information.'
            >
            <form onSubmit={handleLocationSubmit} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter city name (e.g., Paris, Tokyo, New York, Lagos)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <button 
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                    >
                        Search
                    </button>
                    </div>
                </form>

                {apiUrl && (
                    <WeatherDisplay
                        title={`Weather report for ${location}`}
                        apiUrl={apiUrl}
                        buttonText='Back to random location weather'
                        onButtonClick={handleBackToRandom}/>
                )}

                {!apiUrl && (
                    <div className='bg-gray-100 p-6 rounded text-center'>
                        <p className='text-gray-600'>Enter a location above to see its weather data</p>
                        <button 
                            onClick={handleBackToRandom}
                            className="bg-gray-200 hover:bg-blue-200 py-2 px-4 rounded mt-4"
                        >
                            Back to random location
                        </button>
                    </div>
                )}
            
            </WeatherLayout>
    )
}