import { useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

interface Trend {
  direction: 'up' | 'down';
  text: string;
}

interface MetricCardProps {
  value: ReactNode;
  label: string;
  trend?: Trend;
}

const MetricCard: FC<MetricCardProps> = ({ value, label, trend }) => {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (typeof value === 'number') {
      let current = 0;
      const steps = 20;
      const increment = value / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplay(value);
          clearInterval(timer);
        } else {
          setDisplay(Math.round(current));
        }
      }, 20);
      return () => clearInterval(timer);
    }
    setDisplay(value);
    return undefined;
  }, [value]);

  return (
    <div className="metric-card hoverable">
      <div className="metric-value">{display}</div>
      <div className="metric-label">{label}</div>
      {trend && (
        <div className={`metric-trend ${trend.direction}`}>{trend.text}</div>
      )}
    </div>
  );
};

export default MetricCard;
