# Admin Desktop Build Script for Windows
# Builds the CastQuest Admin Desktop application as admin.exe

Write-Host "🏗️  CastQuest Admin Desktop Build Script" -ForegroundColor Blue
Write-Host ""

# Check Node.js version
$nodeVersion = node -v
Write-Host "Node.js version: $nodeVersion" -ForegroundColor Cyan

if ($nodeVersion -notmatch "v2[4-9]") {
    Write-Host "⚠️  Warning: Node.js 24+ required for admin builds" -ForegroundColor Yellow
    exit 1
}

# Check if Rust is installed
if (-not (Get-Command cargo -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Rust is not installed. Please install from https://rustup.rs/" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Rust is installed" -ForegroundColor Green

# Navigate to admin-desktop directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$scriptPath\..\apps\admin-desktop"

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
pnpm install

Write-Host ""
Write-Host "🔨 Building admin desktop application..." -ForegroundColor Blue
pnpm build:windows

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Executable location:" -ForegroundColor Cyan
    Write-Host "   apps\admin-desktop\src-tauri\target\release\castquest-admin.exe"
    Write-Host ""
    Write-Host "You can rename it to admin.exe and distribute it."
} else {
    Write-Host ""
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Write-Host "Check the error messages above for details."
    exit 1
}
