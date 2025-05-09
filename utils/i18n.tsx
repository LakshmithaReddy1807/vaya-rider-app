"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Locale = "en" | "hi" | "te"

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

// English translations
const en: Translations = {
  login: {
    welcome: "Welcome to Vaya",
    phoneNumber: "Phone Number",
    sendOtp: "Send OTP",
    otpSent: "OTP sent to",
    enterOtp: "Enter OTP",
    verify: "Verify",
    verifying: "Verifying...",
    changeNumber: "Change Number",
  },
  name: {
    title: "What should we call you?",
    label: "Your Name",
    placeholder: "Enter your name",
    proceed: "Proceed to Locations",
  },
  location: {
    title: "Set Locations",
    pickup: "Pickup Location",
    pickupPlaceholder: "Enter pickup location",
    dropoff: "Drop-off Location",
    dropoffPlaceholder: "Enter drop-off location",
    next: "Next",
    back: "Back",
  },
  vehicle: {
    title: "Select Vehicle",
    selectVehicle: "Choose your ride",
    pickupLocation: "Pickup",
    dropoffLocation: "Drop-off",
    confirmRide: "Confirm Ride",
  },
  searching: {
    title: "Finding Driver",
    lookingForDriver: "Looking for a driver",
    pleaseWait: "Please wait while we connect you with a driver",
    rideDetails: "Ride Details",
    from: "From",
    to: "To",
    vehicle: "Vehicle",
  },
  tracking: {
    title: "Driver Details",
    mapPlaceholder: "Map loading...",
    shareOtp: "Share OTP with driver",
    arriving: "Arriving in",
    from: "From",
    to: "To",
  },
  startRide: {
    title: "Ride Started",
    rideStarted: "Your ride has started!",
    from: "From",
    to: "To",
    vehicle: "Vehicle",
  },
  locationInRide: {
    title: "On the way",
    mapPlaceholder: "Map loading...",
    eta: "Arriving in",
    from: "From",
    to: "To",
  },
  endRide: {
    title: "Ride Completed",
    rideCompleted: "Your Ride has been completed!!",
    thankYou: "Thank you for riding with us",
    rideSummary: "Ride Summary",
    from: "From",
    to: "To",
    vehicle: "Vehicle",
    totalFare: "Total Fare",
    payDriver: "Please Pay to Driver",
  },
  thankYou: {
    title: "Thank You",
    message: "Thanks for using Vaya",
    subMessage: "We hope you enjoyed your ride",
    rateExperience: "Rate your experience",
    bookAgain: "Book Another Ride",
  },
  menu: {
    open: "Open menu",
    profile: "Profile",
    history: "Ride History",
    help: "Help & Support",
    settings: "Settings",
  },
  map: {
    placeholder: "Map will be displayed here",
    search: "Search for a location",
  },
  share: {
    label: "Share ride details",
    message: "Ride details shared successfully!",
  },
  popup: {
    driverMessage: "Message from your driver",
    dontCancel: "📢 Please don't cancel the ride — I'm arriving soon!",
  },
  toast: {
    otpSuccess: "✅ OTP Verified. Welcome aboard!",
    rideConfirmed: "🚗 Ride confirmed! Driver is on the way.",
    rideStarted: "🚗 Your ride has started — sit back and enjoy the journey!",
    rideComplete: "🎉 Your ride is complete! Hope you had a smooth trip!",
    thankYou: "🙏 Thanks for riding with Vaya!",
    lookingForDriver: "🛺 Looking for a driver near you...",
  },
  profile: {
    title: "Profile",
    defaultName: "Rider",
    phoneNumber: "Phone Number",
    ridesCompleted: "Rides Completed",
    rides: "rides",
    memberSince: "Member Since",
    date: "May 2023",
  },
}

