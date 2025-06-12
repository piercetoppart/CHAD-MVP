import type { FC } from 'react';
import Tooltip from './Tooltip';

interface JobCardProps {
  title: string;
  budget: string;
  posted: string;
  location: string;
  match: number;
  competition: string;
  urgent?: string;
  onAnalyze?: () => void;
}

const JobCard: FC<JobCardProps> = ({
  title,
  budget,
  posted,
  location,
  match,
  competition,
  urgent,
  onAnalyze,
}) => (
  <div className="job-card">
    <div className="job-header">
      <div>
        <h3 className="job-title">{title}</h3>
        <div className="job-meta">
          <span>{budget}</span>
          <span>{posted}</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
    <div className="job-badges">
      <span className="badge badge-success">{match}% Match</span>
      <span className="badge badge-primary">{competition}</span>
      {urgent && (
        <span className="badge badge-warning">
          {urgent}
          <Tooltip text="Client needs someone ASAP" />
        </span>
      )}
    </div>
    <div style={{ marginTop: '1rem' }}>
      <button type="button" className="btn btn-primary" onClick={onAnalyze}>
        Analyze This Job
      </button>
    </div>
  </div>
);

export default JobCard;
