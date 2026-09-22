const FEATURES = [
  {
    icon: "⚡",
    title: "Instant Execution",
    desc: "Borrow and repay within a single block using Hedera's high-speed consensus.",
  },
  {
    icon: "🛡️",
    title: "Zero Collateral",
    desc: "No upfront capital required — repayment is enforced atomically within the transaction.",
  },
  {
    icon: "📡",
    title: "Arbitrage Alerts",
    desc: "Real-time notifications when profitable price gaps appear across Hedera DEXs.",
  },
  {
    icon: "⏱️",
    title: "Sub-Second Finality",
    desc: "Hedera's 3–5 second finality ensures rapid, deterministic execution.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="text-center text-3xl font-black text-white md:text-4xl">
        Built for <span className="gradient-text">Speed & Trust</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
        Everything you need to run atomic arbitrage strategies on the Hedera network.
      </p>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="glow-card p-7">
            <div className="text-4xl">{f.icon}</div>
            <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
