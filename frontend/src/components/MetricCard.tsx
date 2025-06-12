import type { FC, ReactNode } from 'react';

interface MetricCardProps {
  value: ReactNode;
  label: string;
}

const MetricCard: FC<MetricCardProps> = ({ value, label }) => (
  <div className="metric-card hoverable">
    <div className="metric-value">{value}</div>
    <div className="metric-label">{label}</div>
  </div>
);

export default MetricCard;
