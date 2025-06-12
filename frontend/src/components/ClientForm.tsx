import { useState } from 'react';
import type { FC, FormEvent } from 'react';

interface ClientFormProps {
  onAdd: (client: { name: string; email: string }) => void;
}

const ClientForm: FC<ClientFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onAdd({ name: name.trim(), email: email.trim() });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="client-form">
      <input
        aria-label="Client name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        aria-label="Client email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Add Client</button>
    </form>
  );
};

export default ClientForm;
