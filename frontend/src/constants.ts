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
  modalIntro: string;
  howToObtain: string;
  showDetails: string;
  hideDetails: string;
  brandTitle: string;
  tagline: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  mobileLearnMore: string;
  mobileClose: string;
  requiredDocsHeader: string;
  doc1: string;
  doc2: string;
  doc3: string;
  doc4: string;
  doc5: string;
  checklistHeading: string;
  stepDetails: string;
  stepResults: string;
  stepChecklist: string;
  viewChecklist: string;
  loading: string;
  gapExplanation: string;
  nearMissBadge: string;
  eligibleBadge: string;
  whyQualify: string;
  criteriaEvaluation: string;
  resultsTitle: string;
  eligibleSchemesHeading: string;
  nearMissSchemesHeading: string;
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
    checklistFor: "Checklist for",
    modalIntro: "Required documents and how to obtain them:",
    howToObtain: "How to obtain:",
    showDetails: "Show details 🔽",
    hideDetails: "Hide details 🔼",
    brandTitle: "SevaSaathi",
    tagline: "Empowering citizens to discover government schemes & welfare benefits easily",
    aboutTitle: "About SevaSaathi",
    aboutDesc1: "SevaSaathi empowers citizens across India to easily discover government scholarships and welfare benefits tailored to their eligibility profile.",
    aboutDesc2: "Simply enter your profile details or use voice input to get real-time eligibility evaluation and plain-language guidance.",
    mobileLearnMore: "Tap to learn more ▼",
    mobileClose: "Tap to close ▲",
    requiredDocsHeader: "Standard Required Documents",
    doc1: "Aadhaar Card / Govt ID Proof",
    doc2: "Income Certificate (Tahsildar / MeeSeva)",
    doc3: "Caste / Social Category Certificate",
    doc4: "Academic Transcripts & Fee Receipts",
    doc5: "Aadhaar-seeded Bank Passbook",
    checklistHeading: "Checklist",
    stepDetails: "Details",
    stepResults: "Results",
    stepChecklist: "Checklist",
    viewChecklist: "📋 View checklist",
    loading: "Loading...",
    gapExplanation: "Gap Explanation:",
    nearMissBadge: "Near Miss",
    eligibleBadge: "Eligible",
    whyQualify: "Why you qualify:",
    criteriaEvaluation: "Criteria evaluation:",
    resultsTitle: "Scheme Matching Results",
    eligibleSchemesHeading: "🟢 Eligible Schemes",
    nearMissSchemesHeading: "🟡 Near-Miss Schemes"
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
    checklistFor: "चेकलिस्ट",
    modalIntro: "आवश्यक दस्तावेज और उन्हें कैसे प्राप्त करें:",
    howToObtain: "कैसे प्राप्त करें:",
    showDetails: "विवरण देखें 🔽",
    hideDetails: "विवरण छिपाएं 🔼",
    brandTitle: "सेवासाथी",
    tagline: "नागरिकों को सरकारी योजनाओं और कल्याणकारी लाभों को आसानी से खोजने में सक्षम बनाना",
    aboutTitle: "सेवासाथी के बारे में",
    aboutDesc1: "सेवासाथी पूरे भारत में नागरिकों को उनकी पात्रता प्रोफ़ाइल के अनुरूप सरकारी छात्रवृत्तियों और कल्याणकारी लाभों की आसानी से खोज करने में सक्षम बनाता है।",
    aboutDesc2: "वास्तविक समय में पात्रता मूल्यांकन और सरल भाषा मार्गदर्शन प्राप्त करने के लिए बस अपना प्रोफ़ाइल विवरण दर्ज करें या वॉयस इनपुट का उपयोग करें।",
    mobileLearnMore: "अधिक जानने के लिए टैप करें ▼",
    mobileClose: "बंद करने के लिए टैप करें ▲",
    requiredDocsHeader: "मानक आवश्यक दस्तावेज",
    doc1: "आधार कार्ड / सरकारी पहचान पत्र",
    doc2: "आय प्रमाण पत्र (तहसीलदार / ई-डिस्ट्रिक्ट)",
    doc3: "जाति / सामाजिक श्रेणी प्रमाण पत्र",
    doc4: "शैक्षणिक अंकतालिकाएं और शुल्क रसीदें",
    doc5: "आधार से जुड़ी बैंक पासबुक",
    checklistHeading: "चेकलिस्ट",
    stepDetails: "विवरण",
    stepResults: "परिणाम",
    stepChecklist: "चेकलिस्ट",
    viewChecklist: "📋 चेकलिस्ट देखें",
    loading: "लोड हो रहा है...",
    gapExplanation: "अंतर स्पष्टीकरण:",
    nearMissBadge: "निकट-चूक",
    eligibleBadge: "पात्र",
    whyQualify: "आप क्यों पात्र हैं:",
    criteriaEvaluation: "पात्रता मापदंड मूल्यांकन:",
    resultsTitle: "योजना मिलान परिणाम",
    eligibleSchemesHeading: "🟢 पात्र योजनाएं",
    nearMissSchemesHeading: "🟡 निकट-चूक योजनाएं"
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
    checklistFor: "చెక్‌లిస్ట్",
    modalIntro: "అవసరమైన పత్రాలు మరియు వాటిని ఎలా పొందాలి:",
    howToObtain: "ఎలా పొందాలి:",
    showDetails: "వివరాలు చూడండి 🔽",
    hideDetails: "వివరాలు దాచండి 🔼",
    brandTitle: "సేవాసాథీ",
    tagline: "ప్రభుత్వ పథకాలు మరియు సంక్షేమ లబ్ధిని పౌరులు సులభంగా కనుగొనేలా సాధికారత కల్పించడం",
    aboutTitle: "సేవాసాథీ గురించి",
    aboutDesc1: "సేవాసాథీ భారతదేశం అంతటా పౌరులు తమ అర్హతకు తగిన ప్రభుత్వ స్కాలర్‌షిప్‌లు మరియు సంక్షేమ లబ్ధిని సులభంగా కనుగొనేలా చేస్తుంది.",
    aboutDesc2: "రియల్ టైమ్ అర్హత మూల్యాంకనం మరియు సులభమైన భాషా మార్గదర్శకత్వం పొందడానికి మీ ప్రొఫైల్ వివరాలను నమోదు చేయండి లేదా వాయిస్ ఇన్‌పుట్‌ని ఉపయోగించండి.",
    mobileLearnMore: "మరింత తెలుసుకోవడానికి నొక్కండి ▼",
    mobileClose: "మూసివేయడానికి నొక్కండి ▲",
    requiredDocsHeader: "సాధారణ అవసరమైన పత్రాలు",
    doc1: "ఆధార్ కార్డ్ / ప్రభుత్వ ఐడి ప్రూఫ్",
    doc2: "ఆదాయ ధృవీకరణ పత్రం (తహశీల్దార్ / మీసేవ)",
    doc3: "కుల / సామాజిక కేటగిరీ ధృవీకరణ పత్రం",
    doc4: "విద్యా పత్రాలు & ఫీజు రశీదులు",
    doc5: "ఆధార్‌తో అనుసంధానించబడిన బ్యాంక్ పాస్‌బుక్",
    checklistHeading: "చెక్‌లిస్ట్",
    stepDetails: "వివరాలు",
    stepResults: "ఫలితాలు",
    stepChecklist: "చెక్‌లిస్ట్",
    viewChecklist: "📋 చెక్‌లిస్ట్ చూడండి",
    loading: "లోడ్ అవుతోంది...",
    gapExplanation: "వ్యత్యాస వివరణ:",
    nearMissBadge: "దాదాపు అర్హత",
    eligibleBadge: "అర్హతగల",
    whyQualify: "మీరు ఎందుకు అర్హులు:",
    criteriaEvaluation: "అర్హతా ప్రమాణాల మూల్యాంకనం:",
    resultsTitle: "పథకాల సరిపోలిక ఫలితాలు",
    eligibleSchemesHeading: "🟢 అర్హత ఉన్న పథకాలు",
    nearMissSchemesHeading: "🟡 దాదాపు అర్హత ఉన్న పథకాలు"
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
