import { useState, type FC, type FormEvent } from 'react';

interface InvoiceInput {
  description: string;
  amount: number;
}

interface InvoiceFormProps {
  onAdd: (invoice: InvoiceInput) => void;
}

const InvoiceForm: FC<InvoiceFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!description || amount <= 0) return;
    onAdd({ description, amount });
    setDescription('');
    setAmount(0);
  };

  return (
    <form className="grid cols-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount === 0 ? '' : amount}
        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
      />
      <button type="submit" className="col-span-2">
        Create Invoice
      </button>
    </form>
  );
};

export type { InvoiceInput };
export default InvoiceForm;
