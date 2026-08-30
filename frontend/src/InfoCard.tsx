import { useState } from 'react';
import { Language, TRANSLATIONS } from './constants';

interface InfoCardProps {
  lang: Language;
}

export default function InfoCard({ lang }: InfoCardProps) {
  const [isMobileExpanded, setIsMobileExpanded] = useState<boolean>(false);
  const t = TRANSLATIONS[lang];

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
            <strong>{t.aboutTitle}</strong>
          </div>
          <span className="tap-learn-more">
            {isMobileExpanded ? t.mobileClose : t.mobileLearnMore}
          </span>
        </div>

        {isMobileExpanded && (
          <div className="mobile-banner-content" onClick={(e) => e.stopPropagation()}>
            <p>{t.aboutDesc1}</p>
            <div className="info-checklist-box">
              <h4>📋 {t.requiredDocsHeader}:</h4>
              <ul>
                <li>{t.doc1}</li>
                <li>{t.doc2}</li>
                <li>{t.doc3}</li>
                <li>{t.doc4}</li>
                <li>{t.doc5}</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Info Card Sidebar */}
      <div className="desktop-info-card">
        <div className="info-card-header">
          <span className="info-badge-icon">🏛️</span>
          <h3>{t.aboutTitle}</h3>
        </div>
        <p className="info-description">{t.aboutDesc1}</p>
        <p className="info-description">{t.aboutDesc2}</p>

        <div className="info-checklist-box">
          <h4>📋 {t.requiredDocsHeader}</h4>
          <ul>
            <li>{t.doc1}</li>
            <li>{t.doc2}</li>
            <li>{t.doc3}</li>
            <li>{t.doc4}</li>
            <li>{t.doc5}</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
