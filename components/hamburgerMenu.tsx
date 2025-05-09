"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, User, Clock, HelpCircle, Settings } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/utils/i18n"

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">{t("menu.open")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] border-r-2 border-black bg-white p-0">
        <SheetHeader className="border-b border-black p-4">
          <SheetTitle className="text-xl font-bold">Vaya</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col py-2">
          <Link
            href="/rider/profile"
            className="flex items-center px-4 py-3 hover:bg-black hover:text-white"
            onClick={() => setOpen(false)}
          >
            <User className="mr-3 h-5 w-5" />
            <span>{t("menu.profile")}</span>
          </Link>
          <Link
            href="#"
            className="flex items-center px-4 py-3 hover:bg-black hover:text-white"
            onClick={() => setOpen(false)}
          >
            <Clock className="mr-3 h-5 w-5" />
            <span>{t("menu.history")}</span>
          </Link>
          <Link
            href="#"
            className="flex items-center px-4 py-3 hover:bg-black hover:text-white"
            onClick={() => setOpen(false)}
          >
            <HelpCircle className="mr-3 h-5 w-5" />
            <span>{t("menu.help")}</span>
          </Link>
          <Link
            href="#"
            className="flex items-center px-4 py-3 hover:bg-black hover:text-white"
            onClick={() => setOpen(false)}
          >
            <Settings className="mr-3 h-5 w-5" />
            <span>{t("menu.settings")}</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
