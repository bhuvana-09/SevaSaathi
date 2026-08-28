import { useState } from 'react';
import { ChecklistResponse, getChecklist } from './api';

export interface ResultsDisplayProps {
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

export default function ResultsDisplay({ eligible, nearMisses }: ResultsDisplayProps) {
  const [selectedChecklist, setSelectedChecklist] = useState<ChecklistResponse | null>(null);
  const [loadingSchemeId, setLoadingSchemeId] = useState<string | null>(null);
  const [checklistError, setChecklistError] = useState<string | null>(null);

  const handleFetchChecklist = async (schemeId: string) => {
    try {
      setLoadingSchemeId(schemeId);
      setChecklistError(null);
      const data = await getChecklist(schemeId);
      setSelectedChecklist(data);
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
    setSelectedChecklist(null);
    setChecklistError(null);
  };

  return (
    <div className="results-container">
      <h2 className="results-title">Scheme Matching Results</h2>

      {eligible.length === 0 && nearMisses.length === 0 && (
        <div className="no-matches-notice">
          No eligible or near-miss schemes found for the provided profile.
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
