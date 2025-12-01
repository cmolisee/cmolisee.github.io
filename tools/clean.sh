#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

PROJECT_ROOT="${PWD}"
FILES_TO_REMOVE=(
    "assets/css/output.css"
    ".jekyll-cache/"
    "_site/"
)

echo -e "${YELLOW}╔═══════════════════════════════════════╗${NC}"
echo -e "${YELLOW}║       Cleaning Generated Files        ║${NC}"
echo -e "${YELLOW}╚═══════════════════════════════════════╝${NC}"

for item in "${FILES_TO_REMOVE[@]}"; do
    if [ -e "$PROJECT_ROOT/$item" ]; then
        echo -e "${CYAN}-> Removing: $item${NC}"
        # Use -rf for directories, -f for files
        if [ -d "$PROJECT_ROOT/$item" ]; then
            rm -rf "$PROJECT_ROOT/$item"
        else
            rm -f "$PROJECT_ROOT/$item"
        fi
    else
        echo -e "${YELLOW}-> Skipping: $item (not found)${NC}"
    fi
done

echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║    ✓ Cleanup Complete!                ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
