import { Language } from './constants';

export function translateText(text: string, targetLang: Language): string {
  if (!text || targetLang === 'en') return text;

  // Dictionary for scheme names
  const SCHEME_NAME_MAP: Record<string, Record<Language, string>> = {
    "PM Young Achievers Scholarship Award Scheme for Vibrant India (PM-YASASVI)": {
      en: "PM Young Achievers Scholarship Award Scheme for Vibrant India (PM-YASASVI)",
      hi: "जीवंत भारत के लिए पीएम युवा अचीवर्स छात्रवृत्ति पुरस्कार योजना (पीएम-यशस्वी)",
      te: "వైబ్రెంట్ ఇండియా కోసం పిఎం యంగ్ అచీవర్స్ స్కాలర్‌షిప్ అవార్డు స్కీమ్ (పిఎం-యశస్వి)"
    },
    "Central Sector Scheme of Scholarships for College and University Students": {
      en: "Central Sector Scheme of Scholarships for College and University Students",
      hi: "कॉलेज और विश्वविद्यालय के छात्रों के लिए छात्रवृत्ति की केंद्रीय क्षेत्र योजना",
      te: "కాలేజీ మరియు విశ్వవిద్యాలయ విద్యార్థుల కోసం సెంట్రల్ సెక్టార్ స్కాలర్‌షిప్ పథకం"
    },
    "Post-Matric Scholarship for SC/ST Students": {
      en: "Post-Matric Scholarship for SC/ST Students",
      hi: "अनुसूचित जाति/अनुसूचित जनजाति के छात्रों के लिए पोस्ट-मेट्रिक छात्रवृत्ति",
      te: "ఎస్సీ/ఎస్టీ విద్యార్థులకు పోస్ట్ మెట్రిక్ స్కాలర్‌షిప్"
    },
    "AICTE Pragati Scholarship Scheme for Girl Students": {
      en: "AICTE Pragati Scholarship Scheme for Girl Students",
      hi: "छात्रा छात्राओं के लिए एआईसीटीई प्रगति छात्रवृत्ति योजना",
      te: "బాలికల కోసం AICTE ప్రగతి స్కాలర్‌షిప్ పథకం"
    },
    "National Means-cum-Merit Scholarship Scheme (NMMSS)": {
      en: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
      hi: "राष्ट्रीय साधन-सह-योग्यता छात्रवृत्ति योजना (एनएमएमएसएस)",
      te: "నేషనల్ మీన్స్-కమ్-మెరిట్ స్కాలర్‌షిప్ స్కీమ్ (NMMSS)"
    },
    "Rajarshi Chhatrapati Shahu Maharaj Merit Scholarship (Maharashtra)": {
      en: "Rajarshi Chhatrapati Shahu Maharaj Merit Scholarship (Maharashtra)",
      hi: "राजर्षि छत्रपति शाहू महाराज मेरिट छात्रवृत्ति (महाराष्ट्र)",
      te: "రాజర్షి ఛత్రపతి షాహూ మహారాజ్ మెరిట్ స్కాలర్‌షిప్ (మహారాష్ట్ర)"
    }
  };

  // Exact map for document titles
  const DOC_NAME_MAP: Record<string, Record<Language, string>> = {
    "Aadhaar Card": {
      en: "Aadhaar Card",
      hi: "आधार कार्ड",
      te: "ఆధార్ కార్డ్"
    },
    "Income Certificate": {
      en: "Income Certificate",
      hi: "आय प्रमाण पत्र",
      te: "ఆదాయ ధృవీకరణ పత్రం"
    },
    "Caste / Category Certificate": {
      en: "Caste / Category Certificate",
      hi: "जाति / श्रेणी प्रमाण पत्र",
      te: "కుల / వర్గ ధృవీకరణ పత్రం"
    },
    "Mark sheet of previous qualifying exam": {
      en: "Mark sheet of previous qualifying exam",
      hi: "पिछली अर्हक परीक्षा की अंक तालिका",
      te: "మునుపటి అర్హత పరీక్ష మార్కుల జాబితా"
    },
    "Bank Account Details": {
      en: "Bank Account Details",
      hi: "बैंक खाते का विवरण",
      te: "బ్యాంక్ ఖాతా వివరాలు"
    },
    "Class 12th Marksheet": {
      en: "Class 12th Marksheet",
      hi: "कक्षा 12वीं की अंकतालिका",
      te: "12వ తరగతి మార్కుల జాబితా"
    },
    "College Admission Fee Receipt": {
      en: "College Admission Fee Receipt",
      hi: "कॉलेज प्रवेश शुल्क रसीद",
      te: "కళాశాల ప్రవేశ రుసుము రశీదు"
    },
    "Bank Passbook": {
      en: "Bank Passbook",
      hi: "बैंक पासबुक",
      te: "బ్యాంక్ పాస్‌బుక్"
    },
    "SC/ST Caste Certificate": {
      en: "SC/ST Caste Certificate",
      hi: "एससी/एसटी जाति प्रमाण पत्र",
      te: "ఎస్సీ/ఎస్టీ కుల ధృవీకరణ పత్రం"
    },
    "Income Certificate issued by competent authority": {
      en: "Income Certificate issued by competent authority",
      hi: "सक्षम प्राधिकारी द्वारा जारी आय प्रमाण पत्र",
      te: "సమర్థ అధికారి జారీ చేసిన ఆదాయ ధృవీకరణ పత్రం"
    },
    "Previous Exam Marksheet": {
      en: "Previous Exam Marksheet",
      hi: "पिछली परीक्षा की अंक तालिका",
      te: "మునుపటి పరీక్ష మార్కుల జాబితా"
    },
    "Fee Receipt of Current Course": {
      en: "Fee Receipt of Current Course",
      hi: "वर्तमान पाठ्यक्रम की शुल्क रसीद",
      te: "ప్రస్తుత కోర్సు రుసుము రశీదు"
    },
    "Class 10th and 12th Marksheets": {
      en: "Class 10th and 12th Marksheets",
      hi: "कक्षा 10वीं और 12वीं की अंकतालिकाएं",
      te: "10వ మరియు 12వ తరగతి మార్కుల జాబితాలు"
    },
    "Annual Family Income Certificate": {
      en: "Annual Family Income Certificate",
      hi: "वार्षिक पारिवारिक आय प्रमाण पत्र",
      te: "వార్షిక కుటుంబ ఆదాయ ధృవీకరణ పత్రం"
    },
    "Admission letter to AICTE approved technical institution": {
      en: "Admission letter to AICTE approved technical institution",
      hi: "एआईसीटीई स्वीकृत तकनीकी संस्थान में प्रवेश पत्र",
      te: "AICTE ఆమోదించిన సాంకేతిక సంస్థలో ప్రవేశ పత్రం"
    },
    "Bank Account details linked with Aadhaar": {
      en: "Bank Account details linked with Aadhaar",
      hi: "आधार से जुड़े बैंक खाते का विवरण",
      te: "ఆధార్‌తో అనుసంధానించబడిన బ్యాంక్ ఖాతా వివరాలు"
    },
    "Class 7th Marksheet with minimum 55% marks": {
      en: "Class 7th Marksheet with minimum 55% marks",
      hi: "न्यूनतम 55% अंकों के साथ कक्षा 7वीं की अंकतालिका",
      te: "కనీసం 55% మార్కులతో 7వ తరగతి మార్కుల జాబితా"
    },
    "Income Certificate of parents": {
      en: "Income Certificate of parents",
      hi: "माता-पिता का आय प्रमाण पत्र",
      te: "తల్లిదండ్రుల ఆదాయ ధృవీకరణ పత్రం"
    },
    "Caste Certificate (if applicable)": {
      en: "Caste Certificate (if applicable)",
      hi: "जाति प्रमाण पत्र (यदि लागू हो)",
      te: "కుల ధృవీకరణ పత్రం (వర్తిస్తే)"
    },
    "School ID / Headmaster Verification Certificate": {
      en: "School ID / Headmaster Verification Certificate",
      hi: "स्कूल आईडी / प्रधानाध्यापक सत्यापन प्रमाण पत्र",
      te: "పాఠశాల ఐడి / ప్రధానోపాధ్యాయుని ధృవీకరణ పత్రం"
    },
    "Domicile Certificate of Maharashtra": {
      en: "Domicile Certificate of Maharashtra",
      hi: "महाराष्ट्र का अधिवास प्रमाण पत्र (डोमीसाइल)",
      te: "మహారాష్ట్ర నివాస ధృవీకరణ పత్రం"
    },
    "Income Certificate (Form 16 or Tahsildar Certificate)": {
      en: "Income Certificate (Form 16 or Tahsildar Certificate)",
      hi: "आय प्रमाण पत्र (फॉर्म 16 या तहसीलदार प्रमाण पत्र)",
      te: "ఆదాయ ధృవీకరణ పత్రం (ఫారమ్ 16 లేదా తహశీల్దార్ పత్రం)"
    },
    "CAP Allotment Letter for professional course": {
      en: "CAP Allotment Letter for professional course",
      hi: "व्यावसायिक पाठ्यक्रम के लिए कैप आवंटन पत्र",
      te: "వృత్తిపరమైన కోర్సు కోసం CAP కేటాయింపు పత్రం"
    },
    "Aadhaar Card linked with Bank Account": {
      en: "Aadhaar Card linked with Bank Account",
      hi: "बैंक खाते से जुड़ा आधार कार्ड",
      te: "బ్యాంక్ ఖాతాతో అనుసంధానించబడిన ఆధార్ కార్డ్"
    }
  };

  if (SCHEME_NAME_MAP[text] && SCHEME_NAME_MAP[text][targetLang]) {
    return SCHEME_NAME_MAP[text][targetLang];
  }

  if (DOC_NAME_MAP[text] && DOC_NAME_MAP[text][targetLang]) {
    return DOC_NAME_MAP[text][targetLang];
  }

  let translated = text;

  if (targetLang === 'hi') {
    translated = translated
      // Descriptions
      .replace(/Government-issued 12-digit unique identity card\./g, "सरकार द्वारा जारी 12-अंकीय विशिष्ट पहचान पत्र।")
      .replace(/Official certificate verifying total annual household income\./g, "कुल वार्षिक पारिवारिक आय को सत्यापित करने वाला आधिकारिक प्रमाण पत्र।")
      .replace(/Official certificate proving reserved social category status\./g, "आरक्षित सामाजिक श्रेणी की स्थिति साबित करने वाला आधिकारिक प्रमाण पत्र।")
      .replace(/Official academic transcript showing qualifying exam scores\./g, "अर्हक परीक्षा स्कोर दिखाने वाली आधिकारिक शैक्षणिक अंक तालिका।")
      .replace(/Bank passbook page or statement showing account number & IFSC code\./g, "खाता संख्या और आईएफएससी कोड दिखाने वाला बैंक पासबुक पृष्ठ या विवरण।")
      .replace(/Proof of current academic term enrolment and fee payment\./g, "वर्तमान शैक्षणिक सत्र नामांकन और शुल्क भुगतान का प्रमाण।")
      .replace(/Official certificate proving state residence status\./g, "राज्य निवास स्थिति साबित करने वाला आधिकारिक प्रमाण पत्र।")
      .replace(/Official confirmation letter proving merit-based seat allotment\./g, "मेरिट-आधारित सीट आवंटन साबित करने वाला आधिकारिक पुष्टि पत्र।")
      .replace(/Bonafide student certificate or current institutional ID\./g, "बोनाफाइड छात्र प्रमाण पत्र या वर्तमान संस्थान आईडी।")
      .replace(/Official document required for application verification\./g, "आवेदन सत्यापन के लिए आवश्यक आधिकारिक दस्तावेज।")
      // Hints
      .replace(/Obtain or update at nearest UIDAI Aadhaar Seva Kendra, CSC center, or Post Office\./g, "निकटतम यूआईडीएआई आधार सेवा केंद्र, सीएससी केंद्र या डाकघर में प्राप्त या अपडेट करें।")
      .replace(/Apply at local Tahsildar \/ Revenue office or state e-District \/ MeeSeva portal\./g, "स्थानीय तहसीलदार / राजस्व कार्यालय या राज्य ई-डिस्ट्रिक्ट पोर्टल पर आवेदन करें।")
      .replace(/Obtain from Sub-Divisional Magistrate \(SDM\) \/ Tahsildar office or state e-District portal\./g, "उप-विभागीय मजिस्ट्रेट (एसडीएम) / तहसीलदार कार्यालय या राज्य ई-डिस्ट्रिक्ट पोर्टल से प्राप्त करें।")
      .replace(/Request from your school board, college examination department, or DigiLocker\./g, "अपने स्कूल बोर्ड, कॉलेज परीक्षा विभाग या डिजीलॉकर से अनुरोध करें।")
      .replace(/Obtain passbook print from your bank branch or download via netbanking app\./g, "अपनी बैंक शाखा से पासबुक प्रिंट प्राप्त करें या नेटबैंकिंग ऐप के माध्यम से डाउनलोड करें।")
      .replace(/Collect from your institution's fee counter or download from student portal\./g, "अपने संस्थान के शुल्क काउंटर से प्राप्त करें या छात्र पोर्टल से डाउनलोड करें।")
      .replace(/Apply online on the state e-Governance portal \(e\.g\., Aaple Sarkar \/ MeeSeva\) or Tehsil office\./g, "राज्य ई-गवर्नेंस पोर्टल या तहसील कार्यालय में ऑनलाइन आवेदन करें।")
      .replace(/Download from Centralized Admission Process \(CAP\) \/ CET authority portal\./g, "सेंट्रलाइज्ड एडमिशन प्रोसेस (सीएपी) / सीईटी अथॉरिटी पोर्टल से डाउनलोड करें।")
      .replace(/Obtain directly from your school Principal or Headmaster's office\./g, "सीधे अपने स्कूल के प्राचार्य या प्रधानाध्यापक के कार्यालय से प्राप्त करें।")
      .replace(/Obtain from the issuing government department or educational institution\./g, "जारीकर्ता सरकारी विभाग या शैक्षणिक संस्थान से प्राप्त करें।")
      // Schemes
      .replace(/Scholarship scheme by the Ministry of Social Justice and Empowerment for OBC, EBC, and DNT students studying in Class 9 to 12 and higher education\./g, "कक्षा 9 से 12 और उच्च शिक्षा में पढ़ने वाले अन्य पिछड़ा वर्ग, ईबीसी और डीएनटी छात्रों के लिए सामाजिक न्याय और अधिकारिता मंत्रालय द्वारा छात्रवृत्ति योजना।")
      .replace(/Financial assistance to meritorious students from low-income families to meet a part of their day-to-day expenses while pursuing higher studies\./g, "उच्च शिक्षा प्राप्त करने के दौरान अपने दैनिक खर्चों को पूरा करने के लिए कम आय वाले परिवारों के मेधावी छात्रों को वित्तीय सहायता।")
      .replace(/Financial assistance to Scheduled Caste and Scheduled Tribe students studying at post-matriculation or post-secondary stage to enable them to complete their education\./g, "अनुसूचित जाति और अनुसूचित जनजाति के छात्रों को उनकी शिक्षा पूरी करने में सक्षम बनाने के लिए उत्तर-मैट्रिक या उत्तर-माध्यमिक स्तर पर अध्ययन करने वाले छात्रों को वित्तीय सहायता।")
      .replace(/Scholarship provided by AICTE to empower girl students pursuing technical education in approved degree or diploma institutions\./g, "अनुमोदित डिग्री या डिप्लोमा संस्थानों में तकनीकी शिक्षा प्राप्त कर रही छात्राओं को सशक्त बनाने के लिए एआईसीटीई द्वारा प्रदान की जाने वाली छात्रवृत्ति।")
      .replace(/Awarded to meritorious students of economically weaker sections to arrest their drop out at class 8 and encourage them to continue study at secondary stage\./g, "आर्थिक रूप से कमजोर वर्गों के मेधावी छात्रों को कक्षा 8 में उनकी पढ़ाई छोड़ने से रोकने और माध्यमिक स्तर पर पढ़ाई जारी रखने के लिए प्रोत्साहित करने हेतु सम्मानित किया जाता है।")
      .replace(/State scholarship by Maharashtra Government providing financial assistance to EWS and General category students pursuing higher professional education\./g, "महाराष्ट्र सरकार द्वारा उच्च व्यावसायिक शिक्षा प्राप्त कर रहे ईडब्ल्यूएस और सामान्य श्रेणी के छात्रों को वित्तीय सहायता प्रदान करने वाली राज्य छात्रवृत्ति।")
      // Reasons & Gap explanations
      .replace(/Age \((.+)\) is within the maximum limit of (.+) years\./g, "आयु ($1) अधिकतम सीमा $2 वर्ष के भीतर है।")
      .replace(/Age \((.+)\) exceeds the limit by (.+) year(?:s)? \(limit: (.+) years\)\./g, "आयु ($1) सीमा से $2 वर्ष अधिक है (सीमा: $3 वर्ष)।")
      .replace(/State \((.+)\) is eligible\./g, "राज्य ($1) पात्र है।")
      .replace(/State \((.+)\) is not eligible; scheme is restricted to: (.+)\./g, "राज्य ($1) पात्र नहीं है; योजना केवल $2 के लिए सीमित है।")
      .replace(/Annual income \(₹(.+)\) is within the upper threshold of ₹(.+)\./g, "वार्षिक आय (₹$1) ₹$2 की ऊपरी सीमा के भीतर है।")
      .replace(/Annual income \(₹(.+)\) exceeds limit by ₹(.+)\./g, "वार्षिक आय (₹$1) की सीमा ₹$2 से अधिक है।")
      .replace(/Category \((.+)\) matches scheme requirements \((.+)\)\./g, "श्रेणी ($1) योजना की आवश्यकताओं ($2) से मेल खाती है।")
      .replace(/Category \((.+)\) is not eligible; scheme requires: (.+)\./g, "श्रेणी ($1) पात्र नहीं है; योजना के लिए आवश्यकता: $2।")
      .replace(/Gender \((.+)\) meets scheme eligibility\./g, "लिंग ($1) योजना की पात्रता को पूरा करता है।")
      .replace(/Gender \((.+)\) is not eligible; scheme is restricted to: (.+)\./g, "लिंग ($1) पात्र नहीं है; योजना केवल $2 के लिए सीमित है।")
      .replace(/Education level \((.+)\) meets eligibility criteria\./g, "शिक्षा का स्तर ($1) पात्रता मानदंडों को पूरा करता है।")
      .replace(/Education level \((.+)\) is not listed; requires: (.+)\./g, "शिक्षा का स्तर ($1) सूचीबद्ध नहीं है; आवश्यकता: $2।")
      .replace(/Age is (.+) year(?:s)? above the limit of (.+) years\./g, "आयु $2 वर्ष की सीमा से $1 वर्ष अधिक है।")
      .replace(/Income is ₹(.+) above the limit of ₹(.+)\./g, "आय ₹$2 की सीमा से ₹$1 अधिक है।")
      .replace(/Category is (.+), but scheme requires (.+)\./g, "श्रेणी $1 है, लेकिन योजना के लिए $2 की आवश्यकता है।")
      .replace(/Gender is (.+), but scheme requires (.+)\./g, "लिंग $1 है, लेकिन योजना के लिए $2 की आवश्यकता है।")
      .replace(/State is (.+), but scheme is restricted to (.+)\./g, "राज्य $1 है, लेकिन योजना $2 के लिए सीमित है।")
      .replace(/Education level is (.+), but scheme requires (.+)\./g, "शिक्षा का स्तर $1 है, लेकिन योजना के लिए $2 की आवश्यकता है।");
  } else if (targetLang === 'te') {
    translated = translated
      // Descriptions
      .replace(/Government-issued 12-digit unique identity card\./g, "ప్రభుత్వం జారీ చేసిన 12 అంకెల విశిష్ట గుర్తింపు కార్డ్.")
      .replace(/Official certificate verifying total annual household income\./g, "మొత్తం వార్షిక కుటుంబ ఆదాయాన్ని ధృవీకరించే అధికారిక పత్రం.")
      .replace(/Official certificate proving reserved social category status\./g, "రిజర్వు చేసిన సామాజిక వర్గం హోదాను నిరూపించే అధికారిక పత్రం.")
      .replace(/Official academic transcript showing qualifying exam scores\./g, "అర్హత పరీక్ష మార్కులను చూపించే అధికారిక విద్యా పత్రం.")
      .replace(/Bank passbook page or statement showing account number & IFSC code\./g, "ఖాతా సంఖ్య మరియు IFSC కోడ్‌ను చూపించే బ్యాంక్ పాస్‌బుక్ పేజీ లేదా స్టేట్‌మెంట్.")
      .replace(/Proof of current academic term enrolment and fee payment\./g, "ప్రస్తుత విద్యా సంవత్సరం నమోదు మరియు రుసుము చెల్లింపు రుజువు.")
      .replace(/Official certificate proving state residence status\./g, "రాష్ట్ర నివాస హోదాను నిరూపించే అధికారిక పత్రం.")
      .replace(/Official confirmation letter proving merit-based seat allotment\./g, "మెరిట్ ఆధారిత సీటు కేటాయింపును నిరూపించే అధికారిక పత్రం.")
      .replace(/Bonafide student certificate or current institutional ID\./g, "బోనాఫైడ్ విద్యార్థి ధృవీకరణ పత్రం లేదా ప్రస్తుత సంస్థ ID.")
      .replace(/Official document required for application verification\./g, "దరఖాస్తు పరిశీలనకు అవసరమైన అధికారిక పత్రం.")
      // Hints
      .replace(/Obtain or update at nearest UIDAI Aadhaar Seva Kendra, CSC center, or Post Office\./g, "సమీపంలోని UIDAI ఆధార్ సేవా కేంద్రం, CSC కేంద్రం లేదా తపాలా కార్యాలయంలో పొందండి.")
      .replace(/Apply at local Tahsildar \/ Revenue office or state e-District \/ MeeSeva portal\./g, "స్థానిక తహశీల్దార్ / రెవెన్యూ కార్యాలయం లేదా మీసేవ పోర్టల్‌లో దరఖాస్తు చేయండి.")
      .replace(/Obtain from Sub-Divisional Magistrate \(SDM\) \/ Tahsildar office or state e-District portal\./g, "RDO / తహశీల్దార్ కార్యాలయం లేదా మీసేవ పోర్టల్ నుండి పొందండి.")
      .replace(/Request from your school board, college examination department, or DigiLocker\./g, "మీ పాఠశాల బోర్డు, కళాశాల పరీక్ష విభాగం లేదా డిజిలాకర్ నుండి పొందండి.")
      .replace(/Obtain passbook print from your bank branch or download via netbanking app\./g, "మీ బ్యాంక్ బ్రాంచ్ నుండి పాస్‌బుక్ ప్రింట్ పొందండి లేదా నెట్‌బ్యాంకింగ్ యాప్ ద్వారా డౌన్‌లోడ్ చేయండి.")
      .replace(/Collect from your institution's fee counter or download from student portal\./g, "మీ విద్యా సంస్థ ఫీజు కౌంటర్ నుండి లేదా స్టూడెంట్ పోర్టల్ నుండి డౌన్‌లోడ్ చేసుకోండి.")
      .replace(/Apply online on the state e-Governance portal \(e\.g\., Aaple Sarkar \/ MeeSeva\) or Tehsil office\./g, "రాష్ట్ర మీసేవ పోర్టల్ లేదా తహశీల్దార్ కార్యాలయంలో ఆన్‌లైన్‌లో దరఖాస్తు చేయండి.")
      .replace(/Download from Centralized Admission Process \(CAP\) \/ CET authority portal\./g, "సెంట్రలైజ్డ్ అడ్మిషన్ ప్రాసెస్ (CAP) / CET అథారిటీ పోర్టల్ నుండి డౌన్‌లోడ్ చేయండి.")
      .replace(/Obtain directly from your school Principal or Headmaster's office\./g, "నేరుగా మీ పాఠశాల ప్రిన్సిపాల్ లేదా ప్రధానోపాధ్యాయుల కార్యాలయం నుండి పొందండి.")
      .replace(/Obtain from the issuing government department or educational institution\./g, "జారీ చేసే ప్రభుత్వ శాఖ లేదా విద్యా సంస్థ నుండి పొందండి.")
      // Schemes
      .replace(/Scholarship scheme by the Ministry of Social Justice and Empowerment for OBC, EBC, and DNT students studying in Class 9 to 12 and higher education\./g, "9 నుండి 12 తరగతులు మరియు ఉన్నత చదువులు చదువుతున్న ఓబీసీ, ఈబీసీ, డీఎన్‌టీ విద్యార్థుల కోసం సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ స్కాలర్‌షిప్ పథకం.")
      .replace(/Financial assistance to meritorious students from low-income families to meet a part of their day-to-day expenses while pursuing higher studies\./g, "ఉన్నత చదువులు అభ్యసిస్తున్నప్పుడు తక్కువ ఆదాయం ఉన్న కుటుంబాలకు చెందిన ప్రతిభావంతులైన విద్యార్థులకు వారి రోజువారీ ఖర్చుల కోసం ఆర్థిక సహాయం.")
      .replace(/Financial assistance to Scheduled Caste and Scheduled Tribe students studying at post-matriculation or post-secondary stage to enable them to complete their education\./g, "షెడ్యూల్డ్ కులాలు మరియు షెడ్యూల్డ్ తెగల విద్యార్థులు తమ చదువును పూర్తి చేయడానికి పోస్ట్-మెట్రిక్యులేషన్ స్థాయిలో ఆర్థిక సహాయం.")
      .replace(/Scholarship provided by AICTE to empower girl students pursuing technical education in approved degree or diploma institutions\./g, "సాంకేతిక విద్యను అభ్యసిస్తున్న బాలికలను సాధికారులను చేయడానికి AICTE అందించే స్కాలర్‌షిప్.")
      .replace(/Awarded to meritorious students of economically weaker sections to arrest their drop out at class 8 and encourage them to continue study at secondary stage\./g, "ఆర్థికంగా వెనుకబడిన వర్గాల ప్రతిభావంతులైన విద్యార్థులకు 8వ తరగతిలో బడి మానకుండా ఉన్నత చదువులు కొనసాగించడానికి లభించే స్కాలర్‌షిప్.")
      .replace(/State scholarship by Maharashtra Government providing financial assistance to EWS and General category students pursuing higher professional education\./g, "ఉన్నత వృత్తి విద్యను అభ్యసిస్తున్న ఇడబ్ల్యూఎస్ మరియు జనరల్ కేటగిరీ విద్యార్థులకు మహారాష్ట్ర ప్రభుత్వం అందించే రాష్ట్ర స్కాలర్‌షిప్.")
      // Reasons & Gap explanations
      .replace(/Age \((.+)\) is within the maximum limit of (.+) years\./g, "వయస్సు ($1) గరిష్ట పరిమితి $2 సంవత్సరాల లోపు ఉంది.")
      .replace(/Age \((.+)\) exceeds the limit by (.+) year(?:s)? \(limit: (.+) years\)\./g, "వయస్సు ($1) పరిమితి కంటే $2 సంవత్సరాలు ఎక్కువ ఉంది (పరిమితి: $3 సంవత్సరాలు).")
      .replace(/State \((.+)\) is eligible\./g, "రాష్ట్రం ($1) అర్హత కలిగి ఉంది.")
      .replace(/State \((.+)\) is not eligible; scheme is restricted to: (.+)\./g, "రాష్ట్రం ($1) అర్హత లేదు; ఈ పథకం $2కు మాత్రమే పరిమితం.")
      .replace(/Annual income \(₹(.+)\) is within the upper threshold of ₹(.+)\./g, "వార్షిక ఆదాయం (₹$1) పరిమితి ₹$2 లోపు ఉంది.")
      .replace(/Annual income \(₹(.+)\) exceeds limit by ₹(.+)\./g, "వార్షిక ఆదాయం (₹$1) పరిమితి ₹$2 కంటే ఎక్కువ ఉంది.")
      .replace(/Category \((.+)\) matches scheme requirements \((.+)\)\./g, "వర్గం ($1) పథకం అవసరాలకు సరిపోలుతుంది.")
      .replace(/Category \((.+)\) is not eligible; scheme requires: (.+)\./g, "వర్గం ($1) అర్హత లేదు; వర్గం అవసరం: $2.")
      .replace(/Gender \((.+)\) meets scheme eligibility\./g, "లింగం ($1) అర్హత ప్రమాణాలను అందుకుంటోంది.")
      .replace(/Gender \((.+)\) is not eligible; scheme is restricted to: (.+)\./g, "లింగం ($1) అర్హత లేదు; ఈ పథకం $2కు మాత్రమే పరిమితం.")
      .replace(/Education level \((.+)\) meets eligibility criteria\./g, "విద్యా అర్హత ($1) అర్హత ప్రమాణాలను అందుకంటోంది.")
      .replace(/Education level \((.+)\) is not listed; requires: (.+)\./g, "విద్యా అర్హత ($1) అర్హత లేదు; అవసరం: $2.")
      .replace(/Age is (.+) year(?:s)? above the limit of (.+) years\./g, "వయస్సు $2 సంవత్సరాల పరిమితి కంటే $1 సంవత్సరాలు ఎక్కువ ఉంది.")
      .replace(/Income is ₹(.+) above the limit of ₹(.+)\./g, "ఆదాయం ₹$2 పరిమితి కంటే ₹$1 ఎక్కువ ఉంది.")
      .replace(/Category is (.+), but scheme requires (.+)\./g, "వర్గం $1, కానీ పథకానికి $2 అవసరం.")
      .replace(/Gender is (.+), but scheme requires (.+)\./g, "లింగం $1, కానీ పథకానికి $2 అవసరం.")
      .replace(/State is (.+), but scheme is restricted to (.+)\./g, "రాష్ట్రం $1, కానీ పథకం $2కు పరిమితం.")
      .replace(/Education level is (.+), but scheme requires (.+)\./g, "విద్యా అర్హత $1, కానీ పథకానికి $2 అవసరం.");
  }

  return translated;
}
