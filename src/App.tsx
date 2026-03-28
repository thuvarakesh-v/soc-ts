import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';

function App() {
  const {
    mode,
    gameState,
    board,
    checklist,
    checklistCompletedCount,
    checklistTotal,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    handleChecklistToggle,
    resetGame,
    dismissModal,
  } = useBingoGame();

  if (gameState === 'start') {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <div className={`min-h-full ${mode === 'scavenger' ? 'tropical-shell' : 'cyber-grid'}`}>
      <GameScreen
        mode={mode}
        board={board}
        checklist={checklist}
        checklistCompletedCount={checklistCompletedCount}
        checklistTotal={checklistTotal}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        isChecklistComplete={mode === 'scavenger' && gameState === 'complete'}
        onSquareClick={handleSquareClick}
        onChecklistToggle={handleChecklistToggle}
        onReset={resetGame}
      />
      {mode === 'bingo' && showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
    </div>
  );
}

export default App;
