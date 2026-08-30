import { Language, TRANSLATIONS } from './constants';

export type StepState = 1 | 2 | 3; // 1: Details, 2: Results, 3: Checklist

interface StepIndicatorProps {
  lang: Language;
  currentStep: StepState;
  isChecklistOpen?: boolean;
  hasResults?: boolean;
  onStepClick?: (step: StepState) => void;
}

type StepStatus = 'current' | 'completed' | 'upcoming';

export default function StepIndicator({
  lang,
  currentStep,
  isChecklistOpen,
  hasResults,
  onStepClick,
}: StepIndicatorProps) {
  const t = TRANSLATIONS[lang];

  let step1Status: StepStatus = 'current';
  let step2Status: StepStatus = 'upcoming';
  let step3Status: StepStatus = 'upcoming';

  if (isChecklistOpen) {
    step1Status = 'completed';
    step2Status = 'completed';
    step3Status = 'current';
  } else if (hasResults || currentStep >= 2) {
    step1Status = 'completed';
    step2Status = 'current';
    step3Status = 'upcoming';
  } else {
    step1Status = 'current';
    step2Status = 'upcoming';
    step3Status = 'upcoming';
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
            {step2Status === 'completed' ? (
              <span className="check-icon">✓</span>
            ) : (
              <span>2</span>
            )}
          </div>
          <span className="step-label">{t.stepResults}</span>
        </div>

        {/* Line 2 -> 3 */}
        <div className={`step-line ${step2Status === 'completed' ? 'filled' : ''}`} />

        {/* Step 3 */}
        <div
          className={`step-item ${step3Status}`}
          onClick={() => handleStepClick(3)}
          title="Go to Document Checklist"
        >
          <div className="step-circle">
            {step3Status === 'current' ? (
              <span>3</span>
            ) : (
              <span>3</span>
            )}
          </div>
          <span className="step-label">{t.stepChecklist}</span>
        </div>
      </div>
    </div>
  );
}
