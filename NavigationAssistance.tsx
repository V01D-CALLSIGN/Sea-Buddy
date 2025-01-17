import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

export default function NavigationAssistance({ location }) {
  if (!location) return <NavigationSkeleton />

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Position</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Latitude: {location.latitude.toFixed(4)}</p>
        <p>Longitude: {location.longitude.toFixed(4)}</p>
      </CardContent>
    </Card>
  )
}

function NavigationSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-[250px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-[200px] mb-2" />
        <Skeleton className="h-4 w-[200px]" />
      </CardContent>
    </Card>
  )
}

