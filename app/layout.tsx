import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlashHedger - Flash Loans on Hedera",
  description:
    "Execute flash loans on Hedera with zero upfront capital. Borrow, trade, and repay in a single atomic transaction.",
  keywords: ["Hedera", "flash loan", "DeFi", "arbitrage", "HashPack", "HBAR"],
  openGraph: {
    title: "FlashHedger - Flash Loans on Hedera",
    description:
      "Instant, uncollateralized loans on Hedera. Borrow, trade, and repay in a single transaction.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
