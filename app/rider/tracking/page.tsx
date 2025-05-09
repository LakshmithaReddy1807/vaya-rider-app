"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MessageSquare } from "lucide-react"
import HamburgerMenu from "@/components/hamburgerMenu"
import ShareIcon from "@/components/shareIcon"
import { useTranslation } from "@/utils/i18n"

// Mock driver data
const driverData = {
  name: "Rahul Singh",
  vehicleNumber: "DL 5S AB 1234",
  rating: 4.8,
  phone: "+91 98765 43210",
  vehicleType: "Car",
  otp: "1234",
  image: "/placeholder.svg?height=100&width=100",
}

export default function TrackingPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [timeLeft, setTimeLeft] = useState(20)

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push("/rider/startRide")
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, router])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <HamburgerMenu />
        <h1 className="text-xl font-bold">{t("tracking.title")}</h1>
        <ShareIcon />
      </header>

      <main className="flex-1 p-4">
        <div className="relative mb-6 h-64 w-full rounded-lg bg-gray-200">
          {/* This would be replaced with an actual map integration */}
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">{t("tracking.mapPlaceholder")}</p>
          </div>
        </div>

        <Card className="border-black">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={driverData.image || "/placeholder.svg"}
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
              <p className="text-sm font-medium">{t("tracking.shareOtp")}</p>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-2xl font-bold tracking-wider">{driverData.otp}</div>
                <p className="text-sm text-gray-600">
                  {t("tracking.arriving")}: {timeLeft}s
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div>
                <span className="font-medium">{t("tracking.from")}:</span>{" "}
                {localStorage.getItem("pickupLocation") || ""}
              </div>
              <div>
                <span className="font-medium">{t("tracking.to")}:</span> {localStorage.getItem("dropoffLocation") || ""}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
