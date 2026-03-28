interface StartScreenProps {
  onStart: () => void;
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
        <p className="mb-8 text-lg font-medium uppercase tracking-[0.2em] text-neon-pink">Neon Social Bingo</p>

        <div className="mb-8 rounded-xl border border-neon-pink/40 bg-surface-raised/85 p-5 text-left shadow-[0_0_26px_rgb(255_45_207_/_16%)]">
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.16em] text-neon-cyan">How to play</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-200">
            <li>• Find people who match each mission prompt.</li>
            <li>• Tap a square to lock in each confirmed match.</li>
            <li>• Trigger 5 in a row to fire the BINGO alarm.</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="neon-btn w-full rounded-xl px-8 py-4 text-lg font-bold"
        >
          Start Run
        </button>
      </div>
    </div>
  );
}
