export type StepState = 1 | 2 | 3; // 1: Details, 2: Results, 3: Checklist

interface StepIndicatorProps {
  currentStep: StepState;
  isChecklistOpen?: boolean;
  hasResults?: boolean;
}

type StepStatus = 'current' | 'completed' | 'upcoming';

export default function StepIndicator({ currentStep, isChecklistOpen, hasResults }: StepIndicatorProps) {
  // Determine status for each of the 3 steps
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

  return (
    <div className="step-indicator-container">
      <div className="step-indicator">
        {/* Step 1 */}
        <div className={`step-item ${step1Status}`}>
          <div className="step-circle">
            {step1Status === 'completed' ? (
              <span className="check-icon">✓</span>
            ) : (
              <span>1</span>
            )}
          </div>
          <span className="step-label">Details</span>
        </div>

        {/* Line 1 -> 2 */}
        <div className={`step-line ${step1Status === 'completed' ? 'filled' : ''}`} />

        {/* Step 2 */}
        <div className={`step-item ${step2Status}`}>
          <div className="step-circle">
            {step2Status === 'completed' ? (
              <span className="check-icon">✓</span>
            ) : (
              <span>2</span>
            )}
          </div>
          <span className="step-label">Results</span>
        </div>

        {/* Line 2 -> 3 */}
        <div className={`step-line ${step2Status === 'completed' ? 'filled' : ''}`} />

        {/* Step 3 */}
        <div className={`step-item ${step3Status}`}>
          <div className="step-circle">
            {(step3Status as StepStatus) === 'completed' ? (
              <span className="check-icon">✓</span>
            ) : (
              <span>3</span>
            )}
          </div>
          <span className="step-label">Checklist</span>
        </div>
      </div>
    </div>
  );
}
