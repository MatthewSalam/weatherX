'use client'
import WeatherLayout from '@/components/WeatherLayout'
import WeatherDisplay from '@/components/WeatherDisplay'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const randomCities = [
  'Tokyo,JP',
  'Paris,FR', 
  'New York,US',
  'London,UK',
  'Sydney,AU',
  'Cairo,EG',
  'Mumbai,IN',
  'São Paulo,BR',
  'Lagos,NG',
  'Moscow,RU',
  'Bangkok,TH',
  'Dubai,AE',
  'Mexico City,MX',
  'Seoul,KR',
  'Istanbul,TR',
  'Amsterdam,NL',
  'Cape Town,ZA',
  'Buenos Aires,AR',
  'Toronto,CA',
  'Singapore,SG',
  'Lagos,NG'
]

export default function Page() {
  const [randomCity, setRandomCity] = useState('')
  const [apiUrl, setApiUrl] = useState('')
  const router = useRouter()

  useEffect(() => {
    const city = randomCities[Math.floor(Math.random() * randomCities.length)]
    setRandomCity(city)
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&APPID=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    setApiUrl(url)
  }, [])

  const handleNewRandom = () => {
    const city = randomCities[Math.floor(Math.random() * randomCities.length)]
    setRandomCity(city)
    setApiUrl( `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&APPID=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`)
  }

  const handleLocationSearch = () => {
    // Navigate to the specific location page
    router.push = '/locations'
  }

  return (
    <WeatherLayout 
      subtitle="This is the weather for a random location to get you started:"
    >
      {apiUrl && (<WeatherDisplay
        title = {`Weather report for ${randomCity.split(',')[0]}`}
        apiUrl={`http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
        buttonText="Get weather for a specific location"
        onButtonClick={handleLocationSearch}
      />)}

      <button 
        onClick={handleNewRandom}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2 w-full"
      >
        🎲 Get Another Random Location
      </button>

    </WeatherLayout>
  )
}