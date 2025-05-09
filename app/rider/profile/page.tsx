"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HamburgerMenu from "@/components/hamburgerMenu"
import { useTranslation } from "@/utils/i18n"

export default function ProfilePage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [userName, setUserName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    // Get user data from localStorage
    const storedName = localStorage.getItem("userName")
    const storedPhone = localStorage.getItem("userPhone")

    if (storedName) {
      setUserName(storedName)
    }

    if (storedPhone) {
      setPhoneNumber(storedPhone)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-black p-4">
        <HamburgerMenu />
        <h1 className="text-xl font-bold">{t("profile.title")}</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      <main className="flex-1 p-4">
        <Card className="mx-auto max-w-md border-2 border-black">
          <CardHeader className="flex flex-col items-center border-b border-black pb-6">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-black">
              <User className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl">{userName || t("profile.defaultName")}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">{t("profile.phoneNumber")}</h3>
                <p>{phoneNumber || "+91 98765 43210"}</p>
              </div>

              <div>
                <h3 className="font-bold">{t("profile.ridesCompleted")}</h3>
                <p>12 {t("profile.rides")}</p>
              </div>

              <div className="border-t border-black pt-4">
                <h3 className="font-bold">{t("profile.memberSince")}</h3>
                <p>{t("profile.date")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
