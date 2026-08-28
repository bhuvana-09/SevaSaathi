import { useState, useEffect } from 'react';
import { ChecklistResponse, getChecklist } from './api';
import { Language, TRANSLATIONS } from './constants';
import { speakText, stopSpeech } from './speechSynthesis';

export interface ResultsDisplayProps {
  lang: Language;
  eligible: Array<{
    id: string;
    name: string;
    description: string;
    reasons: string[];
  }>;
  nearMisses: Array<{
    id: string;
    name: string;
    description: string;
    nearMissReason?: string | null;
    reasons: string[];
  }>;
}

export default function ResultsDisplay({ lang, eligible, nearMisses }: ResultsDisplayProps) {
  const [selectedChecklist, setSelectedChecklist] = useState<ChecklistResponse | null>(null);
  const [loadingSchemeId, setLoadingSchemeId] = useState<string | null>(null);
  const [checklistError, setChecklistError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const t = TRANSLATIONS[lang];

  // Prepare full speech text for eligible schemes and near misses
  const generateResultsSpeechText = () => {
    let text = '';
    if (eligible.length > 0) {
      const eligibleNames = eligible.map((s) => s.name).join(', ');
      if (lang === 'hi') {
        text += `आप ${eligible.length} योजनाओं के लिए पात्र हैं: ${eligibleNames}। `;
      } else if (lang === 'te') {
        text += `మీరు ${eligible.length} పథకాలకు అర్హులు: ${eligibleNames}. `;
      } else {
        text += `You are eligible for ${eligible.length} scheme${eligible.length > 1 ? 's' : ''}: ${eligibleNames}. `;
      }
    } else {
      if (lang === 'hi') {
        text += `कोई पात्र योजना नहीं मिली। `;
      } else if (lang === 'te') {
        text += `అర్హత ఉన్న పథకాలు ఏవీ లభించలేదు. `;
      } else {
        text += `No eligible schemes found. `;
      }
    }

    if (nearMisses.length > 0) {
      if (lang === 'hi') {
        text += `${nearMisses.length} निकट-चूक योजनाएं भी हैं। `;
      } else if (lang === 'te') {
        text += `${nearMisses.length} దాదాపు అర్హత ఉన్న పథకాలు ఉన్నాయి. `;
      } else {
        text += `There are also ${nearMisses.length} near-miss scheme${nearMisses.length > 1 ? 's' : ''}. `;
      }
    }

    return text;
  };

  // Trigger speech synthesis on initial render of results
  useEffect(() => {
    const textToRead = generateResultsSpeechText();
    if (textToRead) {
      setIsSpeaking(true);
      speakText(textToRead, lang, () => setIsSpeaking(false));
    }

    return () => {
      stopSpeech();
    };
  }, [eligible, nearMisses, lang]);

  const handleToggleSpeakResults = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      const textToRead = generateResultsSpeechText();
      setIsSpeaking(true);
      speakText(textToRead, lang, () => setIsSpeaking(false));
    }
  };

  const handleFetchChecklist = async (schemeId: string) => {
    try {
      setLoadingSchemeId(schemeId);
      setChecklistError(null);
      const data = await getChecklist(schemeId);
      setSelectedChecklist(data);

      // Read aloud the checklist for this scheme
      const docListStr = data.checklist.map((doc) => doc.document).join(', ');
      let checklistText = '';
      if (lang === 'hi') {
        checklistText = `${data.schemeName} के लिए आवश्यक दस्तावेज हैं: ${docListStr}।`;
      } else if (lang === 'te') {
        checklistText = `${data.schemeName} కోసం అవసరమైన పత్రాలు: ${docListStr}.`;
      } else {
        checklistText = `Required documents for ${data.schemeName} are: ${docListStr}.`;
      }

      setIsSpeaking(true);
      speakText(checklistText, lang, () => setIsSpeaking(false));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setChecklistError(err.message);
      } else {
        setChecklistError('An error occurred fetching checklist.');
      }
    } finally {
      setLoadingSchemeId(null);
    }
  };

  const closeModal = () => {
    stopSpeech();
    setIsSpeaking(false);
    setSelectedChecklist(null);
    setChecklistError(null);
  };

  return (
    <div className="results-container">
      <div className="results-header-bar">
        <h2 className="results-title">Scheme Matching Results</h2>
        <button
          type="button"
          onClick={handleToggleSpeakResults}
          className={`speak-btn ${isSpeaking ? 'speaking' : ''}`}
        >
          {isSpeaking ? t.stopReading : t.readAloud}
        </button>
      </div>

      {eligible.length === 0 && nearMisses.length === 0 && (
        <div className="empty-state-card">
          <div className="empty-state-icon">🔍</div>
          <h3>No matching schemes found</h3>
          <p>
            We couldn't find any exact matches or near-miss schemes for your current profile parameters.
          </p>
          <div className="empty-state-tips">
            <strong>Tips to discover schemes:</strong>
            <ul>
              <li>Check if your state selection and social category are accurate.</li>
              <li>Verify annual income threshold details.</li>
              <li>Try adjusting your profile inputs or search parameters.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Eligible Schemes (Green) */}
      {eligible.length > 0 && (
        <div className="results-section">
          <h3 className="section-heading eligible-heading">
            🟢 Eligible Schemes ({eligible.length})
          </h3>
          <div className="cards-grid">
            {eligible.map((scheme) => (
              <div key={scheme.id} className="scheme-card eligible-card">
                <div className="scheme-header">
                  <h4>{scheme.name}</h4>
                  <span className="badge eligible-badge">Eligible</span>
                </div>
                <p className="scheme-description">{scheme.description}</p>
                
                <div className="reasons-block">
                  <strong>Why you qualify:</strong>
                  <ul>
                    {scheme.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className="checklist-btn"
                  onClick={() => handleFetchChecklist(scheme.id)}
                  disabled={loadingSchemeId === scheme.id}
                >
                  {loadingSchemeId === scheme.id ? 'Loading...' : '📋 View checklist'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Near Misses (Yellow) */}
      {nearMisses.length > 0 && (
        <div className="results-section">
          <h3 className="section-heading nearmiss-heading">
            🟡 Near-Miss Schemes ({nearMisses.length})
          </h3>
          <div className="cards-grid">
            {nearMisses.map((scheme) => (
              <div key={scheme.id} className="scheme-card nearmiss-card">
                <div className="scheme-header">
                  <h4>{scheme.name}</h4>
                  <span className="badge nearmiss-badge">Near Miss</span>
                </div>
                <p className="scheme-description">{scheme.description}</p>

                {scheme.nearMissReason && (
                  <div className="gap-reason-box">
                    <strong>Gap Explanation:</strong>
                    <p>{scheme.nearMissReason}</p>
                  </div>
                )}

                <div className="reasons-block">
                  <strong>Criteria evaluation:</strong>
                  <ul>
                    {scheme.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className="checklist-btn"
                  onClick={() => handleFetchChecklist(scheme.id)}
                  disabled={loadingSchemeId === scheme.id}
                >
                  {loadingSchemeId === scheme.id ? 'Loading...' : '📋 View checklist'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checklist Error Popup */}
      {checklistError && (
        <div className="error-toast">
          <span>{checklistError}</span>
          <button type="button" onClick={() => setChecklistError(null)}>×</button>
        </div>
      )}

      {/* Checklist Modal */}
      {selectedChecklist && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Checklist: {selectedChecklist.schemeName}</h3>
              <button type="button" className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-intro">Required documents and how to obtain them:</p>
              <ul className="checklist-items">
                {selectedChecklist.checklist.map((item, index) => (
                  <li key={index} className="checklist-item">
                    <div className="doc-name">📄 {item.document}</div>
                    <div className="doc-desc">{item.description}</div>
                    <div className="doc-hint">💡 <strong>How to obtain:</strong> {item.hint}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="close-modal-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
