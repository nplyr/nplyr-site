#!/bin/bash

# Deploy script for NueZip documentation

set -e

echo "🚀 Starting deployment process..."

# Create temp directory for deployment
mkdir -p temp_deploy
cd temp_deploy

# Configure git
git config --global user.name "GitHub Actions"
git config --global user.email "actions@github.com"

# Build the documentation in parent directory
echo "📦 Building documentation..."
cd ..
pnpm docs:build
cd temp_deploy

# Check if dist directory exists
if [ ! -d "../docs/.vitepress/dist" ]; then
        echo "❌ Build failed - dist directory found"
        exit 1
fi

echo "✅ Build completed successfully"

# Clone gh-pages branch from origin if available, otherwise init local branch
echo "📥 Preparing gh-pages branch..."
ORIGIN_URL=$(git -C .. remote get-url origin 2>/dev/null || true)
if [ -n "$ORIGIN_URL" ]; then
    git clone --depth 1 -b gh-pages --single-branch "$ORIGIN_URL" gh-pages || git clone "$ORIGIN_URL" gh-pages
    cd gh-pages
else
    git init gh-pages
    cd gh-pages
    git checkout -b gh-pages
fi

# Clean existing files (keep .git directory)
echo "🧹 Cleaning existing files..."
rm -rf `find . -maxdepth 1 ! -name .git ! -name .`

# Copy built files
echo "📋 Copying built files..."
cp -rf ../../docs/.vitepress/dist/* .

# Copy IAP download files if they exist
echo "📦 Copying IAP pet files..."
if [ -d "../../pets" ]; then
    cp -rf ../../pets ./
    echo "✅ Pet files copied"
fi

# Add CNAME file for custom domain
echo "🌐 Adding CNAME file..."
echo "player.w3cub.com" > CNAME

# Add and commit
echo "📝 Committing changes..."
git add -A .
if git diff --staged --quiet; then
        echo "ℹ️  No changes to commit"
else
        git commit -m "Deploy PetReminder website

Built from $(git -C .. rev-parse --short HEAD)
Deployed on $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
fi

# Push to gh-pages if origin exists
if [ -n "$ORIGIN_URL" ]; then
    echo "🚀 Pushing to gh-pages branch..."
    git push origin gh-pages
else
    echo "⚠️  No remote origin found; created local gh-pages branch. Add a remote and push manually if desired."
fi

# Cleanup
cd ../..
rm -rf temp_deploy

echo "🎉 Deployment completed successfully!"
echo "📖 Documentation available at: https://player.w3cub.com/"