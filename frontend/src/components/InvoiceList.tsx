import type { FC } from 'react';

export interface Invoice {
  id: number;
  description: string;
  amount: number;
  paid: boolean;
}

interface InvoiceListProps {
  invoices: Invoice[];
  onTogglePaid: (id: number) => void;
}

const InvoiceList: FC<InvoiceListProps> = ({ invoices, onTogglePaid }) => (
  <ul className="invoice-list">
    {invoices.map((inv) => (
      <li key={inv.id} className="flex space-between">
        <span>
          {inv.description} - ${inv.amount.toFixed(2)}{' '}
          {inv.paid ? '(Paid)' : '(Pending)'}
        </span>
        <button onClick={() => onTogglePaid(inv.id)}>
          {inv.paid ? 'Mark Unpaid' : 'Mark Paid'}
        </button>
      </li>
    ))}
  </ul>
);

export default InvoiceList;
