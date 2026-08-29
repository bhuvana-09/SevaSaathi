export type Language = 'en' | 'hi' | 'te';

export interface Translations {
  title: string;
  subtitle: string;
  selectLanguage: string;
  micStart: string;
  micListening: string;
  micNotSupported: string;
  ageLabel: string;
  agePlaceholder: string;
  stateLabel: string;
  selectState: string;
  incomeLabel: string;
  incomePlaceholder: string;
  categoryLabel: string;
  selectCategory: string;
  genderLabel: string;
  selectGender: string;
  educationLabel: string;
  selectEducation: string;
  submitBtn: string;
  submittedNotice: string;
  voiceSuccess: string;
  readAloud: string;
  stopReading: string;
  checklistFor: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    title: "User Information",
    subtitle: "Please enter your details below or use voice input.",
    selectLanguage: "Language",
    micStart: "Voice Fill",
    micListening: "Listening...",
    micNotSupported: "Speech Recognition not supported in this browser.",
    ageLabel: "Age",
    agePlaceholder: "e.g. 25",
    stateLabel: "State / Union Territory",
    selectState: "Select State",
    incomeLabel: "Annual Income (₹)",
    incomePlaceholder: "e.g. 250000",
    categoryLabel: "Category",
    selectCategory: "Select Category",
    genderLabel: "Gender",
    selectGender: "Select Gender",
    educationLabel: "Education Level",
    selectEducation: "Select Education Level",
    submitBtn: "Submit",
    submittedNotice: "✔️ Form submitted! Check browser console for logged data.",
    voiceSuccess: "Voice input processed!",
    readAloud: "🔊 Read Aloud Results",
    stopReading: "⏹️ Stop Voice",
    checklistFor: "Checklist for"
  },
  hi: {
    title: "उपयोगकर्ता जानकारी",
    subtitle: "कृपया नीचे अपना विवरण दर्ज करें या वॉयस इनपुट का उपयोग करें।",
    selectLanguage: "भाषा",
    micStart: "आवाज़ से भरें",
    micListening: "सुन रहा हूँ...",
    micNotSupported: "इस ब्राउज़र में वाक् पहचान समर्थित नहीं है।",
    ageLabel: "आयु",
    agePlaceholder: "जैसे 25",
    stateLabel: "राज्य / केंद्र शासित प्रदेश",
    selectState: "राज्य चुनें",
    incomeLabel: "वार्षिक आय (₹)",
    incomePlaceholder: "जैसे 250000",
    categoryLabel: "श्रेणी",
    selectCategory: "श्रेणी चुनें",
    genderLabel: "लिंग",
    selectGender: "लिंग चुनें",
    educationLabel: "शिक्षा का स्तर",
    selectEducation: "शिक्षा का स्तर चुनें",
    submitBtn: "सबमिट करें",
    submittedNotice: "✔️ फ़ॉर्म जमा कर दिया गया! दर्ज डेटा देखने के लिए ब्राउज़र कंसोल जांचें।",
    voiceSuccess: "वॉयस इनपुट संसाधित हो गया!",
    readAloud: "🔊 परिणाम सुनकर जानें",
    stopReading: "⏹️ आवाज़ बंद करें",
    checklistFor: "चेकलिस्ट"
  },
  te: {
    title: "వినియోగదారు సమాచారం",
    subtitle: "దయచేసి మీ వివరాలను క్రింద నమోదు చేయండి లేదా వాయిస్ ఇన్‌పుట్‌ని ఉపయోగించండి.",
    selectLanguage: "భాష",
    micStart: "వాయిస్ తో పూరించండి",
    micListening: "వింటోంది...",
    micNotSupported: "ఈ బ్రౌజర్‌లో స్పీచ్ రికగ్నిషన్ సపోర్ట్ చేయదు.",
    ageLabel: "వయస్సు",
    agePlaceholder: "ఉదా. 25",
    stateLabel: "రాష్ట్రం / కేంద్రపాలిత ప్రాంతం",
    selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
    incomeLabel: "వార్షిక రాబడి (₹)",
    incomePlaceholder: "ఉదా. 250000",
    categoryLabel: "వర్గం (కేటగిరీ)",
    selectCategory: "వర్గాన్ని ఎంచుకోండి",
    genderLabel: "లింగం",
    selectGender: "లింగాన్ని ఎంచుకోండి",
    educationLabel: "విద్యా అర్హత",
    selectEducation: "విద్యా అర్హతను ఎంచుకోండి",
    submitBtn: "సమర్పించండి",
    submittedNotice: "✔️ ఫారమ్ సమర్పించబడింది! నమోదు చేసిన డేటా కోసం బ్రౌజర్ కన్సోల్‌ను చూడండి.",
    voiceSuccess: "వాయిస్ ఇన్‌పుట్ ప్రాసెస్ చేయబడింది!",
    readAloud: "🔊 ఫలితాలను బిగ్గరగా వినండి",
    stopReading: "⏹️ వాయిస్ ఆపండి",
    checklistFor: "చెక్‌లిస్ట్"
  }
};

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export const CATEGORIES = [
  "General",
  "OBC",
  "SC",
  "ST",
  "EBC",
  "DNT"
];

export const GENDERS = [
  "Male",
  "Female",
  "Other"
];

export const EDUCATION_LEVELS = [
  "Below 10th",
  "10th Pass (SSC)",
  "12th Pass (HSC)",
  "Diploma",
  "Graduate / Bachelor's Degree",
  "Postgraduate / Master's Degree",
  "Doctorate / Ph.D.",
  "Other / Vocational Training"
];
