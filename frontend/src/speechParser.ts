import { UserFormData } from './UserForm';

// Mappings for Indian States in English, Hindi, Telugu, and Common Transliterations
const STATE_MAP: Record<string, string[]> = {
  "Andhra Pradesh": ["andhra pradesh", "आंध्र प्रदेश", "ఆంధ్ర ప్రదేశ్", "andhra", "ఆంధ్ర"],
  "Arunachal Pradesh": ["arunachal pradesh", "अरुणाचल प्रदेश", "అరుణాచల్ ప్రదేశ్", "arunachal"],
  "Assam": ["assam", "असम", "అస్సాం", "asom"],
  "Bihar": ["bihar", "बिहार", "బీహార్"],
  "Chhattisgarh": ["chhattisgarh", "छत्तीसगढ़", "ఛత్తీస్‌గఢ్"],
  "Goa": ["goa", "गोवा", "గోవా"],
  "Gujarat": ["gujarat", "गुजरात", "గుజరాత్"],
  "Haryana": ["haryana", "हरियाणा", "హర్యానా"],
  "Himachal Pradesh": ["himachal pradesh", "हिमाचल प्रदेश", "హిమాచల్ ప్రదేశ్", "himachal"],
  "Jharkhand": ["jharkhand", "झारखंड", "జార్ఖండ్"],
  "Karnataka": ["karnataka", "कर्नाटक", "కర్ణాటక"],
  "Kerala": ["kerala", "केरल", "కేరళ"],
  "Madhya Pradesh": ["madhya pradesh", "मध्य प्रदेश", "మధ్యప్రదేశ్", "mp", "एम पी"],
  "Maharashtra": ["maharashtra", "महाराष्ट्र", "మహారాష్ట్ర"],
  "Manipur": ["manipur", "मणिपुर", "మణిపూర్"],
  "Meghalaya": ["meghalaya", "मेघालय", "మేఘాలయ"],
  "Mizoram": ["mizoram", "मिजोरम", "మిజోరం"],
  "Nagaland": ["nagaland", "नागालैंड", "నాగాలాండ్"],
  "Odisha": ["odisha", "ओडिशा", "ఒడిశా", "orissa", "उड़ीसा"],
  "Punjab": ["punjab", "पंजाब", "పంజాబ్"],
  "Rajasthan": ["rajasthan", "राजस्थान", "రాజస్థాన్"],
  "Sikkim": ["sikkim", "सिक्किम", "సిక్కిం"],
  "Tamil Nadu": ["tamil nadu", "तमिलनाडु", "తమిళనాడు", "tamilnadu"],
  "Telangana": ["telangana", "तेलंगाना", "తెలంగాణ"],
  "Tripura": ["tripura", "त्रिपुरा", "త్రిపుర"],
  "Uttar Pradesh": ["uttar pradesh", "उत्तर प्रदेश", "ఉత్తర ప్రదేశ్", "up", "यूपी"],
  "Uttarakhand": ["uttarakhand", "उत्तराखंड", "ఉత్తరాఖండ్"],
  "West Bengal": ["west bengal", "पश्चिम बंगाल", "पश्छिम बंगाल", "bengal", "बंगाल"],
  "Andaman and Nicobar Islands": ["andaman and nicobar", "अंडमान और निकोबार", "అండమాన్ మరియు నికోబార్"],
  "Chandigarh": ["chandigarh", "चंडीगढ़", "చండీగఢ్"],
  "Dadra and Nagar Haveli and Daman and Diu": ["daman and diu", "dadra and nagar haveli", "दमन और दीव", "దాద్రా నగర్ హవేలీ"],
  "Delhi": ["delhi", "दिल्ली", "ఢిల్లీ"],
  "Jammu and Kashmir": ["jammu and kashmir", "जम्मू और कश्मीर", "జమ్మూ మరియు కాశ్మీర్", "kashmir", "कश्मीर"],
  "Ladakh": ["ladakh", "लद्दाख", "లడఖ్"],
  "Lakshadweep": ["lakshadweep", "लक्षद्वीप", "లక్షద్వీప్"],
  "Puducherry": ["puducherry", "पुडुचेरी", "పుదుచ్చేరి", "pondicherry"]
};

