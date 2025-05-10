'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, MessageSquare } from 'lucide-react'
import HamburgerMenu from '@/components/hamburgerMenu'
import ShareIcon from '@/components/shareIcon'
import { useTranslation } from '@/utils/i18n'
import { GoogleMap, MarkerF, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api'

// Mock driver data
const driverData = {
  name: 'Rahul Singh',
  vehicleNumber: 'DL 5S AB 1234',
  rating: 4.8,
  phone: '+91 98765 43210',
  vehicleType: 'Car',
  otp: '1234',
  image: '/placeholder.svg?height=100&width=100',
}

const containerStyle = {
  width: '100%',
  height: '100%',
}

export default function TrackingPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [timeLeft, setTimeLeft] = useState(20)
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [driverPosition, setDriverPosition] = useState<{ lat: number; lng: number }>({ lat: 17.385044, lng: 78.486671 })

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push('/rider/startRide')
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, router])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        },
        () => {
          console.warn('Geolocation permission denied or not available.')
          setPosition({ lat: 17.385044, lng: 78.486671 }) // fallback to Hyderabad
        }
      )
    }
  }, [])

  // Simulate driver movement (randomly within 0.01 latitude and longitude)
  useEffect(() => {
    const driverMovementInterval = setInterval(() => {
      setDriverPosition((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.01, // Random change within range
        lng: prev.lng + (Math.random() - 0.5) * 0.01,
      }))
    }, 3000)

    return () => clearInterval(driverMovementInterval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <HamburgerMenu />
        <h1 className="text-xl font-bold">{t('tracking.title')}</h1>
        <ShareIcon />
      </header>

      <main className="flex-1 p-4">
        <div className="relative mb-6 h-64 w-full rounded-lg overflow-hidden border">
          {isLoaded && position && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={position}
              zoom={13}
            >
              {/* Driver's current position */}
              <MarkerF position={driverPosition} label="Driver" />

              {/* Pickup and Drop markers + route */}
              <DirectionsRendererWithMarkers />
            </GoogleMap>
          )}
        </div>

        <Card className="border-black">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={driverData.image}
                  alt={driverData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold">{driverData.name}</h2>
                <p className="text-sm text-gray-600">
                  {driverData.vehicleType} • {driverData.vehicleNumber}
                </p>
                <div className="mt-1 flex items-center">
                  <span className="mr-1 text-sm">⭐ {driverData.rating}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="rounded-full border-black">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-black">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-gray-100 p-3">
              <p className="text-sm font-medium">{t('tracking.shareOtp')}</p>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-2xl font-bold tracking-wider">{driverData.otp}</div>
                <p className="text-sm text-gray-600">
                  {t('tracking.arriving')}: {timeLeft}s
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div>
                <span className="font-medium">{t('tracking.from')}:</span>{' '}
                {localStorage.getItem('pickupLocation') || ''}
              </div>
              <div>
                <span className="font-medium">{t('tracking.to')}:</span>{' '}
                {localStorage.getItem('dropoffLocation') || ''}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// Directions with Pickup and Drop markers
function DirectionsRendererWithMarkers() {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)

  const pickup = localStorage.getItem('pickupLocation') || ''
  const dropoff = localStorage.getItem('dropoffLocation') || ''

  useEffect(() => {
    if (!pickup || !dropoff) return

    const geocoder = new google.maps.Geocoder()
    const directionsService = new google.maps.DirectionsService()

    geocoder.geocode({ address: pickup }, (pickupResults, pickupStatus) => {
      if (pickupStatus === 'OK' && pickupResults[0]) {
        const pickupLatLng = pickupResults[0].geometry.location

        geocoder.geocode({ address: dropoff }, (dropoffResults, dropoffStatus) => {
          if (dropoffStatus === 'OK' && dropoffResults[0]) {
            const dropoffLatLng = dropoffResults[0].geometry.location

            directionsService.route(
              {
                origin: pickupLatLng,
                destination: dropoffLatLng,
                travelMode: google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === 'OK' && result) {
                  setDirections(result)
                }
              }
            )
          }
        })
      }
    })
  }, [pickup, dropoff])

  return (
    <>
      {directions && <DirectionsRenderer directions={directions} />}
    </>
  )
}


// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Phone, MessageSquare } from 'lucide-react'
// import HamburgerMenu from '@/components/hamburgerMenu'
// import ShareIcon from '@/components/shareIcon'
// import { useTranslation } from '@/utils/i18n'
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

// // Mock driver data
// const driverData = {
//   name: 'Rahul Singh',
//   vehicleNumber: 'DL 5S AB 1234',
//   rating: 4.8,
//   phone: '+91 98765 43210',
//   vehicleType: 'Car',
//   otp: '1234',
//   image: '/placeholder.svg?height=100&width=100',
// }

// const containerStyle = {
//   width: '100%',
//   height: '100%',
// }

// export default function TrackingPage() {
//   const router = useRouter()
//   const { t } = useTranslation()
//   const [timeLeft, setTimeLeft] = useState(20)
//   const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null)

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
//   })

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       router.push('/rider/startRide')
//       return
//     }

//     const timer = setTimeout(() => {
//       setTimeLeft((prev) => prev - 1)
//     }, 1000)

//     return () => clearTimeout(timer)
//   }, [timeLeft, router])

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setPosition({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           })
//         },
//         () => {
//           console.warn('Geolocation permission denied or not available.')
//           setPosition({ lat: 17.385044, lng: 78.486671 }) // fallback to Hyderabad
//         }
//       )
//     }
//   }, [])

//   return (
//     <div className="flex min-h-screen flex-col bg-white">
//       <header className="flex items-center justify-between border-b border-gray-200 p-4">
//         <HamburgerMenu />
//         <h1 className="text-xl font-bold">{t('tracking.title')}</h1>
//         <ShareIcon />
//       </header>

//       <main className="flex-1 p-4">
//         <div className="relative mb-6 h-64 w-full rounded-lg overflow-hidden border">
//           {isLoaded && position && (
//             <GoogleMap
//               mapContainerStyle={containerStyle}
//               center={position}
//               zoom={15}
//             >
//               <Marker position={position} />
//             </GoogleMap>
//           )}
//         </div>

//         <Card className="border-black">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-4">
//               <div className="relative h-16 w-16 overflow-hidden rounded-full">
//                 <Image
//                   src={driverData.image}
//                   alt={driverData.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="flex-1">
//                 <h2 className="text-lg font-bold">{driverData.name}</h2>
//                 <p className="text-sm text-gray-600">
//                   {driverData.vehicleType} • {driverData.vehicleNumber}
//                 </p>
//                 <div className="mt-1 flex items-center">
//                   <span className="mr-1 text-sm">⭐ {driverData.rating}</span>
//                 </div>
//               </div>
//               <div className="flex space-x-2">
//                 <Button variant="outline" size="icon" className="rounded-full border-black">
//                   <Phone className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon" className="rounded-full border-black">
//                   <MessageSquare className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             <div className="mt-4 rounded-lg bg-gray-100 p-3">
//               <p className="text-sm font-medium">{t('tracking.shareOtp')}</p>
//               <div className="mt-1 flex items-center justify-between">
//                 <div className="text-2xl font-bold tracking-wider">{driverData.otp}</div>
//                 <p className="text-sm text-gray-600">
//                   {t('tracking.arriving')}: {timeLeft}s
//                 </p>
//               </div>
//             </div>

//             <div className="mt-4 space-y-2 text-sm">
//               <div>
//                 <span className="font-medium">{t('tracking.from')}:</span>{' '}
//                 {localStorage.getItem('pickupLocation') || ''}
//               </div>
//               <div>
//                 <span className="font-medium">{t('tracking.to')}:</span>{' '}
//                 {localStorage.getItem('dropoffLocation') || ''}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   )
// }






