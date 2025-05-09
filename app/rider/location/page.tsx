"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import Map from "./map"
import HamburgerMenu from "./hamburgerMenu"
import { useTranslation } from "@/utils/i18n"

export default function LocationPage() {
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")
  const [showMap, setShowMap] = useState(false)
  const [currentField, setCurrentField] = useState<"pickup" | "dropoff" | null>(null)
  const router = useRouter()
  const { t } = useTranslation()

  const handleShowMap = (field: "pickup" | "dropoff") => {
    setCurrentField(field)
    setShowMap(true)
  }

  const handleLocationSelect = (location: string) => {
    if (currentField === "pickup") {
      setPickup(location)
    } else if (currentField === "dropoff") {
      setDropoff(location)
    }
    setShowMap(false)
  }

  const handleNext = () => {
    if (pickup && dropoff) {
      // In a real app, we would save the locations to state/context/backend
      localStorage.setItem("pickupLocation", pickup)
      localStorage.setItem("dropoffLocation", dropoff)
      router.push("/rider/vehicle")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <HamburgerMenu />
        <h1 className="text-xl font-bold">{t("location.title")}</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      <main className="flex-1 p-4">
        {showMap ? (
          <div className="h-full">
            <Map onLocationSelect={handleLocationSelect} />
            <Button onClick={() => setShowMap(false)} className="mt-4 bg-black text-white hover:bg-gray-800">
              {t("location.back")}
            </Button>
          </div>
        ) : (
          <Card className="border-black">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="pickup" className="mb-1 block text-sm font-medium">
                    {t("location.pickup")}
                  </label>
                  <div className="flex">
                    <Input
                      id="pickup"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder={t("location.pickupPlaceholder")}
                      className="border-black pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => handleShowMap("pickup")}
                    >
                      <MapPin className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="dropoff" className="mb-1 block text-sm font-medium">
                    {t("location.dropoff")}
                  </label>
                  <div className="flex">
                    <Input
                      id="dropoff"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      placeholder={t("location.dropoffPlaceholder")}
                      className="border-black pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => handleShowMap("dropoff")}
                    >
                      <MapPin className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-black text-white hover:bg-gray-800"
                  disabled={!pickup || !dropoff}
                >
                  {t("location.next")}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
