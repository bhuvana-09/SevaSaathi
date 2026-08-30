import { Language, TRANSLATIONS } from './constants';

export type StepState = 1 | 2; // 1: Details, 2: Results

interface StepIndicatorProps {
  lang: Language;
  currentStep: StepState;
  hasResults?: boolean;
  onStepClick?: (step: StepState) => void;
}

type StepStatus = 'current' | 'completed' | 'upcoming';

export default function StepIndicator({
  lang,
  currentStep,
  hasResults,
  onStepClick,
}: StepIndicatorProps) {
  const t = TRANSLATIONS[lang];

  let step1Status: StepStatus = 'current';
  let step2Status: StepStatus = 'upcoming';

  if (hasResults || currentStep >= 2) {
    step1Status = 'completed';
    step2Status = 'current';
  } else {
    step1Status = 'current';
    step2Status = 'upcoming';
  }

  const handleStepClick = (step: StepState) => {
    if (onStepClick) {
      onStepClick(step);
    }
  };

  return (
    <div className="step-indicator-container">
      <div className="step-indicator">
        {/* Step 1 */}
        <div
          className={`step-item ${step1Status}`}
          onClick={() => handleStepClick(1)}
          title="Go to Details Form"
        >
          <div className="step-circle">
            {step1Status === 'completed' ? (
              <span className="check-icon">✓</span>
            ) : (
              <span>1</span>
            )}
          </div>
          <span className="step-label">{t.stepDetails}</span>
        </div>

        {/* Line 1 -> 2 */}
        <div className={`step-line ${step1Status === 'completed' ? 'filled' : ''}`} />

        {/* Step 2 */}
        <div
          className={`step-item ${step2Status}`}
          onClick={() => handleStepClick(2)}
          title="Go to Scheme Results"
        >
          <div className="step-circle">
            <span>2</span>
          </div>
          <span className="step-label">{t.stepResults}</span>
        </div>
      </div>
    </div>
  );
}
