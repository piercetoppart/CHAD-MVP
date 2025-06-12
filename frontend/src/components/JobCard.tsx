import type { FC } from 'react';
import Tooltip from './Tooltip';

interface JobCardProps {
  title: string;
  budget: string;
  posted: string;
  location: string;
  match: number;
  competition: string;
  urgent?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

const JobCard: FC<JobCardProps> = ({
  title,
  budget,
  posted,
  location,
  match,
  competition,
  urgent,
  selected,
  onSelect,
}) => (
  <div
    className={`job-card ${selected ? 'selected' : ''}`}
    onClick={onSelect}
    role="button"
    tabIndex={0}
  >
    <div className="job-header">
      <div>
        <h3 className="job-title">{title}</h3>
        <div className="job-meta">
          <span>💰 {budget}</span>
          <span>📅 {posted}</span>
          <span>📍 {location}</span>
        </div>
      </div>
    </div>
    <div className="job-badges">
      <span className="badge badge-success">{match}% Match</span>
      <span className="badge badge-primary">
        Low Competition ({competition})
      </span>
      {urgent && (
        <span className="badge badge-warning">
          Urgent <Tooltip text="Client needs someone ASAP" />
        </span>
      )}
    </div>
  </div>
);

export default JobCard;
