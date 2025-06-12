import type { FC, ReactNode } from 'react';

interface TooltipProps {
  text: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ text }) => (
  <span className="tooltip-trigger">
    <span className="tooltip-icon">?</span>
    <span className="tooltip-content">{text}</span>
  </span>
);

export default Tooltip;
