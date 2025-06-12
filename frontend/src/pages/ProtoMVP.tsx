import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import MoodSelector from '../components/MoodSelector';
import ProgressSteps, { type Step } from '../components/ProgressSteps';
import MetricCard from '../components/MetricCard';
import CSVImport from '../components/CSVImport';
import '../proto.css';

const ProtoMVP = () => {
  const [tab, setTab] = useState<'opportunity' | 'business'>('opportunity');
  const [step, setStep] = useState(0);
  interface Job {
    job_title: string;
    budget_value: number;
    contract_type: string;
    proposals: string;
    job_description: string;
  }

  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('jobs');
    return saved ? (JSON.parse(saved) as Job[]) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleImport = (rows: string[][]) => {
    const [header, ...data] = rows;
    const map: Record<string, number> = {};
    header.forEach((h, idx) => {
      map[h.trim()] = idx;
    });
    const imported: Job[] = data.map((row) => ({
      job_title: row[map['job_title']] ?? '',
      budget_value:
        parseFloat(row[map['budget_fixed']] || '') ||
        parseFloat(row[map['budget_min']] || '') ||
        0,
      contract_type: row[map['contract_type']] ?? '',
      proposals: row[map['proposals']] ?? '',
      job_description: row[map['job_description']] ?? '',
    }));
    setJobs(imported);
    setStep(1);
  };

  const filteredJobs = jobs.filter((job) => {
    if (filter === 'high') return job.budget_value >= 1000;
    if (filter === 'medium')
      return job.budget_value >= 500 && job.budget_value < 1000;
    if (filter === 'low') return job.budget_value < 500;
    return true;
  });

  const avgBudget =
    jobs.reduce((sum, j) => sum + j.budget_value, 0) / (jobs.length || 1);

  const highValueJobs = jobs.filter((j) => j.budget_value >= 1000).length;
  const lowCompetitionJobs = jobs.filter((j) => {
    const proposals = parseInt(j.proposals.match(/\d+/)?.[0] || '999', 10);
    return proposals < 5;
  }).length;

  const steps: Step[] = [
    { label: 'Welcome' },
    { label: 'Setup' },
    { label: 'Platform' },
    { label: 'Analysis' },
  ];

  return (
    <div className="container">
      <Header title="FreelanceOS - Intelligence Platform" />
      <ProgressSteps steps={steps} current={step} />
      <div className="tabs">
        <button
          className={tab === 'opportunity' ? 'active' : ''}
          onClick={() => {
            setTab('opportunity');
            setStep(0);
          }}
        >
          Opportunity Intelligence
        </button>
        <button
          className={tab === 'business' ? 'active' : ''}
          onClick={() => {
            setTab('business');
            setStep(3);
          }}
        >
          Business Management
        </button>
      </div>

      {tab === 'opportunity' && (
        <section>
          <h2>Opportunity Intelligence & Proposal Engine</h2>
          <div className="grid cols-3">
            <Card title="Import Job Data">
              <CSVImport onImport={handleImport} />
            </Card>
            <Card title="Market Overview">
              <MetricCard value={jobs.length} label="Jobs Loaded" />
              <MetricCard
                value={`$${avgBudget.toFixed(0)}`}
                label="Avg Budget"
              />
            </Card>
            <Card title="AI Insights">
              <ul>
                <li>{highValueJobs} high-value jobs</li>
                <li>{lowCompetitionJobs} low competition</li>
              </ul>
            </Card>
          </div>

          {jobs.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <label htmlFor="filter">Filter by Budget:</label>{' '}
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="high">$1000+</option>
                <option value="medium">$500-$999</option>
                <option value="low">Under $500</option>
              </select>
              <ul>
                {filteredJobs.map((job, i) => (
                  <li key={i}>{job.job_title}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {tab === 'business' && (
        <section>
          <h2>Business Management System</h2>
          <div className="grid cols-4">
            <Card title="Monthly Revenue">$0</Card>
            <Card title="Active Projects">0</Card>
            <Card title="Win Rate">0%</Card>
            <Card title="Avg Project Value">$0</Card>
          </div>
        </section>
      )}

      <MoodSelector />
    </div>
  );
};

export default ProtoMVP;
