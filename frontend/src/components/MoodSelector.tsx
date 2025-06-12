import { useEffect, useState, type FC } from 'react';

const moods = ['😊', '😐', '😔'];

const MoodSelector: FC = () => {
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem('mood') || '';
  });

  useEffect(() => {
    if (selected) localStorage.setItem('mood', selected);
  }, [selected]);

  return (
    <div className="mood-selector">
      {moods.map((mood) => (
        <button
          key={mood}
          type="button"
          className={selected === mood ? 'active' : ''}
          aria-label={`Select mood ${mood}`}
          onClick={() => setSelected(mood)}
        >
          {mood}
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
