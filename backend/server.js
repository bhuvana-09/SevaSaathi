const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health-check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'SevaSaathi Backend API is running' });
});

// Load schemes
const schemesPath = path.join(__dirname, 'schemes.json');
let schemes = [];
try {
  const data = fs.readFileSync(schemesPath, 'utf8');
  schemes = JSON.parse(data);
} catch (err) {
  console.error('Error loading schemes.json:', err.message);
}

/**
 * Evaluates user profile eligibility against a scheme.
 * Returns { isEligible: boolean, reasons: string[], failCount: number, nearMissReason: string|null }
 */
function evaluateEligibility(profile, scheme) {
  const { age, state, income, category, education } = profile;
  const { maxAge, states, maxIncome, category: allowedCategories, education: allowedEducation } = scheme.eligibility;

  const reasons = [];
  let failCount = 0;
  let nearMissReason = null;

  // Age check
  if (age !== undefined && age !== null) {
    if (age <= maxAge) {
      reasons.push(`Age (${age}) is within the maximum limit of ${maxAge} years.`);
    } else {
      failCount++;
      const ageDiff = age - maxAge;
      const msg = `Age (${age}) exceeds the limit by ${ageDiff} year${ageDiff > 1 ? 's' : ''} (limit: ${maxAge} years).`;
      reasons.push(msg);
      nearMissReason = `Age is ${ageDiff} year${ageDiff > 1 ? 's' : ''} above the limit of ${maxAge} years.`;
    }
  }

  // State check
  if (state) {
    if (states.includes('All') || states.map(s => s.toLowerCase()).includes(state.toLowerCase())) {
      reasons.push(`State (${state}) is eligible.`);
    } else {
      failCount++;
      const msg = `State (${state}) is not eligible; scheme is restricted to: ${states.join(', ')}.`;
      reasons.push(msg);
      nearMissReason = `State is ${state}, but scheme is restricted to ${states.join(', ')}.`;
    }
  }

  // Income check
  if (income !== undefined && income !== null) {
    if (income <= maxIncome) {
      reasons.push(`Annual income (₹${income.toLocaleString('en-IN')}) is within the upper threshold of ₹${maxIncome.toLocaleString('en-IN')}.`);
    } else {
      failCount++;
      const incomeDiff = income - maxIncome;
      const msg = `Annual income (₹${income.toLocaleString('en-IN')}) exceeds limit by ₹${incomeDiff.toLocaleString('en-IN')}.`;
      reasons.push(msg);
      nearMissReason = `Income is ₹${incomeDiff.toLocaleString('en-IN')} above the limit of ₹${maxIncome.toLocaleString('en-IN')}.`;
    }
  }

  // Category check
  if (category) {
    const isCategoryMatched = allowedCategories.some(c => c.toLowerCase() === category.toLowerCase());
    if (isCategoryMatched) {
      reasons.push(`Category (${category}) matches scheme requirements (${allowedCategories.join(', ')}).`);
    } else {
      failCount++;
      const msg = `Category (${category}) is not eligible; scheme requires: ${allowedCategories.join(', ')}.`;
      reasons.push(msg);
      nearMissReason = `Category is ${category}, but scheme requires ${allowedCategories.join(', ')}.`;
    }
  }

  // Education level check
  if (education) {
    const isEduMatched = allowedEducation.some(e => e.toLowerCase() === education.toLowerCase());
    if (isEduMatched) {
      reasons.push(`Education level (${education}) meets eligibility criteria.`);
    } else {
      failCount++;
      const msg = `Education level (${education}) is not listed; requires: ${allowedEducation.join(', ')}.`;
      reasons.push(msg);
      nearMissReason = `Education level is ${education}, but scheme requires ${allowedEducation.join(', ')}.`;
    }
  }

  const isEligible = failCount === 0;
  return { isEligible, reasons, failCount, nearMissReason: failCount === 1 ? nearMissReason : null };
}

/**
 * Document guide mapping descriptions and obtainment hints.
 */
