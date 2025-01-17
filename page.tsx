"use client"

import { useState, useEffect } from 'react'
import WeatherInsights from './components/WeatherInsights'
import NavigationAssistance from './components/NavigationAssistance'
import EmergencyToolkit from './components/EmergencyToolkit'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { ThemeProvider } from "@/components/theme-provider"

export default function SeaBuddy() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (err) => {
          setError("Failed to get your location. Please enable location services.")
        }
      )
    } else {
      setError("Geolocation is not supported by your browser.")
    }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground p-4">
        <h1 className="text-3xl font-bold text-center mb-6">SeaBuddy: Your Onboard Companion</h1>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Tabs defaultValue="weather" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weather">Weather Insights</TabsTrigger>
            <TabsTrigger value="navigation">Navigation Assistance</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Toolkit</TabsTrigger>
          </TabsList>
          <TabsContent value="weather">
            <WeatherInsights location={location} />
          </TabsContent>
          <TabsContent value="navigation">
            <NavigationAssistance location={location} />
          </TabsContent>
          <TabsContent value="emergency">
            <EmergencyToolkit location={location} />
          </TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  )
}

