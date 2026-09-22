export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row">
        <span>
          ⚡ Flash<span className="text-mint">Hedger</span> — Flash loans on Hedera
        </span>
        <span>Built on Hedera Hashgraph • {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
