.PHONY: help setup dev build clean test lint format deploy

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

setup: ## Set up development environment
	@bash scripts/setup.sh

dev: ## Start development server with live reload
	@bundle exec jekyll serve --livereload --host 0.0.0.0

build: ## Build production site
	@bundle exec jekyll build
	@echo "✓ Site built in _site/"

clean: ## Clean build artifacts
	@bundle exec jekyll clean
	@echo "✓ Build artifacts cleaned"

test: ## Run all tests
	@bash scripts/test.sh

lint: ## Run all linters
	@npm run lint:all

format: ## Format all files
	@npm run format
	@echo "✓ All files formatted"

format-check: ## Check if files are formatted
	@npm run format:check

deploy: ## Deploy to GitHub Pages (via CI/CD)
	@bash scripts/deploy.sh github-pages

install: ## Install dependencies
	@bundle install
	@npm install
	@echo "✓ Dependencies installed"

update: ## Update dependencies
	@bundle update
	@npm update
	@echo "✓ Dependencies updated"

new-post: ## Create a new blog post (usage: make new-post TITLE="My Post")
	@if [ -z "$(TITLE)" ]; then \
		echo "Error: TITLE is required. Usage: make new-post TITLE=\"My Post\""; \
		exit 1; \
	fi
	@DATE=$$(date +%Y-%m-%d); \
	SLUG=$$(echo "$(TITLE)" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g'); \
	FILE="_posts/$$DATE-$$SLUG.md"; \
	echo "---" > $$FILE; \
	echo "layout: post" >> $$FILE; \
	echo "title: \"$(TITLE)\"" >> $$FILE; \
	echo "date: $$DATE $$(date +%H:%M:%S) -0800" >> $$FILE; \
	echo "---" >> $$FILE; \
	echo "" >> $$FILE; \
	echo "Write your content here..." >> $$FILE; \
	echo "✓ Created $$FILE"

serve: dev ## Alias for dev

.DEFAULT_GOAL := help
