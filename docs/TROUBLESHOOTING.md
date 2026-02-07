# CastQuest Troubleshooting Guide

> Solutions to common issues and problems

---

## Table of Contents

- [Installation Issues](#installation-issues)
- [Build and Compilation](#build-and-compilation)
- [Runtime Errors](#runtime-errors)
- [Database Issues](#database-issues)
- [Port Conflicts](#port-conflicts)
- [Dependency Problems](#dependency-problems)
- [Network and API](#network-and-api)
- [Smart Contracts](#smart-contracts)
- [Dashboard Issues](#dashboard-issues)
- [Performance Problems](#performance-problems)
- [Smart Brain Issues](#smart-brain-issues)
- [Getting More Help](#getting-more-help)

---

## Installation Issues

### Node.js Version Mismatch

**Problem:** `ERR_INVALID_THIS` or compatibility errors

**Solution:**
```bash
# Check current version
node --version

# Should be 20.x.x or higher
# Use nvm to switch versions
nvm install 20
nvm use 20

# Verify .nvmrc is being used
cat .nvmrc  # Should show "20"
```

### pnpm Not Found

**Problem:** `command not found: pnpm`

**Solution:**
```bash
# Install pnpm globally
npm install -g pnpm@9

# Verify installation
pnpm --version  # Should show 9.x.x
```

### Installation Hangs or Fails

**Problem:** `pnpm install` hangs or errors

**Solution:**
```bash
# Clean npm cache
npm cache clean --force

# Remove existing installations
rm -rf node_modules pnpm-lock.yaml

# Reinstall with force flag
pnpm install --force

# If still failing, try without frozen lockfile
pnpm install --no-frozen-lockfile
```

---

## Build and Compilation

### TypeScript Compilation Errors

**Problem:** Type errors during build

**Solution:**
```bash
# Clean TypeScript cache
find . -name "tsconfig.tsbuildinfo" -delete

# Rebuild from scratch
pnpm -r clean
pnpm -r build

# If specific package fails
cd packages/[package-name]
rm -rf dist tsconfig.tsbuildinfo
pnpm build
```

### Build Order Issues

**Problem:** Package builds fail due to missing dependencies

**Solution:**
```bash
# Build in correct order using orchestrator
./scripts/master.sh build

# Or manually build dependencies first
cd packages/neo-ux-core && pnpm build
cd packages/sdk && pnpm build
cd packages/core-services && pnpm build
cd apps/web && pnpm build
```

### Memory Issues During Build

**Problem:** `FATAL ERROR: Reached heap limit`

**Solution:**
```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Then rebuild
pnpm build

# Make permanent by adding to package.json
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

---

## Runtime Errors

### Module Not Found

**Problem:** `Cannot find module '@castquest/xxx'`

**Solution:**
```bash
# Rebuild workspace links
pnpm install

# Clean and rebuild
rm -rf node_modules
pnpm install
pnpm build

# Verify workspace links
ls -la node_modules/@castquest/
```

### React Hydration Errors

**Problem:** Hydration mismatch in Next.js

**Solution:**
```bash
# Clear Next.js cache
rm -rf apps/web/.next
rm -rf apps/admin/.next

# Restart dev server
cd apps/web
pnpm dev
```

### Environment Variables Not Loading

**Problem:** `undefined` values for env vars

**Solution:**
```bash
# Verify .env.local exists
ls -la apps/web/.env.local

# Check variable naming (must start with NEXT_PUBLIC_ for client-side)
# Correct: NEXT_PUBLIC_API_URL
# Incorrect: API_URL

# Restart server after adding variables
pkill -f "next dev"
pnpm dev
```

---

## Database Issues

### Connection Refused

**Problem:** `ECONNREFUSED 127.0.0.1:5432`

**Solution:**
```bash
# Check if PostgreSQL is running
pg_isready

# Start PostgreSQL
# macOS:
brew services start postgresql

# Linux:
sudo service postgresql start

# Docker:
docker-compose up -d postgres

# Verify connection string
echo $DATABASE_URL
# Format: postgresql://user:pass@host:5432/dbname
```

### Migration Errors

**Problem:** Database migration fails

**Solution:**
```bash
# Check migration status
cd packages/core-services
pnpm prisma migrate status

# Reset database (CAUTION: destroys data)
pnpm prisma migrate reset

# Or manually run migrations
pnpm prisma migrate dev

# For production
pnpm prisma migrate deploy
```

### Schema Sync Issues

**Problem:** Database schema doesn't match code

**Solution:**
```bash
# Generate Prisma client
cd packages/core-services
pnpm prisma generate

# Push schema to database
pnpm prisma db push

# Verify schema
pnpm prisma db pull
```

---

## Port Conflicts

### Port Already in Use

**Problem:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Use master orchestrator to clean all ports
./scripts/master.sh ports

# Or manually kill specific port
lsof -ti:3000 | xargs kill -9
lsof -ti:3010 | xargs kill -9

# Find process using port
lsof -i :3000

# Use alternative port
cd apps/web
pnpm dev -- -p 3005
```

### Multiple Servers on Same Port

**Problem:** Can't start second dashboard

**Solution:**
```bash
# Use self-healing script which manages ports
./scripts/self-healing-ui.sh

# Or start with specific ports
cd apps/web && pnpm dev &  # Port 3000
cd apps/admin && pnpm dev -- -p 3010 &  # Port 3010
```

---

## Dependency Problems

### Workspace Dependency Not Found

**Problem:** `Cannot find module in workspace`

**Solution:**
```bash
# Run dependency repair script
bash scripts/repair-dependencies.sh

# Or manually rebuild workspace
pnpm install
pnpm -r build

# Verify workspace configuration
cat pnpm-workspace.yaml
```

### Version Conflicts

**Problem:** Multiple versions of same package

**Solution:**
```bash
# Check for duplicates
pnpm list [package-name]

# Force resolution in package.json
"pnpm": {
  "overrides": {
    "react": "18.2.0"
  }
}

# Reinstall
pnpm install
```

### Peer Dependency Warnings

**Problem:** `WARN: unmet peer dependency`

**Solution:**
```bash
# Install missing peer dependencies
pnpm add [missing-peer-dep]

# Or use --force to ignore warnings
pnpm install --force

# Check what's needed
pnpm why [package-name]
```

---

## Network and API

### API Not Responding

**Problem:** API endpoints return 404 or timeout

**Solution:**
```bash
# Check Core Services are running
./scripts/master.sh services status

# Start Core Services
cd packages/core-services
pnpm dev

# Verify health endpoint
curl http://localhost:4000/health

# Check logs
tail -f logs/core-services.log
```

### CORS Errors

**Problem:** Cross-origin request blocked

**Solution:**
```javascript
// In core-services server.ts, ensure CORS is configured
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3010'],
  credentials: true
}));
```

### JWT Token Expired

**Problem:** `401 Unauthorized` errors

**Solution:**
```bash
# Clear stored tokens
localStorage.clear()  # In browser console

# Login again to get new token

# Verify JWT secret is consistent
# Check .env files have same NEXTAUTH_SECRET
```

---

## Smart Contracts

### Compilation Failures

**Problem:** Solidity contracts won't compile

**Solution:**
```bash
# Navigate to contracts package
cd packages/contracts

# Clean build artifacts
forge clean

# Rebuild
forge build

# Check Foundry version
forge --version  # Should be latest

# Update Foundry
foundryup
```

### Test Failures

**Problem:** Contract tests fail

**Solution:**
```bash
# Run tests with verbose output
forge test -vvv

# Run specific test
forge test --match-test testMint

# Check gas usage
forge test --gas-report

# Debug failing test
forge test --match-test testMint --debug
```

### Deployment Issues

**Problem:** Contract deployment fails

**Solution:**
```bash
# Verify RPC endpoint
echo $RPC_URL

# Check account has funds
cast balance $DEPLOYER_ADDRESS --rpc-url $RPC_URL

# Increase gas limit
forge script Deploy --gas-limit 3000000

# Verify network ID
cast chain-id --rpc-url $RPC_URL
```

---

## Dashboard Issues

### Components Not Rendering

**Problem:** Blank dashboard or missing components

**Solution:**
```bash
# Clear browser cache
# DevTools > Application > Clear Storage

# Clear Next.js cache
rm -rf apps/web/.next apps/admin/.next

# Rebuild and restart
pnpm build
pnpm dev
```

### Framer Motion Animations Not Working

**Problem:** Animations don't appear

**Solution:**
```bash
# Verify framer-motion is installed
pnpm list framer-motion

# Reinstall if needed
pnpm remove framer-motion
pnpm add framer-motion

# Clear cache and rebuild
rm -rf .next node_modules/.cache
pnpm dev
```

### Styles Not Loading

**Problem:** Dashboard appears unstyled

**Solution:**
```bash
# Check Tailwind config exists
ls tailwind.config.js

# Rebuild Tailwind
pnpm build:css

# Verify globals.css is imported in layout.tsx
# import './globals.css'
```

---

## Performance Problems

### Slow Build Times

**Problem:** Builds take very long

**Solution:**
```bash
# Enable parallel builds
pnpm -r --parallel build

# Increase worker threads
export NODE_OPTIONS="--max-old-space-size=4096"

# Use turbo for faster builds
pnpm add -D turbo
turbo build

# Clear build caches
rm -rf dist .next node_modules/.cache
```

### High Memory Usage

**Problem:** System runs out of memory

**Solution:**
```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=8192"

# Reduce parallel workers
pnpm config set parallel-workers 2

# Close unnecessary apps and processes
```

### Slow Development Server

**Problem:** Hot reload is very slow

**Solution:**
```bash
# Disable turbo mode temporarily
next dev --turbo=false

# Reduce file watching
# Add to next.config.js
webpack: (config) => {
  config.watchOptions = {
    poll: 1000,
    aggregateTimeout: 300,
  }
  return config
}
```

---

## Smart Brain Issues

### Brain Analysis Not Running

**Problem:** Deep thinking doesn't trigger

**Solution:**
```bash
# Check Smart Brain service status
./scripts/master.sh brain

# View Brain events
cat data/brain-events.json

# Manually trigger analysis
curl -X POST http://localhost:3010/api/brain/deep-think \
  -H "Content-Type: application/json" \
  -d '{"context":"test"}'
```

### Worker System Not Processing Tasks

**Problem:** Background jobs not executing

**Solution:**
```bash
# Check worker status
./scripts/master.sh workers status

# Restart workers
./scripts/master.sh workers stop
./scripts/master.sh workers start

# View worker events
cat data/worker-events.json

# Check worker logs
tail -f logs/workers.log
```

---

## Getting More Help

### Diagnostic Information

When reporting issues, include:

```bash
# System information
node --version
pnpm --version
git --version

# System health check
./scripts/master.sh health > health-report.txt

# Dependency tree
pnpm list --depth=0 > dependencies.txt

# Recent logs
tail -n 100 logs/*.log > recent-logs.txt
```

### Check Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Setup issues
- **[System Overview](./SYSTEM-OVERVIEW.md)** - Architecture questions
- **[API Reference](./API_REFERENCE.md)** - API issues
- **[Deployment Guide](./DEPLOYMENT.md)** - Deployment problems

### Community Support

- **Discord:** [discord.gg/castquest](https://discord.gg/castquest)
- **GitHub Issues:** [github.com/SMSDAO/castquest-frames/issues](https://github.com/SMSDAO/castquest-frames/issues)
- **Email:** support@castquest.io

### Reporting Bugs

When filing an issue:

1. **Search existing issues** first
2. **Use issue template** if provided
3. **Include reproduction steps**
4. **Attach diagnostic information**
5. **Specify environment** (OS, Node version, etc.)

---

## Emergency Recovery

If nothing else works:

```bash
# Nuclear option: Clean everything and start fresh
git clean -fdx  # CAUTION: Removes all untracked files
pnpm install
pnpm build

# Or use self-healing protocols
./scripts/master.sh heal

# Check system integrity
./scripts/master.sh integrity
```

---

**Last Updated:** 2026-02-07  
**Version:** 1.0.0

---

**Still stuck?** Join our [Discord](https://discord.gg/castquest) for real-time help!
