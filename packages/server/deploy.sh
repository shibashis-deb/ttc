#!/bin/bash
# Deployment script for TTC server

set -e

# Colors for better readability
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
BLUE="\033[0;34m"
NC="\033[0m" # No Color

# Default deployment platform
PLATFORM="${1:-help}"

# Display help information
show_help() {
  echo -e "${BLUE}TTC Server Deployment Script${NC}"
  echo ""
  echo "Usage: ./deploy.sh [platform]"
  echo ""
  echo "Available platforms:"
  echo "  render    - Deploy to Render.com"
  echo "  railway   - Deploy to Railway.app"
  echo "  fly       - Deploy to Fly.io"
  echo "  vercel    - Deploy to Vercel"
  echo "  prepare   - Only prepare for deployment (build + env setup)"
  echo "  help      - Show this help message"
  echo ""
  echo "Example: ./deploy.sh railway"
}

# Check for required tools
check_requirements() {
  echo -e "${BLUE}Checking requirements...${NC}"
  
  if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    exit 1
  fi
  
  if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
  fi
  
  echo -e "${GREEN}✓ All requirements satisfied${NC}"
}

# Build the application
build_app() {
  echo -e "${BLUE}Building application...${NC}"
  npm run build
  echo -e "${GREEN}✓ Build completed successfully${NC}"
}

# Setup environment variables
setup_env() {
  # Create .env file if it doesn't exist
  if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠ Please update the .env file with your production database credentials!${NC}"
  else
    echo -e "${GREEN}✓ .env file already exists${NC}"
  fi
  
  # Ensure DATABASE_URL is set
  if ! grep -q "DATABASE_URL" .env; then
    echo -e "${YELLOW}⚠ DATABASE_URL not found in .env file${NC}"
    echo -e "${YELLOW}⚠ Please add your database connection URL to the .env file${NC}"
  fi
}

# Deploy to Render
deploy_render() {
  echo -e "${BLUE}Preparing for Render deployment...${NC}"
  
  # Create render.yaml if it doesn't exist
  if [ ! -f render.yaml ]; then
    echo -e "${YELLOW}Creating render.yaml configuration...${NC}"
    cat > render.yaml << EOF
services:
  - type: web
    name: ttc-server
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: DATABASE_URL
        sync: false
EOF
    echo -e "${GREEN}✓ Created render.yaml${NC}"
    echo -e "${YELLOW}⚠ Please add your DATABASE_URL to the Render dashboard${NC}"
  fi
  
  echo -e "${GREEN}✓ Render deployment preparation complete!${NC}"
  echo -e "${YELLOW}To deploy to Render:${NC}"
  echo "1. Push this code to your GitHub repository"
  echo "2. Connect your repository to Render"
  echo "3. Create a new Web Service using the render.yaml configuration"
  echo "4. Add your DATABASE_URL environment variable in the Render dashboard"
}

# Deploy to Railway
deploy_railway() {
  echo -e "${BLUE}Preparing for Railway deployment...${NC}"
  
  # Check if Railway CLI is installed
  if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}Railway CLI not found. Installing...${NC}"
    npm i -g @railway/cli
  fi
  
  echo -e "${GREEN}✓ Railway deployment preparation complete!${NC}"
  echo -e "${YELLOW}To deploy to Railway:${NC}"
  echo "1. Run: railway login"
  echo "2. Run: railway init (if not already initialized)"
  echo "3. Run: railway link (to link to an existing project)"
  echo "4. Set your environment variables: railway variables set DATABASE_URL=\"your-connection-url\""
  echo "5. Deploy with: railway up"
}

# Deploy to Fly.io
deploy_fly() {
  echo -e "${BLUE}Preparing for Fly.io deployment...${NC}"
  
  # Check if Fly CLI is installed
  if ! command -v fly &> /dev/null; then
    echo -e "${YELLOW}Fly CLI not found. Please install it:${NC}"
    echo "curl -L https://fly.io/install.sh | sh"
    exit 1
  fi
  
  # Create fly.toml if it doesn't exist
  if [ ! -f fly.toml ]; then
    echo -e "${YELLOW}Creating fly.toml configuration...${NC}"
    cat > fly.toml << EOF
app = "ttc-server"

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "8080"
  NODE_ENV = "production"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
EOF
    echo -e "${GREEN}✓ Created fly.toml${NC}"
  fi
  
  echo -e "${GREEN}✓ Fly.io deployment preparation complete!${NC}"
  echo -e "${YELLOW}To deploy to Fly.io:${NC}"
  echo "1. Run: fly auth login"
  echo "2. Run: fly launch (if not already launched)"
  echo "3. Set your database URL: fly secrets set DATABASE_URL=\"your-connection-url\""
  echo "4. Deploy with: fly deploy"
}

# Deploy to Vercel
deploy_vercel() {
  echo -e "${BLUE}Preparing for Vercel deployment...${NC}"
  
  # Create vercel.json if it doesn't exist
  if [ ! -f vercel.json ]; then
    echo -e "${YELLOW}Creating vercel.json configuration...${NC}"
    cat > vercel.json << EOF
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ]
}
EOF
    echo -e "${GREEN}✓ Created vercel.json${NC}"
  fi
  
  echo -e "${GREEN}✓ Vercel deployment preparation complete!${NC}"
  echo -e "${YELLOW}To deploy to Vercel:${NC}"
  echo "1. Install Vercel CLI: npm i -g vercel"
  echo "2. Login to Vercel: vercel login"
  echo "3. Deploy with: vercel"
  echo "4. Add your DATABASE_URL in the Vercel dashboard"
}

# Main execution
main() {
  check_requirements
  
  case "$PLATFORM" in
    render)
      build_app
      setup_env
      deploy_render
      ;;
    railway)
      build_app
      setup_env
      deploy_railway
      ;;
    fly)
      build_app
      setup_env
      deploy_fly
      ;;
    vercel)
      build_app
      setup_env
      deploy_vercel
      ;;
    prepare)
      build_app
      setup_env
      echo -e "${GREEN}✓ Deployment preparation complete!${NC}"
      ;;
    help|*)
      show_help
      ;;
  esac
}

# Run the script
main
