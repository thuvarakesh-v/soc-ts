import type { BingoSquareData, ChecklistItem, GameMode } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  mode: GameMode;
  board: BingoSquareData[];
  checklist: ChecklistItem[];
  checklistCompletedCount: number;
  checklistTotal: number;
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  isChecklistComplete: boolean;
  onSquareClick: (squareId: number) => void;
  onChecklistToggle: (itemId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  mode,
  board,
  checklist,
  checklistCompletedCount,
  checklistTotal,
  winningSquareIds,
  hasBingo,
  isChecklistComplete,
  onSquareClick,
  onChecklistToggle,
  onReset,
}: GameScreenProps) {
  return (
    <div className={`${mode === 'scavenger' ? 'tropical-shell' : 'cyber-grid'} flex min-h-full flex-col`}>
      <header className={`mx-3 mt-3 flex items-center justify-between rounded-xl px-3 py-2 backdrop-blur ${mode === 'scavenger' ? 'border border-tropical-300/40 bg-tropical-900/72 shadow-[0_0_24px_rgb(46_165_109_/_20%)]' : 'border border-neon-cyan/45 bg-surface-raised/85 shadow-[0_0_20px_rgb(47_243_255_/_16%)]'}`}>
        <button
          onClick={onReset}
          className={`rounded-md border px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.12em] transition active:scale-[0.98] ${mode === 'scavenger' ? 'border-tropical-300/70 text-tropical-100 hover:border-palm-gold hover:text-palm-gold' : 'border-neon-cyan/55 text-neon-cyan hover:border-neon-pink hover:text-neon-pink'}`}
        >
          Back
        </button>
        <h1 className={`text-sm font-bold md:text-base ${mode === 'scavenger' ? 'font-body uppercase tracking-[0.2em] text-tropical-100' : 'cyber-title text-white'}`}>
          {mode === 'scavenger' ? 'Soc Ops // Island Hunt' : 'Soc Ops // Live Board'}
        </h1>
        <div className={`w-[86px] text-right text-xs font-semibold uppercase tracking-[0.2em] ${mode === 'scavenger' ? 'text-palm-gold/95' : 'text-neon-lime/90'}`}>
          {mode === 'scavenger' ? `${checklistCompletedCount}/${checklistTotal}` : 'Sync'}
        </div>
      </header>

      {mode === 'bingo' ? (
        <p className="mx-3 mt-3 rounded-lg border border-neon-pink/40 bg-surface-raised/75 px-4 py-2 text-center text-sm text-slate-200 shadow-[0_0_18px_rgb(255_45_207_/_18%)]">
          Mark each square as you meet someone who matches the prompt.
        </p>
      ) : (
        <p className="mx-3 mt-3 rounded-lg border border-tropical-300/45 bg-tropical-900/68 px-4 py-2 text-center text-sm text-tropical-100 shadow-[0_0_18px_rgb(46_165_109_/_18%)]">
          Complete every mission in the checklist. Tropical route, full clear.
        </p>
      )}

      {hasBingo && (
        <div className="mx-3 mt-3 animate-[neonPulse_1.2s_ease-in-out_infinite] rounded-lg border border-neon-lime/70 bg-neon-lime/12 py-2 text-center text-sm font-semibold uppercase tracking-[0.16em] text-neon-lime">
          Bingo signal confirmed // line complete
        </div>
      )}

      {mode === 'scavenger' && isChecklistComplete && (
        <div className="mx-3 mt-3 animate-[tropicalPulse_1.3s_ease-in-out_infinite] rounded-lg border border-palm-gold/70 bg-palm-gold/14 py-2 text-center text-sm font-semibold uppercase tracking-[0.16em] text-palm-gold">
          Checklist completed // island hunt cleared
        </div>
      )}

      {mode === 'bingo' ? (
        <div className="flex flex-1 items-center justify-center p-3">
          <BingoBoard
            board={board}
            winningSquareIds={winningSquareIds}
            onSquareClick={onSquareClick}
          />
        </div>
      ) : (
        <div className="mx-3 my-3 flex flex-1 flex-col gap-2 overflow-y-auto rounded-2xl border border-tropical-300/35 bg-tropical-900/58 p-3">
          <div className="tropical-progress mb-1 rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-tropical-100">
            Progress {checklistCompletedCount} of {checklistTotal}
          </div>

          {checklist.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onChecklistToggle(item.id)}
              className={`tropical-checklist-item relative flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition duration-200 ${item.isChecked ? 'border-tropical-300/60 bg-tropical-700/72 text-tropical-100' : 'border-tropical-300/30 bg-tropical-100/95 text-tropical-900 hover:bg-tropical-100'}`}
              style={{ animationDelay: `${index * 35}ms` }}
              aria-pressed={item.isChecked}
            >
              <span className={`tropical-check flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${item.isChecked ? 'border-palm-gold bg-palm-gold/22 text-palm-gold' : 'border-tropical-700/45 bg-tropical-100 text-tropical-700'}`}>
                {item.isChecked ? '✓' : ''}
              </span>
              <span className="text-sm font-medium leading-relaxed">{item.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
