import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div className="scanline-overlay relative w-full max-w-md overflow-hidden rounded-2xl border border-neon-cyan/50 bg-surface-raised/85 p-2 shadow-[0_0_28px_rgb(47_243_255_/_22%)]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-neon-pink/25" />
      <div className="grid aspect-square grid-cols-5 gap-1.5">
        {board.map((square) => (
          <BingoSquare
            key={square.id}
            square={square}
            isWinning={winningSquareIds.has(square.id)}
            onClick={() => onSquareClick(square.id)}
          />
        ))}
      </div>
    </div>
  );
}
