import { useState, useEffect } from 'react';
import { ChecklistResponse, getChecklist } from './api';
import { Language, TRANSLATIONS } from './constants';
import { speakText, stopSpeech } from './speechSynthesis';
import { translateText } from './translateUtil';

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
  onChecklistStateChange?: (isOpen: boolean) => void;
  triggerOpenChecklist?: boolean;
}

export default function ResultsDisplay({
  lang,
  eligible,
  nearMisses,
  onChecklistStateChange,
  triggerOpenChecklist,
}: ResultsDisplayProps) {
  const [selectedChecklist, setSelectedChecklist] = useState<ChecklistResponse | null>(null);
  const [loadingSchemeId, setLoadingSchemeId] = useState<string | null>(null);
  const [checklistError, setChecklistError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const t = TRANSLATIONS[lang];

  const toggleCardDetails = (schemeId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [schemeId]: !prev[schemeId],
    }));
  };

  // Helper to translate scheme objects for display
  const translatedEligible = eligible.map((scheme) => ({
    ...scheme,
    name: translateText(scheme.name, lang),
    description: translateText(scheme.description, lang),
    reasons: scheme.reasons.map((r) => translateText(r, lang)),
  }));

  const translatedNearMisses = nearMisses.map((scheme) => ({
    ...scheme,
    name: translateText(scheme.name, lang),
    description: translateText(scheme.description, lang),
    nearMissReason: scheme.nearMissReason ? translateText(scheme.nearMissReason, lang) : null,
    reasons: scheme.reasons.map((r) => translateText(r, lang)),
  }));

  // Build speech text looping through each scheme with its name & reason/gap explanation
  const buildSpeechText = () => {
    let textParts: string[] = [];

    if (translatedEligible.length > 0) {
      if (lang === 'hi') {
        textParts.push(`आप ${translatedEligible.length} योजनाओं के लिए पात्र हैं।`);
      } else if (lang === 'te') {
        textParts.push(`మీరు ${translatedEligible.length} పథకాలకు అర్హులు.`);
      } else {
        textParts.push(`You are eligible for ${translatedEligible.length} scheme${translatedEligible.length > 1 ? 's' : ''}.`);
      }

      translatedEligible.forEach((scheme, index) => {
        const firstReason = scheme.reasons[0] || '';
        textParts.push(`${index + 1}. ${scheme.name}। ${firstReason}`);
      });
    } else {
      if (lang === 'hi') {
        textParts.push('कोई पात्र योजना नहीं मिली।');
      } else if (lang === 'te') {
        textParts.push('అర్హత ఉన్న పథకాలు ఏవీ లభించలేదు.');
      } else {
        textParts.push('No eligible schemes found.');
      }
    }

    if (translatedNearMisses.length > 0) {
      if (lang === 'hi') {
        textParts.push(`${translatedNearMisses.length} निकट-चूक योजनाएं हैं।`);
      } else if (lang === 'te') {
        textParts.push(`${translatedNearMisses.length} దాదాపు అర్హత ఉన్న పథకాలు ఉన్నాయి.`);
      } else {
        textParts.push(`There are ${translatedNearMisses.length} near-miss scheme${translatedNearMisses.length > 1 ? 's' : ''}.`);
      }

      translatedNearMisses.forEach((scheme, index) => {
        const gap = scheme.nearMissReason || scheme.reasons[0] || '';
        textParts.push(`${index + 1}. ${scheme.name}। ${gap}`);
      });
    }

    return textParts.join(' ');
  };

  const executeSpeech = async (textToRead: string) => {
    if (!textToRead.trim()) return;
    setIsSpeaking(true);
    const { fallbackNotice } = await speakText(textToRead, lang, () => setIsSpeaking(false));
    setVoiceNotice(fallbackNotice);
  };

  // Trigger speech only when new form submission results arrive
  useEffect(() => {
    const speechContent = buildSpeechText();
    executeSpeech(speechContent);

    return () => {
      stopSpeech();
    };
  }, [eligible, nearMisses]);

  // When language changes, stop active narration without auto-restarting speech
  useEffect(() => {
    stopSpeech();
    setIsSpeaking(false);
  }, [lang]);

  // If Step 3 in stepper is clicked externally, open top scheme's checklist
  useEffect(() => {
    if (triggerOpenChecklist && !selectedChecklist) {
      const firstScheme = eligible[0] || nearMisses[0];
      if (firstScheme) {
        handleFetchChecklist(firstScheme.id);
      }
    }
  }, [triggerOpenChecklist]);

  const handleStartSpeakResults = () => {
    const speechContent = buildSpeechText();
    executeSpeech(speechContent);
  };

  const handleStopSpeech = () => {
    stopSpeech();
    setIsSpeaking(false);
  };

  const handleFetchChecklist = async (schemeId: string) => {
    try {
      setLoadingSchemeId(schemeId);
      setChecklistError(null);
      const data = await getChecklist(schemeId);
      setSelectedChecklist(data);

      if (onChecklistStateChange) {
        onChecklistStateChange(true);
      }

      const translatedSchemeName = translateText(data.schemeName, lang);
      const docListStr = data.checklist.map((doc) => translateText(doc.document, lang)).join(', ');

      let checklistSpeech = '';
      if (lang === 'hi') {
        checklistSpeech = `${translatedSchemeName} के लिए आवश्यक दस्तावेज हैं: ${docListStr}।`;
      } else if (lang === 'te') {
        checklistSpeech = `${translatedSchemeName} కోసం అవసరమైన పత్రాలు: ${docListStr}.`;
      } else {
        checklistSpeech = `Required documents for ${translatedSchemeName} are: ${docListStr}.`;
      }

      executeSpeech(checklistSpeech);
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
    if (onChecklistStateChange) {
      onChecklistStateChange(false);
    }
  };

  return (
    <div className="results-container" id="results-section">
      <div className="results-header-bar">
        <h2 className="results-title">Scheme Matching Results</h2>
        <div className="audio-controls-group">
          <button
            type="button"
            onClick={handleStartSpeakResults}
            className={`speak-btn ${isSpeaking ? 'speaking' : ''}`}
            title="Read results aloud"
          >
            {t.readAloud}
          </button>
          <button
            type="button"
            onClick={handleStopSpeech}
            className="stop-btn"
            title="Immediately halt narration"
          >
            {t.stopReading}
          </button>
        </div>
      </div>

      {voiceNotice && (
        <div className="voice-fallback-banner">
          ℹ️ {voiceNotice}
        </div>
      )}

      {translatedEligible.length === 0 && translatedNearMisses.length === 0 && (
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

      {/* Eligible Schemes (Prominent Green Cards with Checkmarks) */}
      {translatedEligible.length > 0 && (
        <div className="results-section">
          <h3 className="section-heading eligible-heading">
            🟢 Eligible Schemes ({translatedEligible.length})
          </h3>
          <div className="cards-grid">
            {translatedEligible.map((scheme) => {
              const isExpanded = !!expandedCards[scheme.id];
              return (
                <div key={scheme.id} className="scheme-card eligible-card">
                  <div className="scheme-header">
                    <h4 title={scheme.name}>
                      <span className="eligible-check-icon">✅</span> {scheme.name}
                    </h4>
                    <span className="badge eligible-badge">Eligible</span>
                  </div>
                  <p className="scheme-description">{scheme.description}</p>

                  {/* Toggle button for details */}
                  <button
                    type="button"
                    className="toggle-details-btn"
                    onClick={() => toggleCardDetails(scheme.id)}
                  >
                    {isExpanded ? t.hideDetails : t.showDetails}
                  </button>

                  {/* Collapsible Criteria evaluation list */}
                  {isExpanded && (
                    <div className="reasons-block">
                      <strong>Why you qualify:</strong>
                      <ul>
                        {scheme.reasons.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="card-actions-bar">
                    <button
                      type="button"
                      className="checklist-btn"
                      onClick={() => handleFetchChecklist(scheme.id)}
                      disabled={loadingSchemeId === scheme.id}
                    >
                      {loadingSchemeId === scheme.id ? 'Loading...' : '📋 View checklist'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Near Misses (Yellow Cards) */}
      {translatedNearMisses.length > 0 && (
        <div className="results-section">
          <h3 className="section-heading nearmiss-heading">
            🟡 Near-Miss Schemes ({translatedNearMisses.length})
          </h3>
          <div className="cards-grid">
            {translatedNearMisses.map((scheme) => {
              const isExpanded = !!expandedCards[scheme.id];
              return (
                <div key={scheme.id} className="scheme-card nearmiss-card">
                  <div className="scheme-header">
                    <h4 title={scheme.name}>
                      <span className="nearmiss-icon">⚠️</span> {scheme.name}
                    </h4>
                    <span className="badge nearmiss-badge">Near Miss</span>
                  </div>
                  <p className="scheme-description">{scheme.description}</p>

                  {/* Always visible Gap Explanation */}
                  {scheme.nearMissReason && (
                    <div className="gap-reason-box">
                      <strong>Gap Explanation:</strong>
                      <p>{scheme.nearMissReason}</p>
                    </div>
                  )}

                  {/* Toggle button for details */}
                  <button
                    type="button"
                    className="toggle-details-btn"
                    onClick={() => toggleCardDetails(scheme.id)}
                  >
                    {isExpanded ? t.hideDetails : t.showDetails}
                  </button>

                  {/* Collapsible Criteria evaluation list */}
                  {isExpanded && (
                    <div className="reasons-block">
                      <strong>Criteria evaluation:</strong>
                      <ul>
                        {scheme.reasons.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="card-actions-bar">
                    <button
                      type="button"
                      className="checklist-btn"
                      onClick={() => handleFetchChecklist(scheme.id)}
                      disabled={loadingSchemeId === scheme.id}
                    >
                      {loadingSchemeId === scheme.id ? 'Loading...' : '📋 View checklist'}
                    </button>
                  </div>
                </div>
              );
            })}
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
              <h3>{t.checklistHeading}: {translateText(selectedChecklist.schemeName, lang)}</h3>
              <button type="button" className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-intro">{t.modalIntro}</p>
              <ul className="checklist-items">
                {selectedChecklist.checklist.map((item, index) => (
                  <li key={index} className="checklist-item">
                    <div className="doc-name">📄 {translateText(item.document, lang)}</div>
                    <div className="doc-desc">{translateText(item.description, lang)}</div>
                    <div className="doc-hint">💡 <strong>{t.howToObtain}</strong> {translateText(item.hint, lang)}</div>
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
