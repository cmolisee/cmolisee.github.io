#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Jekyll and Tailwind CSS...${NC}"

# Function to cleanup background processes on exit
cleanup() {
    echo -e "\n${BLUE}Shutting down...${NC}"
    kill $(jobs -p) 2>/dev/null
    exit
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Start Tailwind CSS watch in background
echo -e "${GREEN}Starting Tailwind CSS watcher...${NC}"
npm run watch:css &

# Give Tailwind a moment to start
sleep 2

# Start Jekyll serve
echo -e "${GREEN}Starting Jekyll server...${NC}"
bundle exec jekyll serve --host 0.0.0.0 --livereload

# Wait for background processes
wait