export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
      <div className="glow-card px-8 py-14">
        <h2 className="text-3xl font-black text-white md:text-4xl">
          Ready to <span className="gradient-text">Start</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-slate-400">
          Connect your HashPack wallet and execute your first flash loan in seconds.
        </p>
        <a href="#app" className="btn-primary mt-8">⚡ Launch Flash Loan Console</a>
      </div>
    </section>
  );
}
