import { useState, type FC } from 'react';

const moods = ['😊', '😐', '😔'];

const MoodSelector: FC = () => {
  const [selected, setSelected] = useState('');

  return (
    <div className="mood-selector">
      {moods.map((mood) => (
        <button
          key={mood}
          aria-label={`Select mood ${mood}`}
          className={selected === mood ? 'active' : ''}
          onClick={() => setSelected(mood)}
        >
          {mood}
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
