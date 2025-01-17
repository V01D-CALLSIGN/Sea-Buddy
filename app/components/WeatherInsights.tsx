import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

export default function WeatherInsights({ location }) {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (location) {
      fetchWeatherData(location)
    }
  }, [location])

  const fetchWeatherData = async (loc) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.latitude}&lon=${loc.longitude}&units=metric&appid=${apiKey}`)
      const data = await response.json()
      setWeather({
        temperature: data.main.temp,
        condition: data.weather[0].description,
        windSpeed: data.wind.speed,
        waveHeight: 1.5 // Note: OpenWeather doesn't provide wave height, this is a placeholder
      })
    } catch (err) {
      setError("Failed to fetch weather data. Please try again later.")
    }
  }

  if (!location) return <WeatherSkeleton />
  if (error) return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
  if (!weather) return <WeatherSkeleton />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Temperature: {weather.temperature.toFixed(1)}°C</p>
          <p>Condition: {weather.condition}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sea Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Wind Speed: {weather.windSpeed.toFixed(1)} m/s</p>
          <p>Wave Height: {weather.waveHeight} meters</p>
        </CardContent>
      </Card>
    </div>
  )
}

function WeatherSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-[250px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[200px]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-[250px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[200px]" />
        </CardContent>
      </Card>
    </div>
  )
}

