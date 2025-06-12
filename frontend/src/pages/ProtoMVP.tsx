import { useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import MoodSelector from '../components/MoodSelector';
import ProgressSteps, { type Step } from '../components/ProgressSteps';
import MetricCard from '../components/MetricCard';
import CSVImport from '../components/CSVImport';
import InvoiceForm, { type InvoiceInput } from '../components/InvoiceForm';
import InvoiceList, { type Invoice } from '../components/InvoiceList';
import '../proto.css';

const ProtoMVP = () => {
  const [tab, setTab] = useState<'opportunity' | 'business'>('opportunity');
  const [step, setStep] = useState(0);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const handleAddInvoice = (invoice: InvoiceInput) => {
    setInvoices((prev) => [
      ...prev,
      { id: Date.now(), paid: false, ...invoice },
    ]);
  };

  const toggleInvoicePaid = (id: number) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, paid: !inv.paid } : inv))
    );
  };

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidTotal = invoices
    .filter((inv) => inv.paid)
    .reduce((sum, inv) => sum + inv.amount, 0);
  const netProfit = paidTotal;
  const grossMargin = totalInvoiced
    ? ((netProfit / totalInvoiced) * 100).toFixed(1)
    : '0';

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
              <CSVImport onImport={() => setStep(1)} />
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
        </section>
      )}

      {tab === 'business' && (
        <section>
          <h2>Business Management System</h2>
          <InvoiceForm onAdd={handleAddInvoice} />
          <InvoiceList invoices={invoices} onTogglePaid={toggleInvoicePaid} />
          <div className="grid cols-4">
            <MetricCard
              value={`$${paidTotal.toFixed(0)}`}
              label="Monthly Revenue"
            />
            <MetricCard value={`$${netProfit.toFixed(0)}`} label="Net Profit" />
            <MetricCard value={`${grossMargin}%`} label="Gross Margin" />
            <MetricCard
              value={`$${totalInvoiced.toFixed(0)}`}
              label="Total Invoiced"
            />
          </div>
        </section>
      )}

      <MoodSelector />
    </div>
  );
};

export default ProtoMVP;
