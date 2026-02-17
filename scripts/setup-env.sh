#!/bin/bash
# CastQuest Dynamic Environment Configuration Script
# Automatically configures environment variables for local and production deployments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_MODE="${1:-local}"  # local, preview, production

echo -e "${BLUE}🔧 CastQuest Dynamic Environment Configuration${NC}"
echo -e "${BLUE}Mode: ${ENV_MODE}${NC}"
echo ""

# Function to check if .env exists, if not copy from example
setup_env_file() {
    local app_path="$1"
    local app_name="$2"
    
    if [ ! -f "${app_path}/.env.local" ]; then
        if [ -f "${app_path}/.env.example" ]; then
            echo -e "${YELLOW}📄 Creating .env.local for ${app_name}...${NC}"
            cp "${app_path}/.env.example" "${app_path}/.env.local"
            echo -e "${GREEN}✅ Created ${app_name}/.env.local from .env.example${NC}"
            echo -e "${YELLOW}⚠️  Please edit .env.local with your actual values${NC}"
        else
            echo -e "${RED}❌ No .env.example found for ${app_name}${NC}"
        fi
    else
        echo -e "${GREEN}✅ ${app_name}/.env.local already exists${NC}"
    fi
}

# Function to validate environment variables
validate_env() {
    local app_path="$1"
    local app_name="$2"
    
    if [ -f "${app_path}/.env.local" ]; then
        echo -e "${BLUE}🔍 Validating ${app_name} environment...${NC}"
        
        # Check for required variables (basic validation)
        if grep -q "NEXT_PUBLIC_API_URL=" "${app_path}/.env.local"; then
            echo -e "${GREEN}  ✓ API URL configured${NC}"
        else
            echo -e "${YELLOW}  ⚠ API URL not configured${NC}"
        fi
    fi
}

# Function to setup database if needed
setup_database() {
    echo -e "${BLUE}🗄️  Checking database setup...${NC}"
    
    if [ -f "${REPO_ROOT}/packages/core-services/package.json" ]; then
        cd "${REPO_ROOT}"
        
        # Check if database migrations need to run
        if command -v pnpm &> /dev/null; then
            echo -e "${YELLOW}Running database migrations...${NC}"
            pnpm --filter @castquest/core-services db:migrate || echo -e "${YELLOW}⚠️  Database migration skipped (configure DATABASE_URL first)${NC}"
        fi
    fi
}

# Function to generate dynamic configuration based on mode
generate_dynamic_config() {
    local mode="$1"
    
    echo -e "${BLUE}⚙️  Generating dynamic configuration for ${mode}...${NC}"
    
    case "$mode" in
        local)
            export NEXT_PUBLIC_API_URL="http://localhost:4000"
            export NODE_ENV="development"
            ;;
        preview)
            export NODE_ENV="production"
            ;;
        production)
            export NODE_ENV="production"
            ;;
    esac
    
    echo -e "${GREEN}✅ Configuration set for ${mode} mode${NC}"
}

# Main setup flow
main() {
    echo -e "${BLUE}📦 Setting up CastQuest environments...${NC}"
    echo ""
    
    # Setup web app
    if [ -d "${REPO_ROOT}/apps/web" ]; then
        echo -e "${BLUE}=== Web Application ===${NC}"
        setup_env_file "${REPO_ROOT}/apps/web" "web"
        validate_env "${REPO_ROOT}/apps/web" "web"
        echo ""
    fi
    
    # Setup admin app
    if [ -d "${REPO_ROOT}/apps/admin" ]; then
        echo -e "${BLUE}=== Admin Application ===${NC}"
        setup_env_file "${REPO_ROOT}/apps/admin" "admin"
        validate_env "${REPO_ROOT}/apps/admin" "admin"
        echo ""
    fi
    
    # Generate dynamic configuration
    generate_dynamic_config "$ENV_MODE"
    echo ""
    
    # Setup database (optional)
    if [ "$ENV_MODE" = "local" ]; then
        setup_database
        echo ""
    fi
    
    # Summary
    echo -e "${GREEN}✨ Environment setup complete!${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo -e "  1. Edit .env.local files with your actual values"
    echo -e "  2. Run: ${GREEN}pnpm install${NC}"
    echo -e "  3. Run: ${GREEN}pnpm dev:web${NC} or ${GREEN}pnpm dev:admin${NC}"
    echo ""
    echo -e "${YELLOW}📖 Documentation: See README.md for full setup guide${NC}"
}

# Run main function
main
