"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/utils/i18n"

// Mock locations for demonstration
const mockLocations = [
  "123 Main Street, City",
  "456 Park Avenue, City",
  "789 Broadway, City",
  "101 Fifth Avenue, City",
  "202 Sixth Street, City",
]

interface MapProps {
  onLocationSelect: (location: string) => void
}

export default function Map({ onLocationSelect }: MapProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useTranslation()

  const filteredLocations = mockLocations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-full space-y-4">
      <div className="relative h-64 w-full bg-gray-200">
        {/* This would be replaced with an actual map integration */}
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">{t("map.placeholder")}</p>
        </div>
      </div>

      <input
        type="text"
        placeholder={t("map.search")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-md border border-black p-2"
      />

      <div className="max-h-60 overflow-y-auto rounded-md border border-gray-200">
        {filteredLocations.map((location, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start rounded-none border-b border-gray-100 p-3 text-left hover:bg-gray-50"
            onClick={() => onLocationSelect(location)}
          >
            {location}
          </Button>
        ))}
      </div>
    </div>
  )
}
