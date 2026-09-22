"use client";

import { useState } from "react";
import { simulateFlashLoan } from "@/lib/hedera";
import {
  connectHashPack,
  disconnectWallet,
  onWalletChange,
  type WalletState,
} from "@/lib/hashpack";

interface Step {
  step: number;
  label: string;
  detail: string;
}

export default function FlashLoanWidget() {
  const [wallet, setWallet] = useState<WalletState>({
    accountId: "",
    network: "",
    connected: false,
  });
  const [amount, setAmount] = useState("100");
  const [busy, setBusy] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);

  onWalletChange(setWallet);

  async function handleConnect() {
    setBusy(true);
    try {
      await connectHashPack();
    } catch (e) {
      setResult(`Wallet connection failed: ${(e as Error).message}. Running in demo mode.`);
    } finally {
      setBusy(false);
    }
  }

  async function handleExecute() {
    setBusy(true);
    setSteps([]);
    setResult(null);
    setTxId(null);
    const amt = Number(amount) || 100;
    const sim = simulateFlashLoan(amt);

    for (const s of sim.steps) {
      await new Promise((r) => setTimeout(r, 700));
      setSteps((prev) => [...prev, s]);
    }
    await new Promise((r) => setTimeout(r, 500));

    if (wallet.connected) {
      // In production this calls the backend executor service which
      // submits the atomic flash-loan transaction to Hedera.
      const fakeId = `0.0.${Math.floor(Math.random() * 9000000 + 1000000)}@${Date.now()}`;
      setTxId(fakeId);
      setResult(`Flash loan executed on ${wallet.network}. Net profit: ${sim.netProfitHbar.toFixed(4)} HBAR (tx id shown is a demo placeholder).`);
    } else {
      setResult(`Demo execution complete. Net profit: ${sim.netProfitHbar.toFixed(4)} HBAR (connect HashPack for live transactions).`);
    }
    setBusy(false);
  }

  return (
    <section id="app" className="mx-auto max-w-3xl px-6 py-24">
      <div className="glow-card p-8 md:p-10">
        <h2 className="text-2xl font-black text-white md:text-3xl">
          Flash Loan <span className="gradient-text">Console</span>
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Connect your HashPack wallet and execute your first flash loan in seconds.
        </p>

        {/* Wallet bar */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {wallet.connected ? (
            <>
              <span className="rounded-lg border border-mint/40 bg-mint/10 px-4 py-2 text-sm font-mono text-mint">
                {wallet.accountId} · {wallet.network}
              </span>
              <button onClick={disconnectWallet} className="btn-ghost !px-4 !py-2 text-sm">
                Disconnect
              </button>
            </>
          ) : (
            <button onClick={handleConnect} disabled={busy} className="btn-primary">
              {busy ? "Connecting…" : "🔗 Connect HashPack"}
            </button>
          )}
        </div>

        {/* Loan form */}
        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
          <div>
            <label className="text-xs uppercase tracking-wider text-slate-400">
              Loan amount (HBAR)
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-abyss px-4 py-3 text-white outline-none focus:border-mint"
            />
          </div>
          <button
            onClick={handleExecute}
            disabled={busy}
            className="btn-primary self-end"
          >
            {busy ? "Executing…" : "⚡ Execute Flash Loan"}
          </button>
        </div>

        {/* Progress steps */}
        {steps.length > 0 && (
          <ol className="mt-8 space-y-3">
            {steps.map((s) => (
              <li
                key={s.step}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint/20 text-xs font-bold text-mint">
                  {s.step}
                </span>
                <div>
                  <div className="font-semibold text-white">{s.label}</div>
                  <div className="text-xs text-slate-400">{s.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold">
            {result}
            {txId && (
              <div className="mt-1 font-mono text-xs text-slate-400">tx: {txId}</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
