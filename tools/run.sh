#!/bin/bash

set -e

echo "Starting Jekyll development server..."
echo "Server will be available on port 4000"
echo "In Codespaces, look for the 'Ports' tab to access the forwarded port"
bundle exec jekyll serve --host 0.0.0.0 --watch --livereload --drafts
