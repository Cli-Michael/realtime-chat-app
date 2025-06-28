#!/bin/bash

echo "⚙️  Starting Git reset and auto commit process..."

# Step 1: Remove any existing .git folder (clean slate)
if [ -d ".git" ]; then
    rm -rf .git
    echo "🧹 Removed existing .git folder"
fi

# Step 2: Re-initialize Git
git init
echo "✅ Initialized new Git repository"

# Step 3: Ensure build is ignored
if ! grep -q "^build/" .gitignore; then
    echo "build/" >> .gitignore
    echo "📛 Added build/ to .gitignore"
fi

#############################
# STEP-BY-STEP COMMIT SETS
#############################

# Core Configuration Files
git add .gitignore .eslintrc .prettierrc .firebaserc firebase.json README.md
git commit -m "chore(config): add core project config files and metadata"

# Package Manager Files
git add package.json package-lock.json
git commit -m "chore(deps): add package manifests for Node.js"

# Firebase Rules
git add database.rules.json
git commit -m "feat(firebase): add realtime DB security rules"

# Public Assets
git add public/
git commit -m "chore(public): add static public assets (favicon, manifest, etc.)"

# Build folder is ignored — no commit

# Firebase Functions
git add functions/.gitignore functions/.eslintrc.json functions/index.js functions/package.json functions/package-lock.json functions/service-account.json
git commit -m "feat(functions): setup Firebase functions entry and service account"

git add functions/src/
git commit -m "feat(functions): add FCM support script"

# React App Entry and Root
git add src/index.js src/App.js
git commit -m "feat(app): add React app root and main component"

# Context APIs
git add src/context/
git commit -m "feat(context): add context providers for profile, room, etc."

# Utility Functions and Firebase Init
git add src/misc/
git commit -m "chore(utils): add custom hooks, helpers, firebase config"

# Pages
git add src/pages/
git commit -m "feat(pages): add SignIn and Chat pages"

# Components - Global and Grouped
git add src/components/*.js
git commit -m "feat(components): add shared UI components"

git add src/components/chat-window/
git commit -m "feat(chat): add chat window UI (top, bottom, messages)"

git add src/components/dashboard/
git commit -m "feat(dashboard): add dashboard and user upload controls"

git add src/components/rooms/
git commit -m "feat(rooms): add room list and room item components"

# Styles
git add src/styles/
git commit -m "style(global): add base SCSS styles and overrides"

# Step: Push to remote origin
echo "📡 Preparing to push to remote..."

REMOTE_URL="https://github.com/michael-clinton-sudo/realtime-chat-app.git" # <-- Replace with your actual origin

# Add origin and push
git remote add origin "$REMOTE_URL"
git branch -M main
git push -u origin main

echo "✅ Successfully pushed to $REMOTE_URL"

# Final Confirmation
echo "✅ Auto commit process completed for chat-app"
