import { useState, useEffect } from 'react';

export const useGameState = () => {
  const [gameState, setGameState] = useState('start');
  const [gamePhase, setGamePhase] = useState('sorting');
  const [passage, setPassage] = useState(null);
  const [claim, setClaim] = useState(null);
  const [evidenceCards, setEvidenceCards] = useState([]);
  const [placements, setPlacements] = useState({});
  const [placementHistory, setPlacementHistory] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState([]);
  const [explanation, setExplanation] = useState('');
  const [score, setScore] = useState(0);
  const [draggedCard, setDraggedCard] = useState(null);
  const [copied, setCopied] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);

  // Auto-save draft to localStorage
  useEffect(() => {
    if (gameState === 'playing') {
      const draft = {
        gamePhase,
        passage,
        claim,
        evidenceCards,
        placements,
        selectedEvidence,
        explanation,
        timestamp: Date.now()
      };
      localStorage.setItem('proveItDraft', JSON.stringify(draft));
    }
  }, [gameState, gamePhase, passage, claim, evidenceCards, placements, selectedEvidence, explanation]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('proveItDraft');
    if (draft) {
      const parsed = JSON.parse(draft);
      // Only load if less than 24 hours old
      if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        // We'll expose a method to restore this
        return parsed;
      }
    }
  }, []);

  // Track time spent
  useEffect(() => {
    if (gameState === 'playing' && !startTime) {
      setStartTime(Date.now());
    }

    if (gameState === 'playing' && startTime) {
      const interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState, startTime]);

  const undoPlacement = () => {
    if (placementHistory.length > 0) {
      const previous = placementHistory[placementHistory.length - 1];
      setPlacements(previous);
      setPlacementHistory(placementHistory.slice(0, -1));
    }
  };

  const updatePlacement = (cardId, zone) => {
    setPlacementHistory([...placementHistory, placements]);
    setPlacements({
      ...placements,
      [cardId]: zone
    });
  };

  const resetPlacements = () => {
    setPlacementHistory([...placementHistory, placements]);
    setPlacements({});
  };

  return {
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
    setPlacements,
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
  };
};
