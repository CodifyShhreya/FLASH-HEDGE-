/**
 * lib/hedera.ts
 * Server-safe Hedera helpers: Mirror Node queries + transaction status checks.
 * Nothing here needs a private key - read-only public data only.
 */

export const NETWORK = process.env.NEXT_PUBLIC_HEDERA_NETWORK || "testnet";

export const MIRROR_BASE =
  process.env.NEXT_PUBLIC_MIRROR_NODE_URL ||
  (NETWORK === "mainnet"
    ? "https://mainnet-public.mirrornode.hedera.com"
    : "https://testnet.mirrornode.hedera.com");

export interface AccountInfo {
  accountId: string;
  balanceHbar: number;
  keyType: string;
}

/** Fetch an account's HBAR balance via the Hedera Mirror Node REST API. */
export async function getAccountInfo(accountId: string): Promise<AccountInfo> {
  const res = await fetch(`${MIRROR_BASE}/api/v1/accounts/${accountId}`, {
    next: { revalidate: 15 },
  });
  if (!res.ok) throw new Error(`Mirror node error: ${res.status}`);
  const json = await res.json();
  return {
    accountId: json.account,
    balanceHbar: Number(json.balance?.balance ?? 0) / 1e8, // tinybar -> hbar
    keyType: json.key?._type ?? "unknown",
  };
}

export interface TransactionRecord {
  transactionId: string;
  status: string;
  consensusTimestamp: string;
  feeHbar: number;
  transfers: { account: string; amountHbar: number }[];
}

/** Fetch a transaction's record (status, fee, transfers) from the mirror node. */
export async function getTransactionRecord(
  transactionId: string
): Promise<TransactionRecord> {
  const tid = transactionId.replace("@", "-");
  const res = await fetch(`${MIRROR_BASE}/api/v1/transactions/${tid}`, {
    next: { revalidate: 5 },
  });
  if (!res.ok) throw new Error(`Transaction not found: ${res.status}`);
  const json = await res.json();
  const tx = json.transactions?.[0];
  if (!tx) throw new Error("Empty transaction response");
  return {
    transactionId: tx.transaction_id,
    status: tx.result,
    consensusTimestamp: tx.consensus_timestamp,
    feeHbar: Number(tx.charged_tx_fee ?? 0) / 1e8,
    transfers: (tx.transfers ?? []).map((t: { account: string; amount: number }) => ({
      account: t.account,
      amountHbar: t.amount / 1e8,
    })),
  };
}

/** Simulate a flash loan locally (demo mode when no wallet connected). */
export function simulateFlashLoan(amountHbar: number, feeBps = 9) {
  const fee = (amountHbar * feeBps) / 10_000;
  const mockProfit = Math.max(0, amountHbar * 0.004 + Math.random() * amountHbar * 0.01);
  return {
    amountHbar,
    feeHbar: fee,
    netProfitHbar: mockProfit - fee,
    feeBps,
    steps: [
      { step: 1, label: "Borrow", detail: `${amountHbar} HBAR lent atomically` },
      { step: 2, label: "Arbitrage", detail: "Swapped across DEX pairs on Hedera" },
      { step: 3, label: "Repay", detail: `${amountHbar} HBAR + ${fee.toFixed(4)} HBAR fee returned` },
      { step: 4, label: "Profit", detail: `${Math.max(0, mockProfit - fee).toFixed(4)} HBAR kept` },
    ],
    durationMs: Math.floor(3000 + Math.random() * 2000),
  };
}
