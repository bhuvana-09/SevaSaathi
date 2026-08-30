import { useState } from 'react';
import UserForm from './UserForm';
import InfoCard from './InfoCard';
import { Language, TRANSLATIONS } from './constants';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = TRANSLATIONS[lang];

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-icon">🏛️</span>
          <h1>SevaSaathi</h1>
        </div>
        <p className="app-tagline">{t.tagline}</p>
      </header>
      <main className="main-content">
        <div className="layout-grid">
          <InfoCard lang={lang} />
          <section className="form-results-column">
            <UserForm lang={lang} setLang={setLang} />
          </section>
        </div>
      </main>
      <footer className="app-footer">
        <p>© 2026 SevaSaathi — Citizen Welfare Scheme Assistant</p>
      </footer>
    </div>
  );
}

export default App;