function getDocumentDetails(docName) {
  const lower = docName.toLowerCase();

  if (lower.includes('aadhaar')) {
    return {
      document: docName,
      description: "Government-issued 12-digit unique identity card.",
      hint: "Obtain or update at nearest UIDAI Aadhaar Seva Kendra, CSC center, or Post Office."
    };
  }
  if (lower.includes('income')) {
    return {
      document: docName,
      description: "Official certificate verifying total annual household income.",
      hint: "Apply at local Tahsildar / Revenue office or state e-District / MeeSeva portal."
    };
  }
  if (lower.includes('caste') || lower.includes('category')) {
    return {
      document: docName,
      description: "Official certificate proving reserved social category status.",
      hint: "Obtain from Sub-Divisional Magistrate (SDM) / Tahsildar office or state e-District portal."
    };
  }
  if (lower.includes('marksheet') || lower.includes('mark sheet')) {
    return {
      document: docName,
      description: "Official academic transcript showing qualifying exam scores.",
      hint: "Request from your school board, college examination department, or DigiLocker."
    };
  }
  if (lower.includes('bank') || lower.includes('passbook')) {
    return {
      document: docName,
      description: "Bank passbook page or statement showing account number & IFSC code.",
      hint: "Obtain passbook print from your bank branch or download via netbanking app."
    };
  }
  if (lower.includes('fee receipt') || lower.includes('admission fee')) {
    return {
      document: docName,
      description: "Proof of current academic term enrolment and fee payment.",
      hint: "Collect from your institution's fee counter or download from student portal."
    };
  }
  if (lower.includes('domicile')) {
    return {
      document: docName,
      description: "Official certificate proving state residence status.",
      hint: "Apply online on the state e-Governance portal (e.g., Aaple Sarkar / MeeSeva) or Tehsil office."
    };
  }
  if (lower.includes('cap allotment') || lower.includes('admission letter')) {
    return {
      document: docName,
      description: "Official confirmation letter proving merit-based seat allotment.",
      hint: "Download from Centralized Admission Process (CAP) / CET authority portal."
    };
  }
  if (lower.includes('school id') || lower.includes('headmaster')) {
    return {
      document: docName,
      description: "Bonafide student certificate or current institutional ID.",
      hint: "Obtain directly from your school Principal or Headmaster's office."
    };
  }

  return {
    document: docName,
    description: "Official document required for application verification.",
    hint: "Obtain from the issuing government department or educational institution."
  };
}

// GET /schemes - Return all schemes with id, name, and description
app.get('/schemes', (req, res) => {
  const summarizedSchemes = schemes.map(({ id, name, description }) => ({
    id,
    name,
    description
  }));
  res.json(summarizedSchemes);
});

// GET /checklist/:schemeId - Return document checklist with guide hints
app.get('/checklist/:schemeId', (req, res) => {
  const { schemeId } = req.params;
  const scheme = schemes.find(s => s.id.toLowerCase() === schemeId.toLowerCase());

  if (!scheme) {
    return res.status(404).json({ error: `Scheme with ID '${schemeId}' not found.` });
  }

  const checklist = scheme.documents.map(doc => getDocumentDetails(doc));

  res.json({
    schemeId: scheme.id,
    schemeName: scheme.name,
    checklist
  });
});

// POST /match - Evaluate profile against schemes
app.post('/match', (req, res) => {
  const profile = req.body;

  if (!profile || typeof profile !== 'object') {
    return res.status(400).json({ error: 'User profile object is required in request body.' });
  }

  const requiredFields = ['age', 'state', 'income', 'category', 'education'];
  const missingFields = requiredFields.filter(
    (field) => profile[field] === undefined || profile[field] === null || profile[field] === ''
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Missing required profile fields.',
      missingFields
    });
  }

  const eligibleSchemes = [];
  const nearMisses = [];
  const ineligibleSchemes = [];

  schemes.forEach((scheme) => {
    const { isEligible, reasons, failCount, nearMissReason } = evaluateEligibility(profile, scheme);
    const resultItem = {
      id: scheme.id,
      name: scheme.name,
      description: scheme.description,
      eligibility: scheme.eligibility,
      documents: scheme.documents,
      reasons,
      isEligible
    };

    if (isEligible) {
      eligibleSchemes.push(resultItem);
    } else if (failCount === 1) {
      resultItem.nearMissReason = nearMissReason;
      nearMisses.push(resultItem);
    } else {
      ineligibleSchemes.push(resultItem);
    }
  });

  // Sort results so full matches appear first in all Results list if requested, or returned in structured format
  const allResults = [...eligibleSchemes, ...nearMisses, ...ineligibleSchemes];

  res.json({
    profile,
    eligible: eligibleSchemes,
    nearMisses,
    ineligible: ineligibleSchemes,
    allResults
  });
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack || err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
