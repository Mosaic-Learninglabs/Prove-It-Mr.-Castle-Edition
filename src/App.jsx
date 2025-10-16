import React, { useState } from 'react';
import { topics } from './data/topics';
import { staticContent } from './data/staticContent';
import { useGameState } from './hooks/useGameState';
import { StartScreen } from './components/StartScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { SortingPhase } from './components/SortingPhase';
import { BuildingPhase } from './components/BuildingPhase';
import { FeedbackPhase } from './components/FeedbackPhase';

const ProveItGame = () => {
  const {
    gameState,
    setGameState,
    gamePhase,
    setGamePhase,
    passage,
    setPassage,
    claim,
    setClaim,
    evidenceCards,
    setEvidenceCards,
    placements,
    updatePlacement,
    undoPlacement,
    resetPlacements,
    placementHistory,
    selectedEvidence,
    setSelectedEvidence,
    explanation,
    setExplanation,
    score,
    setScore,
    draggedCard,
    setDraggedCard,
    copied,
    setCopied,
    timeSpent,
    setStartTime
  } = useGameState();

  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [showHint, setShowHint] = useState(false);

  const generateContent = () => {
    setGameState('loading');

    setTimeout(() => {
      const content = staticContent[selectedTopic.name];
      const shuffled = [...content.evidenceCards].sort(() => Math.random() - 0.5);

      setPassage(content.passage);
      setClaim(content.claim);
      setEvidenceCards(shuffled);
      resetPlacements();
      setSelectedEvidence([]);
      setExplanation('');
      setScore(0);
      setGamePhase('sorting');
      setStartTime(Date.now());
      setGameState('playing');
    }, 1000);
  };

  const handleDragStart = (e, card) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, zone) => {
    e.preventDefault();
    if (draggedCard && gamePhase === 'sorting') {
      updatePlacement(draggedCard.id, zone);
      setDraggedCard(null);
    }
  };

  const getProvesCards = () => {
    return evidenceCards.filter(card => placements[card.id] === 'proves');
  };

  const toggleEvidenceSelection = (card) => {
    if (selectedEvidence.find(e => e.id === card.id)) {
      setSelectedEvidence(selectedEvidence.filter(e => e.id !== card.id));
    } else if (selectedEvidence.length < 3) {
      setSelectedEvidence([...selectedEvidence, card]);
    }
  };

  const canSubmitProof = selectedEvidence.length >= 2 && explanation.trim().length >= 50;

  const submitProof = () => {
    let points = 0;
    evidenceCards.forEach(card => {
      if (placements[card.id] === card.category) {
        points += card.category === 'proves' ? 5 : 3;
      }
    });
    setScore(points);

    // Save to localStorage
    const gameData = {
      timestamp: new Date().toISOString(),
      topic: selectedTopic.name,
      claim: claim,
      score: points,
      totalCards: evidenceCards.length,
      correctCards: evidenceCards.filter(c => placements[c.id] === c.category).length,
      selectedEvidence: selectedEvidence.map(e => e.text),
      explanation: explanation,
      timeSpent: timeSpent
    };

    const history = JSON.parse(localStorage.getItem('proveItHistory') || '[]');
    history.unshift(gameData);
    localStorage.setItem('proveItHistory', JSON.stringify(history.slice(0, 20)));

    setGamePhase('feedback');
  };

  const copyResults = () => {
    const correctCards = evidenceCards.filter(c => placements[c.id] === c.category).length;
    const text = `━━━━━━━━━━━━━━━━━━━━━━━━━
PROVE IT! RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━
Date: ${new Date().toLocaleDateString()}
Topic: ${selectedTopic.name}

CLAIM: ${claim}

SORTING: ${correctCards}/${evidenceCards.length} correct (${score} points)

EVIDENCE SELECTED:
${selectedEvidence.map(e => `• "${e.text}"`).join('\n')}

MY EXPLANATION:
${explanation}
━━━━━━━━━━━━━━━━━━━━━━━━━`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playAgain = () => {
    setGameState('start');
    setGamePhase('sorting');
    setCopied(false);
    setShowHint(false);
  };

  // Render logic
  if (gameState === 'start') {
    return (
      <StartScreen
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        onStart={generateContent}
      />
    );
  }

  if (gameState === 'loading') {
    return <LoadingScreen />;
  }

  if (gameState === 'playing' && gamePhase === 'sorting') {
    const allSorted = evidenceCards.length > 0 && evidenceCards.every(card => placements[card.id]);

    return (
      <SortingPhase
        selectedTopic={selectedTopic}
        passage={passage}
        claim={claim}
        evidenceCards={evidenceCards}
        placements={placements}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        draggedCard={draggedCard}
        onNext={() => setGamePhase('building')}
        onUndo={undoPlacement}
        onReset={resetPlacements}
        canUndo={placementHistory.length > 0}
        showHint={showHint}
        onHintClick={() => setShowHint(!showHint)}
      />
    );
  }

  if (gameState === 'playing' && gamePhase === 'building') {
    return (
      <BuildingPhase
        claim={claim}
        provesCards={getProvesCards()}
        selectedEvidence={selectedEvidence}
        onToggleEvidence={toggleEvidenceSelection}
        explanation={explanation}
        onExplanationChange={setExplanation}
        onSubmit={submitProof}
        canSubmit={canSubmitProof}
        onBack={() => setGamePhase('sorting')}
      />
    );
  }

  if (gameState === 'playing' && gamePhase === 'feedback') {
    return (
      <FeedbackPhase
        score={score}
        claim={claim}
        selectedEvidence={selectedEvidence}
        explanation={explanation}
        evidenceCards={evidenceCards}
        placements={placements}
        selectedTopic={selectedTopic}
        timeSpent={timeSpent}
        onCopyResults={copyResults}
        onPlayAgain={playAgain}
        copied={copied}
      />
    );
  }

  return null;
};

export default ProveItGame;
