"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import HamburgerMenu from "@/components/hamburgerMenu"
import VehicleCard from "@/components/vehicleCard"
import { useTranslation } from "@/utils/i18n"
import { useToast } from "@/hooks/use-toast"

// Vehicle types with their details
const vehicles = [
  {
    id: "bike",
    name: "Bike",
    price: "₹50",
    eta: "5 min",
    icon: "/assets/images/vehicle-icons/bike.png",
  },
  {
    id: "auto",
    name: "Auto",
    price: "₹100",
    eta: "7 min",
    icon: "/assets/images/vehicle-icons/auto.png",
  },
  {
    id: "car",
    name: "Car",
    price: "₹200",
    eta: "10 min",
    icon: "/assets/images/vehicle-icons/car.png",
  },
]

export default function VehiclePage() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const router = useRouter()
  const { t } = useTranslation()
  const { toast } = useToast()

  const handleConfirmRide = () => {
    if (selectedVehicle) {
      // Show toast for ride confirmation
      toast({
        title: t("toast.rideConfirmed"),
        variant: "default",
      })

      // In a real app, we would save the vehicle selection to state/context/backend
      localStorage.setItem("selectedVehicle", selectedVehicle)
      router.push("/rider/searching")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-black p-4">
        <HamburgerMenu />
        <h1 className="text-xl font-bold">{t("vehicle.title")}</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      <main className="flex-1 p-4">
        <div className="mb-4">
          <p className="text-lg font-medium">{t("vehicle.selectVehicle")}</p>
          <div className="mt-2 text-sm">
            {t("vehicle.pickupLocation")}: {localStorage.getItem("pickupLocation") || ""}
          </div>
          <div className="text-sm">
            {t("vehicle.dropoffLocation")}: {localStorage.getItem("dropoffLocation") || ""}
          </div>
        </div>

        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              selected={selectedVehicle === vehicle.id}
              onSelect={() => setSelectedVehicle(vehicle.id)}
            />
          ))}
        </div>

        <div className="mt-6">
          <Button
            onClick={handleConfirmRide}
            className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black"
            disabled={!selectedVehicle}
          >
            {t("vehicle.confirmRide")}
          </Button>
        </div>
      </main>
    </div>
  )
}
