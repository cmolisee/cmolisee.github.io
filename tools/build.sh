#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       Building for Production         ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════╝${NC}"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing npm dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}npm install failed!${NC}"
        exit 1
    fi
fi

# Build CSS with Tailwind (production mode)
echo -e "${GREEN}Building Tailwind CSS (production)...${NC}"
npm run build:css:prod

if [ $? -ne 0 ]; then
    echo -e "${RED}Tailwind build failed!${NC}"
    exit 1
fi
echo -e "${GREEN}CSS build complete${NC}"

# Build Jekyll site
echo -e "${GREEN}Building Jekyll site...${NC}"
JEKYLL_ENV=production bundle exec jekyll build

if [ $? -ne 0 ]; then
    echo -e "${RED}Jekyll build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║    ✓ Build Complete!                  ║${NC}"
echo -e "${GREEN}║    Site is in _site/ directory        ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
