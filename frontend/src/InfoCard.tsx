import { useState } from 'react';

export default function InfoCard() {
  const [isMobileExpanded, setIsMobileExpanded] = useState<boolean>(false);

  return (
    <aside className="info-card-container">
      {/* Mobile Collapsible Banner */}
      <div
        className="mobile-info-banner"
        onClick={() => setIsMobileExpanded((prev) => !prev)}
      >
        <div className="mobile-banner-header">
          <div className="mobile-banner-title">
            <span className="info-icon">🏛️</span>
            <strong>About SevaSaathi</strong>
          </div>
          <span className="tap-learn-more">
            {isMobileExpanded ? 'Tap to close ▲' : 'Tap to learn more ▼'}
          </span>
        </div>

        {isMobileExpanded && (
          <div className="mobile-banner-content" onClick={(e) => e.stopPropagation()}>
            <p>
              SevaSaathi helps Indian citizens discover eligible government scholarships and welfare schemes in seconds based on age, income, state, category, and education level.
            </p>
            <div className="info-checklist-box">
              <h4>📋 Standard Required Documents:</h4>
              <ul>
                <li>Aadhaar Card / ID Proof</li>
                <li>Income Certificate (Tahsildar / e-District)</li>
                <li>Category / Caste Certificate (if applicable)</li>
                <li>Educational Marksheets & College Fee Receipts</li>
                <li>Bank Account Details linked with Aadhaar</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Info Card Sidebar */}
      <div className="desktop-info-card">
        <div className="info-card-header">
          <span className="info-badge-icon">🏛️</span>
          <h3>About SevaSaathi</h3>
        </div>
        <p className="info-description">
          SevaSaathi empowers citizens across India to easily discover government scholarships and welfare benefits tailored to their eligibility profile.
        </p>
        <p className="info-description">
          Simply enter your profile details or use voice input to get real-time eligibility evaluation and plain-language guidance.
        </p>

        <div className="info-checklist-box">
          <h4>📋 Standard Required Documents</h4>
          <ul>
            <li>Aadhaar Card / Govt ID Proof</li>
            <li>Income Certificate (Tahsildar / MeeSeva)</li>
            <li>Caste / Social Category Certificate</li>
            <li>Academic Transcripts & Fee Receipts</li>
            <li>Aadhaar-seeded Bank Passbook</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
