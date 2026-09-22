export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24">
      {/* glow backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-mint/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="mb-6 inline-block rounded-full border border-mint/30 bg-mint/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-mint">
          Powered by Hedera Hashgraph
        </span>
        <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
          Instant, <span className="gradient-text">Uncollateralized</span> Loans
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Execute flash loans on Hedera with zero upfront capital. Borrow, trade,
          and repay in a single atomic transaction.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#app" className="btn-primary">⚡ Launch App</a>
          <a href="#how" className="btn-ghost">How It Works</a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["3–5s", "Finality"],
            ["0", "Collateral Needed"],
            ["$0.0001", "Avg. Tx Fee"],
            ["10k", "TPS Capacity"],
          ].map(([v, l]) => (
            <div key={l} className="glow-card px-4 py-6">
              <div className="text-2xl font-black text-gold">{v}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
