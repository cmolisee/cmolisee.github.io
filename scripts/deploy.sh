#!/bin/bash

# Deployment script for Jekyll site
# Supports GitHub Pages, Netlify, and Vercel

set -e

DEPLOY_TARGET="${1:-github-pages}"

echo "🚀 Deploying to $DEPLOY_TARGET..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Run tests before deploying
echo -e "${YELLOW}Running pre-deployment checks...${NC}"
npm run format:check
npm run lint:all
bundle exec jekyll build
bundle exec htmlproofer _site --disable-external --checks Links,Images,Scripts

echo -e "${GREEN}✓ All checks passed${NC}"
echo ""

case $DEPLOY_TARGET in
  github-pages)
    echo -e "${BLUE}Deploying to GitHub Pages...${NC}"
    echo "GitHub Pages deployment is handled automatically by GitHub Actions."
    echo "Push to the main branch to trigger deployment."
    ;;
  
  netlify)
    echo -e "${BLUE}Deploying to Netlify...${NC}"
    if command -v netlify &> /dev/null; then
      netlify deploy --prod --dir=_site
      echo -e "${GREEN}✓ Deployed to Netlify${NC}"
    else
      echo -e "${RED}✗ Netlify CLI not found. Install with: npm install -g netlify-cli${NC}"
      exit 1
    fi
    ;;
  
  vercel)
    echo -e "${BLUE}Deploying to Vercel...${NC}"
    if command -v vercel &> /dev/null; then
      vercel --prod
      echo -e "${GREEN}✓ Deployed to Vercel${NC}"
    else
      echo -e "${RED}✗ Vercel CLI not found. Install with: npm install -g vercel${NC}"
      exit 1
    fi
    ;;
  
  *)
    echo -e "${RED}✗ Unknown deployment target: $DEPLOY_TARGET${NC}"
    echo "Usage: $0 [github-pages|netlify|vercel]"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}✨ Deployment complete!${NC}"
