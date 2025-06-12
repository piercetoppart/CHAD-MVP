import type { FC } from 'react';

export interface Step {
  label: string;
}

interface ProgressStepsProps {
  steps: Step[];
  current: number;
}

const ProgressSteps: FC<ProgressStepsProps> = ({ steps, current }) => (
  <div className="progress-steps">
    {steps.map((step, idx) => (
      <div key={step.label} className="step-wrapper">
        <div
          className={`step-circle ${idx < current ? 'completed' : ''} ${idx === current ? 'active' : ''}`}
          aria-current={idx === current ? 'step' : undefined}
        >
          {idx < current ? '✓' : idx + 1}
        </div>
        <span className="step-label">{step.label}</span>
        {idx < steps.length - 1 && (
          <div className={`step-line ${idx < current ? 'completed' : ''}`} />
        )}
      </div>
    ))}
  </div>
);

export default ProgressSteps;
