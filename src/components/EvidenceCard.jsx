import React from 'react';
import { highlightVocabulary } from '../data/vocabulary';

export const EvidenceCard = ({ card, onDragStart, onClick, isSelected, className = '' }) => {
  const baseClass = "p-3 rounded-xl border-2 transition-all";

  const handleTouchStart = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(card);
    }
  };

  return (
    <div
      draggable={!!onDragStart}
      onDragStart={onDragStart ? (e) => onDragStart(e, card) : undefined}
      onClick={onClick ? () => onClick(card) : undefined}
      onTouchStart={handleTouchStart}
      className={`${baseClass} ${className} ${
        isSelected
          ? 'border-blue-900 bg-yellow-50 shadow-lg scale-105'
          : 'border-blue-300 bg-blue-50'
      } ${onDragStart ? 'cursor-move hover:shadow-lg hover:scale-105' : ''} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyPress={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick(card);
        }
      }}
    >
      <p
        className="text-sm text-gray-800"
        dangerouslySetInnerHTML={{ __html: `"${highlightVocabulary(card.text)}"` }}
      />
    </div>
  );
};