// Hindi translations
const hi: Translations = {
  login: {
    welcome: "वाया में आपका स्वागत है",
    phoneNumber: "फोन नंबर",
    sendOtp: "OTP भेजें",
    otpSent: "OTP भेजा गया",
    enterOtp: "OTP दर्ज करें",
    verify: "सत्यापित करें",
    verifying: "सत्यापित हो रहा है...",
    changeNumber: "नंबर बदलें",
  },
  name: {
    title: "हम आपको क्या कहें?",
    label: "आपका नाम",
    placeholder: "अपना नाम दर्ज करें",
    proceed: "स्थानों पर आगे बढ़ें",
  },
  location: {
    title: "स्थान सेट करें",
    pickup: "पिकअप स्थान",
    pickupPlaceholder: "पिकअप स्थान दर्ज करें",
    dropoff: "ड्रॉप-ऑफ स्थान",
    dropoffPlaceholder: "ड्रॉप-ऑफ स्थान दर्ज करें",
    next: "अगला",
    back: "वापस",
  },
  vehicle: {
    title: "वाहन चुनें",
    selectVehicle: "अपनी सवारी चुनें",
    pickupLocation: "पिकअप",
    dropoffLocation: "ड्रॉप-ऑफ",
    confirmRide: "सवारी की पुष्टि करें",
  },
  searching: {
    title: "ड्राइवर खोज रहे हैं",
    lookingForDriver: "ड्राइवर की तलाश हो रही है",
    pleaseWait: "कृपया प्रतीक्षा करें जबकि हम आपको एक ड्राइवर से जोड़ते हैं",
    rideDetails: "सवारी विवरण",
    from: "से",
    to: "तक",
    vehicle: "वाहन",
  },
  tracking: {
    title: "ड्राइवर विवरण",
    mapPlaceholder: "मानचित्र लोड हो रहा है...",
    shareOtp: "ड्राइवर के साथ OTP साझा करें",
    arriving: "आने में",
    from: "से",
    to: "तक",
  },
  startRide: {
    title: "सवारी शुरू हुई",
    rideStarted: "आपकी सवारी शुरू हो गई है!",
    from: "से",
    to: "तक",
    vehicle: "वाहन",
  },
  locationInRide: {
    title: "रास्ते में",
    mapPlaceholder: "मानचित्र लोड हो रहा है...",
    eta: "आने में",
    from: "से",
    to: "तक",
  },
  endRide: {
    title: "सवारी पूरी हुई",
    rideCompleted: "आपकी सवारी पूरी हो गई है!!",
    thankYou: "हमारे साथ सवारी करने के लिए धन्यवाद",
    rideSummary: "सवारी सारांश",
    from: "से",
    to: "तक",
    vehicle: "वाहन",
    totalFare: "कुल किराया",
    payDriver: "कृपया ड्राइवर को भुगतान करें",
  },
  thankYou: {
    title: "धन्यवाद",
    message: "वाया का उपयोग करने के लिए धन्यवाद",
    subMessage: "हमें आशा है कि आपने अपनी सवारी का आनंद लिया",
    rateExperience: "अपने अनुभव का मूल्यांकन करें",
    bookAgain: "एक और सवारी बुक करें",
  },
  menu: {
    open: "मेनू खोलें",
    profile: "प्रोफाइल",
    history: "सवारी इतिहास",
    help: "सहायता और समर्थन",
    settings: "सेटिंग्स",
  },
  map: {
    placeholder: "मानचित्र यहां प्रदर्शित किया जाएगा",
    search: "स्थान खोजें",
  },
  share: {
    label: "सवारी विवरण साझा करें",
    message: "सवारी विवरण सफलतापूर्वक साझा किया गया!",
  },
  popup: {
    driverMessage: "आपके ड्राइवर का संदेश",
    dontCancel: "📢 कृपया राइड कैंसिल न करें — मैं जल्द ही पहुँच रहा हूँ!",
  },
  toast: {
    otpSuccess: "✅ ओटीपी सत्यापित हुआ। स्वागत है!",
    rideConfirmed: "🚗 सवारी की पुष्टि हो गई! ड्राइवर रास्ते में है।",
    rideStarted: "🚗 आपकी सवारी शुरू हो गई है — आराम करें और यात्रा का आनंद लें!",
    rideComplete: "🎉 आपकी सवारी पूरी हुई! उम्मीद है आपकी यात्रा सुगम रही!",
    thankYou: "🙏 वाया के साथ यात्रा करने के लिए धन्यवाद!",
    lookingForDriver: "🛺 आपके आस-पास ड्राइवर की तलाश हो रही है...",
  },
  profile: {
    title: "प्रोफाइल",
    defaultName: "सवारी",
    phoneNumber: "फोन नंबर",
    ridesCompleted: "पूरी की गई सवारियां",
    rides: "सवारियां",
    memberSince: "सदस्यता शुरू",
    date: "मई 2023",
  },
}

