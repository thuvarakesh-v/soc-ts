import type { GameMode } from '../types';

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="cyber-grid relative flex min-h-full flex-col items-center justify-center overflow-hidden p-6">
      <div className="pointer-events-none absolute inset-0 opacity-75">
        <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-neon-pink/35 blur-3xl" />
        <div className="absolute -right-16 bottom-24 h-64 w-64 rounded-full bg-neon-cyan/28 blur-3xl" />
      </div>

      <div className="scanline-overlay relative z-10 w-full max-w-md animate-[panelReveal_0.45s_ease-out] rounded-2xl p-6 text-center md:p-8 cyber-panel">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.38em] text-neon-cyan/85">
          Event Linkup Protocol
        </p>
        <h1 className="cyber-title mb-2 text-5xl font-extrabold text-white md:text-6xl">SOC OPS</h1>
        <p className="mb-8 text-lg font-medium uppercase tracking-[0.2em] text-neon-pink">Choose Your Mission Mode</p>

        <div className="mb-4 rounded-xl border border-neon-cyan/40 bg-surface-raised/85 p-5 text-left shadow-[0_0_26px_rgb(47_243_255_/_14%)]">
          <h2 className="mb-2 text-base font-bold uppercase tracking-[0.16em] text-neon-cyan">Neon Social Bingo</h2>
          <p className="mb-4 text-sm text-slate-200">
            Classic 5x5 board. Find matching people and trigger a full row, column, or diagonal.
          </p>
          <button
            onClick={() => onStart('bingo')}
            className="neon-btn w-full rounded-xl px-8 py-3 text-base font-bold"
          >
            Start Bingo Run
          </button>
        </div>

        <div className="tropical-start-card mb-2 rounded-xl p-5 text-left">
          <h2 className="mb-2 text-base font-bold uppercase tracking-[0.16em] text-tropical-100">Scavenger Hunt Checklist</h2>
          <p className="mb-4 text-sm text-tropical-100/90">
            Complete every mission in any order and finish the full checklist to win.
          </p>
          <button
            onClick={() => onStart('scavenger')}
            className="tropical-btn w-full rounded-xl px-8 py-3 text-base font-bold"
          >
            Start Tropical Hunt
          </button>
        </div>
      </div>
    </div>
  );
}
