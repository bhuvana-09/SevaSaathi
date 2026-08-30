import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { INDIAN_STATES, CATEGORIES, GENDERS, EDUCATION_LEVELS, TRANSLATIONS, Language } from './constants';
import { parseSpeechToFormData } from './speechParser';
import { matchSchemes, MatchResponse } from './api';
import { stopSpeech } from './speechSynthesis';
import ResultsDisplay from './ResultsDisplay';
import StepIndicator, { StepState } from './StepIndicator';

export interface UserFormData {
  age: string;
  state: string;
  income: string;
  category: string;
  gender: string;
  educationLevel: string;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: () => void;
  onend: () => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

interface UserFormProps {
  lang: Language;
  setLang: (l: Language) => void;
}

export default function UserForm({ lang, setLang }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    age: '',
    state: '',
    income: '',
    category: '',
    gender: '',
    educationLevel: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [matchResults, setMatchResults] = useState<MatchResponse | null>(null);

  const [currentStep, setCurrentStep] = useState<StepState>(1);

  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [voiceNotice, setVoiceNotice] = useState<string>('');

  const activeRecognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const t = TRANSLATIONS[lang];

  // Auto-scroll to Scheme Matching Results when results arrive after submit
  useEffect(() => {
    if (matchResults) {
      setTimeout(() => {
        const el = document.getElementById('results-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [matchResults]);

  // Stop recognition if component unmounts
  useEffect(() => {
    return () => {
      if (activeRecognitionRef.current) {
        try {
          activeRecognitionRef.current.stop();
        } catch (e) {
          console.warn('[SpeechRec] Error stopping recognition on unmount:', e);
        }
      }
    };
  }, []);

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t.micNotSupported);
      return;
    }

    if (isListening) {
      console.log('[SpeechRec] User requested stop.');
      if (activeRecognitionRef.current) {
        try {
          activeRecognitionRef.current.stop();
        } catch (e) {
          console.error('[SpeechRec] Error stopping active instance:', e);
        }
      }
      setIsListening(false);
      return;
    }

    // Create a fresh SpeechRecognition instance on demand
    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      const langCodes: Record<Language, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        te: 'te-IN',
      };

      recognition.lang = langCodes[lang] || 'en-IN';
      console.log('[SpeechRec] Initializing new session with lang:', recognition.lang);

      recognition.onstart = () => {
        console.log('[SpeechRec] onstart: Listening active.');
        setIsListening(true);
        setVoiceNotice('');
      };

      recognition.onend = () => {
        console.log('[SpeechRec] onend: Session ended.');
        setIsListening(false);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('[SpeechRec] onerror:', event.error);
        setIsListening(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        try {
          const spokenText = event.results[0][0].transcript;
          console.log('[SpeechRec] onresult raw transcript:', spokenText);
          setTranscript(spokenText);

          setFormData((prev) => {
            const parsed = parseSpeechToFormData(spokenText, prev);
            console.log('[SpeechRec] Form data updated after parsing:', parsed);
            return parsed;
          });

          setVoiceNotice(t.voiceSuccess);
        } catch (err) {
          console.error('[SpeechRec] Error inside onresult handler:', err);
        }
      };

      activeRecognitionRef.current = recognition;
      recognition.start();
      console.log('[SpeechRec] recognition.start() called.');
    } catch (err) {
      console.error('[SpeechRec] Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStepClick = (step: StepState) => {
    if (step === 1) {
      const el = document.getElementById('user-form-card');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (step === 2) {
      if (matchResults) {
        const el = document.getElementById('results-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReset = () => {
    stopSpeech();
    setFormData({
      age: '',
      state: '',
      income: '',
      category: '',
      gender: '',
      educationLevel: '',
    });
    setTranscript('');
    setVoiceNotice('');
    setMatchResults(null);
    setApiError(null);
    setCurrentStep(1);

    const el = document.getElementById('user-form-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);

    const payload = {
      age: Number(formData.age),
      state: formData.state,
      income: Number(formData.income),
      category: formData.category,
      gender: formData.gender,
      education: formData.educationLevel,
    };

    console.log('Posting payload to /match:', payload);

    try {
      const response = await matchSchemes(payload);
      setMatchResults(response);
      setCurrentStep(2);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError('Failed to connect to backend server at http://localhost:5000');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      {/* Top Stepper Indicator */}
      <StepIndicator
        lang={lang}
        currentStep={currentStep}
        hasResults={!!matchResults}
        onStepClick={handleStepClick}
      />

      <div className="form-card" id="user-form-card">
        <div className="top-bar">
          <div className="lang-selector">
            <label htmlFor="language">{t.selectLanguage}:</label>
            <select
              id="language"
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="lang-dropdown"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="te">తెలుగు (Telugu)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={toggleListening}
            className={`mic-btn ${isListening ? 'listening' : ''}`}
            title={isListening ? t.micListening : t.micStart}
          >
            <svg className="mic-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
            <span>{isListening ? t.micListening : t.micStart}</span>
          </button>
        </div>

        {transcript && (
          <div className="transcript-box">
            <span className="transcript-label">Heard:</span> "{transcript}"
          </div>
        )}

        {voiceNotice && <div className="voice-notice">{voiceNotice}</div>}

        <div className="form-header">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="age">{t.ageLabel}</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder={t.agePlaceholder}
              min="1"
              max="120"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">{t.stateLabel}</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">{t.selectState}</option>
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="income">{t.incomeLabel}</label>
            <input
              type="number"
              id="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              placeholder={t.incomePlaceholder}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">{t.categoryLabel}</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">{t.selectCategory}</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="gender">{t.genderLabel}</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">{t.selectGender}</option>
              {GENDERS.map((gen) => (
                <option key={gen} value={gen}>
                  {gen}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="educationLevel">{t.educationLabel}</label>
            <select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              required
            >
              <option value="">{t.selectEducation}</option>
              {EDUCATION_LEVELS.map((edu) => (
                <option key={edu} value={edu}>
                  {edu}
                </option>
              ))}
            </select>
          </div>

          <div className="form-buttons-group">
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="btn-loading-state">
                  <span className="spinner"></span> Checking Eligibility...
                </span>
              ) : (
                t.submitBtn
              )}
            </button>
            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
              disabled={isLoading}
            >
              {t.resetBtn}
            </button>
          </div>
        </form>

        {apiError && (
          <div className="api-error-notice">
            ⚠️ {apiError}
          </div>
        )}
      </div>

      {matchResults && (
        <ResultsDisplay
          lang={lang}
          eligible={matchResults.eligible}
          nearMisses={matchResults.nearMisses}
        />
      )}
    </div>
  );
}
