import type { FC } from 'react';

const moods = ['😊', '😐', '😔'];

interface MoodSelectorProps {
  onSelect?: (mood: string) => void;
}

const MoodSelector: FC<MoodSelectorProps> = ({ onSelect }) => (
  <div className="mood-selector">
    {moods.map((mood) => (
      <button
        key={mood}
        aria-label={`Select mood ${mood}`}
        onClick={() => onSelect?.(mood)}
      >
        {mood}
      </button>
    ))}
  </div>
);

export default MoodSelector;
