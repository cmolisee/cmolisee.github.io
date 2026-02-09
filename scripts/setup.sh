#!/bin/bash

# Setup script for Jekyll Minimal Theme development
# This script sets up the development environment in GitHub Codespaces or locally

set -e

echo "🚀 Setting up Jekyll Minimal Theme development environment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running in Codespaces
if [ -n "$CODESPACES" ]; then
    echo -e "${BLUE}📦 Detected GitHub Codespaces environment${NC}"
else
    echo -e "${BLUE}💻 Setting up local development environment${NC}"
fi

echo ""

# Install Ruby dependencies
echo -e "${YELLOW}Installing Ruby dependencies...${NC}"
if command -v bundle &> /dev/null; then
    bundle install
    echo -e "${GREEN}✓ Ruby dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ Bundler not found. Please install Ruby and Bundler first.${NC}"
    exit 1
fi

echo ""

# Install Node dependencies
echo -e "${YELLOW}Installing Node.js dependencies...${NC}"
if command -v npm &> /dev/null; then
    npm install
    echo -e "${GREEN}✓ Node.js dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ npm not found. Please install Node.js first.${NC}"
    exit 1
fi

echo ""

# Setup Git hooks
echo -e "${YELLOW}Setting up Git hooks...${NC}"
if [ -d ".git" ]; then
    npx husky install
    npx husky add .husky/pre-commit "npm run precommit"
    chmod +x .husky/pre-commit
    echo -e "${GREEN}✓ Git hooks configured${NC}"
else
    echo -e "${YELLOW}⚠ Not a Git repository. Skipping Git hooks setup.${NC}"
fi

echo ""

# Clean any previous builds
echo -e "${YELLOW}Cleaning previous builds...${NC}"
bundle exec jekyll clean
echo -e "${GREEN}✓ Build directory cleaned${NC}"

echo ""

# Run initial build to verify everything works
echo -e "${YELLOW}Running test build...${NC}"
bundle exec jekyll build
echo -e "${GREEN}✓ Test build successful${NC}"

echo ""
echo -e "${GREEN}✨ Setup complete!${NC}"
echo ""
echo "Available commands:"
echo "  ${BLUE}npm run dev${NC}        - Start development server with live reload"
echo "  ${BLUE}npm run build${NC}      - Build production site"
echo "  ${BLUE}npm run format${NC}     - Format all files with Prettier"
echo "  ${BLUE}npm run lint:all${NC}   - Run all linters"
echo "  ${BLUE}npm test${NC}           - Run linting and format checks"
echo ""
echo "To start developing, run:"
echo "  ${BLUE}npm run dev${NC}"
echo ""
echo "Your site will be available at http://localhost:4000"
echo ""
