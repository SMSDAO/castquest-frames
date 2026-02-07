# CastQuest Documentation - Table of Contents

> **Complete navigation guide for CastQuest Frames protocol documentation**

---

## 📖 Getting Started

### Quick Start
- **[Quick Start Guide](./QUICK_START.md)** - Get up and running in 5 minutes
- **[README](./README.md)** - Documentation overview and key links
- **[index.md](./index.md)** - Documentation homepage and navigation

### Installation & Setup
- **[System Overview](./SYSTEM-OVERVIEW.md)** - Complete system architecture and components
- **[Deployment Guide](./DEPLOYMENT.md)** - Deploy to Vercel, Docker, AWS, and more
- **[Dependency Health](./DEPENDENCY-HEALTH.md)** - Dependency management and health monitoring

---

## 🏗️ Architecture & Design

### Core Architecture
- **[Architecture](./architecture.md)** - High-level protocol flow and module pipeline
- **[Modules](./modules.md)** - Detailed breakdown of all modules (M4-M8)
- **[Flows](./flows.md)** - End-to-end protocol flows and interactions

### Technical Decisions
- **[Architecture Decisions](./ARCHITECTURE_DECISIONS.md)** - Key technical decisions and rationale
- **[Protocol History](../protocol-history.md)** - Evolution of the protocol

---

## 👥 User & Admin Interfaces

### Dashboards
- **[Dashboards Documentation](./DASHBOARDS.md)** - Complete guide to User and Admin dashboards
- **[Dashboard Implementation](../DASHBOARD_IMPLEMENTATION.md)** - Technical implementation details
- **[Screenshots](./screenshots/README.md)** - Visual guide to dashboard features

---

## 🔧 Development

### Contributing
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute to CastQuest
- **[Contributor Cards](./contributor-cards.md)** - Recognition for contributors

### Development Tools
- **[Master Orchestrator](./master-orchestrator.md)** - Central command script documentation
- **[Testing Guide](./TESTING.md)** - Testing strategy, tools, and best practices
- **[API Reference](./API_REFERENCE.md)** - Complete API endpoint documentation

---

## 🤖 AI & Automation

### Smart Brain
- **[Smart Brain SDK](./sdk/smart-brain.md)** - Smart Brain AI system documentation
- **[Smart Brain Training Pack](./sdk/smart-brain-training-pack.md)** - Training materials for Smart Brain
- **[Smart Brain Monitoring](./SMART-BRAIN-MONITORING.md)** - Monitoring and orchestration

### Workers
- **[Autonomous Worker System](./WORKERS.md)** - Background job processing and automation

---

## 📦 Packages & SDK

### Core Services
- **[Core Services README](../packages/core-services/README.md)** - Backend API layer
- **[Core Services API](../packages/core-services/docs/API.md)** - API endpoint reference
- **[Core Services Architecture](../packages/core-services/docs/ARCHITECTURE.md)** - Service architecture

### SDK
- **[CastQuest SDK](../packages/sdk/README.md)** - TypeScript SDK for protocol integration
- **[SDK API Documentation](./SDK_API.md)** - SDK methods and usage

### Contracts
- **[Smart Contracts](../packages/contracts/README.md)** - Solidity contracts documentation
- **[Contract Deployment](./CONTRACT_DEPLOYMENT.md)** - Deployment guide for smart contracts

### Frames
- **[Frames Oracle](../packages/frames/README.md)** - Farcaster Frames implementation
- **[Frames Documentation](../packages/frames/docs/FRAMES-ORACLE.md)** - Complete frames guide

### UI Components
- **[Neo UX Core](../packages/neo-ux-core/README.md)** - Core UI primitives
- **[Design System](./DESIGN_SYSTEM.md)** - Neo-glow design system guide

---

## 🚀 Deployment & Operations

### Deployment
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment strategies
- **[Environment Configuration](./ENVIRONMENT.md)** - Environment variables and configuration

### Monitoring & Maintenance
- **[System Monitoring](./MONITORING.md)** - Real-time monitoring and alerts
- **[Health Checks](./HEALTH_CHECKS.md)** - System health validation
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Common issues and solutions

---

## 🔐 Security

