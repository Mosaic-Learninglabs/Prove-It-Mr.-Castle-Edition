import React from 'react';
import { Sparkles } from 'lucide-react';
import { topics } from '../data/topics';

export const StartScreen = ({ selectedTopic, setSelectedTopic, onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="text-7xl mb-3">🔍</div>
            <h1 className="text-6xl font-bold text-gray-800 mb-2">Prove It!</h1>
            <p className="text-xl text-gray-600">American Revolution Evidence Game</p>
            <p className="text-sm text-gray-500 mt-1">Mr. Castle's 7th Grade History • Terronez Middle School</p>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Why did the Americans win? Choose a topic:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {topics.map(topic => (
                <button
                  key={topic.name}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-4 rounded-xl border-3 transition-all ${
                    selectedTopic.name === topic.name
                      ? 'border-blue-900 bg-yellow-50 shadow-lg scale-105'
                      : 'border-gray-300 bg-white hover:border-blue-700'
                  }`}
                  aria-pressed={selectedTopic.name === topic.name}
                >
                  <div className="text-3xl mb-1">{topic.emoji}</div>
                  <div className="font-semibold text-gray-800 text-sm">{topic.name}</div>
                  <div className="text-xs text-gray-500">{topic.type}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white px-8 py-4 rounded-2xl text-2xl font-bold hover:from-blue-950 hover:to-blue-800 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
          >
            <Sparkles className="w-7 h-7" />
            Start Game!
          </button>
        </div>
      </div>
    </div>
  );
};