// Mappings for Categories in English, Hindi, Telugu, and Devanagari/Telugu scripts
const CATEGORY_MAP: Record<string, string[]> = {
  "General": ["general", "सामान्य", "जनरल", "జనరల్", "unreserved", "अनारक्षित", "ओपन", "ఓపెన్"],
  "OBC": ["obc", "ओबीसी", "ఓబీసీ", "other backward class", "अन्य पिछड़ा वर्ग", "వెనుకబడిన తరగతి"],
  "SC": ["sc", "एससी", "ఎస్సీ", "scheduled caste", "अनुसूचित जाति", "షెడ్యూల్డ్ కులాలు"],
  "ST": ["st", "एसटी", "ఎస్టీ", "scheduled tribe", "अनुसूचित जनजाति", "షెడ్యూల్డ్ తెగలు"],
  "EBC": ["ebc", "ईबीसी", "ఈబీసీ", "economically backward class", "आर्थिक रूप से पिछड़ा वर्ग"],
  "DNT": ["dnt", "डीएनटी", "డీఎన్‌టీ", "denotified tribe", "विमुक्त जनजाति"]
};

// Female listed before Male to ensure female is evaluated first; word boundary regex used for ASCII
const GENDER_MAP: Record<string, string[]> = {
  "Female": ["female", "woman", "girl", "महिला", "स्त्री", "लड़की", "స్త్రీ", "మహిళ", "ఆడ"],
  "Male": ["male", "man", "boy", "पुरुष", "आदमी", "लड़का", "పురుషుడు", "మగ"],
  "Other": ["other", "transgender", "अन्य", "अन्य लिंग", "ఇతర", "ఇతర లింగం"]
};

