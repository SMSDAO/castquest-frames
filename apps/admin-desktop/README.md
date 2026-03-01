# CastQuest Admin Desktop

The CastQuest Admin Desktop application is a native desktop wrapper for the admin web interface, providing a dedicated app experience for administrators.

## Prerequisites

- **Node.js 24+** (Required for building)
- **Rust** (Required for Tauri)
- **pnpm 9+**

### Install Rust

```bash
# Windows
# Download from https://rustup.rs/

# macOS/Linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Development

```bash
# From repository root, install dependencies
pnpm install

# Navigate to admin-desktop
cd apps/admin-desktop

# Run in development mode (starts admin web app at localhost:3001)
pnpm dev
```

## Building

### Windows (.exe)

```bash
# From apps/admin-desktop directory
pnpm build:windows
```

The executable will be generated at:
```
apps/admin-desktop/src-tauri/target/release/castquest-admin.exe
```

### All Platforms

```bash
# Build for current platform
pnpm build
```

Build artifacts location:
- **Windows**: `src-tauri/target/release/castquest-admin.exe`
- **macOS**: `src-tauri/target/release/bundle/macos/CastQuest Admin.app`
- **Linux**: `src-tauri/target/release/castquest-admin`

## Features

- Native desktop application wrapping the admin web interface
- Full access to admin dashboard features:
  - Token Management ($CAST, $PIC, $VID, $AUDIO)
  - Permission System (RBAC)
  - Fee Controls
  - Risk Management
  - Protocol Metrics
  - System Health Monitoring
  - Frame Monitoring
  - Activity Logs
- Automatic window controls
- Native system integration

## Architecture

The admin desktop app uses Tauri to create a native wrapper around the Next.js admin web application:

1. **Frontend**: The admin web app (Next.js) runs on `localhost:3001`
2. **Desktop Shell**: Tauri creates a native window displaying the web app
3. **Sync**: The desktop UI automatically syncs with admin web routes and menus

## Configuration

Configuration is managed through `src-tauri/tauri.conf.json`:

- Window size: 1400x900 (min 1200x800)
- Permissions: HTTP requests to localhost and castquest.xyz

## Troubleshooting

### Build fails on Windows

Ensure you have:
1. Visual Studio Build Tools installed
2. Rust toolchain for Windows (MSVC)

```powershell
rustup target add x86_64-pc-windows-msvc
```

### Admin web app doesn't start

The desktop app expects the admin web app to be available. Make sure:
1. Dependencies are installed: `pnpm install` (from repo root)
2. Admin app builds successfully: `cd ../admin && pnpm build`

### Port 3001 already in use

Change the port in both:
- `src-tauri/tauri.conf.json` (devPath)
- `../admin/package.json` (dev script)

## Distribution

After building, distribute the executable:

**Windows**: Share `castquest-admin.exe` (self-contained)

Users can run it without installing Node.js or other dependencies.

## Security

The desktop app has restricted permissions:
- HTTP requests: Only to localhost and castquest.xyz domains
- File system: No direct access
- Shell: Limited to opening external links
