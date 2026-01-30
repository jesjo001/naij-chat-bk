@echo off
REM Naija Sabi Backend Quick Start Script for Windows

echo.
echo Naija Sabi Backend Setup
echo ============================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed

REM Copy environment file
if not exist .env (
    echo.
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo ✅ .env file created
    echo ⚠️  Please update .env with your configuration
) else (
    echo ✅ .env file already exists
)

REM Build the project
echo.
echo 🔨 Building project...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Project built successfully

REM Start development server
echo.
echo 🎯 Starting development server...
echo Server will run on http://localhost:5000
echo Press Ctrl+C to stop
echo.

call npm run dev
pause
