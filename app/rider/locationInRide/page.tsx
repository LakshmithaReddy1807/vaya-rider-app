'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import HamburgerMenu from '@/components/hamburgerMenu'
import ShareIcon from '@/components/shareIcon'
import { useTranslation } from '@/utils/i18n'
import { useToast } from '@/hooks/use-toast'

const driverData = {
  name: 'Rahul Singh',
  vehicleNumber: 'DL 5S AB 1234',
  rating: 4.8,
  vehicleType: 'Car',
  image: '/placeholder.svg?height=100&width=100',
}

export default function LocationInRidePage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { toast } = useToast()

  const mapRef = useRef<HTMLDivElement | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null)

  const [timeLeft, setTimeLeft] = useState(30)
  const [loaded, setLoaded] = useState(false)

  const pickupAddress = typeof window !== 'undefined' ? localStorage.getItem('pickupLocation') || 'Hyderabad' : ''
  const dropoffAddress = typeof window !== 'undefined' ? localStorage.getItem('dropoffLocation') || 'Secunderabad' : ''

  useEffect(() => {
    toast({ title: t('toast.rideStarted'), variant: 'default' })
  }, [t, toast])

  useEffect(() => {
    const loadMap = async () => {
      if (!window.google || !mapRef.current) return

      const geocoder = new google.maps.Geocoder()

      const geocodeAddress = (address: string): Promise<google.maps.LatLngLiteral> => {
        return new Promise((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const location = results[0].geometry.location
              resolve({ lat: location.lat(), lng: location.lng() })
            } else {
              reject('Geocode failed for: ' + address)
            }
          })
        })
      }

      try {
        const pickup = await geocodeAddress(pickupAddress)
        const dropoff = await geocodeAddress(dropoffAddress)

        const map = new google.maps.Map(mapRef.current!, {
          center: pickup,
          zoom: 15,
        })
        mapInstanceRef.current = map

        const marker = new google.maps.Marker({
          position: pickup,
          map,
          title: 'Driver',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          },
        })
        markerRef.current = marker

        const directionsService = new google.maps.DirectionsService()
        const directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: '#000',
            strokeOpacity: 0.7,
            strokeWeight: 5,
          },
        })
        directionsRenderer.setMap(map)
        directionsRendererRef.current = directionsRenderer

        directionsService.route(
          {
            origin: pickup,
            destination: dropoff,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === 'OK' && result) {
              directionsRenderer.setDirections(result)

              const path = result.routes[0].overview_path
              let index = 0

              const moveDriver = () => {
                if (index < path.length) {
                  const point = path[index]
                  marker.setPosition(point)
                  map.panTo(point)
                  index++
                } else {
                  clearInterval(interval)
                }
              }

              const interval = setInterval(moveDriver, 1000)
            } else {
              console.error('Directions error:', status)
            }
          }
        )

        setLoaded(true)
      } catch (err) {
        console.error(err)
      }
    }

    if (window.google) loadMap()
  }, [pickupAddress, dropoffAddress])

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push('/rider/endRide')
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, router])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-black p-4">
        <HamburgerMenu />
        <h1 className="text-xl font-bold">{t('locationInRide.title')}</h1>
        <ShareIcon />
      </header>

      <main className="flex-1 p-4">
        <div className="relative mb-6 h-64 w-full border-2 border-black">
          <div ref={mapRef} className="h-full w-full rounded-none" />
          <div className="absolute bottom-4 right-4 rounded-none border-2 border-black bg-white p-2">
            <p className="text-sm font-medium">{t('locationInRide.eta')}: {timeLeft}s</p>
          </div>
        </div>

        <Card className="border-2 border-black">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-black">
                <Image
                  src={driverData.image}
                  alt={driverData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold">{driverData.name}</h2>
                <p className="text-sm">{driverData.vehicleType} • {driverData.vehicleNumber}</p>
                <div className="mt-1 flex items-center">
                  <span className="mr-1 text-sm">⭐ {driverData.rating}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-xs">{t('locationInRide.from')}</p>
                  <p className="text-sm">{pickupAddress}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-xs">{t('locationInRide.to')}</p>
                  <p className="text-sm">{dropoffAddress}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}





// "use client"

