"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/utils/i18n"

export default function NamePage() {
  const [name, setName] = useState("")
  const router = useRouter()
  const { t } = useTranslation()

  const handleProceed = () => {
    if (name.trim()) {
      // In a real app, we would save the name to state/context/backend
      localStorage.setItem("userName", name)
      router.push("/rider/location")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Image src="/assets/images/logo.png" alt="Vaya Logo" width={120} height={120} className="h-20 w-20" />
        </div>

        <Card className="border-black">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{t("name.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {t("name.label")}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t("name.placeholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-black"
                />
              </div>
              <Button
                onClick={handleProceed}
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={!name.trim()}
              >
                {t("name.proceed")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