// Telugu translations
const te: Translations = {
  login: {
    welcome: "వాయాకి స్వాగతం",
    phoneNumber: "ఫోన్ నంబర్",
    sendOtp: "OTP పంపండి",
    otpSent: "OTP పంపబడింది",
    enterOtp: "OTP ని నమోదు చేయండి",
    verify: "ధృవీకరించండి",
    verifying: "ధృవీకరిస్తోంది...",
    changeNumber: "నంబర్ మార్చండి",
  },
  name: {
    title: "మేము మిమ్మల్ని ఏమని పిలవాలి?",
    label: "మీ పేరు",
    placeholder: "మీ పేరు నమోదు చేయండి",
    proceed: "స్థానాలకు కొనసాగండి",
  },
  location: {
    title: "స్థానాలను సెట్ చేయండి",
    pickup: "పికప్ స్థానం",
    pickupPlaceholder: "పికప్ స్థానాన్ని నమోదు చేయండి",
    dropoff: "డ్రాప్-ఆఫ్ స్థానం",
    dropoffPlaceholder: "డ్రాప్-ఆఫ్ స్థానాన్ని నమోదు చేయండి",
    next: "తదుపరి",
    back: "వెనుకకు",
  },
  vehicle: {
    title: "వాహనాన్ని ఎంచుకోండి",
    selectVehicle: "మీ రైడ్‌ని ఎంచుకోండి",
    pickupLocation: "పికప్",
    dropoffLocation: "డ్రాప్-ఆఫ్",
    confirmRide: "రైడ్‌ని నిర్ధారించండి",
  },
  searching: {
    title: "డ్రైవర్‌ని కనుగొంటోంది",
    lookingForDriver: "డ్రైవర్ కోసం వెతుకుతోంది",
    pleaseWait: "మేము మిమ్మల్ని డ్రైవర్‌తో కనెక్ట్ చేస్తున్నప్పుడు దయచేసి వేచి ఉండండి",
    rideDetails: "రైడ్ వివరాలు",
    from: "నుండి",
    to: "వరకు",
    vehicle: "వాహనం",
  },
  tracking: {
    title: "డ్రైవర్ వివరాలు",
    mapPlaceholder: "మ్యాప్ లోడ్ అవుతోంది...",
    shareOtp: "డ్రైవర్‌తో OTP షేర్ చేయండి",
    arriving: "చేరుకుంటోంది",
    from: "నుండి",
    to: "వరకు",
  },
  startRide: {
    title: "రైడ్ ప్రారంభమైంది",
    rideStarted: "మీ రైడ్ ప్రారంభమైంది!",
    from: "నుండి",
    to: "వరకు",
    vehicle: "వాహనం",
  },
  locationInRide: {
    title: "ప్రయాణంలో",
    mapPlaceholder: "మ్యాప్ లోడ్ అవుతోంది...",
    eta: "చేరుకుంటోంది",
    from: "నుండి",
    to: "వరకు",
  },
  endRide: {
    title: "రైడ్ పూర్తయింది",
    rideCompleted: "మీ రైడ్ పూర్తయింది!!",
    thankYou: "మాతో రైడ్ చేసినందుకు ధన్యవాదాలు",
    rideSummary: "రైడ్ సారాంశం",
    from: "నుండి",
    to: "వరకు",
    vehicle: "వాహనం",
    totalFare: "మొత్తం ఛార్జీ",
    payDriver: "దయచేసి డ్రైవర్‌కి చెల్లించండి",
  },
  thankYou: {
    title: "ధన్యవాదాలు",
    message: "వాయాని ఉపయోగించినందుకు ధన్యవాదాలు",
    subMessage: "మీరు మీ రైడ్‌ని ఆస్వాదించారని మేము ఆశిస్తున్నాము",
    rateExperience: "మీ అనుభవాన్ని రేట్ చేయండి",
    bookAgain: "మరొక రైడ్ బుక్ చేయండి",
  },
  menu: {
    open: "మెనూ తెరవండి",
    profile: "ప్రొఫైల్",
    history: "రైడ్ చరిత్ర",
    help: "సహాయం & మద్దతు",
    settings: "సెట్టింగ్‌లు",
  },
  map: {
    placeholder: "మ్యాప్ ఇక్కడ ప్రదర్శించబడుతుంది",
    search: "స్థానాన్ని శోధించండి",
  },
  share: {
    label: "రైడ్ వివరాలను షేర్ చేయండి",
    message: "రైడ్ వివరాలు విజయవంతంగా షేర్ చేయబడ్డాయి!",
  },
  popup: {
    driverMessage: "మీ డ్రైవర్ నుండి సందేశం",
    dontCancel: "📢 దయచేసి రైడ్ క్యాన్సిల్ చేయకండి — నేను త్వరలో వస్తున్నాను!",
  },
  toast: {
    otpSuccess: "✅ OTP ధృవీకరించబడింది. స్వాగతం!",
    rideConfirmed: "🚗 రైడ్ నిర్ధారించబడింది! డ్రైవర్ దారిలో ఉన్నారు.",
    rideStarted: "🚗 మీ రైడ్ ప్రారంభమైంది — విశ్రాంతిగా ఉండండి, ప్రయాణాన్ని ఆనందించండి!",
    rideComplete: "🎉 మీ రైడ్ పూర్తయింది! మీ ప్రయాణం సౌకర్యవంతంగా సాగిందని ఆశిస్తున్నాను!",
    thankYou: "🙏 వాయా తో ప్రయాణించినందుకు ధన్యవాదాలు!",
    lookingForDriver: "🛺 మీ సమీపంలో డ్రైవర్ కోసం వెతుకుతున్నాం...",
  },
  profile: {
    title: "ప్రొఫైల్",
    defaultName: "ప్రయాణికుడు",
    phoneNumber: "ఫోన్ నంబర్",
    ridesCompleted: "పూర్తయిన రైడ్లు",
    rides: "రైడ్లు",
    memberSince: "సభ్యత్వం పొందిన తేదీ",
    date: "మే 2023",
  },
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>("en")

  const t = (key: string): string => {
    const keys = key.split(".")
    const category = keys[0]
    const messageKey = keys[1]

    let translations
    switch (locale) {
      case "hi":
        translations = hi
        break
      case "te":
        translations = te
        break
      default:
        translations = en
    }

    return translations[category]?.[messageKey] || key
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within an I18nProvider")
  }
  return context
}
