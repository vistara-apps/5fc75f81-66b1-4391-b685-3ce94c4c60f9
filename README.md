# Checkpoint - Real-time Guard Tour Verification

A Base Mini App that transforms security guard patrol verification through GPS tracking, automated alerts, and instant client reporting with Farcaster social accountability.

## Features

- **GPS + Time-Stamped Checkpoint Logging**: Scan QR codes with blockchain verification
- **Instant Miss/Delay Notifications**: Real-time Farcaster alerts to supervisors
- **One-Tap Incident Logging**: Voice-to-text with photo capture
- **Auto-Generated Client Reports**: 24-hour compiled reports as Farcaster Frames
- **Social Accountability Dashboard**: Performance leaderboards and NFT rewards

## Tech Stack

- Next.js 15 with App Router
- React 19
- OnchainKit for Base integration
- Farcaster MiniKit SDK
- TypeScript
- Tailwind CSS (Cyberpunk theme)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.local.example` to `.env.local` and add your API keys

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Design System

The app uses a cyberpunk security theme with:
- Dark purple backgrounds (#1a0f2e)
- Neon green accents (#00ff41)
- Sharp angular borders (clip-path polygons)
- Glowing effects on interactive elements
- Grid overlay background

## Micro-Transaction Model

- $0.10 per checkpoint verification
- Subscription tiers: $29/month (1-5 guards), $99/month (6-20 guards)
- Base blockchain for low-fee transactions

## License

MIT
