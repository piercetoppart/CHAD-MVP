import type { FC } from 'react';

const moods = ['😊', '😐', '😔'];

const MoodSelector: FC = () => (
  <div className="mood-selector">
    {moods.map((mood) => (
      <button
        key={mood}
        aria-label={`Select mood ${mood}`}
        title={`Mood ${mood}`}
      >
        {mood}
      </button>
    ))}
  </div>
);

export default MoodSelector;
