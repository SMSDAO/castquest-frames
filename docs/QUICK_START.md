# 🚀 CastQuest Quick Start Guide

> Get CastQuest running in 5 minutes

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js 20+** ([Download](https://nodejs.org/))
- **pnpm 9+** ([Installation](https://pnpm.io/installation))
- **Git** ([Download](https://git-scm.com/))
- **PostgreSQL 15+** (Optional, for full features)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SMSDAO/castquest-frames.git
cd castquest-frames
```

### 2. Use Correct Node Version

```bash
# If you have nvm installed
nvm use

# Otherwise, ensure you're on Node 20+
node --version  # Should show v20.x.x
```

### 3. Install Dependencies

```bash
# Install pnpm globally if you haven't
npm install -g pnpm@9

# Install project dependencies
pnpm install
```

---

## Quick Start Options

Choose your path based on what you want to do:

### Option A: Try the User Dashboard 👤

**For creators and frame builders**

```bash
# Start the user dashboard
cd apps/web
pnpm dev

# Open in browser
open http://localhost:3000/dashboard
```

**Features:**
- ✨ AI Frame Builder
- 📊 Analytics Dashboard
- 🏪 Marketplace
- 💬 Community Hub
- 🎯 Frame Management

### Option B: Try the Admin Dashboard 👑

**For protocol administrators**

```bash
# Start the admin dashboard
cd apps/admin
pnpm dev -- -p 3010

# Open in browser
open http://localhost:3010/dashboard
```

**Features:**
- 💎 CAST Token Management
- 🔐 Permission System
- 🛡️ Risk Management
- 📊 Protocol Metrics
- 📡 System Health Monitoring

### Option C: Run Both Dashboards 🎭

**For full system experience**

```bash
# From project root
./scripts/self-healing-ui.sh
```

This starts:
- User Dashboard on port 3000
- Admin Dashboard on port 3010
- Auto-healing and health checks

### Option D: Try Farcaster Frames 🖼️

**For frame developers**

```bash
# Start frames server
cd packages/frames
pnpm dev

# Open demo page
open http://localhost:3002
```

**Available Frames:**
- Tiny Market Signal
- Token Detail
- CAST Protocol Overview

---

## Your First Actions

### Create Your First Frame

1. **Start User Dashboard**
   ```bash
   cd apps/web && pnpm dev
   ```

2. **Open AI Builder**
   - Navigate to http://localhost:3000/dashboard
   - Click "AI Frame Builder"
   - Enter a prompt: "Create a mint frame for my photo collection"
   - Click "Generate"

3. **Preview & Publish**
   - Review the generated frame
   - Customize as needed
   - Click "Publish"

### Explore the Protocol

1. **Check System Health**
   ```bash
   ./scripts/master.sh health
   ```

2. **View Protocol Stats**
   - Open Admin Dashboard: http://localhost:3010/dashboard
   - See real-time metrics
   - Explore system components

3. **Run Smart Brain Analysis**
   ```bash
   ./scripts/master.sh brain
   ```

---

## Development Workflow

### Making Changes

```bash
# 1. Create a feature branch
git checkout -b feature/my-feature

# 2. Make your changes
# ... edit files ...

# 3. Build and test
pnpm build
pnpm test

# 4. Commit and push
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature
```

### Running Tests

```bash
# Run all tests
pnpm test

# Test specific package
cd packages/core-services
pnpm test

# Test with coverage
pnpm test --coverage
```

### Building for Production

```bash
# Build all packages
pnpm build

# Build specific app
cd apps/web
pnpm build
```

---

## Common Commands

### Master Orchestrator

```bash
# System health check
./scripts/master.sh health

# Deploy development environment
./scripts/master.sh deploy development

# Start monitoring dashboard
./scripts/master.sh monitor

# Clean ports
./scripts/master.sh ports

# View logs
./scripts/master.sh logs
```

### Package Management

```bash
# Install dependency in specific package
pnpm --filter @castquest/sdk add axios

# Run command in all packages
pnpm -r build

# Update dependencies
pnpm update
```

### Development Servers

```bash
# User dashboard
pnpm dev:web

# Admin dashboard  
pnpm dev:admin

# Core services API
cd packages/core-services && pnpm dev

# Frames server
cd packages/frames && pnpm dev
```

---

## Configuration

### Environment Variables

Create `.env.local` files in the apps:

**User Dashboard (`apps/web/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=postgresql://user:pass@localhost:5432/castquest
NEXTAUTH_SECRET=your-secret-here
```

**Admin Dashboard (`apps/admin/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3010
NEXT_PUBLIC_ADMIN_SECRET=your-admin-secret
ADMIN_JWT_SECRET=your-jwt-secret
DATABASE_URL=postgresql://user:pass@localhost:5432/castquest
REDIS_URL=redis://localhost:6379
```

---

## Troubleshooting

### Port Already in Use

```bash
# Clean all ports
./scripts/master.sh ports

# Or manually kill specific port
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing

```bash
# Clear caches and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install --force
```

### Build Errors

```bash
# Clean build artifacts
find . -name "dist" -type d -not -path "*/node_modules/*" -exec rm -rf {} +
pnpm build
```

### Database Connection Issues

```bash
# Start PostgreSQL
brew services start postgresql  # macOS
sudo service postgresql start   # Linux

# Check connection
psql -U postgres -c "SELECT 1"
```

---

## Next Steps

### Learn More

1. **[System Overview](./SYSTEM-OVERVIEW.md)** - Understand the architecture
2. **[Dashboards Documentation](./DASHBOARDS.md)** - Explore dashboard features
3. **[Contributing Guide](./CONTRIBUTING.md)** - Learn how to contribute
4. **[API Reference](./API_REFERENCE.md)** - Explore the API

### Dive Deeper

- **Architecture:** Read [architecture.md](./architecture.md)
- **Modules:** Explore [modules.md](./modules.md)
- **Smart Brain:** Check [sdk/smart-brain.md](./sdk/smart-brain.md)
- **Deployment:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

### Join the Community

- 💬 [Discord](https://discord.gg/castquest)
- 🐦 [Twitter](https://twitter.com/CastQuest)
- 📧 [Email](mailto:hello@castquest.io)
- 🐛 [GitHub Issues](https://github.com/SMSDAO/castquest-frames/issues)

---

## Quick Reference Card

| Action | Command |
|--------|---------|
| Start user dashboard | `cd apps/web && pnpm dev` |
| Start admin dashboard | `cd apps/admin && pnpm dev -- -p 3010` |
| Start both dashboards | `./scripts/self-healing-ui.sh` |
| Run health check | `./scripts/master.sh health` |
| Build all packages | `pnpm build` |
| Run all tests | `pnpm test` |
| Clean ports | `./scripts/master.sh ports` |
| View logs | `./scripts/master.sh logs` |
| Deploy development | `./scripts/master.sh deploy development` |
| Monitor system | `./scripts/master.sh monitor` |

---

## Getting Help

### Documentation
- 📖 [Table of Contents](./TABLE_OF_CONTENTS.md) - Find any doc
- 🔍 [Troubleshooting Guide](./TROUBLESHOOTING.md) - Common issues
- 📚 [Full Documentation](./README.md) - Complete docs

### Support Channels
- **GitHub Issues:** Bug reports and feature requests
- **Discord:** Real-time chat and support
- **Documentation:** Comprehensive guides and references
- **Email:** Direct support contact

---

## What's Next?

Now that you have CastQuest running:

1. ✅ Explore the dashboards
2. ✅ Create your first frame
3. ✅ Read the architecture docs
4. ✅ Try the Smart Brain features
5. ✅ Join the community
6. ✅ Start contributing

**Welcome to CastQuest! 🎉**

---

**Last Updated:** 2026-02-07  
**Version:** 1.0.0  

---

Need help? Check the [Troubleshooting Guide](./TROUBLESHOOTING.md) or ask in [Discord](https://discord.gg/castquest).