export function parseSpeechToFormData(text: string, currentData: UserFormData): UserFormData {
  const updates: Partial<UserFormData> = {};
  const lowerText = text.toLowerCase().trim();
  // Remove commas inside digit sequences (e.g. 1,00,000 -> 100000)
  const normalizedText = lowerText.replace(/(\d+),(?=\d)/g, '$1');

  // 1. Extract Age
  const ageKeywordMatch = normalizedText.match(/(?:age|umar|उम्र|आयु|వయస్సు|సాళ్ళు)\s*(?:is|:=)?\s*(\d{1,3})/i);
  const ageUnitMatch = normalizedText.match(/(\d{1,3})\s*(?:years|yr|yrs|saal|varsh|वर्ष|साल|సంవత్సరాలు|సాళ్ళు)/i);

  if (ageKeywordMatch && ageKeywordMatch[1]) {
    const num = parseInt(ageKeywordMatch[1], 10);
    if (num > 0 && num <= 120) {
      updates.age = num.toString();
    }
  } else if (ageUnitMatch && ageUnitMatch[1]) {
    const num = parseInt(ageUnitMatch[1], 10);
    if (num > 0 && num <= 120) {
      updates.age = num.toString();
    }
  } else {
    // Standalone number check (ignore decimal numbers like 1.5 or 2.5)
    const numbers = normalizedText.match(/(?<![\d.])\b\d{1,2}\b(?![\d.])/g);
    if (numbers) {
      for (const numStr of numbers) {
        const num = parseInt(numStr, 10);
        const isClassNum = (num === 10 || num === 12 || num === 8) && (normalizedText.includes('pass') || normalizedText.includes('class') || normalizedText.includes('तरगति') || normalizedText.includes('తరగతి'));
        if (num >= 5 && num <= 100 && !isClassNum) {
          updates.age = num.toString();
          break;
        }
      }
    }
  }

  // 2. Extract Income
  let incomeVal: number | null = null;
  const lakhMatch = normalizedText.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs|लाख|లక్ష|లక్షలు|లక్షల)/i);
  if (lakhMatch) {
    incomeVal = parseFloat(lakhMatch[1]) * 100000;
  } else {
    const thousandMatch = normalizedText.match(/(\d+(?:\.\d+)?)\s*(?:thousand|thousands|hazaar|हज़ार|వేలు|వేల)/i);
    if (thousandMatch) {
      incomeVal = parseFloat(thousandMatch[1]) * 1000;
    } else {
      const incomeMatch = normalizedText.match(/(?:income|annual income|salary|aay|aaya|iaka|आय|वार्षिक आय|आवक|ఆదాయం|వార్షిక రాబడి|రాబడి|వార్షిక ఆదాయం|ఆదాయము)\s*(?:is|:=)?\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
      if (incomeMatch) {
        incomeVal = parseInt(incomeMatch[1], 10);
      } else {
        const directNumMatch = normalizedText.match(/(?:₹|rs\.?|inr)\s*(\d+)/i) || normalizedText.match(/\b(\d{4,8})\b/);
        if (directNumMatch) {
          const num = parseInt(directNumMatch[1], 10);
          if (num >= 1000 && num <= 100000000) {
            incomeVal = num;
          }
        }
      }
    }
  }
  if (incomeVal !== null && !isNaN(incomeVal)) {
    updates.income = incomeVal.toString();
  }

  // 3. Extract State (Multilingual)
  for (const [officialState, variants] of Object.entries(STATE_MAP)) {
    for (const variant of variants) {
      if (lowerText.includes(variant)) {
        updates.state = officialState;
        break;
      }
    }
    if (updates.state) break;
  }

  // 4. Extract Category (Multilingual)
  for (const [officialCategory, variants] of Object.entries(CATEGORY_MAP)) {
    for (const variant of variants) {
      if (lowerText.includes(variant)) {
        updates.category = officialCategory;
        break;
      }
    }
    if (updates.category) break;
  }

  // 5. Extract Gender (Multilingual with Word Boundaries)
  for (const [officialGender, variants] of Object.entries(GENDER_MAP)) {
    for (const variant of variants) {
      const isAscii = /^[a-z]+$/i.test(variant);
      const matched = isAscii
        ? new RegExp(`\\b${variant}\\b`, 'i').test(lowerText)
        : lowerText.includes(variant);

      if (matched) {
        updates.gender = officialGender;
        break;
      }
    }
    if (updates.gender) break;
  }

  // 6. Extract Education Level (Multilingual)
  if (
    lowerText.includes('below 10') ||
    lowerText.includes('10th fail') ||
    lowerText.includes('दसवीं से कम') ||
    lowerText.includes('10వ తరగతి కంటే తక్కువ')
  ) {
    updates.educationLevel = 'Below 10th';
  } else if (
    lowerText.includes('10th') ||
    lowerText.includes('ssc') ||
    lowerText.includes('10 pass') ||
    lowerText.includes('मैट्रिक') ||
    lowerText.includes('दसवीं') ||
    lowerText.includes('10వ తరగతి') ||
    lowerText.includes('పదవ తరగతి')
  ) {
    updates.educationLevel = '10th Pass (SSC)';
  } else if (
    lowerText.includes('12th') ||
    lowerText.includes('hsc') ||
    lowerText.includes('inter') ||
    lowerText.includes('12 pass') ||
    lowerText.includes('इंटर') ||
    lowerText.includes('बारहवीं') ||
    lowerText.includes('12వ తరగతి') ||
    lowerText.includes('ఇంటర్')
  ) {
    updates.educationLevel = '12th Pass (HSC)';
  } else if (
    lowerText.includes('diploma') ||
    lowerText.includes('डिप्लोमा') ||
    lowerText.includes('డిప్లొమా')
  ) {
    updates.educationLevel = 'Diploma';
  } else if (
    lowerText.includes('graduate') ||
    lowerText.includes('bachelor') ||
    lowerText.includes('degree') ||
    lowerText.includes('b.tech') ||
    lowerText.includes('b.sc') ||
    lowerText.includes('b.com') ||
    lowerText.includes('b.a') ||
    lowerText.includes('स्नातक') ||
    lowerText.includes('డిగ్రీ') ||
    lowerText.includes('గ్రాడ్యుయేట్')
  ) {
    updates.educationLevel = "Graduate / Bachelor's Degree";
  } else if (
    lowerText.includes('postgraduate') ||
    lowerText.includes('master') ||
    lowerText.includes('m.tech') ||
    lowerText.includes('m.sc') ||
    lowerText.includes('m.com') ||
    lowerText.includes('m.a') ||
    lowerText.includes('पीजी') ||
    lowerText.includes('परास्नातक') ||
    lowerText.includes('పోస్ట్ గ్రాడ్యుయేట్')
  ) {
    updates.educationLevel = "Postgraduate / Master's Degree";
  } else if (
    lowerText.includes('doctorate') ||
    lowerText.includes('phd') ||
    lowerText.includes('ph.d') ||
    lowerText.includes('विद्यावाचस्पति') ||
    lowerText.includes('పిహెచ్‌డి')
  ) {
    updates.educationLevel = 'Doctorate / Ph.D.';
  } else if (
    lowerText.includes('vocational') ||
    lowerText.includes('iti') ||
    lowerText.includes('व्यवसायिक') ||
    lowerText.includes('ఐటిఐ')
  ) {
    updates.educationLevel = 'Other / Vocational Training';
  }

  return { ...currentData, ...updates };
}
