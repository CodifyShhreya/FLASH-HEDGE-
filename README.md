# ⚡ FlashHedger — Flash Loans on Hedera

Instant, uncollateralized flash loans on the Hedera network. Borrow, trade, and
repay in a single atomic transaction — powered by Hashgraph consensus.

## Tech Stack

| Layer     | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling   | Tailwind CSS 3 |
| Blockchain| @hashgraph/sdk (Hedera) + hashconnect (HashPack wallet) |
| Hosting   | Vercel |

## Project Structure

```
flash-hedera-swift/
├── app/
│   ├── layout.tsx        # Root layout, metadata, fonts
│   ├── page.tsx          # Landing page composing all sections
│   └── globals.css       # Tailwind directives + custom utilities
├── components/
│   ├── Navbar.tsx        # Sticky nav with scroll blur
│   ├── Hero.tsx          # Headline + stats
│   ├── Features.tsx      # 4 feature cards
│   ├── HowItWorks.tsx    # 4-step flash loan flow
│   ├── FlashLoanWidget.tsx # Wallet connect + loan console (interactive)
│   ├── CtaBanner.tsx     # Bottom call-to-action
│   └── Footer.tsx        # Footer
├── lib/
│   ├── hedera.ts         # Mirror Node API + flash loan simulator
│   └── hashpack.ts       # HashPack wallet connection (browser only)
├── public/
│   └── icon.svg          # App icon (lightning bolt)
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── .env.example
```

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

## Deploy to Vercel (3 ways)

**1. One-click (no CLI):**
1. Push this folder to a GitHub/GitLab repo
2. Go to [vercel.com/new](https://vercel.com/new) → Import repo
3. Framework auto-detected: **Next.js** → Deploy

**2. Vercel CLI:**
```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

**3. To get your exact domain (flash-hedera-swift.vercel.app):**
- In Vercel → Settings → Domains, the subdomain is auto-assigned from your
  project name; name the project `flash-hedera-swift`.

## Environment Variables

Set in Vercel → Settings → Environment Variables:

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_HEDERA_NETWORK` | `testnet` | `testnet` or `mainnet` |
| `NEXT_PUBLIC_MIRROR_NODE_URL` | testnet mirror | Hedera Mirror Node REST base |
| `NEXT_PUBLIC_DEMO_MODE` | `true` | Simulated execution without wallet |

## Notes

- **Demo mode**: without a connected wallet the console runs a fully simulated
  flash loan so the site is fully demoable. With HashPack connected it signs an
  intent message; wire the live atomic flash-loan contract call to your backend
  executor in `components/FlashLoanWidget.tsx` → `handleExecute`.
- The Hedera SDK (`@hashgraph/sdk`) loads client-side only (dynamic import) to
  keep the server bundle small.
