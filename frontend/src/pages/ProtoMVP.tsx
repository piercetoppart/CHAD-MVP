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
  const [jobs, setJobs] = useState<string[][]>([]);

  const steps: Step[] = [
    { label: 'Welcome' },
    { label: 'Setup' },
    { label: 'Platform' },
    { label: 'Analysis' },
  ];

  const loadSampleData = async () => {
    const res = await fetch('/sample-jobs.csv');
    const text = await res.text();
    const rows = text
      .trim()
      .split(/\r?\n/)
      .map((r) => r.split(','));
    setJobs(rows.slice(1));
    setStep(1);
  };

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
              <button className="button mt-2" onClick={loadSampleData}>
                Use Sample Data
              </button>
            </Card>
            <Card title="Market Overview">
              <MetricCard value={jobs.length.toString()} label="Jobs Loaded" />
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
            <ul className="mt-2">
              {jobs.map((j, idx) => (
                <li key={idx}>{j[0]}</li>
              ))}
            </ul>
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
