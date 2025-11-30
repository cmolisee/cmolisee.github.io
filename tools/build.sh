#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Building for production...${NC}"

# Build CSS with Tailwind
echo -e "${GREEN}Building Tailwind CSS...${NC}"
npm run build:css:prod

if [ $? -ne 0 ]; then
    echo -e "${RED}Tailwind build failed!${NC}"
    exit 1
fi

# Build Jekyll site
echo -e "${GREEN}Building Jekyll site...${NC}"
JEKYLL_ENV=production bundle exec jekyll build

if [ $? -ne 0 ]; then
    echo -e "${RED}Jekyll build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}Build complete! Site is in _site directory${NC}"