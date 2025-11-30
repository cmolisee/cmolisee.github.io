#!/bin/bash
# Test Jekyll build

set -e

echo "Testing Jekyll build..."
bundle exec jekyll build --verbose

echo ""
echo "Build successful! Output is in _site/"
echo "Checking for common issues..."

# Check if _site directory was created
if [ ! -d "_site" ]; then
  echo "Error: _site directory not found"
  exit 1
fi

# Check if index.html exists
if [ ! -f "_site/index.html" ]; then
  echo "Warning: index.html not found in _site"
fi

echo "All checks passed!"