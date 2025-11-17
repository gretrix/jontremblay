#!/bin/bash

# Deployment script for jontremblay.com
# Run this script after pulling/uploading new code

set -e  # Exit on any error

echo "🚀 Starting deployment..."

# Navigate to app directory
cd /var/www/jontremblay

# Pull latest changes (if using git)
# git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "🏗️ Building application..."
npm run build

# Restart PM2
echo "♻️ Restarting application..."
pm2 restart jontremblay

# Check status
echo "✅ Deployment complete! Checking status..."
pm2 status

echo "📊 Recent logs:"
pm2 logs jontremblay --lines 20 --nostream

echo "🎉 Deployment successful!"

