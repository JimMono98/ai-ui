# @jimmono98/ai-ui

Cross-platform reusable UI and design-system library for React Native, Expo-compatible applications, and React Native Web.

## Development

Requirements:

- Node.js
- npm

Install dependencies:

```bash
npm ci



cd "/home/ripper/Repos/ai-ui" || exit 1
set -e

echo "========================================"
echo " AI-UI FINAL REPOSITORY SETUP"
echo "========================================"

# ============================================================
# 1. CANONICAL .gitignore
# ============================================================

cat > .gitignore <<'EOF'
# Dependencies
node_modules/

# Library build output
dist/

# Storybook generated output
storybook-static/

# Test / coverage output
coverage/
playwright-report/
test-results/

# Local design / AI handoff documentation
design/
.design-backup-before-split/

# Environment
.env
.env.*
!.env.example

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Package archives
*.tgz

# OS
.DS_Store
Thumbs.db

# IDE
.idea/
.vscode/

# Temporary files
*.tmp
*.temp
