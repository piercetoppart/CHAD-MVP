import { useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import MoodSelector from '../components/MoodSelector';
import ProgressSteps, { type Step } from '../components/ProgressSteps';
import MetricCard from '../components/MetricCard';
import CSVImport from '../components/CSVImport';
import JobCard from '../components/JobCard';
import SuccessCheckmark from '../components/SuccessCheckmark';
import '../proto.css';

const ProtoMVP = () => {
  const [tab, setTab] = useState<'opportunity' | 'business'>('opportunity');
  const [step, setStep] = useState(0);
  const [jobSelected, setJobSelected] = useState(false);

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
                  void rows.length;
                  setStep(1);
                }}
              />
            </Card>
            <Card title="Market Overview">
              <MetricCard value="0" label="Jobs Loaded" />
            </Card>
            <Card title="AI Insights">
              <ul>
                <li>Import jobs to see market analysis</li>
                <li>Client psychology patterns</li>
                <li>Pricing optimization tips</li>
              </ul>
            </Card>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <JobCard
              title="Full-Stack Developer for SaaS Platform"
              budget="$5,000 - $10,000"
              posted="2 hours ago"
              location="Remote"
              match={95}
              competition="3"
              urgent
              selected={jobSelected}
              onSelect={() => setJobSelected(true)}
            />
            <SuccessCheckmark visible={jobSelected} />
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

      <MoodSelector />
    </div>
  );
};

export default ProtoMVP;
