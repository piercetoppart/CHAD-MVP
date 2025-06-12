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
  const [jobs, setJobs] = useState<string[][]>([]);
  const [mood, setMood] = useState<string | null>(null);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (focus) document.body.classList.add('hyperfocus');
    else document.body.classList.remove('hyperfocus');
  }, [focus]);

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
                  setJobs(rows.slice(1));
                  setStep(1);
                }}
              />
            </Card>
            <Card title="Market Overview">
              <MetricCard value={jobs.length} label="Jobs Loaded" />
            </Card>
            <Card title="AI Insights">
              <ul>
                <li>Import jobs to see market analysis</li>
                <li>Client psychology patterns</li>
                <li>Pricing optimization tips</li>
              </ul>
            </Card>
            <Card title="Job List">
              <ul>
                {jobs.map((row, idx) => (
                  <li key={idx}>{row[0]}</li>
                ))}
              </ul>
            </Card>
          </div>
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

      <MoodSelector
        onSelect={(m) => {
          setMood(m);
          setStep(2);
        }}
      />
      {mood && <p>Current mood: {mood}</p>}
      <button onClick={() => setFocus(!focus)}>
        {focus ? 'Exit Hyperfocus' : 'Enter Hyperfocus'}
      </button>
      <button onClick={() => alert('Joining coworking...')}>
        Join Coworking
      </button>
    </div>
  );
};

export default ProtoMVP;
