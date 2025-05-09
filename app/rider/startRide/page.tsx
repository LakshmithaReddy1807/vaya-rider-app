"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import HamburgerMenu from "@/components/hamburgerMenu"
import ShareIcon from "@/components/shareIcon"
import { useTranslation } from "@/utils/i18n"

export default function StartRidePage() {
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    // Redirect to location in ride page after 5 seconds
    const timer = setTimeout(() => {
      router.push("/rider/locationInRide")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <HamburgerMenu />
        <h1 className="text-xl font-bold">{t("startRide.title")}</h1>
        <ShareIcon />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="mb-4 text-green-600">
          <CheckCircle className="h-20 w-20" />
        </div>
        <h2 className="mb-6 text-center text-2xl font-bold">{t("startRide.rideStarted")}</h2>

        <div className="w-full max-w-md rounded-lg border border-gray-200 p-4">
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">{t("startRide.from")}:</span> {localStorage.getItem("pickupLocation") || ""}
            </div>
            <div>
              <span className="font-medium">{t("startRide.to")}:</span> {localStorage.getItem("dropoffLocation") || ""}
            </div>
            <div>
              <span className="font-medium">{t("startRide.vehicle")}:</span>{" "}
              {localStorage.getItem("selectedVehicle") || ""}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
