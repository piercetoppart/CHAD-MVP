import type { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
}

const Card: FC<CardProps> = ({ children, title }) => (
  <div className="card">
    {title && <h3>{title}</h3>}
    {children}
  </div>
);

export default Card;
