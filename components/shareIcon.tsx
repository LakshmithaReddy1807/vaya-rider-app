"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/utils/i18n"

export default function ShareIcon() {
  const { t } = useTranslation()

  const handleShare = () => {
    // In a real app, this would use the Web Share API or a custom share dialog
    alert(t("share.message"))
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleShare}>
      <Share2 className="h-5 w-5" />
      <span className="sr-only">{t("share.label")}</span>
    </Button>
  )
}
