import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'scanline-overlay group relative flex min-h-[60px] select-none items-center justify-center overflow-hidden rounded-md border p-1 text-center text-xs leading-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'animate-[winnerPulse_1s_ease-in-out_infinite] border-neon-lime bg-neon-pink/30 text-neon-lime shadow-[0_0_20px_rgb(212_255_64_/_36%)]'
      : 'border-marked-border bg-marked text-neon-cyan shadow-[0_0_18px_rgb(47_243_255_/_24%)]'
    : 'border-grid bg-surface text-slate-100 hover:border-neon-cyan hover:bg-surface-raised hover:shadow-[0_0_14px_rgb(47_243_255_/_18%)] active:scale-[0.98]';

  const freeSpaceClasses = square.isFreeSpace
    ? 'border-neon-pink bg-neon-pink/16 font-bold text-neon-pink shadow-[0_0_16px_rgb(255_45_207_/_35%)]'
    : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="break-words hyphens-auto font-medium">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute right-0.5 top-0.5 text-[11px] font-bold text-neon-lime">✓</span>
      )}
    </button>
  );
}
