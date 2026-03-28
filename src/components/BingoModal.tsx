interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      <div className="scanline-overlay cyber-panel relative w-full max-w-xs animate-[modalDrop_0.45s_ease-out] overflow-hidden rounded-2xl p-6 text-center">
        <div className="pointer-events-none absolute -left-16 -top-14 h-36 w-36 rounded-full bg-neon-cyan/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-14 h-40 w-40 rounded-full bg-neon-pink/32 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-4 text-5xl">⚡</div>
          <h2 className="cyber-title mb-2 text-3xl font-extrabold text-neon-lime">BINGO</h2>
          <p className="mb-6 text-sm uppercase tracking-[0.14em] text-slate-200">Signal complete // winning line secured</p>
        </div>

        <button
          onClick={onDismiss}
          className="neon-btn relative z-10 w-full rounded-lg px-6 py-3 text-base font-bold"
        >
          Keep Running
        </button>
      </div>
    </div>
  );
}
