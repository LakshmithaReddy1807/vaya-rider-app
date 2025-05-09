"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import OtpInput from "@/components/otpInput"
import { useTranslation } from "@/utils/i18n"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter()
  const { t, locale, setLocale } = useTranslation()
  const { toast } = useToast()

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setOtpSent(true)
    }
  }

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      setIsVerifying(true)

      // Store phone number in localStorage
      localStorage.setItem("userPhone", `+91 ${phoneNumber}`)

      // Show success toast
      toast({
        title: t("toast.otpSuccess"),
        variant: "default",
      })

      setTimeout(() => {
        router.push("/rider/name")
      }, 2000)
    }
  }

  const handleOtpChange = (value: string) => {
    setOtp(value)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Image src="/assets/images/logo.png" alt="Vaya Logo" width={120} height={120} className="h-20 w-20" />
        </div>

        <Card className="border-2 border-black">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{t("login.welcome")}</CardTitle>
          </CardHeader>
          <CardContent>
            {!otpSent ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    {t("login.phoneNumber")}
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-2 border-black"
                    maxLength={10}
                  />
                </div>
                <Button
                  onClick={handleSendOtp}
                  className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black"
                  disabled={phoneNumber.length !== 10}
                >
                  {t("login.sendOtp")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-center text-sm">
                  {t("login.otpSent")} {phoneNumber}
                </p>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("login.enterOtp")}</label>
                  <OtpInput length={6} onOtpChange={handleOtpChange} />
                </div>
                {isVerifying ? (
                  <div className="text-center">
                    <p className="text-sm">{t("login.verifying")}</p>
                    <div className="mt-2 flex justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent border-black"></div>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={handleVerifyOtp}
                    className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black"
                    disabled={otp.length !== 6}
                  >
                    {t("login.verify")}
                  </Button>
                )}
                <button onClick={() => setOtpSent(false)} className="w-full text-sm hover:underline">
                  {t("login.changeNumber")}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => setLocale("en")}
            className={`px-2 py-1 text-sm ${locale === "en" ? "font-bold underline" : ""}`}
          >
            English
          </button>
          <button
            onClick={() => setLocale("hi")}
            className={`px-2 py-1 text-sm ${locale === "hi" ? "font-bold underline" : ""}`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLocale("te")}
            className={`px-2 py-1 text-sm ${locale === "te" ? "font-bold underline" : ""}`}
          >
            తెలుగు
          </button>
        </div>
      </div>
    </div>
  )
}
