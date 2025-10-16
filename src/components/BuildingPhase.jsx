import React from 'react';
import { highlightVocabulary } from '../data/vocabulary';

export const BuildingPhase = ({
  claim,
  provesCards,
  selectedEvidence,
  onToggleEvidence,
  explanation,
  onExplanationChange,
  onSubmit,
  canSubmit,
  onBack
}) => {
  const wordCount = explanation.trim().split(/\s+/).filter(w => w.length > 0).length;
  const charCount = explanation.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">🔍 Prove It!</h1>
              <p className="text-sm text-gray-600">Step 2 of 3: Build your proof</p>
            </div>
          </div>
        </div>

        {/* Claim Display */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-lg p-6 mb-4 border-4 border-yellow-400">
          <h2 className="text-xl font-bold text-yellow-900 mb-2">🎯 Your Claim:</h2>
          <p
            className="text-yellow-900 font-bold text-xl"
            dangerouslySetInnerHTML={{ __html: highlightVocabulary(claim) }}
          />
        </div>

        {/* Evidence Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Select 2-3 pieces of evidence from your "PROVES IT" zone:
          </h2>
          {provesCards.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-red-600 font-semibold">⚠️ You didn't place any evidence in "PROVES IT"</p>
              <p className="text-gray-600 text-sm mt-2">Go back and sort at least 2 cards into the green zone.</p>
              <button
                onClick={onBack}
                className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-950"
              >
                ← Go Back to Sorting
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {provesCards.map(card => (
                <button
                  key={card.id}
                  onClick={() => onToggleEvidence(card)}
                  className={`w-full p-4 rounded-xl border-3 text-left transition-all ${
                    selectedEvidence.find(e => e.id === card.id)
                      ? 'border-blue-900 bg-yellow-50 shadow-lg'
                      : 'border-gray-300 bg-gray-50 hover:border-blue-700'
                  }`}
                  aria-pressed={!!selectedEvidence.find(e => e.id === card.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {selectedEvidence.find(e => e.id === card.id) ? '✅' : '⬜'}
                    </div>
                    <p
                      className="text-gray-800 font-medium"
                      dangerouslySetInnerHTML={{ __html: `"${highlightVocabulary(card.text)}"` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-500 mt-3">
            Selected: {selectedEvidence.length} / 3 (Need at least 2)
          </p>
        </div>

        {/* Explanation Box */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            💬 Explain how your evidence proves the claim:
          </h2>
          <div className="mb-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <p className="text-sm text-blue-900 font-semibold mb-2">Think about:</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• What specific words connect to the claim?</li>
              <li>• Why is this evidence strong?</li>
              <li>• How do the pieces work together?</li>
            </ul>
          </div>
          <textarea
            value={explanation}
            onChange={(e) => onExplanationChange(e.target.value)}
            className="w-full h-40 p-4 border-2 border-gray-300 rounded-xl focus:border-blue-900 focus:outline-none text-gray-800 resize-none"
            placeholder="Write your explanation here... (At least 3 sentences)"
            aria-label="Explanation text area"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">
              {wordCount} words • {charCount} characters
            </p>
            <p className={`text-sm font-semibold ${charCount >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
              {charCount >= 50 ? '✓ Ready!' : `Need ${50 - charCount} more characters`}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className={`px-10 py-4 rounded-2xl text-xl font-bold transition-all transform shadow-xl ${
              canSubmit
                ? 'bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:from-blue-950 hover:to-blue-800 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canSubmit ? 'Submit My Proof! ✨' : 'Complete All Steps First'}
          </button>
        </div>
      </div>
    </div>
  );
};
