#!/bin/bash
# CastQuest Vercel Deployment Configuration Script
# Prepares the repository for Vercel deployment

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 CastQuest Vercel Deployment Setup${NC}"
echo ""

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
echo -e "${BLUE}Node.js version: ${NODE_VERSION}${NC}"

if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${YELLOW}⚠️  Warning: Node.js 20+ recommended for frontend runtime${NC}"
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
pnpm install --frozen-lockfile || pnpm install

# Build shared packages first
echo -e "${BLUE}🔨 Building shared packages...${NC}"
pnpm --filter @castquest/neo-ux-core build || echo "neo-ux-core build skipped"
pnpm --filter @castquest/sdk build || echo "sdk build skipped"
pnpm --filter @castquest/core-services build || echo "core-services build skipped"

# Build web app
echo -e "${BLUE}🌐 Building web application...${NC}"
pnpm --filter @castquest/web build

echo -e "${GREEN}✅ Vercel deployment preparation complete!${NC}"
echo ""
echo -e "${BLUE}Deploy to Vercel:${NC}"
echo -e "  1. Install Vercel CLI: ${GREEN}npm i -g vercel${NC}"
echo -e "  2. Link project: ${GREEN}vercel link${NC}"
echo -e "  3. Deploy: ${GREEN}vercel --prod${NC}"
echo ""
echo -e "${YELLOW}📖 See docs/DEPLOYMENT.md for full deployment guide${NC}"
