import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="cyber-grid flex min-h-full flex-col">
      <header className="mx-3 mt-3 flex items-center justify-between rounded-xl border border-neon-cyan/45 bg-surface-raised/85 px-3 py-2 shadow-[0_0_20px_rgb(47_243_255_/_16%)] backdrop-blur">
        <button
          onClick={onReset}
          className="rounded-md border border-neon-cyan/55 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-neon-cyan transition hover:border-neon-pink hover:text-neon-pink active:scale-[0.98]"
        >
          Back
        </button>
        <h1 className="cyber-title text-sm font-bold text-white md:text-base">Soc Ops // Live Board</h1>
        <div className="w-[72px] text-right text-xs font-semibold uppercase tracking-[0.2em] text-neon-lime/90">Sync</div>
      </header>

      <p className="mx-3 mt-3 rounded-lg border border-neon-pink/40 bg-surface-raised/75 px-4 py-2 text-center text-sm text-slate-200 shadow-[0_0_18px_rgb(255_45_207_/_18%)]">
        Mark each square as you meet someone who matches the prompt.
      </p>

      {hasBingo && (
        <div className="mx-3 mt-3 animate-[neonPulse_1.2s_ease-in-out_infinite] rounded-lg border border-neon-lime/70 bg-neon-lime/12 py-2 text-center text-sm font-semibold uppercase tracking-[0.16em] text-neon-lime">
          Bingo signal confirmed // line complete
        </div>
      )}

      <div className="flex flex-1 items-center justify-center p-3">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
