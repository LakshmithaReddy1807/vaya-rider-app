"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Vehicle {
  id: string
  name: string
  price: string
  eta: string
  icon: string
}

interface VehicleCardProps {
  vehicle: Vehicle
  selected: boolean
  onSelect: () => void
}

export default function VehicleCard({ vehicle, selected, onSelect }: VehicleCardProps) {
  return (
    <Card
      className={`cursor-pointer border-2 transition-all ${
        selected ? "border-black bg-black text-white" : "border-black hover:bg-black hover:text-white"
      }`}
      onClick={onSelect}
    >
      <CardContent className="flex items-center p-4">
        <div className="relative h-12 w-12 shrink-0">
          <Image src={vehicle.icon || "/placeholder.svg"} alt={vehicle.name} fill className="object-contain" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-medium">{vehicle.name}</h3>
          <p className="text-sm">ETA: {vehicle.eta}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">{vehicle.price}</p>
        </div>
      </CardContent>
    </Card>
  )
}
