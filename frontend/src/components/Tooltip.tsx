import { useState } from 'react';
import type { FC, ReactNode } from 'react';

interface TooltipProps {
  text: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ text }) => {
  const [show, setShow] = useState(false);
  return (
    <span
      className="tooltip-trigger"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span className="tooltip-icon">?</span>
      {show && <span className="tooltip-content">{text}</span>}
    </span>
  );
};

export default Tooltip;
