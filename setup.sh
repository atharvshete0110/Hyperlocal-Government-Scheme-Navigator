#!/bin/bash

# Sarkari Saathi - Quick Setup Script
# This script sets up the complete project for development

set -e  # Exit on error

echo "🚀 Setting up Sarkari Saathi - Government Scheme Navigator"
echo "============================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running from project root
if [ ! -f "README.md" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

echo ""
echo "📦 Step 1: Setting up Backend..."
echo "--------------------------------"

cd backend

# Check Python version
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python 3 is not installed. Please install Python 3.11+${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo "✓ Found Python $PYTHON_VERSION"

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
else
    echo "✓ Virtual environment already exists"
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo "✓ Backend dependencies installed"

# Setup .env file
if [ ! -f ".env" ]; then
    echo ""
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    read -p "Enter your Anthropic API key (or press Enter to skip): " api_key
    
    if [ -n "$api_key" ]; then
        cat > .env << EOF
ANTHROPIC_API_KEY=$api_key
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
EOF
        echo "✓ .env file created"
    else
        cp .env.example .env
        echo -e "${YELLOW}⚠️  .env file created from template. Please add your API key!${NC}"
    fi
else
    echo "✓ .env file already exists"
fi

# Test backend setup
echo "Testing backend setup..."
python -c "from schemes_db import SchemeDatabase; db = SchemeDatabase(); print(f'✓ Loaded {len(db.schemes)} schemes')"

cd ..

echo ""
echo "🎨 Step 2: Setting up Frontend..."
echo "--------------------------------"

cd frontend

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 18+${NC}"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
echo "✓ Found Node.js v$NODE_VERSION"

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies (this may take a minute)..."
    npm install --silent
    echo "✓ Frontend dependencies installed"
else
    echo "✓ Node modules already installed"
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo "=================="
echo ""
echo -e "${GREEN}Your project is ready to run!${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1️⃣  Start the backend:"
echo "   cd backend"
echo "   source venv/bin/activate  # On Windows: venv\\Scripts\\activate"
echo "   python main.py"
echo ""
echo "2️⃣  In a new terminal, start the frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "3️⃣  Open your browser:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "📚 Documentation:"
echo "   - API docs: docs/API.md"
echo "   - Deployment: docs/DEPLOYMENT.md"
echo "   - Adding schemes: docs/SCHEMES.md"
echo ""
echo -e "${YELLOW}⚠️  Don't forget to add your Anthropic API key to backend/.env${NC}"
echo ""
echo "Happy coding! 🎉"