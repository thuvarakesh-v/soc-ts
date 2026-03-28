import { useState, useCallback, useMemo, useEffect } from 'react';
import type {
  BingoSquareData,
  BingoLine,
  ChecklistItem,
  GameMode,
  GameState,
} from '../types';
import { scavengerChecklist } from '../data/questions';
import {
  generateBoard,
  toggleSquare,
  checkBingo,
  getWinningSquareIds,
} from '../utils/bingoLogic';

export interface BingoGameState {
  mode: GameMode;
  gameState: GameState;
  board: BingoSquareData[];
  checklist: ChecklistItem[];
  checklistCompletedCount: number;
  checklistTotal: number;
  winningLine: BingoLine | null;
  winningSquareIds: Set<number>;
  showBingoModal: boolean;
}

export interface BingoGameActions {
  startGame: (mode: GameMode) => void;
  handleSquareClick: (squareId: number) => void;
  handleChecklistToggle: (itemId: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
}

const STORAGE_KEY = 'bingo-game-state';
const STORAGE_VERSION = 2;

interface StoredGameData {
  version: number;
  mode: GameMode;
  gameState: GameState;
  board: BingoSquareData[];
  checklist: ChecklistItem[];
  winningLine: BingoLine | null;
}

function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  const obj = data as Record<string, unknown>;
  
  if (obj.version !== STORAGE_VERSION) {
    return false;
  }

  if (typeof obj.mode !== 'string' || !['bingo', 'scavenger'].includes(obj.mode)) {
    return false;
  }
  
  if (typeof obj.gameState !== 'string' || !['start', 'playing', 'bingo', 'complete'].includes(obj.gameState)) {
    return false;
  }
  
  if (!Array.isArray(obj.board) || (obj.board.length !== 0 && obj.board.length !== 25)) {
    return false;
  }
  
  const validSquares = obj.board.every((sq: unknown) => {
    if (!sq || typeof sq !== 'object') return false;
    const square = sq as Record<string, unknown>;
    return (
      typeof square.id === 'number' &&
      typeof square.text === 'string' &&
      typeof square.isMarked === 'boolean' &&
      typeof square.isFreeSpace === 'boolean'
    );
  });
  
  if (!validSquares) {
    return false;
  }

  if (!Array.isArray(obj.checklist)) {
    return false;
  }

  const validChecklist = obj.checklist.every((item: unknown) => {
    if (!item || typeof item !== 'object') return false;
    const checklistItem = item as Record<string, unknown>;
    return (
      typeof checklistItem.id === 'number' &&
      typeof checklistItem.text === 'string' &&
      typeof checklistItem.isChecked === 'boolean'
    );
  });

  if (!validChecklist) {
    return false;
  }
  
  if (obj.winningLine !== null) {
    if (typeof obj.winningLine !== 'object') {
      return false;
    }
    const line = obj.winningLine as Record<string, unknown>;
    if (
      typeof line.type !== 'string' ||
      !['row', 'column', 'diagonal'].includes(line.type) ||
      typeof line.index !== 'number' ||
      !Array.isArray(line.squares)
    ) {
      return false;
    }
  }
  
  return true;
}

function loadGameState(): Pick<BingoGameState, 'mode' | 'gameState' | 'board' | 'checklist' | 'winningLine'> | null {
  // SSR guard
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    
    if (validateStoredData(parsed)) {
      return {
        mode: parsed.mode,
        gameState: parsed.gameState,
        board: parsed.board,
        checklist: parsed.checklist,
        winningLine: parsed.winningLine,
      };
    } else {
      console.warn('Invalid game state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load game state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

function saveGameState(
  mode: GameMode,
  gameState: GameState,
  board: BingoSquareData[],
  checklist: ChecklistItem[],
  winningLine: BingoLine | null,
): void {
  // SSR guard
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      mode,
      gameState,
      board,
      checklist,
      winningLine,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
}

export function useBingoGame(): BingoGameState & BingoGameActions {
  const loadedState = useMemo(() => loadGameState(), []);

  const [mode, setMode] = useState<GameMode>(
    () => loadedState?.mode || 'bingo'
  );
  const [gameState, setGameState] = useState<GameState>(
    () => loadedState?.gameState || 'start'
  );
  const [board, setBoard] = useState<BingoSquareData[]>(
    () => loadedState?.board || []
  );
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    () => loadedState?.checklist || []
  );
  const [winningLine, setWinningLine] = useState<BingoLine | null>(
    () => loadedState?.winningLine || null
  );
  const [showBingoModal, setShowBingoModal] = useState(false);

  const winningSquareIds = useMemo(
    () => getWinningSquareIds(winningLine),
    [winningLine]
  );

  const checklistCompletedCount = useMemo(
    () => checklist.filter((item) => item.isChecked).length,
    [checklist]
  );

  const checklistTotal = checklist.length;

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(mode, gameState, board, checklist, winningLine);
  }, [mode, gameState, board, checklist, winningLine]);

  const startGame = useCallback((selectedMode: GameMode) => {
    setMode(selectedMode);
    setWinningLine(null);
    setShowBingoModal(false);

    if (selectedMode === 'bingo') {
      setBoard(generateBoard());
      setChecklist([]);
    } else {
      const checklistItems = scavengerChecklist.map((text, index) => ({
        id: index,
        text,
        isChecked: false,
      }));
      setChecklist(checklistItems);
      setBoard([]);
    }

    setGameState('playing');
  }, []);

  const handleSquareClick = useCallback((squareId: number) => {
    if (mode !== 'bingo') {
      return;
    }

    setBoard((currentBoard) => {
      const newBoard = toggleSquare(currentBoard, squareId);
      
      // Check for bingo after toggling
      const bingo = checkBingo(newBoard);
      if (bingo && !winningLine) {
        // Schedule state updates to avoid synchronous setState in effect
        queueMicrotask(() => {
          setWinningLine(bingo);
          setGameState('bingo');
          setShowBingoModal(true);
        });
      }
      
      return newBoard;
    });
  }, [mode, winningLine]);

  const handleChecklistToggle = useCallback((itemId: number) => {
    if (mode !== 'scavenger') {
      return;
    }

    setChecklist((currentChecklist) => {
      const updatedChecklist = currentChecklist.map((item) =>
        item.id === itemId
          ? { ...item, isChecked: !item.isChecked }
          : item
      );

      const allComplete =
        updatedChecklist.length > 0 && updatedChecklist.every((item) => item.isChecked);

      queueMicrotask(() => {
        setGameState(allComplete ? 'complete' : 'playing');
      });

      return updatedChecklist;
    });
  }, [mode]);

  const resetGame = useCallback(() => {
    setMode('bingo');
    setGameState('start');
    setBoard([]);
    setChecklist([]);
    setWinningLine(null);
    setShowBingoModal(false);
  }, []);

  const dismissModal = useCallback(() => {
    setShowBingoModal(false);
  }, []);

  return {
    mode,
    gameState,
    board,
    checklist,
    checklistCompletedCount,
    checklistTotal,
    winningLine,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    handleChecklistToggle,
    resetGame,
    dismissModal,
  };
}
