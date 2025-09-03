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
]

export default function Page() {
  const [randomCity, setRandomCity] = useState('')
  const [apiUrl, setApiUrl] = useState('')
  const router = useRouter()

  useEffect(() => {
    handleNewRandom()
  }, [])

  const handleNewRandom = () => {
    const city = randomCities[Math.floor(Math.random() * randomCities.length)]
    setRandomCity(city)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    setApiUrl(url)
  }

  const handleLocationSearch = () => {
    router.push('/locations') 
  }

  return (
    <WeatherLayout subtitle="This is the weather for a random location to get you started:">
      {apiUrl && (
        <WeatherDisplay
          title={`Weather report for ${randomCity.split(',')[0]}`}
          apiUrl={apiUrl}
          buttonText="Get weather for a specific location"
          onButtonClick={handleLocationSearch}
        />
      )}

      <button
        onClick={handleNewRandom}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2 w-full"
      >
        🎲 Get Another Random Location
      </button>
    </WeatherLayout>
  )
}