// import { useEffect, useRef, useState } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { Card, CardContent } from "@/components/ui/card"
// import { MapPin } from "lucide-react"
// import HamburgerMenu from "@/components/hamburgerMenu"
// import ShareIcon from "@/components/shareIcon"
// import { useTranslation } from "@/utils/i18n"
// import { useToast } from "@/hooks/use-toast"

// const driverData = {
//   name: "Rahul Singh",
//   vehicleNumber: "DL 5S AB 1234",
//   rating: 4.8,
//   vehicleType: "Car",
//   image: "/placeholder.svg?height=100&width=100",
// }

// export default function LocationInRidePage() {
//   const router = useRouter()
//   const { t } = useTranslation()
//   const { toast } = useToast()
//   const [timeLeft, setTimeLeft] = useState(30)
//   const mapRef = useRef<HTMLDivElement | null>(null)
//   const markerRef = useRef<google.maps.Marker | null>(null)
//   const mapInstanceRef = useRef<google.maps.Map | null>(null)

//   const pickup = { lat: 17.385044, lng: 78.486671 } // Hyderabad
//   const dropoff = { lat: 17.392, lng: 78.48 } // Simulated destination

//   useEffect(() => {
//     toast({ title: t("toast.rideStarted"), variant: "default" })
//   }, [t, toast])

//   useEffect(() => {
//     if (!window.google || !mapRef.current) return

//     const map = new google.maps.Map(mapRef.current, {
//       center: pickup,
//       zoom: 15,
//     })
//     mapInstanceRef.current = map

//     const marker = new google.maps.Marker({
//       position: pickup,
//       map,
//       title: "Driver",
//     })
//     markerRef.current = marker

//     // Simulate driver moving toward dropoff
//     let lat = pickup.lat
//     let lng = pickup.lng

//     const moveDriver = () => {
//       const latDiff = (dropoff.lat - lat) / 20
//       const lngDiff = (dropoff.lng - lng) / 20
//       lat += latDiff
//       lng += lngDiff

//       const newPos = new google.maps.LatLng(lat, lng)
//       marker.setPosition(newPos)
//       map.panTo(newPos)
//     }

//     const moveInterval = setInterval(() => {
//       moveDriver()
//     }, 2000)

//     return () => clearInterval(moveInterval)
//   }, [])

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       router.push("/rider/endRide")
//       return
//     }

//     const timer = setTimeout(() => {
//       setTimeLeft(timeLeft - 1)
//     }, 1000)

//     return () => clearTimeout(timer)
//   }, [timeLeft, router])

//   return (
//     <div className="flex min-h-screen flex-col bg-white">
//       <header className="flex items-center justify-between border-b border-black p-4">
//         <HamburgerMenu />
//         <h1 className="text-xl font-bold">{t("locationInRide.title")}</h1>
//         <ShareIcon />
//       </header>

//       <main className="flex-1 p-4">
//         <div className="relative mb-6 h-64 w-full border-2 border-black">
//           <div ref={mapRef} className="h-full w-full rounded-none" />
//           <div className="absolute bottom-4 right-4 rounded-none border-2 border-black bg-white p-2">
//             <p className="text-sm font-medium">{t("locationInRide.eta")}: {timeLeft}s</p>
//           </div>
//         </div>

//         <Card className="border-2 border-black">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-4">
//               <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-black">
//                 <Image
//                   src={driverData.image}
//                   alt={driverData.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="flex-1">
//                 <h2 className="text-lg font-bold">{driverData.name}</h2>
//                 <p className="text-sm">{driverData.vehicleType} • {driverData.vehicleNumber}</p>
//                 <div className="mt-1 flex items-center">
//                   <span className="mr-1 text-sm">⭐ {driverData.rating}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 space-y-3">
//               <div className="flex items-start">
//                 <MapPin className="mr-2 h-5 w-5 shrink-0" />
//                 <div>
//                   <p className="text-xs">{t("locationInRide.from")}</p>
//                   <p className="text-sm">{localStorage.getItem("pickupLocation") || ""}</p>
//                 </div>
//               </div>
//               <div className="flex items-start">
//                 <MapPin className="mr-2 h-5 w-5 shrink-0" />
//                 <div>
//                   <p className="text-xs">{t("locationInRide.to")}</p>
//                   <p className="text-sm">{localStorage.getItem("dropoffLocation") || ""}</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   )
// }




