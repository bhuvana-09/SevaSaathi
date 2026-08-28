import { INDIAN_STATES, CATEGORIES } from './constants';
import { UserFormData } from './UserForm';

export function parseSpeechToFormData(text: string, currentData: UserFormData): UserFormData {
  const updates: Partial<UserFormData> = {};
  const lowerText = text.toLowerCase();

  // 1. Extract Age
  // Pattern: "age 25", "25 years", "25 saal", "25 varsh", or isolated numbers
  const ageMatch = lowerText.match(/(?:age|aage|umar|వయస్సు|సాళ్ళు|సాల్|वर्ष|साल)?\s*(\d{1,3})\s*(?:years|yr|yrs|saal|varsh|వయస్సు|సంవత్సరాలు)?/i);
  if (ageMatch && ageMatch[1]) {
    const num = parseInt(ageMatch[1], 10);
    if (num > 0 && num <= 120) {
      updates.age = num.toString();
    }
  }

  // 2. Extract Income
  // Patterns with numbers followed by/preceded by income keywords, lakh, thousand, etc.
  let incomeVal: number | null = null;
  const lakhMatch = lowerText.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs|लाख|లక్ష|లక్షలు)/i);
  if (lakhMatch) {
    incomeVal = parseFloat(lakhMatch[1]) * 100000;
  } else {
    const thousandMatch = lowerText.match(/(\d+(?:\.\d+)?)\s*(?:thousand|thousands|hazaar|हज़ार|వేలు)/i);
    if (thousandMatch) {
      incomeVal = parseFloat(thousandMatch[1]) * 1000;
    } else {
      const incomeMatch = lowerText.match(/(?:income|aay|aaya|iaka|आय|ఆదాయం|వార్షిక రాబడి)\s*(?:is|:=)?\s*(\d+)/i);
      if (incomeMatch) {
        incomeVal = parseInt(incomeMatch[1], 10);
      }
    }
  }
  if (incomeVal !== null && !isNaN(incomeVal)) {
    updates.income = incomeVal.toString();
  }

  // 3. Extract State
  for (const st of INDIAN_STATES) {
    if (lowerText.includes(st.toLowerCase())) {
      updates.state = st;
      break;
    }
  }

  // 4. Extract Category
  for (const cat of CATEGORIES) {
    if (lowerText.includes(cat.toLowerCase())) {
      updates.category = cat;
      break;
    }
  }

  // 5. Extract Education Level
  if (lowerText.includes('below 10') || lowerText.includes('10th fail')) {
    updates.educationLevel = 'Below 10th';
  } else if (lowerText.includes('10th') || lowerText.includes('ssc') || lowerText.includes('10 pass') || lowerText.includes('मैट्रिक')) {
    updates.educationLevel = '10th Pass (SSC)';
  } else if (lowerText.includes('12th') || lowerText.includes('hsc') || lowerText.includes('inter') || lowerText.includes('12 pass') || lowerText.includes('इंटर')) {
    updates.educationLevel = '12th Pass (HSC)';
  } else if (lowerText.includes('diploma') || lowerText.includes('डिप्लोमा')) {
    updates.educationLevel = 'Diploma';
  } else if (lowerText.includes('graduate') || lowerText.includes('bachelor') || lowerText.includes('degree') || lowerText.includes('b.tech') || lowerText.includes('b.sc') || lowerText.includes('b.com') || lowerText.includes('b.a') || lowerText.includes('డిగ్రీ')) {
    updates.educationLevel = "Graduate / Bachelor's Degree";
  } else if (lowerText.includes('postgraduate') || lowerText.includes('master') || lowerText.includes('m.tech') || lowerText.includes('m.sc') || lowerText.includes('m.com') || lowerText.includes('m.a') || lowerText.includes('पीजी')) {
    updates.educationLevel = "Postgraduate / Master's Degree";
  } else if (lowerText.includes('doctorate') || lowerText.includes('phd') || lowerText.includes('ph.d')) {
    updates.educationLevel = 'Doctorate / Ph.D.';
  } else if (lowerText.includes('vocational') || lowerText.includes('iti')) {
    updates.educationLevel = 'Other / Vocational Training';
  }

  return { ...currentData, ...updates };
}
