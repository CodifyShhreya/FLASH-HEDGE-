const STEPS = [
  { n: "1", title: "Borrow", desc: "Request a flash loan amount from the liquidity pool." },
  { n: "2", title: "Trade", desc: "Execute your arbitrage strategy across Hedera DEXs." },
  { n: "3", title: "Repay", desc: "Return the loan plus the protocol fee — enforced by the contract." },
  { n: "4", title: "Profit", desc: "Keep the difference. If repayment fails, the whole tx reverts." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="border-y border-white/5 bg-night/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-black text-white md:text-4xl">
          How Flash Loans <span className="gradient-text">Work</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
          Execute complex strategies in a single atomic transaction.
        </p>
        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {/* connector line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-mint/40 to-transparent md:block" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-mint/40 bg-abyss text-2xl font-black text-mint shadow-[0_0_25px_rgba(0,184,169,0.25)]">
                {s.n}
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
