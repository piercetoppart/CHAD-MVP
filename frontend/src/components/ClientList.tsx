import type { FC } from 'react';

interface Client {
  name: string;
  email: string;
}

interface ClientListProps {
  clients: Client[];
}

const ClientList: FC<ClientListProps> = ({ clients }) => (
  <ul className="client-list">
    {clients.map((c) => (
      <li key={c.email}>
        {c.name} - {c.email}
      </li>
    ))}
  </ul>
);

export default ClientList;
