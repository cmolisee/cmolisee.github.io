#!/bin/bash

# Test script for Jekyll site
# Runs all tests, linters, and validators

set -e

echo "🧪 Running comprehensive test suite..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

FAILED_TESTS=()

# Function to run test and track failures
run_test() {
    local test_name=$1
    shift
    echo -e "${BLUE}Running: $test_name${NC}"
    if "$@"; then
        echo -e "${GREEN}✓ $test_name passed${NC}"
        echo ""
        return 0
    else
        echo -e "${RED}✗ $test_name failed${NC}"
        FAILED_TESTS+=("$test_name")
        echo ""
        return 1
    fi
}

# Ruby linting
run_test "Rubocop (Ruby linting)" bundle exec rubocop || true

# CSS linting
run_test "Stylelint (CSS linting)" npm run lint:css || true

# Markdown linting
run_test "Markdownlint (Markdown linting)" npm run lint:markdown || true

# Format checking
run_test "Prettier (Format check)" npm run format:check || true

# Build test
run_test "Jekyll build" bundle exec jekyll build

# HTML validation
run_test "HTMLProofer (Link & HTML validation)" bundle exec htmlproofer _site \
    --disable-external \
    --checks Links,Images,Scripts \
    --allow-hash-href \
    --ignore-urls "/^http:\/\/127.0.0.1/,/^http:\/\/0.0.0.0/,/^http:\/\/localhost/" || true

echo ""
echo "========================================="
echo "Test Summary"
echo "========================================="

if [ ${#FAILED_TESTS[@]} -eq 0 ]; then
    echo -e "${GREEN}✨ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Failed tests:${NC}"
    for test in "${FAILED_TESTS[@]}"; do
        echo -e "${RED}  ✗ $test${NC}"
    done
    echo ""
    echo -e "${YELLOW}Note: Some failures may be warnings. Check output above.${NC}"
    exit 1
fi
