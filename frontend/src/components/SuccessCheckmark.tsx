import type { FC } from 'react';

interface SuccessCheckmarkProps {
  visible: boolean;
}

const SuccessCheckmark: FC<SuccessCheckmarkProps> = ({ visible }) => (
  <div className={`success-checkmark ${visible ? 'visible' : ''}`}>
    <svg viewBox="0 0 52 52">
      <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
      <path
        className="checkmark-check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  </div>
);

export default SuccessCheckmark;
