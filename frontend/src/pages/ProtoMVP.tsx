import { useState } from 'react';
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
  const [jobs, setJobs] = useState<Record<string, string>[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

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
              <CSVImport
                onImport={(rows) => {
                  const [header, ...data] = rows;
                  const parsed = data.map((row) => {
                    const obj: Record<string, string> = {};
                    header.forEach((h, i) => {
                      obj[h.trim()] = row[i];
                    });
                    return obj;
                  });
                  setJobs(parsed);
                  setStep(1);
                }}
              />
              <button
                type="button"
                onClick={async () => {
                  const res = await fetch('/sample.csv');
                  const text = await res.text();
                  const rows = text
                    .trim()
                    .split(/\r?\n/)
                    .map((r) => r.split(','));
                  const [header, ...data] = rows;
                  const parsed = data.map((row) => {
                    const obj: Record<string, string> = {};
                    header.forEach((h, i) => {
                      obj[h.trim()] = row[i];
                    });
                    return obj;
                  });
                  setJobs(parsed);
                  setStep(1);
                }}
              >
                Load Sample Data
              </button>
            </Card>
            <Card title="Market Overview">
              <MetricCard value={jobs.length} label="Jobs Loaded" />
              <MetricCard
                value={
                  jobs.length
                    ? (
                        jobs.reduce(
                          (sum, j) =>
                            sum +
                            (parseFloat(j.budget_min) ||
                              parseFloat(j.budget_max) ||
                              0),
                          0
                        ) / jobs.length
                      ).toFixed(0)
                    : '0'
                }
                label="Avg Budget"
              />
            </Card>
            <Card title="AI Insights">
              <ul>
                <li>Import jobs to see market analysis</li>
                <li>Client psychology patterns</li>
                <li>Pricing optimization tips</li>
              </ul>
            </Card>
          </div>
          {jobs.length > 0 && (
            <div className="grid cols-2" style={{ marginTop: '1rem' }}>
              <Card title="Job List">
                {jobs.map((job, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelected(i);
                      setStep(2);
                    }}
                    className={`job-item${selected === i ? ' selected' : ''}`}
                  >
                    {job.job_title}
                  </div>
                ))}
              </Card>
              {selected !== null && (
                <Card title="Details">
                  <p>
                    Budget: $
                    {jobs[selected].budget_min ||
                      jobs[selected].budget_max ||
                      'N/A'}
                  </p>
                  <p>Proposals: {jobs[selected].proposals || 'N/A'}</p>
                </Card>
              )}
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
