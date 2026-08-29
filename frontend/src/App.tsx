import UserForm from './UserForm';
import InfoCard from './InfoCard';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-icon">🏛️</span>
          <h1>SevaSaathi</h1>
        </div>
        <p className="app-tagline">
          Empowering citizens to discover government schemes & welfare benefits easily
        </p>
      </header>
      <main className="main-content">
        <div className="layout-grid">
          <InfoCard />
          <section className="form-results-column">
            <UserForm />
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
