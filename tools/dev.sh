#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║            Development Mode           ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════╝${NC}"

# Function to cleanup background processes on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down...${NC}"
    ./clean.sh
    kill $(jobs -p) 2>/dev/null
    exit
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing npm dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ npm install failed!${NC}"
        exit 1
    fi
fi

# Check if vendor/bundle exists
if [ ! -d "vendor/bundle" ] && [ ! -d ".bundle" ]; then
    echo -e "${YELLOW}Installing Ruby gems...${NC}"
    bundle install
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ bundle install failed!${NC}"
        exit 1
    fi
fi

# Start Tailwind CSS watch in background
echo -e "${GREEN}Starting Tailwind CSS watcher...${NC}"
npm run watch:css &

# Give Tailwind a moment to start
sleep 3

# Verify output.css was created
if [ ! -f "assets/css/output.css" ]; then
    echo -e "${YELLOW}⚠ Warning: output.css not found, running initial build...${NC}"
    npm run build:css
fi

# Start Jekyll serve
echo -e "${GREEN}Starting Jekyll server...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
bundle exec jekyll serve --host 0.0.0.0 --livereload --drafts

# Wait for background processes
wait
