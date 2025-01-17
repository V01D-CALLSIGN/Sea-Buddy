import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export default function EmergencyToolkit({ location }) {
  const sendSOS = () => {
    if (location) {
      console.log(`SOS signal would be sent with coordinates: Lat ${location.latitude.toFixed(4)}, Lon ${location.longitude.toFixed(4)}`)
    } else {
      console.log('Location unavailable. Enable location services to include position in SOS signal.')
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>First Aid Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li>Check for danger</li>
            <li>Check for response</li>
            <li>Call for help</li>
            <li>Check airway and breathing</li>
            <li>Perform CPR if necessary</li>
          </ul>
        </CardContent>
      </Card>
      <Button onClick={sendSOS} variant="destructive" className="w-full">
        Simulate SOS Signal
      </Button>
      {!location && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Location Unavailable</AlertTitle>
          <AlertDescription>Enable location services to include your position in the SOS signal.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