### Security Documentation
- **[Security Policy](./SECURITY.md)** - Security policies and vulnerability reporting
- **[Security Update: Next.js](../SECURITY_UPDATE_NEXTJS.md)** - Next.js security patches
- **[Permissions System](./PERMISSIONS.md)** - Role-based access control

---

## 📚 Additional Resources

### Product & Marketing
- **[Product Documentation](./product/)** - Product guides and onboarding
  - [Developer Onboarding](./product/developer-onboarding.md)
  - [Landing Copy](./product/landing-copy.md)

### Whitepaper
- **[Whitepaper](./whitepaper/)** - Vision, protocol design, and technical specifications
  - [Protocol Chapter](./whitepaper/02-protocol-chapter.md)

### Special Topics
- **[Hackathon 2026 Supercharged](./hackathon-2026-supercharged.md)** - Hackathon edition features
- **[Smart Brain Live](../SMART-BRAIN-LIVE.md)** - Live Smart Brain features
- **[Migration Guide](../MIGRATION.md)** - Migration strategies
- **[Next Phase](../NEXT-PHASE.md)** - Upcoming features and roadmap
- **[Glossary](./GLOSSARY.md)** - Terminology and definitions

---

## 📊 Project Management

### Status & Planning
- **[Implementation Summary](../IMPLEMENTATION_SUMMARY.md)** - Current implementation status
- **[Implementation Notes](../IMPLEMENTATION_NOTES.md)** - Development notes
- **[Breakage Analysis](../BREAKAGE-ANALYSIS.md)** - Breaking changes tracking
- **[Resolution](../RESOLUTION.md)** - Issue resolution tracking
- **[Changelog](../CHANGELOG.md)** - Version history and changes

### Integration
- **[PR54 Integration Summary](../PR54_INTEGRATION_SUMMARY.md)** - Major PR integration notes

---

## 🔍 Reference

### Quick Reference Cards
- **[Command Reference](./COMMAND_REFERENCE.md)** - All commands in one place
- **[API Quick Reference](./API_QUICK_REFERENCE.md)** - Fast API lookup
- **[Glossary](./GLOSSARY.md)** - Terms and definitions

### Foundational Documents
- **[Founders](../FOUNDERS.md)** - Project founders and vision
- **[License](../LICENSE)** - MIT License
- **[Audit System](../README-AUDIT-SYSTEM.md)** - Audit system documentation

---

## 📖 Documentation Structure

```
docs/
├── README.md                           # Documentation overview
├── index.md                            # Documentation homepage
├── TABLE_OF_CONTENTS.md               # This file
│
├── Getting Started
│   ├── QUICK_START.md                 # 5-minute setup guide
│   ├── SYSTEM-OVERVIEW.md             # Complete system architecture
│   └── DEPLOYMENT.md                   # Deployment strategies
│
├── Architecture
│   ├── architecture.md                 # Protocol flow and modules
│   ├── modules.md                      # Module breakdown
│   ├── flows.md                        # Protocol flows
│   └── ARCHITECTURE_DECISIONS.md       # Technical decisions (ADR)
│
├── User Interfaces
│   ├── DASHBOARDS.md                   # User & Admin dashboards
│   └── screenshots/                    # Dashboard screenshots
│
├── Development
│   ├── CONTRIBUTING.md                 # Contributing guide
│   ├── contributor-cards.md            # Contributors
│   ├── master-orchestrator.md          # Master script
│   ├── TESTING.md                      # Testing guide
│   └── API_REFERENCE.md                # API documentation
│
├── AI & Automation
│   ├── sdk/
│   │   ├── smart-brain.md             # Smart Brain docs
│   │   └── smart-brain-training-pack.md
│   ├── SMART-BRAIN-MONITORING.md       # Monitoring
│   └── WORKERS.md                      # Worker system
│
├── Packages
│   ├── SDK_API.md                      # SDK reference
│   ├── CONTRACT_DEPLOYMENT.md          # Contract deployment
│   └── DESIGN_SYSTEM.md                # Design system
│
├── Operations
│   ├── MONITORING.md                   # System monitoring
│   ├── HEALTH_CHECKS.md                # Health validation
│   ├── TROUBLESHOOTING.md              # Issue resolution
│   └── DEPENDENCY-HEALTH.md            # Dependencies
│
├── Security
│   ├── SECURITY.md                     # Security policy
│   └── PERMISSIONS.md                  # Access control
│
├── Resources
│   ├── product/                        # Product docs
│   ├── whitepaper/                     # Technical whitepaper
│   ├── hackathon-2026-supercharged.md  # Hackathon features
│   └── GLOSSARY.md                     # Terminology
│
└── Reference
    ├── COMMAND_REFERENCE.md            # Command quick ref
    └── API_QUICK_REFERENCE.md          # API quick ref
```

