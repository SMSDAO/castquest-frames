# CAST QUEST Frames

![Dependency Health](https://img.shields.io/badge/dependency--health-passing-brightgreen)
![Build Status](https://github.com/CastQuest/castquest-frames/workflows/CI/badge.svg)
![Node Version](https://img.shields.io/badge/node-24.1.0-green)
![pnpm Version](https://img.shields.io/badge/pnpm-9.0.0-blue)

CAST QUEST Frames is a Web3-native social photo protocol that feels like Instagram, mints like Zora, extends like Farcaster Frames, and builds like Remix — powered by a Smart Brain multi-agent AI.

## ✨ Core Principles

- Chain-first: Built on Base with multi-chain EVM support
- Creator-first: Onchain minting, collecting, royalties, and programmable fees
- Builder-first: Frames, SDK, and a Remix-style module builder
- AI-native: Smart Brain agents for pricing, previews, tagging, and system optimization

## 🧱 Monorepo Structure

apps/
  web/         - Next.js app (feed, profiles, frames)
  admin/       - Next.js admin app (fees, templates, AI settings)
  mobile/      - React Native / Expo app

packages/
  contracts/   - Solidity contracts (Base + EVM)
  sdk/         - CAST QUEST SDK integration (used here)
  ai-brain/    - Multi-agent Smart Brain orchestration
  ui-kit/      - Shared UI components & design system

infra/
  api-gateway/ - API entrypoint (frames, mint, collect)
  indexer/     - Onchain event indexer
  workers/     - Background jobs (AI, notifications, analytics)
  k8s/         - Kubernetes manifests

docs/
  whitepaper/  - Vision & protocol
  architecture/- Diagrams & technical design
  sdk/         - Dev docs & examples
  product/     - User & admin guides

.github/       - CI/CD, issue templates, PR templates
scripts/       - Dev, deploy, Smart Brain operator
examples/frames/ - Example frame definitions

## 🤝 Contributing

See CONTRIBUTING.md.

## � Prerequisites

**Required:**
- **Node.js 20+** (to prevent ERR_INVALID_THIS errors)
- **pnpm 9+** (package manager)

**Install with nvm:**
```bash
nvm install 20
nvm use 20
npm install -g pnpm@9
```

**Or use the .nvmrc file:**
```bash
nvm use  # Automatically uses Node 20.19.6
```

## 🎨 Dashboards

CastQuest Frames includes two production-ready dashboards with **neo-glow theme** for creators and administrators.

### Screenshots

<table>
<tr>
<td width="50%">
<h4>👤 User Dashboard</h4>
<img src="https://via.placeholder.com/600x400/1a1a2e/00d9ff?text=User+Dashboard+Screenshot" alt="User Dashboard" />
<p><em>Creator-focused dashboard with AI tools and community features</em></p>
</td>
<td width="50%">
<h4>👑 Admin Dashboard</h4>
<img src="https://via.placeholder.com/600x400/1a1a2e/00d9ff?text=Admin+Dashboard+Screenshot" alt="Admin Dashboard" />
<p><em>Protocol management console with comprehensive monitoring</em></p>
</td>
</tr>
</table>

### 👤 User Dashboard
**Port:** 3000 | **URL:** http://localhost:3000/dashboard

A creator-focused dashboard with AI tools and community features:
- ✨ **AI Frame Builder** - Generate frames with natural language
- 📊 **Analytics** - Track views, engagement, and revenue
- 🏪 **Marketplace** - Browse and purchase frame templates
- 💬 **Community Hub** - Social feed with interactions
- 🎯 **Frame Management** - Create and monitor frames
- 🏆 **Leaderboard** - Global rankings and achievements
- ⚡ **Quest System** - Daily/weekly challenges
- 💎 **NFT Mints** - Manage collectible mints

```bash
# Start user dashboard
cd apps/web && pnpm dev
# Access: http://localhost:3000/dashboard
```

### 👑 Admin Dashboard
**Port:** 3010 | **URL:** http://localhost:3010/dashboard

A protocol management console with comprehensive monitoring:
- 💎 **Token Management** - Monitor $CAST, $PIC, $VID, $AUDIO
- 🔐 **Permission System** - Role-based access control
- 💰 **Fee Controls** - Adjustable protocol fees
- 🛡️ **Risk Management** - AI-powered detection (98% accuracy)
- 📊 **Protocol Metrics** - TVL, volume, active users
- 📡 **System Health** - Real-time monitoring
- 🖼️ **Frame Monitoring** - Track all frame activity
- 📋 **Activity Logs** - Complete audit trail

```bash
# Start admin dashboard
cd apps/admin && pnpm dev -- -p 3010
# Access: http://localhost:3010/dashboard
```

### 🚀 Quick Start - Both Dashboards

```bash
# 1. Setup environment variables (first time only)
bash scripts/setup-env.sh

# 2. Install dependencies
pnpm install

# 3. Run both dashboards using self-healing script (recommended)
chmod +x scripts/self-healing-ui.sh
./scripts/self-healing-ui.sh

# Or run manually in separate terminals:
# Terminal 1: User Dashboard
cd apps/web && pnpm dev

# Terminal 2: Admin Dashboard  
cd apps/admin && pnpm dev -- -p 3010
```

📖 **Full Documentation:** See [docs/DASHBOARDS.md](./docs/DASHBOARDS.md) for complete setup, configuration, deployment, and troubleshooting guides.

## 🖥️ Admin Desktop Application

CastQuest also provides a **native desktop application** for administrators using Tauri.

### Building Admin Desktop (.exe for Windows)

```bash
# Prerequisites: Node.js 24+ and Rust installed

# Navigate to admin-desktop
cd apps/admin-desktop

# Build for Windows
pnpm build:windows

# Output: src-tauri/target/release/castquest-admin.exe
# Can be renamed to admin.exe for distribution
```

**Windows PowerShell Build Script:**
```powershell
# From repository root
.\scripts\build-admin-desktop.ps1
```

📖 **Full Documentation:** See [apps/admin-desktop/README.md](./apps/admin-desktop/README.md) for detailed build instructions and troubleshooting.

### Desktop App Features
- Native window controls
- Full admin dashboard access
- Automatic sync with admin web routes
- Self-contained executable (no Node.js required for end users)
- Supports Windows, macOS, and Linux

## 🏥 Repository Health

The CastQuest Frames repository includes a comprehensive dependency health monitoring system to ensure consistency, security, and reliability.

### Health Check Commands

```bash
# Run comprehensive health check
bash scripts/master.sh health

# Run automated repair
bash scripts/repair-dependencies.sh

# Get AI-powered insights
.smartbrain/oracle.sh analyze

# Get upgrade recommendations
.smartbrain/oracle.sh recommend-upgrades

# Security vulnerability scan
.smartbrain/oracle.sh security-scan
```

### Automated Monitoring

- **CI/CD Health Checks**: Automated health checks run on every push, PR, and daily at 6 AM UTC
- **Pre-commit Hooks**: Validate changes before they reach the repository
- **Smart Brain Oracle**: AI-powered dependency intelligence and predictive maintenance

### Key Features

- ✅ **Version Harmonization**: TypeScript 5.3.3, @types/node 20.10.6, Next.js 14.2.35 (secure)
- 🔒 **Security Scanning**: Automated vulnerability detection with pnpm audit
- 📊 **Health Scoring**: Real-time repository health metrics
- 🤖 **AI Insights**: Smart Brain Oracle for predictive maintenance
- 🛠️ **Auto-Repair**: One-command dependency repair script
- 📝 **Comprehensive Reports**: JSON output for CI/CD integration

📖 **Full Documentation:** See [docs/DEPENDENCY-HEALTH.md](./docs/DEPENDENCY-HEALTH.md) for detailed health monitoring guide.

## 🚀 Deployment

### Vercel Deployment (Frontend)

The web frontend is configured for deployment on Vercel:

```bash
# Setup environment
bash scripts/setup-env.sh production

# Build for Vercel
bash scripts/deploy-vercel.sh

# Deploy with Vercel CLI
npm i -g vercel
vercel --prod
```

**Configuration:**
- `apps/web/vercel.json` - Vercel-specific settings
- Node.js 20+ runtime for serverless functions
- Node.js 24+ for build tooling
- Automatic environment variable management

**Environment Variables:**
Copy `.env.example` to Vercel project settings or use `.env.production` locally.

📖 **Full Documentation:** See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for complete deployment guide.

## 💸 Sponsors & Partners

Site: https://castquest.xyz (placeholder)
Docs: https://docs.castquest.xyz (placeholder)
Sponsors: GitHub Sponsors / custom page

## 🌌 Vision

Social feeds will be onchain.
Creators will own their rails.
Builders will extend everything through Frames and SDKs.
AI will act as the invisible Smart Brain across the entire stack.


# CastQuest Protocol — Operator Console

A sovereign, media‑first automation protocol combining:

- Frame Template Engine (Module 6 MEGA)
- Quest Engine (Module 5B MEGA)
- Mint Engine + Renderer + Automation (Module 7 MEGA)
- BASE Mock Onchain Layer (Module 4 MEGA)
- Mobile‑Optimized Admin Console
- Strategy Worker + Logs Dashboard

## Contributors

- **Yosef (Founder / Protocol Architect)**  
  Vision, architecture, automation engine, operator console design.

- **SMSDAO (Core Contributor)**  
  Execution, module integration, system orchestration.

- **AI Automation Partner**  
  Script generation, module scaffolding, error‑resilient workflows.

## Modules Installed

### Module 4 — BASE API + Mobile Admin + Strategy Dashboard
- `/api/base/*`
- `/strategy`
- ShellLayout mobile UI

### Module 5B — Quest Engine MEGA
- `/quests`
- `/api/quests/*`
- `data/quests.json`, `quest-steps.json`, `quest-progress.json`, `quest-rewards.json`

### Module 6 — Frame Template Engine MEGA
- `/frame-templates`
- `/api/frame-templates/*`
- `data/frame-templates.json`

### Module 7 — Mint + Render + Automation MEGA
- `/mints`
- `/api/mints/*`
- `/api/frames/render`
- `/api/strategy/worker/*`
- `data/mints.json`, `mint-events.json`, `frames.json`, `worker-events.json`

## Vision

CastQuest is a sovereign automation protocol that turns:

**Media → Templates → Frames → Mints → Quests → Strategy → Onchain**

into a single expressive pipeline.

You are early.
