"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import HamburgerMenu from "@/components/hamburgerMenu"
import { useTranslation } from "@/utils/i18n"
import { useToast } from "@/hooks/use-toast"

export default function ThankYouPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { toast } = useToast()
  const [selectedRating, setSelectedRating] = useState(0)
  const hasShownToast = useRef(false)

  useEffect(() => {
    if (!hasShownToast.current) {
      toast({
        title: t("toast.thankYou"),
        variant: "default",
      })
      hasShownToast.current = true
    }
  }, [t, toast])

  const handleBookAgain = () => {
    router.push("/rider/location")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-black p-4">
        <HamburgerMenu />
        <h1 className="text-xl font-bold">{t("thankYou.title")}</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="mb-8 flex justify-center">
          <Image
            src="/assets/images/logo.png"
            alt="Vaya Logo"
            width={120}
            height={120}
            className="h-24 w-24"
          />
        </div>

        <h2 className="mb-2 text-center text-3xl font-bold">{t("thankYou.message")}</h2>
        <p className="mb-8 text-center">{t("thankYou.subMessage")}</p>

        <Card className="mb-8 w-full max-w-md border-2 border-black">
          <CardContent className="p-4">
            <h3 className="mb-4 text-center text-lg font-bold">{t("thankYou.rateExperience")}</h3>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  className={`rounded-full p-1 ${
                    rating <= selectedRating ? "text-yellow-500" : "text-gray-400"
                  } hover:bg-black hover:text-white`}
                >
                  <Star className="h-8 w-8" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleBookAgain}
          className="w-full max-w-md bg-black text-white hover:bg-white hover:text-black hover:border-black"
        >
          {t("thankYou.bookAgain")}
        </Button>
      </main>
    </div>
  )
}


// "use client"
// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Star } from "lucide-react"
// import HamburgerMenu from "@/components/hamburgerMenu"
// import { useTranslation } from "@/utils/i18n"
// import { useToast } from "@/hooks/use-toast"

// export default function ThankYouPage() {
//   const router = useRouter()
//   const { t } = useTranslation()
//   const { toast } = useToast()

//   useEffect(() => {
//     // Show thank you toast
//     toast({
//       title: t("toast.thankYou"),
//       variant: "default",
//     })
//   }, [t, toast])

//   const handleBookAgain = () => {
//     router.push("/rider/location")
//   }

//   return (
//     <div className="flex min-h-screen flex-col bg-white">
//       <header className="flex items-center justify-between border-b border-black p-4">
//         <HamburgerMenu />
//         <h1 className="text-xl font-bold">{t("thankYou.title")}</h1>
//         <div className="w-10"></div> {/* Spacer for alignment */}
//       </header>

//       <main className="flex flex-1 flex-col items-center justify-center p-4">
//         <div className="mb-8 flex justify-center">
//           <Image src="/assets/images/logo.png" alt="Vaya Logo" width={120} height={120} className="h-24 w-24" />
//         </div>

//         <h2 className="mb-2 text-center text-3xl font-bold">{t("thankYou.message")}</h2>
//         <p className="mb-8 text-center">{t("thankYou.subMessage")}</p>

//         <Card className="mb-8 w-full max-w-md border-2 border-black">
//           <CardContent className="p-4">
//             <h3 className="mb-4 text-center text-lg font-bold">{t("thankYou.rateExperience")}</h3>
//             <div className="flex justify-center space-x-2">
//               {[1, 2, 3, 4, 5].map((rating) => (
//                 <button key={rating} className="rounded-full p-1 hover:bg-black hover:text-white">
//                   <Star className="h-8 w-8" />
//                 </button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <Button
//           onClick={handleBookAgain}
//           className="w-full max-w-md bg-black text-white hover:bg-white hover:text-black hover:border-black"
//         >
//           {t("thankYou.bookAgain")}
//         </Button>
//       </main>
//     </div>
//   )
// }