---

## 🎯 Documentation by Audience

### For New Developers
1. [Quick Start Guide](./QUICK_START.md)
2. [System Overview](./SYSTEM-OVERVIEW.md)
3. [Contributing Guide](./CONTRIBUTING.md)
4. [Architecture](./architecture.md)
5. [Testing Guide](./TESTING.md)

### For Operators
1. [Deployment Guide](./DEPLOYMENT.md)
2. [Master Orchestrator](./master-orchestrator.md)
3. [Monitoring](./MONITORING.md)
4. [Troubleshooting](./TROUBLESHOOTING.md)
5. [Health Checks](./HEALTH_CHECKS.md)

### For Protocol Designers
1. [Architecture](./architecture.md)
2. [Modules](./modules.md)
3. [Flows](./flows.md)
4. [Architecture Decisions](./ARCHITECTURE_DECISIONS.md)
5. [Smart Contracts](../packages/contracts/README.md)

### For Frontend Developers
1. [Dashboards](./DASHBOARDS.md)
2. [Design System](./DESIGN_SYSTEM.md)
3. [API Reference](./API_REFERENCE.md)
4. [SDK API](./SDK_API.md)

### For Backend Developers
1. [Core Services](../packages/core-services/README.md)
2. [API Reference](./API_REFERENCE.md)
3. [Smart Contracts](../packages/contracts/README.md)
4. [Database Schema](./DATABASE_SCHEMA.md)

### For AI/ML Engineers
1. [Smart Brain SDK](./sdk/smart-brain.md)
2. [Smart Brain Monitoring](./SMART-BRAIN-MONITORING.md)
3. [Worker System](./WORKERS.md)
4. [Training Pack](./sdk/smart-brain-training-pack.md)

---

## 📝 Documentation Standards

### Writing Guidelines
- Use clear, concise language
- Include code examples where appropriate
- Add diagrams for complex concepts
- Cross-reference related documentation
- Keep examples up-to-date with codebase

### File Naming
- Use UPPERCASE for major documents (README.md, CONTRIBUTING.md)
- Use lowercase with hyphens for topic docs (architecture.md, flows.md)
- Use descriptive names that indicate content
- Group related docs in subdirectories

### Formatting
- Use Markdown for all documentation
- Include table of contents for long documents
- Use code blocks with language specification
- Add emoji icons for visual hierarchy (📖 🏗️ 🔧 etc.)
- Include "Last Updated" date on major documents

---

## 🔄 Keeping Documentation Updated

### When to Update
- After adding new features
- When changing APIs or interfaces
- After major refactoring
- When fixing bugs that affect usage
- During release cycles

### Who Updates
- Feature developers update relevant docs
- Documentation team reviews for clarity
- Community contributions welcome
- Automated tools flag outdated content

### Review Process
1. Developer updates docs with code changes
2. PR includes documentation updates
3. Reviewer checks docs for accuracy
4. Documentation team reviews for clarity
5. Merge when both code and docs approved

---

## 📞 Documentation Support

### Getting Help
- 📖 Check this table of contents first
- 🔍 Use GitHub search to find relevant docs
- 💬 Ask in Discord #documentation channel
- 🐛 Report documentation issues on GitHub
- 📧 Email documentation@castquest.io

### Contributing to Docs
- See [Contributing Guide](./CONTRIBUTING.md)
- Follow documentation standards above
- Submit PRs for improvements
- Report unclear or outdated content
- Suggest new documentation topics

---

**Last Updated:** 2026-02-07  
**Version:** 1.0.0  
**Maintained by:** CastQuest Documentation Team

---

**Built with ❤️ for the CastQuest community**
