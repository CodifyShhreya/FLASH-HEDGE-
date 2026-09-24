/**
 * lib/hashpack.ts
 * Browser-only HashPack (HashConnect) wallet integration.
 * Connect -> sign a free "flash loan intent" message -> simulated atomic execution.
 * The heavy contract calls happen via a backend executor in production;
 * this keeps the frontend keyless and safe.
 */

export interface WalletState {
  accountId: string;
  network: string;
  connected: boolean;
}

type EventCallback = (data: WalletState) => void;

let hc: any = null;
let state: WalletState = { accountId: "", network: "", connected: false };
const listeners: EventCallback[] = [];

export function onWalletChange(cb: EventCallback) {
  listeners.push(cb);
  cb(state);
}

function emit() {
  listeners.forEach((cb) => cb({ ...state }));
}

export async function connectHashPack(): Promise<WalletState> {
  if (typeof window === "undefined") throw new Error("Wallet only works in browser");
  if (!state.connected) {
    const { HashConnect, HashConnectTypes } = await import("hashconnect");
    const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK || "testnet";
    const appMetadata: HashConnectTypes.AppMetadata = {
      name: "FlashHedger",
      description: "Flash loans on Hedera",
      icon: "https://flash-hedera-swift.vercel.app/icon.svg",
    };
    hc = new HashConnect(
      network === "mainnet"
        ? HashConnectTypes.LedgerType.Mainnet
        : HashConnectTypes.LedgerType.Testnet,
      "flashhedger-v1",
      appMetadata,
      false
    );

    const initData = await hc.init();
    hc.connectToLocalWallet(initData.pairingString);

    const pairing = await new Promise<any>((resolve) => {
      hc.pairingEvent.once((p: any) => resolve(p));
    });

    const accountId = pairing.accountIds?.[0] ?? "";
    state = { accountId, network, connected: true };
    emit();
  }
  return { ...state };
}

export async function disconnectWallet() {
  try {
    if (hc) await hc.disconnect(state.accountId);
  } catch {
    /* ignore */
  }
  state = { accountId: "", network: "", connected: false };
  emit();
}

/** Sign an arbitrary message with HashPack to prove wallet control. */
export async function signMessage(message: string): Promise<string> {
  if (!hc || !state.connected) throw new Error("Wallet not connected");
  const { Transaction, TransferTransaction, Hbar } = await import("@hashgraph/sdk");
  // Message signing via a zero-value transaction memo is the safest cross-wallet method.
  const tx = new TransferTransaction()
    .setTransactionMemo(`FlashHedger: ${message}`.slice(0, 100))
    .addHbarTransfer(state.accountId, new Hbar(0));
  const bytes = await tx.freezeWithSigner ? Transaction.fromBytes((await tx.toBytes()) as Uint8Array) : tx;
  const signed = await hc.signTransaction(state.accountId, bytes as any);
  return Buffer.from(signed.toBytes()).toString("hex");
}
