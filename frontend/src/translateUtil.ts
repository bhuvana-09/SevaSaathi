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
      te: "రాజర్షి ఛత్రపతి షాహూ మహారాజ్ మెరిట్ छात्रवृत्ति (महारष्ट्र)"
    }
  };

  if (SCHEME_NAME_MAP[text] && SCHEME_NAME_MAP[text][targetLang]) {
    return SCHEME_NAME_MAP[text][targetLang];
  }

  let translated = text;

  if (targetLang === 'hi') {
    translated = translated
      .replace(/Scholarship scheme by the Ministry of Social Justice and Empowerment for OBC, EBC, and DNT students studying in Class 9 to 12 and higher education\./g, "कक्षा 9 से 12 और उच्च शिक्षा में पढ़ने वाले अन्य पिछड़ा वर्ग, ईबीसी और डीएनटी छात्रों के लिए सामाजिक न्याय और अधिकारिता मंत्रालय द्वारा छात्रवृत्ति योजना।")
      .replace(/Financial assistance to meritorious students from low-income families to meet a part of their day-to-day expenses while pursuing higher studies\./g, "उच्च शिक्षा प्राप्त करने के दौरान अपने दैनिक खर्चों को पूरा करने के लिए कम आय वाले परिवारों के मेधावी छात्रों को वित्तीय सहायता।")
      .replace(/Financial assistance to Scheduled Caste and Scheduled Tribe students studying at post-matriculation or post-secondary stage to enable them to complete their education\./g, "अनुसूचित जाति और अनुसूचित जनजाति के छात्रों को उनकी शिक्षा पूरी करने में सक्षम बनाने के लिए उत्तर-मैट्रिक या उत्तर-माध्यमिक स्तर पर अध्ययन करने वाले छात्रों को वित्तीय सहायता।")
      .replace(/Scholarship provided by AICTE to empower girl students pursuing technical education in approved degree or diploma institutions\./g, "अनुमोदित डिग्री या डिप्लोमा संस्थानों में तकनीकी शिक्षा प्राप्त कर रही छात्राओं को सशक्त बनाने के लिए एआईसीटीई द्वारा प्रदान की जाने वाली छात्रवृत्ति।")
      .replace(/Awarded to meritorious students of economically weaker sections to arrest their drop out at class 8 and encourage them to continue study at secondary stage\./g, "आर्थिक रूप से कमजोर वर्गों के मेधावी छात्रों को कक्षा 8 में उनकी पढ़ाई छोड़ने से रोकने और माध्यमिक स्तर पर पढ़ाई जारी रखने के लिए प्रोत्साहित करने हेतु सम्मानित किया जाता है।")
      .replace(/State scholarship by Maharashtra Government providing financial assistance to EWS and General category students pursuing higher professional education\./g, "महाराष्ट्र सरकार द्वारा उच्च व्यावसायिक शिक्षा प्राप्त कर रहे ईडब्ल्यूएस और सामान्य श्रेणी के छात्रों को वित्तीय सहायता प्रदान करने वाली राज्य छात्रवृत्ति।")
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
      .replace(/Scholarship scheme by the Ministry of Social Justice and Empowerment for OBC, EBC, and DNT students studying in Class 9 to 12 and higher education\./g, "9 నుండి 12 తరగతులు మరియు ఉన్నత చదువులు చదువుతున్న ఓబీసీ, ఈబీసీ, డీఎన్‌టీ విద్యార్థుల కోసం సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ స్కాలర్‌షిప్ పథకం.")
      .replace(/Financial assistance to meritorious students from low-income families to meet a part of their day-to-day expenses while pursuing higher studies\./g, "ఉన్నత చదువులు అభ్యసిస్తున్నప్పుడు తక్కువ ఆదాయం ఉన్న కుటుంబాలకు చెందిన ప్రతిభావంతులైన విద్యార్థులకు వారి రోజువారీ ఖర్చుల కోసం ఆర్థిక సహాయం.")
      .replace(/Financial assistance to Scheduled Caste and Scheduled Tribe students studying at post-matriculation or post-secondary stage to enable them to complete their education\./g, "షెడ్యూల్డ్ కులాలు మరియు షెడ్యూల్డ్ తెగల విద్యార్థులు తమ చదువును పూర్తి చేయడానికి పోస్ట్-మెట్రిక్యులేషన్ స్థాయిలో ఆర్థిక సహాయం.")
      .replace(/Scholarship provided by AICTE to empower girl students pursuing technical education in approved degree or diploma institutions\./g, "సాంకేతిక విద్యను అభ్యసిస్తున్న బాలికలను సాధికారులను చేయడానికి AICTE అందించే స్కాలర్‌షిప్.")
      .replace(/Awarded to meritorious students of economically weaker sections to arrest their drop out at class 8 and encourage them to continue study at secondary stage\./g, "ఆర్థికంగా వెనుకబడిన వర్గాల ప్రతిభావంతులైన విద్యార్థులకు 8వ తరగతిలో బడి మానకుండా ఉన్నత చదువులు కొనసాగించడానికి లభించే స్కాలర్‌షిప్.")
      .replace(/State scholarship by Maharashtra Government providing financial assistance to EWS and General category students pursuing higher professional education\./g, "ఉన్నత వృత్తి విద్యను అభ్యసిస్తున్న ఇడబ్ల్యూఎస్ మరియు జనరల్ కేటగిరీ విద్యార్థులకు మహారాష్ట్ర ప్రభుత్వం అందించే రాష్ట్ర స్కాలర్‌షిప్.")
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
