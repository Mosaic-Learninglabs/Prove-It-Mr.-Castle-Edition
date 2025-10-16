import React from 'react';
import { RotateCcw, Undo2, Lightbulb } from 'lucide-react';
import { highlightVocabulary } from '../data/vocabulary';
import { EvidenceCard } from './EvidenceCard';

export const SortingPhase = ({
  selectedTopic,
  passage,
  claim,
  evidenceCards,
  placements,
  onDragStart,
  onDrop,
  onDragOver,
  draggedCard,
  onNext,
  onUndo,
  onReset,
  canUndo,
  showHint,
  onHintClick
}) => {
  const getUnplacedCards = () => evidenceCards.filter(card => !placements[card.id]);
  const getCardsInZone = (zone) => evidenceCards.filter(card => placements[card.id] === zone);
  const allSorted = evidenceCards.length > 0 && evidenceCards.every(card => placements[card.id]);

  const DropZone = ({ zone, title, emoji, description, colorClass }) => (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, zone)}
      onTouchEnd={(e) => {
        if (draggedCard) {
          onDrop(e, zone);
        }
      }}
      className={`${colorClass} border-4 border-dashed rounded-2xl p-4 min-h-[160px] hover:opacity-90 transition-all`}
      role="region"
      aria-label={`${title} drop zone`}
    >
      <div className="text-center mb-2">
        <div className="text-3xl mb-1">{emoji}</div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-xs">{description}</p>
      </div>
      <div className="space-y-2">
        {getCardsInZone(zone).map(card => (
          <div key={card.id} className={`p-2 bg-white rounded-lg shadow-sm border-2`}>
            <p
              className="text-xs text-gray-800"
              dangerouslySetInnerHTML={{ __html: `"${highlightVocabulary(card.text)}"` }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">🔍 Prove It!</h1>
              <p className="text-sm text-gray-600">Step 1 of 3: Sort the evidence</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">{selectedTopic.name}</div>
              <div className="text-xs text-gray-400">{selectedTopic.type}</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4 flex gap-3 flex-wrap">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              canUndo
                ? 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Undo last placement"
          >
            <Undo2 className="w-4 h-4" />
            Undo
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-red-100 text-red-900 hover:bg-red-200 transition-all"
            aria-label="Reset all placements"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All
          </button>
          <button
            onClick={onHintClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-blue-100 text-blue-900 hover:bg-blue-200 transition-all"
            aria-label="Show hint"
          >
            <Lightbulb className="w-4 h-4" />
            Hint
          </button>
        </div>

        {/* Hint Display */}
        {showHint && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-lg p-5 mb-4 border-2 border-purple-300">
            <h3 className="font-bold text-purple-900 mb-2">💡 Hint:</h3>
            <p className="text-purple-900">
              Look for evidence that <strong>directly</strong> supports the claim with specific facts or numbers.
              "KINDA RELATED" evidence mentions the topic but doesn't prove it.
              "NOT RELEVANT" evidence is from the passage but doesn't help prove this specific claim.
            </p>
          </div>
        )}

        {/* Passage */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            📖 Read This
          </h2>
          <p
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightVocabulary(passage) }}
          />
        </div>

        {/* Claim */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-lg p-5 mb-4 border-4 border-yellow-400">
          <h2 className="text-lg font-bold text-yellow-900 mb-3">🎯 PROVE THIS:</h2>
          <p
            className="text-yellow-900 font-bold text-lg leading-snug"
            dangerouslySetInnerHTML={{ __html: highlightVocabulary(claim) }}
          />
        </div>

        {/* Evidence Cards */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            🃏 Evidence Cards <span className="text-sm font-normal text-gray-500">(Drag or tap these below ↓)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {getUnplacedCards().map(card => (
              <EvidenceCard
                key={card.id}
                card={card}
                onDragStart={onDragStart}
              />
            ))}
            {getUnplacedCards().length === 0 && (
              <div className="col-span-full text-center py-6">
                <div className="text-4xl mb-2">✨</div>
                <p className="text-gray-600 font-semibold">All sorted! Click "Next Step" below.</p>
              </div>
            )}
          </div>
        </div>

        {/* Drop Zones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <DropZone
            zone="proves"
            title="PROVES IT!"
            emoji="✅"
            description="Strong, direct proof"
            colorClass="bg-green-50 border-green-500 text-green-800"
          />
          <DropZone
            zone="weak"
            title="KINDA RELATED"
            emoji="🤔"
            description="Connected but weak"
            colorClass="bg-yellow-50 border-yellow-500 text-yellow-800"
          />
          <DropZone
            zone="irrelevant"
            title="NOT RELEVANT"
            emoji="❌"
            description="Doesn't help"
            colorClass="bg-red-50 border-red-500 text-red-800"
          />
        </div>

        {/* Next Button */}
        {allSorted && (
          <div className="text-center">
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:from-blue-950 hover:to-blue-800 transition-all transform hover:scale-105 shadow-xl"
            >
              Next Step: Build Your Proof ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
