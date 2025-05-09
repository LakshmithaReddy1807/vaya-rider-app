"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import HamburgerMenu from "@/components/hamburgerMenu"
import { useTranslation } from "@/utils/i18n"
import { useToast } from "@/hooks/use-toast"
import DriverMessagePopup from "@/components/popup"  // Importing the popup correctly

export default function SearchingPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { toast } = useToast()

  // State to handle popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    // Show toast when searching for driver
    toast({
      title: t("toast.lookingForDriver"),
      variant: "default",
    })

    // Simulate searching for a driver for 20 seconds
    const timer = setTimeout(() => {
      router.push("/rider/tracking")
    }, 20000)

    // Show popup after 10 seconds
    const popupTimer = setTimeout(() => {
      setIsPopupOpen(true)
    }, 10000)

    return () => {
      clearTimeout(timer)
      clearTimeout(popupTimer)
    }
  }, [router, t, toast])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-black p-4">
        <HamburgerMenu />
        <h1 className="text-xl font-bold">{t("searching.title")}</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-black border-t-white"></div>
        <h2 className="mb-2 text-xl font-semibold">{t("searching.lookingForDriver")}</h2>
        <p className="text-center">{t("searching.pleaseWait")}</p>

        <div className="mt-8 w-full max-w-md rounded-none border-2 border-black p-4">
          <div className="mb-2 text-sm font-medium">{t("searching.rideDetails")}</div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">{t("searching.from")}:</span> {localStorage.getItem("pickupLocation") || ""}
            </div>
            <div>
              <span className="font-medium">{t("searching.to")}:</span> {localStorage.getItem("dropoffLocation") || ""}
            </div>
            <div>
              <span className="font-medium">{t("searching.vehicle")}:</span>{" "}
              {localStorage.getItem("selectedVehicle") || ""}
            </div>
          </div>
        </div>

        {/* Only show the popup if it is open */}
        <DriverMessagePopup 
          title="Driver is on the way!" 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)}
        >
          {t("searching.driverMessage")}
        </DriverMessagePopup>
      </main>
    </div>
  )
}
