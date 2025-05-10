"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import HamburgerMenu from "@/components/hamburgerMenu"
import { useTranslation } from "@/utils/i18n"
import { useToast } from "@/hooks/use-toast"

export default function EndRidePage() {
  const [fare, setFare] = useState<number>(0)
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")
  const [vehicle, setVehicle] = useState("")
  const [distance, setDistance] = useState(0)

  const router = useRouter()
  const { t } = useTranslation()
  const { toast } = useToast()

  useEffect(() => {
    // Get ride details from localStorage
    const pickupLocation = localStorage.getItem("pickupLocation") || "Unknown Pickup"
    const dropoffLocation = localStorage.getItem("dropoffLocation") || "Unknown Dropoff"
    const selectedVehicle = localStorage.getItem("selectedVehicle") || "Auto"
    const distanceKm = parseFloat(localStorage.getItem("distanceKm") || "2")

    setPickup(pickupLocation)
    setDropoff(dropoffLocation)
    setVehicle(selectedVehicle)
    setDistance(distanceKm)

    // Static fare logic: ₹50 base + ₹10 per km
    const estimatedFare = 50 + 10 * distanceKm
    setFare(Math.round(estimatedFare))

    // Show toast once
    toast({
      title: t("toast.rideComplete"),
      variant: "default",
    })
  }, [toast, t])

  const handlePayment = () => {
    router.push("/rider/thankYou")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-black p-4">
        <HamburgerMenu />
        <h1 className="text-xl font-bold">{t("endRide.title")}</h1>
        <div className="w-10" />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="mb-4">
          <CheckCircle className="h-20 w-20 text-green-600" />
        </div>
        <h2 className="mb-2 text-center text-2xl font-bold">{t("endRide.rideCompleted")}</h2>
        <p className="mb-6 text-center">{t("endRide.thankYou")}</p>

        <Card className="mb-6 w-full max-w-md border-2 border-black">
          <CardContent className="p-4">
            <h3 className="mb-4 text-lg font-bold">{t("endRide.rideSummary")}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t("endRide.from")}</span>
                <span>{pickup}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("endRide.to")}</span>
                <span>{dropoff}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("endRide.vehicle")}</span>
                <span>{vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("endRide.distance")}</span>
                <span>{distance.toFixed(1)} km</span>
              </div>
              <div className="border-t border-black pt-2">
                <div className="flex justify-between font-bold">
                  <span>{t("endRide.totalFare")}</span>
                  <span>₹{fare}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handlePayment}
          className="w-full max-w-md bg-black text-white hover:bg-white hover:text-black hover:border-black"
        >
          {t("endRide.payDriver")}
        </Button>
      </main>
    </div>
  )
}




// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { CheckCircle } from "lucide-react"
// import HamburgerMenu from "@/components/hamburgerMenu"
// import { useTranslation } from "@/utils/i18n"
// import { useToast } from "@/hooks/use-toast"

// export default function EndRidePage() {
//   const router = useRouter()
//   const { t } = useTranslation()
//   const { toast } = useToast()

//   useEffect(() => {
//     // Show toast when ride completes
//     toast({
//       title: t("toast.rideComplete"),
//       variant: "default",
//     })
//   }, [t, toast])

//   const handlePayment = () => {
//     router.push("/rider/thankYou")
//   }

//   return (
//     <div className="flex min-h-screen flex-col bg-white">
//       <header className="flex items-center justify-between border-b border-black p-4">
//         <HamburgerMenu />
//         <h1 className="text-xl font-bold">{t("endRide.title")}</h1>
//         <div className="w-10"></div> {/* Spacer for alignment */}
//       </header>

//       <main className="flex flex-1 flex-col items-center justify-center p-4">
//         <div className="mb-4">
//           <CheckCircle className="h-20 w-20" />
//         </div>
//         <h2 className="mb-2 text-center text-2xl font-bold">{t("endRide.rideCompleted")}</h2>
//         <p className="mb-6 text-center">{t("endRide.thankYou")}</p>

//         <Card className="mb-6 w-full max-w-md border-2 border-black">
//           <CardContent className="p-4">
//             <h3 className="mb-4 text-lg font-bold">{t("endRide.rideSummary")}</h3>
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span>{t("endRide.from")}</span>
//                 <span>{localStorage.getItem("pickupLocation") || ""}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>{t("endRide.to")}</span>
//                 <span>{localStorage.getItem("dropoffLocation") || ""}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>{t("endRide.vehicle")}</span>
//                 <span>{localStorage.getItem("selectedVehicle") || ""}</span>
//               </div>
//               <div className="border-t border-black pt-2">
//                 <div className="flex justify-between font-bold">
//                   <span>{t("endRide.totalFare")}</span>
//                   <span>₹150</span>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Button
//           onClick={handlePayment}
//           className="w-full max-w-md bg-black text-white hover:bg-white hover:text-black hover:border-black"
//         >
//           {t("endRide.payDriver")}
//         </Button>
//       </main>
//     </div>
//   )
// }
