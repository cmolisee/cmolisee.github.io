#!/bin/bash
# .devcontainer/setup.sh

set -e # exit on any error

echo "🚀 Codespace Setup..."
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

if ! [ -n "$CODESPACES" ]; then
  echo -e "${YELLOW}Environemnt is not a Codespace. Exiting...${NC}"
  exit 0
fi

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

# Init/Install husky pre-commit hook
if ! [[ -f ".husky/pre-commit" && -d ".husky/_" ]]; then
    echo -e "${YELLOW}Initializing husky pre-commit hook...${NC}"
    npx husky init
    echo "npx lint-staged" > .husky/pre-commit
fi

echo -e "${BLUE}Setting run permissions for pre-commit hook.${NC}"
chmod +x .husky/pre-commit
echo -e "${GREEN}✓ Husky pre-commit Initialized.${NC}"

echo ""

# Clean any previous builds
echo -e "${YELLOW}Cleaning previous builds...${NC}"
bundle exec jekyll clean
echo -e "${GREEN}✓ Build directory cleaned${NC}"

echo ""

# Run initial build to verify everything works
echo -e "${YELLOW}Running test build...${NC}"
npm run build
echo -e "${GREEN}✓ Test build successful${NC}"

echo ""
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo "  ${BLUE}npm run dev${NC}       - Build and watch jekyll and css for development"
echo "  ${BLUE}* Husky pre-commit will run formatting and linting on staged files.${NC}"
echo "  ${BLUE}* CI/CD will run formatting and linting on all files.${NC}"
echo ""