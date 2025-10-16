import React from 'react';
import { RotateCcw, Copy, Check, Download } from 'lucide-react';
import { highlightVocabulary } from '../data/vocabulary';

export const FeedbackPhase = ({
  score,
  claim,
  selectedEvidence,
  explanation,
  evidenceCards,
  placements,
  selectedTopic,
  timeSpent,
  onCopyResults,
  onPlayAgain,
  copied
}) => {
  const correctCards = evidenceCards.filter(c => placements[c.id] === c.category).length;
  const maxScore = evidenceCards.length * 5;
  const percentage = Math.round((score / maxScore) * 100);

  const getCardFeedback = (card) => {
    const placement = placements[card.id];
    const isCorrect = placement === card.category;

    if (isCorrect) {
      if (card.category === 'proves') {
        return "This directly proves the claim with specific details.";
      } else if (card.category === 'weak') {
        return "This is related to the topic but doesn't prove the claim.";
      } else {
        return "This is from the passage but doesn't help prove the claim.";
      }
    } else {
      if (card.category === 'proves') {
        return "This should be in PROVES IT - it directly supports the claim with strong evidence.";
      } else if (card.category === 'weak') {
        return "This should be in KINDA RELATED - it connects to the topic but doesn't prove it.";
      } else {
        return "This should be in NOT RELEVANT - it doesn't help prove this specific claim.";
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const exportCSV = () => {
    const history = JSON.parse(localStorage.getItem('proveItHistory') || '[]');

    if (history.length === 0) {
      alert('No results to export yet!');
      return;
    }

    const headers = ['Date', 'Topic', 'Score', 'Correct Cards', 'Total Cards', 'Percentage', 'Time Spent', 'Evidence Selected', 'Explanation'];
    const rows = history.map(game => [
      new Date(game.timestamp).toLocaleString(),
      game.topic,
      game.score || 0,
      game.correctCards || 0,
      game.totalCards || 0,
      game.totalCards ? Math.round(((game.correctCards || 0) / (game.totalCards || 0)) * 100) + '%' : '0%',
      game.timeSpent ? formatTime(game.timeSpent) : 'N/A',
      (game.selectedEvidence || []).join(' | '),
      (game.explanation || '').replace(/\n/g, ' ')
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prove-it-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Score Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-4 text-center">
          <div className="text-6xl mb-3">🏆</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Results</h1>
          <div className="text-5xl font-bold text-blue-900 mb-1">{score} points</div>
          <div className="text-xl text-gray-600">
            Sorting: {correctCards}/{evidenceCards.length} correct ({percentage}%)
          </div>
          {timeSpent > 0 && (
            <div className="text-sm text-gray-500 mt-2">
              Time spent: {formatTime(timeSpent)}
            </div>
          )}
        </div>

        {/* Your Proof */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Your Proof</h2>

          <div className="mb-4">
            <h3 className="font-bold text-gray-700 mb-2">Claim:</h3>
            <p
              className="text-gray-800 italic"
              dangerouslySetInnerHTML={{ __html: highlightVocabulary(claim) }}
            />
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-700 mb-2">Evidence You Selected:</h3>
            <div className="space-y-2">
              {selectedEvidence.map(e => (
                <div key={e.id} className="p-3 bg-green-50 rounded-lg border-2 border-green-300">
                  <p
                    className="text-gray-800"
                    dangerouslySetInnerHTML={{ __html: `"${highlightVocabulary(e.text)}"` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-700 mb-2">Your Explanation:</h3>
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-gray-800 whitespace-pre-wrap">{explanation}</p>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
            <p className="text-yellow-900">
              ✅ <strong>Your explanation has been saved!</strong> Copy your results below to share with your teacher.
            </p>
          </div>
        </div>

        {/* Card Review */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 Card Review</h2>
          <div className="space-y-3">
            {evidenceCards.map(card => {
              const isCorrect = placements[card.id] === card.category;
              return (
                <div
                  key={card.id}
                  className={`p-4 rounded-xl border-3 ${
                    isCorrect
                      ? 'border-green-400 bg-green-50'
                      : 'border-red-400 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{isCorrect ? '✅' : '❌'}</div>
                    <div className="flex-1">
                      <p
                        className="font-bold text-gray-800 mb-1"
                        dangerouslySetInnerHTML={{ __html: `"${highlightVocabulary(card.text)}"` }}
                      />
                      <p className="text-sm text-gray-600 mb-1">
                        You placed: <strong>{placements[card.id]?.toUpperCase()}</strong>
                        {!isCorrect && ` → Should be: ${card.category.toUpperCase()}`}
                      </p>
                      <p className="text-sm text-gray-700">{getCardFeedback(card)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={onCopyResults}
            className="bg-green-600 text-white px-6 py-4 rounded-2xl text-lg font-bold hover:bg-green-700 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Copied!' : 'Copy Results'}
          </button>
          <button
            onClick={exportCSV}
            className="bg-purple-600 text-white px-6 py-4 rounded-2xl text-lg font-bold hover:bg-purple-700 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-4 rounded-2xl text-lg font-bold hover:from-blue-950 hover:to-blue-800 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again!
          </button>
        </div>
      </div>
    </div>
  );
};
