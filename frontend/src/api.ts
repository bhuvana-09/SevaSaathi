const API_BASE_URL = 'http://localhost:5000';

export interface ProfilePayload {
  age: number;
  state: string;
  income: number;
  category: string;
  gender: string;
  education: string;
}

export interface SchemeResult {
  id: string;
  name: string;
  description: string;
  eligibility: {
    maxAge: number;
    states: string[];
    maxIncome: number;
    category: string[];
    gender?: string[];
    education: string[];
  };
  documents: string[];
  reasons: string[];
  isEligible: boolean;
  nearMissReason?: string | null;
}

export interface MatchResponse {
  profile: ProfilePayload;
  eligible: SchemeResult[];
  nearMisses: SchemeResult[];
  ineligible: SchemeResult[];
}

export interface DocumentDetail {
  document: string;
  description: string;
  hint: string;
}

export interface ChecklistResponse {
  schemeId: string;
  schemeName: string;
  checklist: DocumentDetail[];
}

export async function matchSchemes(payload: ProfilePayload): Promise<MatchResponse> {
  const response = await fetch(`${API_BASE_URL}/match`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error ${response.status}: Failed to match schemes.`);
  }

  return response.json();
}

export async function getChecklist(schemeId: string): Promise<ChecklistResponse> {
  const response = await fetch(`${API_BASE_URL}/checklist/${encodeURIComponent(schemeId)}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error ${response.status}: Failed to fetch checklist.`);
  }

  return response.json();
}
